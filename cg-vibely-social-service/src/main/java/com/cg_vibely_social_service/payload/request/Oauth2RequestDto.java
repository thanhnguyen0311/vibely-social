package com.cg_vibely_social_service.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Oauth2RequestDto {
    private String email;
    private String given_name;
    private String family_name;
    private String picture;

    private final String password = "oauth2!!@@##$$^^&&**(())__++DefaultPassword";
}
