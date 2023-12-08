package com.cg_vibely_social_service.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserInfoResponseDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDate birthday;
    private String gender;
    private String phoneNumber;
    private String city;
    private String district;
    private String school;
    private String company;
    private String position;
    private String bio;
    private String hobbies;
    private String avatarUrl;
    private String background;
}
