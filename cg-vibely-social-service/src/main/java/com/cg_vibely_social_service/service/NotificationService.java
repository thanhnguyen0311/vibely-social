package com.cg_vibely_social_service.service;

import com.cg_vibely_social_service.entity.Notification;
import com.cg_vibely_social_service.payload.message.NotificationDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NotificationService {
    void sendNotify (String userEmail, NotificationDto notification);
    void saveNotify(Notification notification);
    Page<Notification> findAll(Pageable pageable);
}
