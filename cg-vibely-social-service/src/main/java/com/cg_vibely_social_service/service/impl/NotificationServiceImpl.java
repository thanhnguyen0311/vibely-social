package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.entity.Notification;
import com.cg_vibely_social_service.payload.message.NotificationDto;
import com.cg_vibely_social_service.repository.NotificationRepository;
import com.cg_vibely_social_service.service.NotificationService;
import com.cg_vibely_social_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final NotificationRepository notificationRepository;
    private final UserService userService;

    @Override
    public void sendNotify(String userEmail, NotificationDto notification) {
        simpMessagingTemplate.convertAndSendToUser(userEmail, "/queue/notify", notification);
    }

    @Override
    public void saveNotify(Notification notification) {
        notificationRepository.save(notification);
    }

    @Override
    public Page<Notification> findAll(Pageable pageable) {
        Long userId = userService.getCurrentUser().getId();
        return notificationRepository.findAllByUserId(userId, pageable);
    }
}
