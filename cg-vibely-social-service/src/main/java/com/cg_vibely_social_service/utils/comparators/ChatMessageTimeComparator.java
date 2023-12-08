package com.cg_vibely_social_service.utils.comparators;

import com.cg_vibely_social_service.entity.ChatMessage;
import org.springframework.stereotype.Component;

import java.util.Comparator;

@Component
public class ChatMessageTimeComparator implements Comparator<ChatMessage> {
    @Override
    public int compare(ChatMessage chatMessage1, ChatMessage chatMessage2) {
        return - chatMessage1.getTime().compareTo(chatMessage2.getTime());
    }
}
