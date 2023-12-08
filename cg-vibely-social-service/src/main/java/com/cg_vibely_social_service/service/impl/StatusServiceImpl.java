package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.logging.AppLogger;
import com.cg_vibely_social_service.payload.redis.CachedUserStatus;
import com.cg_vibely_social_service.service.StatusService;
import com.cg_vibely_social_service.utils.GsonUtils;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatusServiceImpl implements StatusService {
    private final GsonUtils<CachedUserStatus> gsonUtils;
    private final ValueOperations<String, String> cachedData;
    private final RedisTemplate<String, String> redisTemplate;
    private static final String STATUS_LIST = "statusList";
    private static final Logger LOGGER = AppLogger.LOGGER;

    @Override
    public HashMap<String, Boolean> getStatus(List<String> emails) {
        try {
            if (Boolean.TRUE.equals(redisTemplate.hasKey(STATUS_LIST))){
                CachedUserStatus statusResponse = gsonUtils.parseToObject(cachedData.get(STATUS_LIST), CachedUserStatus.class);
                HashMap<String, Boolean> statusList = new HashMap<>();
                emails.forEach(email -> statusList.put(email, statusResponse.getFriendsStatus().get(email)));
                return statusList;
            }else {
                return new HashMap<>();
            }
        }catch (Exception e){
            LOGGER.error(e);
            return new HashMap<>();
        }
    }

    @Override
    public void activate(String email) {
        try {
            if (Boolean.TRUE.equals(redisTemplate.hasKey(STATUS_LIST))){
                CachedUserStatus statusResponse = gsonUtils.parseToObject(cachedData.get(STATUS_LIST), CachedUserStatus.class);
                HashMap<String, Boolean> statusList = statusResponse.getFriendsStatus();
                statusList.put(email, true);
                cachedData.set(STATUS_LIST, gsonUtils.parseToString(new CachedUserStatus(statusList)));
            }else {
                HashMap<String, Boolean> statusList = new HashMap<>();
                statusList.put(email, true);
                cachedData.set(STATUS_LIST, gsonUtils.parseToString(new CachedUserStatus(statusList)));
            }
        }catch (Exception e){
            LOGGER.error(e);
        }
    }

    @Override
    public void deactivate(String email) {
        try {
            if (Boolean.TRUE.equals(redisTemplate.hasKey(STATUS_LIST))){
                CachedUserStatus statusResponse = gsonUtils.parseToObject(cachedData.get(STATUS_LIST), CachedUserStatus.class);
                HashMap<String, Boolean> statusList = statusResponse.getFriendsStatus();
                statusList.remove(email);
                cachedData.set(STATUS_LIST, gsonUtils.parseToString(new CachedUserStatus(statusList)));
            }
        }catch (Exception e){
            LOGGER.error(e);
        }
    }
}
