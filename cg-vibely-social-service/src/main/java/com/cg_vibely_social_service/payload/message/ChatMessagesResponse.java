package com.cg_vibely_social_service.payload.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessagesResponse {
    private Integer totalPage;
    private List<ChatMessageDto> messageList;
}
