package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.entity.Feed.Comment;
import com.cg_vibely_social_service.entity.Feed.Feed;
import com.cg_vibely_social_service.entity.Feed.FeedItem;
import com.cg_vibely_social_service.payload.response.LikeResponseDto;
import com.cg_vibely_social_service.repository.PostRepository;
import com.cg_vibely_social_service.service.LikeService;
import com.cg_vibely_social_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final PostRepository postRepository;
    private final UserService userService;
    @Override
    public LikeResponseDto likePost(Long postId){
        Feed feed = postRepository.findById(postId).orElseThrow();
        UserImpl user = userService.getCurrentUser();
        FeedItem feedItem = feed.getFeedItem();
        LikeResponseDto likeResponseDto = new LikeResponseDto();
        Set<Long> likes = likeRequest(feedItem.getLikes(),user.getId());
        likeResponseDto.setLikeCount((long) likes.size());
        likeResponseDto.setIsLiked(likes.contains(user.getId()));
        feedItem.setLikes(likes);
        feed.setFeedItem(feedItem);
        postRepository.save(feed);
        return likeResponseDto;
    }

    @Override
    public LikeResponseDto likeComment(Long commentId,Long postId) {
        Feed feed = postRepository.findById(postId).orElseThrow();
        FeedItem feedItem = feed.getFeedItem();
        UserImpl user = userService.getCurrentUser();

        LikeResponseDto likeResponseDto = new LikeResponseDto();
        Comment comment = Objects.requireNonNull(feedItem.getComments())
                .stream()
                .filter(cmt -> Objects.equals(cmt.getCommentId(), commentId))
                .findFirst()
                .orElseThrow();
        Set<Long> likes = likeRequest(comment.getLikes(), user.getId());
        likeResponseDto.setLikeCount((long) likes.size());
        likeResponseDto.setIsLiked( likes.contains(user.getId()));
        comment.setLikes(likes);
        feed.setFeedItem(feedItem);
        postRepository.save(feed);
        return likeResponseDto;
    }

    @Override
    public LikeResponseDto likeReply(Long replyId, Long commentId, Long postId) {
        Feed feed = postRepository.findById(postId).orElseThrow();
        FeedItem feedItem = feed.getFeedItem();
        UserImpl user = userService.getCurrentUser();
        LikeResponseDto likeResponseDto = new LikeResponseDto();
        Comment comment = Objects.requireNonNull(feedItem.getComments())
                .stream()
                .filter(cmt -> Objects.equals(cmt.getCommentId(), commentId))
                .findFirst()
                .orElseThrow();
        Comment reply =
                Objects.requireNonNull(comment).getReplyComments()
                        .stream()
                        .filter(rep -> Objects.equals(rep.getCommentId(), replyId))
                        .findFirst().orElseThrow();
        Set<Long> likes = likeRequest(reply.getLikes(),user.getId());
        reply.setLikes(likes);
        likeResponseDto.setLikeCount((long) likes.size());
        likeResponseDto.setIsLiked(likes.contains(user.getId()));
        feed.setFeedItem(feedItem);
        postRepository.save(feed);
        return likeResponseDto;
    }

    @Override
    public Set<Long> likeRequest(Set<Long> source, Long userId) {
        if(Objects.nonNull(source)) {
            if(source.contains(userId)){
                source.remove(userId);
            }
            else{
                source.add(userId);
            }
        }
        else{
            source = new HashSet<>();
            source.add(userId);
        }
        return source;
    }
}
