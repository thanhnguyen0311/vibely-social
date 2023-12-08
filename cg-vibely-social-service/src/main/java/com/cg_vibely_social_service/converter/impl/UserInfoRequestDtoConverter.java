package com.cg_vibely_social_service.converter.impl;

import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.payload.request.UserInfoRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserInfoRequestDtoConverter implements Converter<UserInfoRequestDto, User> {


    @Override
    public User convert(UserInfoRequestDto source) {
        User result = new User();
        BeanUtils.copyProperties(source, result);
        result.setDayOfBirth(source.getBirthday());
        return result;
    }

    @Override
    public List<User> convert(List<UserInfoRequestDto> sources) {
        return null;
    }

    @Override
    public UserInfoRequestDto revert(User target) {
        return null;
    }

    @Override
    public List<UserInfoRequestDto> revert(List<User> targets) {
        return null;
    }
}
