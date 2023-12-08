package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.ChatMessage;
import com.cg_vibely_social_service.payload.message.ChatMessageDto;
import com.cg_vibely_social_service.payload.message.ChatMessagesResponse;
import com.cg_vibely_social_service.repository.ChatMessageRepository;
import com.cg_vibely_social_service.service.ChatService;
import com.cg_vibely_social_service.utils.GsonUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private static final String PAGE_MESSAGE_BY_USER_FORMAT = "chatMessagesOf%sAnd%sWithPage%d";
    private static final String MESSAGES_BY_USER_FORMAT = "liveChatMessagesOf%sAnd%s";
    private static final int MESSAGE_PAGE_SIZE = 20;
    private static final int MAX_CACHE_PAGES = 5;
    private static final int CACHED_MESSAGES_MAX_SIZE = 20;

    private final ChatMessageRepository messageRepository;
    private final Comparator<ChatMessage> chatMessageComparator;
    private final Converter<ChatMessageDto, ChatMessage> chatMessageConverter;
    private final GsonUtils<ChatMessagesResponse> gsonUtils;
    private final ValueOperations<String, String> cachedData;
    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public void save(ChatMessageDto messageDto) {
        String sender = messageDto.getSender();
        String receiver = messageDto.getReceiver();
        String liveChatCacheKey = String.format(MESSAGES_BY_USER_FORMAT, sender, receiver);
        String reverseLiveChatCacheKey = String.format(MESSAGES_BY_USER_FORMAT, receiver, sender);
        try {
            if (Boolean.TRUE.equals(redisTemplate.hasKey(liveChatCacheKey))) {
                saveIfKeyExist(messageDto, sender, receiver, liveChatCacheKey);
            } else if (Boolean.TRUE.equals(redisTemplate.hasKey(reverseLiveChatCacheKey))) {
                saveIfKeyExist(messageDto, sender, receiver, reverseLiveChatCacheKey);
            } else {
                List<ChatMessageDto> chatMessageDtoList = new ArrayList<>();
                chatMessageDtoList.add(messageDto);
                ChatMessagesResponse chatMessagesResponse = new ChatMessagesResponse(1, chatMessageDtoList);
                cachedData.set(liveChatCacheKey, gsonUtils.parseToString(chatMessagesResponse));
            }
        } catch (Exception e) {
            ChatMessage chatMessage = new ChatMessage();
            BeanUtils.copyProperties(messageDto, chatMessage);
            messageRepository.save(chatMessage);
        }
    }

    private void saveIfKeyExist(ChatMessageDto messageDto, String sender, String receiver, String liveChatCacheKey) {
        String stringOfCachedCategories = cachedData.get(liveChatCacheKey);
        List<ChatMessageDto> chatMessageDtoList = gsonUtils
                .parseToObject(stringOfCachedCategories, ChatMessagesResponse.class)
                .getMessageList();
        chatMessageDtoList.add(messageDto);

        if (chatMessageDtoList.size() >= CACHED_MESSAGES_MAX_SIZE) {
            List<ChatMessage> chatMessages = chatMessageConverter.convert(chatMessageDtoList);
            messageRepository.saveAll(chatMessages);

            List<String> cachedKeys = new ArrayList<>();
            for (int page = 0; page <= MAX_CACHE_PAGES; page++) {
                cachedKeys.add(String.format(PAGE_MESSAGE_BY_USER_FORMAT, sender, receiver, page));
            }
            redisTemplate.delete(cachedKeys);
            redisTemplate.delete(liveChatCacheKey);
        } else {
            ChatMessagesResponse chatMessagesResponse = new ChatMessagesResponse(1, chatMessageDtoList);
            cachedData.set(liveChatCacheKey, gsonUtils.parseToString(chatMessagesResponse));
        }
    }

    @Override
    public ChatMessagesResponse findAll(String senderEmail, String receiverEmail, Pageable pageable) {
        Page<ChatMessage> messagePage = messageRepository
                .findAllBySenderAndReceiverOrSenderAndReceiver(senderEmail, receiverEmail, receiverEmail, senderEmail, pageable);
        List<ChatMessage> messageList = new ArrayList<>(messagePage.getContent());
        messageList.sort(chatMessageComparator);
        List<ChatMessageDto> finalList = chatMessageConverter.revert(messageList);
        return ChatMessagesResponse.builder()
                .totalPage(messagePage.getTotalPages())
                .messageList(finalList)
                .build();
    }

    @Override
    public ChatMessagesResponse findAllWithCacheActive(String senderEmail, String receiverEmail, Pageable pageable) {
        Pageable newPageable = PageRequest.of(pageable.getPageNumber(), MESSAGE_PAGE_SIZE);

        String chatPageCacheKey = String.format(PAGE_MESSAGE_BY_USER_FORMAT, senderEmail, receiverEmail, newPageable.getPageNumber());
        String reverseChatPageCacheKey = String.format(PAGE_MESSAGE_BY_USER_FORMAT, receiverEmail, senderEmail, newPageable.getPageNumber());

        String liveChatCacheKey = String.format(MESSAGES_BY_USER_FORMAT, senderEmail, receiverEmail);
        String reverseLiveChatCacheKey = String.format(MESSAGES_BY_USER_FORMAT, receiverEmail, senderEmail);

        try {
            List<ChatMessageDto> chatMessageDtoList = new ArrayList<>();
            chatMessageDtoList = getLiveChatMessages(liveChatCacheKey, reverseLiveChatCacheKey, chatMessageDtoList);
            Collections.reverse(chatMessageDtoList);

            if (Boolean.TRUE.equals(redisTemplate.hasKey(chatPageCacheKey))) {

                String stringOfCachedCategories = cachedData.get(chatPageCacheKey);
                ChatMessagesResponse chatMessagesWithPageResponse = gsonUtils
                        .parseToObject(stringOfCachedCategories, ChatMessagesResponse.class);
                List<ChatMessageDto> chatMessageDtoPageCached = chatMessagesWithPageResponse.getMessageList();
                chatMessageDtoList.addAll(chatMessageDtoPageCached);
                return new ChatMessagesResponse(chatMessagesWithPageResponse.getTotalPage(), chatMessageDtoList);

            } else if (Boolean.TRUE.equals(redisTemplate.hasKey(reverseChatPageCacheKey))) {

                String stringOfCachedCategories = cachedData.get(reverseChatPageCacheKey);
                ChatMessagesResponse chatMessagesWithPageResponse = gsonUtils
                        .parseToObject(stringOfCachedCategories, ChatMessagesResponse.class);
                List<ChatMessageDto> chatMessageDtoPageCached = chatMessagesWithPageResponse.getMessageList();
                chatMessageDtoList.addAll(chatMessageDtoPageCached);
                return new ChatMessagesResponse(chatMessagesWithPageResponse.getTotalPage(), chatMessageDtoList);

            }

            ChatMessagesResponse chatMessagesResponse = findAll(senderEmail, receiverEmail, newPageable);

            if (chatMessagesResponse.getMessageList().size() == MESSAGE_PAGE_SIZE
                    && newPageable.getPageNumber() < MAX_CACHE_PAGES) {

                String gsonString = gsonUtils.parseToString(chatMessagesResponse);
                cachedData.set(chatPageCacheKey, gsonString, 60, TimeUnit.MINUTES);

            }

            List<ChatMessageDto> chatMessageDtoPage = chatMessagesResponse.getMessageList();
            chatMessageDtoPage.addAll(chatMessageDtoList);
            return new ChatMessagesResponse(chatMessagesResponse.getTotalPage(), chatMessageDtoPage);

        } catch (Exception e) {
            return findAll(senderEmail, receiverEmail, newPageable);
        }
    }

    private List<ChatMessageDto> getLiveChatMessages(String liveChatCacheKey, String reverseLiveChatCacheKey, List<ChatMessageDto> chatMessageDtoList) {
        if (Boolean.TRUE.equals(redisTemplate.hasKey(liveChatCacheKey))) {
            String stringOfCachedCategories = cachedData.get(liveChatCacheKey);
            chatMessageDtoList = gsonUtils
                    .parseToObject(stringOfCachedCategories, ChatMessagesResponse.class)
                    .getMessageList();
        } else if (Boolean.TRUE.equals(redisTemplate.hasKey(reverseLiveChatCacheKey))) {
            String stringOfCachedCategories = cachedData.get(reverseLiveChatCacheKey);
            chatMessageDtoList = gsonUtils
                    .parseToObject(stringOfCachedCategories, ChatMessagesResponse.class)
                    .getMessageList();
        }
        return chatMessageDtoList;
    }
}
