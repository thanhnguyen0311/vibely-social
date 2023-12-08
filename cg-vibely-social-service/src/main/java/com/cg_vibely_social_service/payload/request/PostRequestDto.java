package com.cg_vibely_social_service.payload.request;


import com.cg_vibely_social_service.utils.Privacy;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostRequestDto {

    private Long authorId;
    private String content;
    private Privacy privacy;
    private Set<Long> tags;
}
