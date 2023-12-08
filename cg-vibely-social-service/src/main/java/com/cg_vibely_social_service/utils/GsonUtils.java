package com.cg_vibely_social_service.utils;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class GsonUtils<DTO> {
    private final Gson gson;

    public String parseToString(DTO object) {
        return gson.toJson(object);
    }

    public DTO parseToObject(String string, Class<DTO> dtoClass) {
        return gson.fromJson(string, dtoClass);
    }

}
