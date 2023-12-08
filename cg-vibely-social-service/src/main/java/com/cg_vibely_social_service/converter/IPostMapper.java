package com.cg_vibely_social_service.converter;

import com.cg_vibely_social_service.entity.Feed.FeedItem;
import com.cg_vibely_social_service.payload.request.PostRequestDto;
import com.cg_vibely_social_service.payload.response.PostResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Objects;

@Mapper
public interface IPostMapper extends IUserMapper {
    IPostMapper INSTANCE = Mappers.getMapper(IPostMapper.class);

    @Mapping(target = "authorId", source="postRequestDto.authorId")
    @Mapping(target = "content", source="postRequestDto.content")
    @Mapping(target = "privacy", source="postRequestDto.privacy")
    @Mapping(target = "tags", source="postRequestDto.tags")
    FeedItem newPostConvert(PostRequestDto postRequestDto);



    @Mapping(target = "author.id", source="feedItem.authorId")
    @Mapping(target = "content", source="feedItem.content")
    @Mapping(target = "privacy", source="feedItem.privacy")
    @Mapping(target = "createdDate", source="feedItem.createdDate")
    @Mapping(target = "likeCount", expression="java(countLikes(feedItem))")
    @Mapping(target = "commentCount", expression="java(countComments(feedItem))")
    @Mapping(target = "isLiked", expression="java(isLiked(feedItem,userId))")
    PostResponseDto convertToDTO(FeedItem feedItem, Long userId);

    default boolean isLiked(FeedItem feedItem,Long userId) {
        if(Objects.nonNull(feedItem.getLikes())){
            return feedItem.getLikes().contains(userId);
        }
        return false;
    }
    default Long countLikes(FeedItem feedItem) {
        if(Objects.nonNull(feedItem.getLikes())){
            return (long) feedItem.getLikes().size();
        }
        return 0L;
    }
    default Long countComments(FeedItem feedItem) {
        if(Objects.nonNull(feedItem.getComments())){
            return (long) feedItem.getComments().size();
        }
        return 0L;
    }

}
