package com.cg_vibely_social_service.payload.redis;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CachedUserStatus {
    private HashMap<String, Boolean> friendsStatus;
}
