package com.cg_vibely_social_service.service;

import com.cg_vibely_social_service.payload.message.ChatMessageDto;
import com.cg_vibely_social_service.payload.message.ChatMessagesResponse;
import org.springframework.data.domain.Pageable;

public interface ChatService {
    void save(ChatMessageDto messageDto);
    ChatMessagesResponse findAllWithCacheActive(String senderEmail, String receiverEmail, Pageable pageable);
    ChatMessagesResponse findAll(String senderEmail, String receiverEmail, Pageable pageable);
}
