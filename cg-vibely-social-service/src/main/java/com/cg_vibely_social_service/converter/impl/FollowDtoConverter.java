package com.cg_vibely_social_service.converter.impl;

import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.Follow;
import com.cg_vibely_social_service.payload.response.FollowResponseDto;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FollowDtoConverter implements Converter<Follow, FollowResponseDto> {

    @Override
    public FollowResponseDto convert(Follow source) {
        FollowResponseDto followResponseDto = new FollowResponseDto();
        BeanUtils.copyProperties(source, followResponseDto);
        return followResponseDto;
    }


    @Override
    public Follow revert(FollowResponseDto target) {
        Follow follow = new Follow();
        BeanUtils.copyProperties(target, follow);
        return follow;
    }

    @Override
    public List<FollowResponseDto> convert(List<Follow> sources) {
        return sources.stream().map(this::convert).collect(Collectors.toList());
    }

    @Override
    public List<Follow> revert(List<FollowResponseDto> targets) {
        return targets.stream().map(this::revert).collect(Collectors.toList());
    }
}
