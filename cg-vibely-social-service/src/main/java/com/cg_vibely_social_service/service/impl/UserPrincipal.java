package com.cg_vibely_social_service.service.impl;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.security.Principal;
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPrincipal implements Principal {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;

    public UserPrincipal(String email) {
        this.email = email;
    }
    @Override
    public String getName() {
        return email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
