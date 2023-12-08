package com.cg_vibely_social_service.controller;

import com.cg_vibely_social_service.payload.response.MediaResponseDto;
import com.cg_vibely_social_service.service.MediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
public class MediaController {
    private final MediaService mediaService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getMedia(@PathVariable("id") Long id) {
        List<MediaResponseDto> mediaList = mediaService.getMediaForUser(id);
        if (mediaList != null) {
            return new ResponseEntity<>(mediaList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
