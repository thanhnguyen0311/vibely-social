package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.converter.impl.FollowDtoConverter;
import com.cg_vibely_social_service.entity.Follow;
import com.cg_vibely_social_service.payload.response.FollowResponseDto;
import com.cg_vibely_social_service.repository.FollowRepository;
import com.cg_vibely_social_service.repository.UserRepository;
import com.cg_vibely_social_service.service.FollowService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {
    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final FollowDtoConverter followDtoConverter;

    @Override
    public void addFollowByUserAndTarget(Long userId, Long targetId) {
        Follow follow = Follow.builder()
                .userId(targetId)
                .followedUserId(userId)
                .build();
        followRepository.save(follow);
    }

    @Override
    public List<FollowResponseDto> getAllFollowerByUserId(Long userId) {
        List<Follow> followerList = followRepository.findAllByUserId(userId);
        List<FollowResponseDto> followResponseDtoList = followDtoConverter.convert(followerList);
        for(FollowResponseDto followResponseDto : followResponseDtoList){
            followResponseDto.setName((
                    userRepository.findUserById(followResponseDto.getFollowedUserId())).getFirstName()
                  +(userRepository.findUserById(followResponseDto.getFollowedUserId())).getLastName());
            followResponseDto.setAvatarUrl((userRepository.findUserById(followResponseDto.getFollowedUserId())).getAvatar());
        }
        return followResponseDtoList;
    }

    @Override
    public List<FollowResponseDto> getAllFollowingByUserId(Long userId) {
        List<Follow> followingList = followRepository.findAllByFollowedUserId(userId);
        List<FollowResponseDto> followResponseDtoList = followDtoConverter.convert(followingList);
        for(FollowResponseDto followResponseDto : followResponseDtoList){
            followResponseDto.setName((
                    userRepository.findUserById(followResponseDto.getUserId())).getFirstName()
                    +(userRepository.findUserById(followResponseDto.getUserId())).getLastName());
            followResponseDto.setAvatarUrl((userRepository.findUserById(followResponseDto.getUserId())).getAvatar());
        }
        return followResponseDtoList;
    }

    @Override
    public void unFollowByUserAndTarget(Long BeingFollowedUserId, Long followedUserId) {
        followRepository.deleteByUserIdAndFollowedUserId(BeingFollowedUserId, followedUserId);
    }
}
