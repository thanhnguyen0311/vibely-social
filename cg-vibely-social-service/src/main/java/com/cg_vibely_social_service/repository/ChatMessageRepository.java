package com.cg_vibely_social_service.repository;

import com.cg_vibely_social_service.entity.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    Page<ChatMessage> findAllBySenderAndReceiverOrSenderAndReceiver(
            String senderEmail, String receiverEmail,
            String receiverEmail1, String senderEmail1,
            Pageable pageable);
}
