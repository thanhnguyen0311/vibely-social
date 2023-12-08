package com.cg_vibely_social_service.payload.request;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Data
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CommentRequestDto {
    private Long authorId;
    private Long commentId;
    private String content;

    public CommentRequestDto convert(String payload) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(payload,CommentRequestDto.class);
    }
}
