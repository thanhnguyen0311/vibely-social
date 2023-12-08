package com.cg_vibely_social_service.payload.response;

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
public class FriendRequestResponse {
    private Long id;
    private Long friendId;
    private String firstName;
    private String lastName;
    private String avatarUrl;
}
