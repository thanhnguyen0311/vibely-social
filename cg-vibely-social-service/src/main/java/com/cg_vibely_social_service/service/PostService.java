package com.cg_vibely_social_service.service;

import com.cg_vibely_social_service.payload.request.PostRequestDto;
import com.cg_vibely_social_service.payload.response.PostResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface PostService {
    List<PostResponseDto> findByAuthorId(Long authorId);
    PostResponseDto findById(Long id);

    void save(PostRequestDto postRequestDto);

    void deleteById(Long postId);
    PostResponseDto update(PostRequestDto postRequestDto);

    PostResponseDto newPost(String source, List<String> files) throws JsonProcessingException;

    PostResponseDto newPost(String source) throws JsonProcessingException;

    List<PostResponseDto> getNewestPost(int page);

}
