package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.entity.Role;
import com.cg_vibely_social_service.repository.RoleRepository;
import com.cg_vibely_social_service.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public Role findById(Long id) {
        return roleRepository.findById(id).get();
    }
}
