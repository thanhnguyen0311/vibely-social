package com.cg_vibely_social_service.entity;

import com.cg_vibely_social_service.payload.message.NotificationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private NotificationType type;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "from_user")
    private Long fromUser;
    private String content;
    private Boolean seen = false;
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Notification(NotificationType type, Long userId, Long fromUser, String content) {
        this.type = type;
        this.userId = userId;
        this.content = content;
        this.fromUser = fromUser;
    }
}
