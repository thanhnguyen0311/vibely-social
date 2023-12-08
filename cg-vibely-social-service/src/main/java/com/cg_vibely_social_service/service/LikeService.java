package com.cg_vibely_social_service.service;

import com.cg_vibely_social_service.payload.response.LikeResponseDto;

import java.util.List;
import java.util.Set;

public interface LikeService {
    LikeResponseDto likePost(Long postId);
    LikeResponseDto likeReply(Long replyId, Long commentId ,Long postId);
    LikeResponseDto likeComment(Long commentId,Long postId);
    Set<Long> likeRequest(Set<Long> source , Long userId);
}
