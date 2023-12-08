package com.cg_vibely_social_service.converter.impl;

import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.FriendRequest;
import com.cg_vibely_social_service.payload.response.FriendRequestResponse;
import com.cg_vibely_social_service.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FriendRequestResponseConverter implements Converter<FriendRequest, FriendRequestResponse> {
    private final ImageService imageService;

    @Override
    public FriendRequestResponse convert(FriendRequest source) {
        return FriendRequestResponse.builder()
                .id(source.getId())
                .friendId(source.getSender().getId())
                .firstName(source.getSender().getFirstName())
                .lastName(source.getSender().getLastName())
                .avatarUrl(imageService.getImageUrl(source.getSender().getAvatar()))
                .build();
    }

    @Override
    public List<FriendRequestResponse> convert(List<FriendRequest> sources) {
        return sources.stream()
                .map(this::convert)
                .toList();
    }

    @Override
    public FriendRequest revert(FriendRequestResponse target) {
        return null;
    }

    @Override
    public List<FriendRequest> revert(List<FriendRequestResponse> targets) {
        return null;
    }
}
