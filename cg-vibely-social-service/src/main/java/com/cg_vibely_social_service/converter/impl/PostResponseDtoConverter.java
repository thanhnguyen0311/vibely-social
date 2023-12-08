package com.cg_vibely_social_service.converter.impl;
import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.Feed.FeedItem;
import com.cg_vibely_social_service.entity.Post;
import com.cg_vibely_social_service.payload.response.PostResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PostResponseDtoConverter implements Converter<PostResponseDto, FeedItem> {

    @Override
    public FeedItem convert(PostResponseDto source) {
        FeedItem feedItem = new FeedItem();
        BeanUtils.copyProperties(source, feedItem);
        return feedItem;
    }

    @Override
    public PostResponseDto revert(FeedItem target) {
        PostResponseDto postResponseDto = new PostResponseDto();
        BeanUtils.copyProperties(target, postResponseDto);
        return postResponseDto;
    }

    @Override
    public List<FeedItem> convert(List<PostResponseDto> sources) {
        return null;
    }

    @Override
    public List<PostResponseDto> revert(List<FeedItem> targets) {
        return targets.stream()
                .map(this::revert)
                .collect(Collectors.toList());
    }
}
