package com.cg_vibely_social_service.service;

import com.cg_vibely_social_service.payload.response.FriendRequestResponse;


import java.util.List;

public interface FriendRequestService {
    void saveFriendRequest(Long friendId);
    List<FriendRequestResponse> findAllFriendRequest();
    List<FriendRequestResponse> findAllFriendRequestSent();
    void acceptFriendRequest(Long friendId);
    void denyFriendRequest(Long friendId);
}
