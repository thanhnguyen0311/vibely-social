package com.cg_vibely_social_service.converter.impl;

import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.payload.response.FriendResponseDto;
import com.cg_vibely_social_service.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FriendResponseDtoConverter implements Converter<FriendResponseDto, User> {
    private final ImageService imageService;
    @Override
    public User convert(FriendResponseDto source) {
        return null;
    }

    @Override
    public List<User> convert(List<FriendResponseDto> sources) {
        return null;
    }

    @Override
    public FriendResponseDto revert(User target) {
        FriendResponseDto result = new FriendResponseDto();
        BeanUtils.copyProperties(target, result);
        if (target.getAvatar() == null && target.getGoogleAvatar() != null) {
            result.setAvatarUrl(target.getGoogleAvatar());
        } else {
            result.setAvatarUrl(imageService.getImageUrl(target.getAvatar()));
        }
        return result;
    }

    @Override
    public List<FriendResponseDto> revert(List<User> targets) {
        return targets.stream()
                .map(this::revert)
                .toList();
    }
}
