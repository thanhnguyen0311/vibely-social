package com.cg_vibely_social_service.payload.response;

import com.cg_vibely_social_service.utils.Privacy;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponseDto {

    private Long id;
    private UserResponseDto author;
    private String content;
    private Privacy privacy;
    private Set<UserResponseDto> usersTag;
    private List<String> gallery;
    private String createdDate;
    private Long likeCount;
    private Long commentCount;
    private boolean isLiked;
    private Set<Long> subscribers;
    private CommentResponseDto topComment;
}
