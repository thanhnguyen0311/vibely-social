package com.cg_vibely_social_service.payload.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationDto {
    private Long id;
    private NotificationType type;
    private Long fromUser;
    private String avatarUrl;
    private String content;
    private Boolean seen = false;
    private LocalDateTime createdAt;
}
