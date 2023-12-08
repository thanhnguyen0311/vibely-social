package com.cg_vibely_social_service.controller;

import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.payload.request.PostRequestDto;
import com.cg_vibely_social_service.payload.response.LikeResponseDto;
import com.cg_vibely_social_service.payload.response.PostResponseDto;
import com.cg_vibely_social_service.repository.PostRepository;
import com.cg_vibely_social_service.service.CommentService;
import com.cg_vibely_social_service.service.ImageService;
import com.cg_vibely_social_service.service.LikeService;
import com.cg_vibely_social_service.service.NotificationService;
import com.cg_vibely_social_service.service.PostService;

import com.fasterxml.jackson.databind.JsonMappingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final HttpServletRequest request;
    private final ImageService imageService;
    private final LikeService likeService;

    @PostMapping
    public ResponseEntity<?> submitPost(@RequestParam(value = "files",required = false) List<MultipartFile> files,
                                        @RequestParam(value = "newPostDTO") String newPostDTO){

        try {
            PostResponseDto postResponseDto ;
            if(files != null) {
                if(newPostDTO == null) return new ResponseEntity<>("Can't create empty post", HttpStatus.NOT_ACCEPTABLE);
                List<String> fileNames = imageService.save(files);
                postResponseDto = postService.newPost(newPostDTO, fileNames);
            }
            else{
                postResponseDto = postService.newPost(newPostDTO);
            }
            return new ResponseEntity<>(postResponseDto,HttpStatus.CREATED);
        }
        catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(),HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @GetMapping
    public ResponseEntity<?> showPosts(){
        List<PostResponseDto> feedItemResponseDTOs = postService.getNewestPost(0);
        Collections.shuffle(feedItemResponseDTOs,new Random());
        return new ResponseEntity<>(feedItemResponseDTOs, HttpStatus.OK);
}
    @GetMapping("/like/{postId}")
    public ResponseEntity<?> likePost(@PathVariable Long postId){
        try{
            LikeResponseDto likeResponseDto = likeService.likePost(postId);
            return new ResponseEntity<>(likeResponseDto, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deleteParticularPost(@PathVariable("postId") Long postId){
    postService.deleteById(postId);
    return new ResponseEntity<>(HttpStatus.OK);
}

    @GetMapping("/{postId}")
    public ResponseEntity<?> getPost(@PathVariable("postId") Long postId){
        PostResponseDto postResponseDto = postService.findById(postId);
        return new ResponseEntity<>(postResponseDto,HttpStatus.OK);
    }

    @GetMapping("/user/{authorId}")
    public ResponseEntity<?> getPostsByUser(@PathVariable("authorId") Long authorId){
        List<PostResponseDto> postResponseDto = postService.findByAuthorId(authorId);
        return new ResponseEntity<>(postResponseDto,HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateParticularPost(@Valid @RequestBody PostRequestDto postRequestDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            try {
                User user = (User) request.getSession().getAttribute("currentUser");
                postRequestDto.setAuthorId(user.getId());
                postService.update(postRequestDto);
                return new ResponseEntity<>("success", HttpStatus.CREATED);
            } catch (Exception exception) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}

