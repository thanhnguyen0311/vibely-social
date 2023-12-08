package com.cg_vibely_social_service.payload.log;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class LogData {
    private String content;
    public LogData(String message, String level, long timestamp) {
        content = String.format("%s **%s** %s", new Date(timestamp), level, message);
    }
}
