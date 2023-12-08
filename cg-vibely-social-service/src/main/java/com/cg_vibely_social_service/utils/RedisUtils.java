package com.cg_vibely_social_service.utils;


import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.sync.RedisCommands;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisUtils {
    private static final long KEY_ALREADY_EXISTS = 1;
    private static final String REDIS_URL = "redis://localhost:6379";

    public StatefulRedisConnection<String, String> connect() {
        RedisURI redisURI = RedisURI.create(REDIS_URL);
        redisURI.setVerifyPeer(false);
        RedisClient redisClient = RedisClient.create(redisURI);
        return redisClient.connect();
    }

    private RedisCommands<String, String> redisCommands() {
        try (StatefulRedisConnection<String, String> connection = connect()) {
            return connection.sync();
        }
    }

    public void setCache(String key, String value) {
        redisCommands().setex(key, 600, value);
    }

    public boolean hasKey(String key) {
        return redisCommands().exists(key) == KEY_ALREADY_EXISTS;
    }

    public String getCache(String key) {
        return redisCommands().get(key);
    }


}
