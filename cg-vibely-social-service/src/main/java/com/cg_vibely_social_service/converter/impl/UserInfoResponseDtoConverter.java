package com.cg_vibely_social_service.converter.impl;

import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.payload.response.UserInfoResponseDto;
import com.cg_vibely_social_service.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserInfoResponseDtoConverter implements Converter<UserInfoResponseDto, User> {
    private final ImageService imageService;

    @Override
    public User convert(UserInfoResponseDto source) {
        return null;
    }

    @Override
    public List<User> convert(List<UserInfoResponseDto> sources) {
        return null;
    }

    @Override
    public UserInfoResponseDto revert(User target) {
        UserInfoResponseDto result = new UserInfoResponseDto();
        BeanUtils.copyProperties(target, result);
        result.setBirthday(target.getDayOfBirth());
        result.setAvatarUrl(imageService.getImageUrl(target.getAvatar()));
        result.setBackground(imageService.getImageUrl(target.getBackground()
                == null
                ? "null.jpg"
                : target.getBackground()));
        return result;
    }

    @Override
    public List<UserInfoResponseDto> revert(List<User> targets) {
        return targets.stream()
                .map(this::revert)
                .toList();
    }
}
