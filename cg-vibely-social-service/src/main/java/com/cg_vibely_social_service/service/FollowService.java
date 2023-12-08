package com.cg_vibely_social_service.service;

import com.cg_vibely_social_service.payload.response.FollowResponseDto;
import java.util.List;

public interface FollowService {
    void addFollowByUserAndTarget(Long userId, Long targetId);

    List<FollowResponseDto> getAllFollowerByUserId(Long userId);

    List<FollowResponseDto> getAllFollowingByUserId(Long userId);

    void unFollowByUserAndTarget(Long userId, Long targetId);
}
