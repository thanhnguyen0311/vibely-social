package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.converter.ICommentMapper;
import com.cg_vibely_social_service.converter.IUserMapper;
import com.cg_vibely_social_service.entity.Feed.Comment;
import com.cg_vibely_social_service.entity.Feed.Feed;
import com.cg_vibely_social_service.entity.Feed.FeedItem;
import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.payload.request.CommentRequestDto;
import com.cg_vibely_social_service.payload.request.ReplyRequestDto;
import com.cg_vibely_social_service.payload.response.CommentResponseDto;
import com.cg_vibely_social_service.payload.response.UserResponseDto;
import com.cg_vibely_social_service.repository.PostRepository;
import com.cg_vibely_social_service.service.CommentService;
import com.cg_vibely_social_service.service.FriendService;
import com.cg_vibely_social_service.service.ImageService;
import com.cg_vibely_social_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.NotAcceptableStatusException;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final PostRepository postRepository;
    private final UserService userService;
    private final ImageService imageService;
    private final FriendService friendService;
    @Override
    public CommentResponseDto newComment(Long postId, String content, MultipartFile source) throws IOException {
            Feed feed = postRepository.findById(postId).orElseThrow();
            UserImpl user = userService.getCurrentUser();
            String fileName = null;
                FeedItem feedItem = feed.getFeedItem();
            Comment comment = Comment.builder()
                    .date(LocalDateTime.now().toString())
                    .content(content)
                    .userId(user.getId())
                    .replyComments(new ArrayList<>())
                    .likes(new HashSet<>())
                    .build();
            if(source != null)  {
                fileName = imageService.save(source);
                comment.setGallery(fileName);
                fileName = imageService.getImageUrl(fileName);
            }
            FeedItem newFeedItem = this.saveComment(feedItem,comment);
            feed.setFeedItem(newFeedItem);

            postRepository.save(feed);
            CommentResponseDto commentResponseDto =
                         ICommentMapper.INSTANCE.commentResponseDto(comment, user.getId());
            User user1 = userService.findById(user.getId());
            commentResponseDto.setGallery(fileName);
            UserResponseDto userResponseDto = IUserMapper.INSTANCE.userResponseDTOConvert(user1);
            commentResponseDto.setAuthor(userResponseDto);
            return commentResponseDto;
    }

    @Override
    public List<CommentResponseDto> getComments(Long postId) {
        Feed feed = postRepository.findById(postId).orElseThrow();
        FeedItem feedItem = feed.getFeedItem();
        UserImpl user1 = userService.getCurrentUser();
        List <CommentResponseDto> commentResponseDTOs = new ArrayList<>();
        if(Objects.nonNull(feedItem.getComments())) {
            for(Comment comment : feedItem.getComments()) {
                List<CommentResponseDto> replyComments = new ArrayList<>();
                if(Objects.nonNull(comment.getReplyComments())) {
                    for (Comment reply : comment.getReplyComments()){
                        CommentResponseDto replyDto =
                                ICommentMapper.INSTANCE.commentResponseDto(reply, user1.getId());
                        User user = userService.findById(reply.getUserId());
                        UserResponseDto userResponseDto =
                                IUserMapper.INSTANCE.userResponseDTOConvert(user);
                        if(Objects.nonNull(replyDto.getGallery())){
                            replyDto.setGallery(imageService.getImageUrl(replyDto.getGallery()));
                        }
                        replyDto.setAuthor(userResponseDto);
                        replyComments.add(replyDto);
                    }
                }
                CommentResponseDto commentResponseDto =
                        ICommentMapper.INSTANCE.commentResponseDto(comment,user1.getId());
                User user = userService.findById(comment.getUserId());
                UserResponseDto userResponseDto =
                        IUserMapper.INSTANCE.userResponseDTOConvert(user);
                commentResponseDto.setAuthor(userResponseDto);
                commentResponseDto.setReplyCommentDTOs(replyComments);
                if(Objects.nonNull(commentResponseDto.getGallery())){
                    commentResponseDto.setGallery(imageService.getImageUrl(commentResponseDto.getGallery()));
                }
                commentResponseDTOs.add(commentResponseDto);
            }
            return commentResponseDTOs;
        }
        return null;
    }

    @Override
    public CommentResponseDto replyComment(Long postId, Long commentId, String content, MultipartFile source) throws IOException {
        Feed feed = postRepository.findById(postId).orElseThrow();
        FeedItem feedItem = feed.getFeedItem();
        UserImpl user = userService.getCurrentUser();
        String fileName = null;
        Comment comment = Comment.builder()
                        .date(LocalDateTime.now().toString())
                        .content(content)
                        .userId(user.getId())
                        .likes(new HashSet<>())
                        .build();

        if(source != null)  {
            fileName = imageService.save(source);
            comment.setGallery(fileName);
            fileName = imageService.getImageUrl(fileName);
        }
        List<Comment> reply;
        Comment cmt =  Objects.requireNonNull(feedItem.getComments())
                            .stream()
                            .filter(com -> Objects.equals(com.getCommentId(), commentId))
                            .findFirst().orElseThrow();
        if(Objects.nonNull(cmt.getReplyComments())) {
            reply = cmt.getReplyComments();
            comment.setCommentId((long) (reply.size() + 1));
        }
        else{
            comment.setCommentId(1L);
            reply = new ArrayList<>();
        }
        reply.add(comment);
        cmt.setReplyComments(reply);
        feed.setFeedItem(feedItem);
        postRepository.save(feed);
        CommentResponseDto commentResponseDto =
                    ICommentMapper.INSTANCE.commentResponseDto(comment, user.getId());
        User user1 = userService.findById(user.getId());
        UserResponseDto userResponseDto = IUserMapper.INSTANCE.userResponseDTOConvert(user1);
        commentResponseDto.setAuthor(userResponseDto);
        commentResponseDto.setGallery(fileName);
        return commentResponseDto;
    }

    @Override
    public CommentResponseDto getTopComment(FeedItem feedItem) {
        Comment topComment;
        UserImpl user = userService.getCurrentUser();
        List <Long> friends = friendService.findAllFriends(user.getId());

        if(feedItem.getComments() != null){
            List<Comment> comments = feedItem.getComments();
            if(!friends.isEmpty()) {
                comments.sort((comment1, comment2) ->
                        Math.toIntExact(comment2.getCommentId() - comment1.getCommentId()));
                for(Comment comment : comments){
                    if(friends.contains(comment.getCommentId())){
                        return ICommentMapper.INSTANCE.commentResponseDto(comment, user.getId());
                    }
                }
            }
            topComment = comments.stream()
                    .max(Comparator.comparing(comment -> {
                        if (comment.getLikes() != null) {
                            return comment.getLikes().size();
                        }else {
                            return 0;
                        }
                    }))
                    .orElse(null);
            if(Objects.nonNull(topComment)){
                return ICommentMapper.INSTANCE.commentResponseDto(topComment, user.getId());
            }
        }
        return null;
    }

    @Override
    public FeedItem saveComment(FeedItem feedItem, Comment commentRequest) {
        List<Comment> commentList = feedItem.getComments();
        if(commentRequest.getCommentId() != null){
            Comment oldComment = commentList.stream()
                    .filter(comment -> Objects.equals(comment.getCommentId(), commentRequest.getCommentId()))
                    .findFirst()
                    .orElse(null);
            if(oldComment != null){
                UserImpl user = userService.getCurrentUser();
                if(!Objects.equals(oldComment.getUserId(), user.getId())){
                    throw new NotAcceptableStatusException("Invalid request");
                }
                if(Objects.nonNull(commentRequest.getGallery())){
                    oldComment.setGallery(commentRequest.getGallery());
                }
                oldComment.setContent(commentRequest.getContent());
                commentList.set(commentList.indexOf(oldComment), oldComment);
            }
            feedItem.setComments(commentList);
            return feedItem;
        }
        commentRequest.setCommentId(feedItem.getComments() != null ? commentList.size() + 1 : 1L);
        if(!Objects.nonNull(commentList)){
            commentList = new ArrayList<>();
        }
        commentList.add(commentRequest);
        feedItem.setComments(commentList);
        return feedItem;
    }

    @Override
    public CommentResponseDto editComment(Long postId,CommentRequestDto commentRequestDto,MultipartFile file) throws IOException {
        Feed feed = postRepository.findById(postId).orElseThrow();
        UserImpl user = userService.getCurrentUser();
        String source = null;

        FeedItem feedItem = feed.getFeedItem();
        Comment comment = Comment.builder()
                            .userId(user.getId())
                            .commentId(commentRequestDto.getCommentId())
                            .content(commentRequestDto.getContent())
                            .build();
        if(file != null) {
            source = imageService.save(file);
            comment.setGallery(source);
            source = imageService.getImageUrl(source);
        }
        FeedItem newFeedItem = this.saveComment(feedItem,comment);
        feed.setFeedItem(newFeedItem);
        postRepository.save(feed);
        return CommentResponseDto.builder()
                .content(commentRequestDto.getContent())
                .gallery(source)
                .build();
    }

    @Override
    public void deleteComment(Long postId, Long commentId) {
        Feed feed = postRepository.findById(postId).orElseThrow();
        FeedItem feedItem = feed.getFeedItem();
        UserImpl user = userService.getCurrentUser();
        Comment cmt =  Objects.requireNonNull(feedItem.getComments())
                .stream()
                .filter(com -> Objects.equals(com.getCommentId(), commentId))
                .findFirst().orElseThrow();
        if(!Objects.equals(cmt.getUserId(), user.getId())){
            throw new NotAcceptableStatusException("Invalid request");
        }
        feedItem.getComments().remove(cmt);
        feed.setFeedItem(feedItem);
        postRepository.save(feed);
    }

    @Override
    public CommentResponseDto editReply(Long postId, ReplyRequestDto replyRequest, MultipartFile file) throws IOException {
        Feed feed = postRepository.findById(postId).orElseThrow();
        FeedItem feedItem = feed.getFeedItem();
        UserImpl user = userService.getCurrentUser();
        String source;
        Comment comment = Objects.requireNonNull(feedItem.getComments()).stream()
                .filter(cmt -> Objects.equals(cmt.getCommentId(), replyRequest.getCommentId()))
                .findFirst()
                .orElseThrow();
        Comment reply = Objects.requireNonNull(comment.getReplyComments()).stream()
                .filter(rpl -> Objects.equals(rpl.getCommentId(), replyRequest.getReplyId()))
                .findFirst()
                .orElseThrow();
        if(!Objects.equals(reply.getUserId(),user.getId())){
            throw new NotAcceptableStatusException("Invalid request");
        }
        if(file != null) {
            source = imageService.save(file);
            reply.setGallery(source);
            source = imageService.getImageUrl(source);
        }
        else{
            source = reply.getGallery();
        }
        reply.setContent(replyRequest.getContent());
        feed.setFeedItem(feedItem);
        postRepository.save(feed);
        return CommentResponseDto.builder()
                .content(replyRequest.getContent())
                .gallery(source)
                .build();
    }

    @Override
    public void deleteReply(Long postId, Long commentId, Long replyId) {
        Feed feed = postRepository.findById(postId).orElseThrow();
        FeedItem feedItem = feed.getFeedItem();
        UserImpl user = userService.getCurrentUser();
        Comment cmt =  Objects.requireNonNull(feedItem.getComments())
                .stream()
                .filter(com -> Objects.equals(com.getCommentId(), commentId))
                .findFirst().orElseThrow();
        Comment reply = Objects.requireNonNull(cmt.getReplyComments()).stream()
                .filter(rpl -> Objects.equals(rpl.getCommentId(), replyId))
                .findFirst()
                .orElseThrow();
        if(!Objects.equals(reply.getUserId(), user.getId())){
            throw new NotAcceptableStatusException("Invalid request");
        }
        cmt.getReplyComments().remove(reply);
        feed.setFeedItem(feedItem);
        postRepository.save(feed);
    }
}
