package com.cg_vibely_social_service.entity.Feed;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Data
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Comment {

    private Long commentId;
    private Long userId;
    private String content;
    private String gallery;
    private String date;
    private Set<Long> likes;
    private List<Comment> replyComments;
}
