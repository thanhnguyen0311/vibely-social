package com.cg_vibely_social_service.controller;

import com.cg_vibely_social_service.payload.request.TestUploadContent;
import com.cg_vibely_social_service.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class TestUploadController {
    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<?> upload(@RequestPart List<MultipartFile> files, TestUploadContent uploadContent) {
        System.out.println(uploadContent.getContent());
        try {
            List<String> fileNames = imageService.save(files);
            fileNames.forEach(System.out::println);
            return new ResponseEntity<>(imageService.getImageUrls(fileNames), HttpStatus.CREATED);
        } catch (Exception exception) {
            exception.printStackTrace();
            return new ResponseEntity<>(exception.getMessage(),HttpStatus.PAYMENT_REQUIRED);
        }
    }

    @DeleteMapping("/{fileName}")
    public ResponseEntity<?> delete(@PathVariable String fileName){
        try {
            imageService.delete(fileName);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception exception) {
            exception.printStackTrace();
            return new ResponseEntity<>(exception.getMessage(),HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
