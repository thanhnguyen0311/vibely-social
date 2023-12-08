package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.Media;
import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.payload.response.MediaResponseDto;
import com.cg_vibely_social_service.repository.MediaRepository;
import com.cg_vibely_social_service.repository.UserRepository;
import com.cg_vibely_social_service.service.MediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MediaServiceImpl implements MediaService {
    private final MediaRepository mediaRepository;
    private final UserRepository userRepository;
    private final Converter<MediaResponseDto, Media> converter;

    @Override
    public List<MediaResponseDto> getMediaForUser(Long id) {
        User user = (userRepository.findById(id)).get();
        List<Media> media = mediaRepository.findByUser(user);
        return converter.revert(media);
    }
}
