package com.cg_vibely_social_service.payload.request;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;

@Getter
@Data
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReplyRequestDto {
    private Long commentId;
    private Long replyId;
    private String content;

    public ReplyRequestDto convert(String payload) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(payload,ReplyRequestDto.class);
    }
}
