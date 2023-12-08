package com.cg_vibely_social_service.payload.response;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataMailDto {
    private String to;
    private String subject;
    private String content;
    private Map<String, Object> props;
}
