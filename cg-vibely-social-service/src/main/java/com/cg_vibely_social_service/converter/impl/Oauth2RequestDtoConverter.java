package com.cg_vibely_social_service.converter.impl;

import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.Role;
import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.payload.request.Oauth2RequestDto;
import com.cg_vibely_social_service.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class Oauth2RequestDtoConverter implements Converter<Oauth2RequestDto, User> {
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;

    @Override
    public User convert(Oauth2RequestDto source) {
        Role role = roleService.findById(1L);

        Set<Role> roleSet = new HashSet<>();
        roleSet.add(role);

        return User.builder()
                .firstName(source.getFamily_name())
                .lastName(source.getGiven_name())
                .email(source.getEmail())
                .googleAvatar(source.getPicture())
                .password(passwordEncoder.encode(source.getPassword()))
                .createdAt(LocalDateTime.now())
                .roles(roleSet)
                .build();
    }

    @Override
    public Oauth2RequestDto revert(User target) {
        return null;
    }

    @Override
    public List<User> convert(List<Oauth2RequestDto> sources) {
        return null;
    }

    @Override
    public List<Oauth2RequestDto> revert(List<User> targets) {
        return null;
    }
}
