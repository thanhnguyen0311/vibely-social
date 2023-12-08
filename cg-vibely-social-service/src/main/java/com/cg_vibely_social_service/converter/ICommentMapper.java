package com.cg_vibely_social_service.converter;

import com.cg_vibely_social_service.entity.Feed.Comment;
import com.cg_vibely_social_service.payload.response.CommentResponseDto;
import com.cg_vibely_social_service.service.ImageService;
import com.cg_vibely_social_service.service.impl.ImageServiceImpl;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Objects;

@Mapper
public interface ICommentMapper{

    ICommentMapper INSTANCE = Mappers.getMapper(ICommentMapper.class);

    @Mapping(target = "commentId", source="source.commentId")
    @Mapping(target = "content", source="source.content")
    @Mapping(target = "author.id", source="source.userId")
    @Mapping(target = "gallery", source="source.gallery")
    @Mapping(target = "date", source="source.date")
    @Mapping(target = "likeCount", expression = "java(countLikes(source))")
    @Mapping(target = "isLiked", expression = "java(checkLiked(source,userId))")
    CommentResponseDto commentResponseDto(Comment source, Long userId);

    default Long countLikes(Comment source) {
        if(Objects.nonNull(source.getLikes())){
            return (long) source.getLikes().size();
        }
        return 0L;
    }

    default boolean checkLiked(Comment source,Long userId) {
        boolean isLiked = false;
        if(Objects.nonNull(source.getLikes())){
            isLiked = source.getLikes().stream()
                    .anyMatch(id -> Objects.equals(id, userId));
        }
        return isLiked;
    }
}
