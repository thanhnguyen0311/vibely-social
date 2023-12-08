package com.cg_vibely_social_service.payload.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageDto {
    private Boolean isStatusType;
    private Boolean typingStatus;
    private String sender;
    private String receiver;
    private String senderName;
    private String content;
    private LocalDateTime time = LocalDateTime.now();
}