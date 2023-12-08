package com.cg_vibely_social_service.controller;


import com.cg_vibely_social_service.payload.response.FriendRequestResponse;
import com.cg_vibely_social_service.payload.response.FriendResponseDto;
import com.cg_vibely_social_service.service.FriendRequestService;
import com.cg_vibely_social_service.service.FriendService;
import com.cg_vibely_social_service.service.StatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/friends")
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;
    private final FriendRequestService friendRequestService;
    private final StatusService statusService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getFriendList(@PathVariable("id") Long id) {
        List<FriendResponseDto> friendList = friendService.findFriendsByUserId(id);
        return new ResponseEntity<>(friendList, HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> sendFriendRequest(@PathVariable("id") Long friendId) {
        friendRequestService.saveFriendRequest(friendId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/accept/{id}")
    public ResponseEntity<?> acceptFriendRequest(@PathVariable("id") Long friendId) {
        friendRequestService.acceptFriendRequest(friendId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/requested") //requests from current user
    public ResponseEntity<?> getRequestedFriend() {
        List<FriendRequestResponse> friendRequestList
                = friendRequestService.findAllFriendRequestSent();
        return new ResponseEntity<>(friendRequestList, HttpStatus.OK);
    }

    @GetMapping("/request") //requests by other user
    public ResponseEntity<?> getFriendRequest() {
        List<FriendRequestResponse> friendRequestResponseList
                = friendRequestService.findAllFriendRequest();
        return new ResponseEntity<>(friendRequestResponseList, HttpStatus.OK);
    }

    @DeleteMapping("/requests/{id}")
    public ResponseEntity<?> denyFriendRequest(@PathVariable("id") Long friendId) {
        friendRequestService.denyFriendRequest(friendId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeFriend(@PathVariable("id") Long friendId) {
        friendService.removeFriend(friendId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/status")
    public ResponseEntity<?> getFriendStatus(@RequestBody List<String> emails) {
        HashMap<String, Boolean> friendStatus = statusService.getStatus(emails);
        return new ResponseEntity<>(friendStatus, HttpStatus.OK);
    }
}