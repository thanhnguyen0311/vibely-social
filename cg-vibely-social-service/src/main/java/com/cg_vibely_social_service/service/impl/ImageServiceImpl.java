package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.service.ImageService;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    Properties properties;

    @EventListener
    public void init(ApplicationReadyEvent event) {
        try {
            ClassPathResource serviceAccount = new ClassPathResource("vibely-social-firebase-adminsdk-bac20-0771bacfe3.json");
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream()))
                    .setStorageBucket(properties.bucketName)
                    .build();
            FirebaseApp.initializeApp(options);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public String getImageUrl(String filename) {
        return String.format(properties.imageUrl, filename);
    }

    @Override
    public List<String> getImageUrls(List<String> filenames) {
        return filenames.stream().map(this::getImageUrl).toList();
    }

    @Override //return filename
    public String save(MultipartFile file) {
        Bucket bucket = StorageClient.getInstance().bucket();
        String generatedFileName = generateFileName(file.getOriginalFilename());
        byte[] fileBytes;
        try {
            fileBytes = file.getBytes();
        } catch (IOException exception) {
            return null;
        }
        bucket.create(generatedFileName, fileBytes, file.getContentType());
        return generatedFileName;
    }

    @Override //return filename
    public List<String> save(List<MultipartFile> files) throws IOException {
        List<String> filenames = files.stream().map(this::save).toList();
        List<String> filteredFileName = filenames.stream().filter(Objects::nonNull).toList();
        if (filteredFileName.size() != files.size()) throw new IOException("Some files have failed to upload");
        return filenames;
    }

    @Override
    public String save(BufferedImage bufferedImage, String originalFileName) throws IOException {
        byte[] bytes = getByteArrays(bufferedImage, getExtension(originalFileName));
        Bucket bucket = StorageClient.getInstance().bucket();
        String generatedFileName = generateFileName(originalFileName);
        bucket.create(generatedFileName, bytes);
        return generatedFileName;
    }

    @Override
    public void delete(String name) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket();
        if (!StringUtils.hasText(name)) {
            throw new IOException("invalid file name");
        }
        Blob blob = bucket.get(name);
        if (blob == null) {
            throw new IOException("file not found");
        }
        blob.delete();
    }

    @Data
    @Configuration
    @ConfigurationProperties(prefix = "firebase")
    public static class Properties {
        private String bucketName;
        private String imageUrl;
    }
}
