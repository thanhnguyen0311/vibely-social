package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.entity.Feed.FeedItem;
import com.cg_vibely_social_service.service.SubscribeService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Service
public class SubscribeServiceImpl implements SubscribeService {
    @Override
    public Set<Long> newSubscriber(Long userId, Set<Long> subs) {
        Set<Long> subscribers;
        if(Objects.nonNull(subs)){
            subscribers = subs;
        }
        else{
            subscribers = new HashSet<>();
        }
        subscribers.add(userId);
        return subscribers;
    }

    @Override
    public Set<Long> addSubscribers(Set<Long> userIds, Set<Long> subs) {
        Set<Long> subscribers;
        if(Objects.nonNull(subs)){
            subscribers = subs;
            subscribers.addAll(userIds);
        }
        else{
            subscribers = userIds;
        }
        return subscribers;
    }
}
