package com.cg_vibely_social_service.entity.Feed;


import com.cg_vibely_social_service.utils.Privacy;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Data
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedItem {

    private Long authorId;
    private String content;
    private Privacy privacy;
    private Set<Long> tags;
    private List<String> gallery;
    private String createdDate;
    private Set<Long> likes;
    private List<Comment> comments;
    private Set<Long> subscribers;
}
