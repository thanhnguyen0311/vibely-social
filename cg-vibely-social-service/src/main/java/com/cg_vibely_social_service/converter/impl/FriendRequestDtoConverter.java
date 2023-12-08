package com.cg_vibely_social_service.converter.impl;

import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.FriendRequest;
import com.cg_vibely_social_service.payload.request.FriendRequestDto;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class FriendRequestDtoConverter implements Converter<FriendRequest, FriendRequestDto> {
    @Override
    public FriendRequestDto convert(FriendRequest source) {
        FriendRequestDto friendRequestRequestDto = new FriendRequestDto();
        BeanUtils.copyProperties(source, friendRequestRequestDto);
        return friendRequestRequestDto;
    }

    @Override
    public List<FriendRequestDto> convert(List<FriendRequest> sources) {
        return sources.stream()
                .map(this::convert)
                .toList();
    }

    @Override
    public FriendRequest revert(FriendRequestDto target) {
        FriendRequest friendRequest = new FriendRequest();
        BeanUtils.copyProperties(target, friendRequest);
        return friendRequest;
    }



    @Override
    public List<FriendRequest> revert(List<FriendRequestDto> targets) {
        return targets.stream()
                .map(this::revert)
                .toList();
    }
}
