package com.cg_vibely_social_service.repository;

import com.cg_vibely_social_service.entity.FriendRequest;
import com.cg_vibely_social_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    List<FriendRequest> findAllByReceiver(User receiver);
    List<FriendRequest> findAllBySender(User sender);
    FriendRequest findDistinctBySenderAndReceiver(User sender, User receiver);
    void deleteAllBySenderAndReceiverOrSenderAndReceiver(User sender, User receiver, User rvReceiver, User rvSender);
}
