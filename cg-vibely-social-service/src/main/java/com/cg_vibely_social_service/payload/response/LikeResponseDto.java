package com.cg_vibely_social_service.payload.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class LikeResponseDto {
    private Long likeCount;
    private Boolean isLiked;
}
