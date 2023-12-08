package com.cg_vibely_social_service.converter.impl;

import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.payload.response.UserResponseDto;
import com.cg_vibely_social_service.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserResponseDtoConverter implements Converter<UserResponseDto, User> {
    private final ImageService imageService;

    @Override
    public User convert(UserResponseDto source) {
        return null;
    }

    @Override
    public UserResponseDto revert(User target) {
        UserResponseDto userResponseDto = UserResponseDto.builder()
                .id(target.getId())
                .firstName(target.getFirstName())
                .lastName(target.getLastName())
                .build();
        if (target.getAvatar() == null && target.getGoogleAvatar() != null) {
            userResponseDto.setAvatar(target.getGoogleAvatar());
        } else {
            userResponseDto.setAvatar(imageService.getImageUrl(target.getAvatar()));
        }
        return userResponseDto;
    }

    @Override
    public List<User> convert(List<UserResponseDto> sources) {
        return null;
    }

    @Override
    public List<UserResponseDto> revert(List<User> targets) {
        return null;
    }
}
