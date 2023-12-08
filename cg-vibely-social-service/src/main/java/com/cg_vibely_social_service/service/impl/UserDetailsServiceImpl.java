package com.cg_vibely_social_service.service.impl;


import com.cg_vibely_social_service.entity.Role;
import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new UsernameNotFoundException("User " + email + "was not found in database!");
        }

        Set<Role> roles = user.getRoles();
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        if (roles == null) roles =  new HashSet<>();
        for (Role role: roles) {
            GrantedAuthority authority = new SimpleGrantedAuthority(role.toString());
            grantedAuthorities.add(authority);
        }

        return new UserImpl(user.getId(), user.getEmail(), user.getPassword(), user.getFirstName(), grantedAuthorities);
    }
}
