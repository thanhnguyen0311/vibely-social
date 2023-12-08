package com.cg_vibely_social_service.service;

//Currently only use for testing media for front-end

import com.cg_vibely_social_service.payload.response.MediaResponseDto;

import java.util.List;

public interface MediaService {
    List<MediaResponseDto> getMediaForUser(Long id);
}
