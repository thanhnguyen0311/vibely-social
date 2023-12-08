package com.cg_vibely_social_service.converter.impl;

import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.payload.response.UserSuggestionResponseDto;
import com.cg_vibely_social_service.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserSuggestionDtoConverter implements Converter<UserSuggestionResponseDto, User> {
    private final ImageService imageService;
    @Override
    public User convert(UserSuggestionResponseDto source) {
        return null;
    }

    @Override
    public UserSuggestionResponseDto revert(User target) {
        return UserSuggestionResponseDto.builder()
                .id(target.getId())
                .lastName(target.getLastName())
                .firstName(target.getFirstName())
                .avatar(imageService.getImageUrl(target.getAvatar()))
                .build();
    }

    @Override
    public List<User> convert(List<UserSuggestionResponseDto> sources) {
        return null;
    }

    @Override
    public List<UserSuggestionResponseDto> revert(List<User> targets) {
        return targets.stream()
                .map(this::revert)
                .collect(Collectors.toList());
    }
}
