package com.cg_vibely_social_service.converter.impl;

import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.ChatMessage;
import com.cg_vibely_social_service.payload.message.ChatMessageDto;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
public class ChatMessageDtoConverter implements Converter<ChatMessageDto, ChatMessage> {
    @Override
    public ChatMessage convert(ChatMessageDto source) {
        ChatMessage chatMessage = new ChatMessage();
        BeanUtils.copyProperties(source,chatMessage);
        return chatMessage;
    }

    @Override
    public ChatMessageDto revert(ChatMessage target) {
        ChatMessageDto chatMessageDto = new ChatMessageDto();
        BeanUtils.copyProperties(target,chatMessageDto);
        return chatMessageDto;
    }

    @Override
    public List<ChatMessage> convert(List<ChatMessageDto> sources) {
        return sources.stream().map(this::convert).collect(Collectors.toList());
    }

    @Override
    public List<ChatMessageDto> revert(List<ChatMessage> targets) {
        return targets.stream().map(this::revert).collect(Collectors.toList());
    }
}
