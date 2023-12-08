package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.Friend;
import com.cg_vibely_social_service.entity.FriendRequest;
import com.cg_vibely_social_service.entity.Notification;
import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.payload.message.NotificationDto;
import com.cg_vibely_social_service.payload.message.NotificationType;
import com.cg_vibely_social_service.payload.message.NotifyMessageFormat;
import com.cg_vibely_social_service.payload.response.FriendRequestResponse;
import com.cg_vibely_social_service.repository.FriendRepository;
import com.cg_vibely_social_service.repository.FriendRequestRepository;
import com.cg_vibely_social_service.service.FriendRequestService;
import com.cg_vibely_social_service.service.ImageService;
import com.cg_vibely_social_service.service.NotificationService;
import com.cg_vibely_social_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FriendRequestServiceImpl implements FriendRequestService {
    private final FriendRequestRepository friendRequestRepository;
    private final FriendRepository friendRepository;
    private final UserService userService;
    private final ImageService imageService;
    private final NotificationService notificationService;
    private final Converter<FriendRequest, FriendRequestResponse> friendRequestResponseConverter;


    @Override
    public void saveFriendRequest(Long friendId) {
        UserImpl currentUser = userService.getCurrentUser();
        User user = userService.findById(currentUser.getId());
        User friend = userService.findById(friendId);

        FriendRequest friendRequest = FriendRequest.builder()
                .sender(user)
                .receiver(friend)
                .build();
        friendRequestRepository.save(friendRequest);

        Notification notification = new Notification(
                NotificationType.FRIEND_REQUEST,
                friend.getId(),
                user.getId(),
                String.format(NotifyMessageFormat.FRIEND_REQUEST, user.getFirstName()));

        notificationService.saveNotify(notification);
        NotificationDto notificationDto = new NotificationDto();
        BeanUtils.copyProperties(notification, notificationDto);
        notificationDto.setAvatarUrl(imageService.getImageUrl(user.getAvatar()));
        notificationService.sendNotify(friend.getEmail(), notificationDto);
    }

    @Override
    public List<FriendRequestResponse> findAllFriendRequest() {
        Long userId = userService.getCurrentUser().getId();
        User user = userService.findById(userId);
        List<FriendRequest> friendRequestDtoList = friendRequestRepository.findAllByReceiver(user);
        return friendRequestResponseConverter.convert(friendRequestDtoList);
    }

    @Override
    public List<FriendRequestResponse> findAllFriendRequestSent() {
        Long userId = userService.getCurrentUser().getId();
        User user = userService.findById(userId);
        List<FriendRequest> friendRequests = friendRequestRepository.findAllBySender(user);
        return friendRequests.stream().map(this::convertRequestSent).collect(Collectors.toList());
    }

    @Override
    public void acceptFriendRequest(Long friendId) {
        UserImpl currentUser = userService.getCurrentUser();
        User user = userService.findById(currentUser.getId());
        User friend = userService.findById(friendId);
        friendRepository.save(new Friend(user.getId(), friend.getId()));
        friendRequestRepository.deleteAllBySenderAndReceiverOrSenderAndReceiver(user, friend, friend, user);
    }

    public void denyFriendRequest(Long friendId) {
        UserImpl currentUser = userService.getCurrentUser();
        User user = userService.findById(currentUser.getId());
        User friend = userService.findById(friendId);
        friendRequestRepository.deleteAllBySenderAndReceiverOrSenderAndReceiver(user, friend, friend, user);
    }

    private FriendRequestResponse convertRequestSent(FriendRequest source) {
        return FriendRequestResponse.builder()
                .friendId(source.getReceiver().getId())
                .firstName(source.getReceiver().getFirstName())
                .lastName(source.getReceiver().getLastName())
                .avatarUrl(imageService.getImageUrl(source.getReceiver().getAvatar()))
                .build();
    }
}
