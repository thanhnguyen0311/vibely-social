package com.cg_vibely_social_service.controller;

import com.cg_vibely_social_service.payload.response.FollowResponseDto;
import com.cg_vibely_social_service.service.impl.FollowServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follow")
public class FollowController {
    private final FollowServiceImpl followService;

    @GetMapping("/{id}/follower")
    public ResponseEntity<List<FollowResponseDto>> getFollower(@PathVariable ("id") Long userId) {
        List<FollowResponseDto> followerResponseDtoList = followService.getAllFollowerByUserId(userId);
        return new ResponseEntity<>(followerResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/{id}/following")
    public ResponseEntity<List<FollowResponseDto>> getFollowing(@PathVariable ("id") Long userId){
        List<FollowResponseDto> followingResponseDtoList = followService.getAllFollowingByUserId(userId);
        return new ResponseEntity<>(followingResponseDtoList, HttpStatus.OK);
    }

    @PostMapping("/{userId}/{targetId}")
    public ResponseEntity<?> addFollow (@PathVariable ("userId") Long userId,
                                        @PathVariable ("targetId") Long targetId){
        followService.addFollowByUserAndTarget(userId, targetId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{followedUserId}/{BeingFollowedUserId}")
    public ResponseEntity<?> UnFollow (@PathVariable ("followedUserId") Long followedUserId,
                                       @PathVariable ("BeingFollowedUserId") Long BeingFollowedUserId){
        followService.unFollowByUserAndTarget(BeingFollowedUserId, followedUserId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
