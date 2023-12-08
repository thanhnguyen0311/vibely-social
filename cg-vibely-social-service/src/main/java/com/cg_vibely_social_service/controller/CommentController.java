package com.cg_vibely_social_service.controller;

import com.cg_vibely_social_service.payload.request.CommentRequestDto;
import com.cg_vibely_social_service.payload.request.ReplyRequestDto;
import com.cg_vibely_social_service.payload.response.CommentResponseDto;
import com.cg_vibely_social_service.payload.response.LikeResponseDto;
import com.cg_vibely_social_service.service.CommentService;
import com.cg_vibely_social_service.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    private final LikeService likeService;
    @PostMapping("/{postId}/comment")
    public ResponseEntity<?> newComment(@PathVariable("postId") Long postId,
                                        @RequestParam(value = "file",required = false) MultipartFile file ,
                                        String newComment) {
        try {
            CommentResponseDto commentResponseDto = commentService.newComment(postId,newComment,file);
            return new ResponseEntity<>(commentResponseDto,HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PutMapping("/{postId}/comment")
    public ResponseEntity<?> editComment(@PathVariable("postId") Long postId,
                                        @RequestParam(value = "file",required = false) MultipartFile file ,
                                         @RequestParam(value = "payload") String payload) {
        try {
            CommentRequestDto commentRequestDto = new CommentRequestDto().convert(payload);
            CommentResponseDto commentResponseDto = commentService.editComment(postId,commentRequestDto,file);
            return new ResponseEntity<>(commentResponseDto,HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @DeleteMapping("/{postId}/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable("postId") Long postId,
                                           @PathVariable("commentId") Long commentId) {
        try {
            commentService.deleteComment(postId,commentId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }


    @PostMapping("/{postId}/reply/{commentId}")
    public ResponseEntity<?> newReply(@PathVariable("postId") Long postId,
                                        @PathVariable("commentId") Long commentId,
                                        @RequestParam(value = "file",required = false) MultipartFile file ,
                                        String reply) {
        try {
            CommentResponseDto commentResponseDto = commentService.replyComment(postId,commentId,reply,file);
            return new ResponseEntity<>(commentResponseDto,HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }
    @PutMapping("/{postId}/reply")
    public ResponseEntity<?> editReply(@PathVariable("postId") Long postId,
                                       @RequestParam(value = "file",required = false) MultipartFile file,
                                       String payload) {
        try {
            ReplyRequestDto replyRequestDto = new ReplyRequestDto().convert(payload);
            CommentResponseDto commentResponseDto = commentService.editReply(postId,replyRequestDto,file);
            return new ResponseEntity<>(commentResponseDto,HttpStatus.ACCEPTED);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @GetMapping("/{postId}/comments/{sortBy}")
    public ResponseEntity<?> getComment(@PathVariable("postId") Long postId,
                                        @PathVariable(value = "sortBy", required = false) String sortBy) {
        try {
            List<CommentResponseDto> commentResponseDTOs = commentService.getComments(postId);
            return new ResponseEntity<>(commentResponseDTOs,HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @GetMapping("/{postId}/like/{commentId}")
    public ResponseEntity<?> likeComment(@PathVariable("postId") Long postId,
                                         @PathVariable("commentId") Long commentId) {
        try {
            LikeResponseDto likeResponseDto = likeService.likeComment(postId,commentId);
            return new ResponseEntity<>(likeResponseDto,HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }
    @GetMapping("/{postId}/like/{commentId}/{replyId}")
    public ResponseEntity<?> likeReply(@PathVariable("postId") Long postId,
                                       @PathVariable("commentId") Long commentId,
                                       @PathVariable("replyId") Long replyId) {
        try {
            LikeResponseDto likeResponseDto = likeService.likeReply(replyId,commentId,postId);
            return new ResponseEntity<>(likeResponseDto,HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @DeleteMapping("/{postId}/comment/{commentId}/{replyId}")
    public ResponseEntity<?> deleteReply(@PathVariable("postId") Long postId,
                                           @PathVariable("commentId") Long commentId,
                                         @PathVariable("replyId") Long replyId) {
        try {
            commentService.deleteReply(postId,commentId,replyId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
