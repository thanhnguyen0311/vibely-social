package com.cg_vibely_social_service.service;

import com.cg_vibely_social_service.payload.response.FriendResponseDto;

import java.util.List;

public interface FriendService {

    List<FriendResponseDto> findFriendsByUserId(Long userId);

    List<Long> findAllFriends(Long userId);
    void removeFriend(Long friendId);
}
