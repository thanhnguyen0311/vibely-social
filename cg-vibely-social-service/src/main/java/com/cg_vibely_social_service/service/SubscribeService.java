package com.cg_vibely_social_service.service;


import com.cg_vibely_social_service.entity.Feed.FeedItem;

import java.util.Set;

public interface SubscribeService {
    Set<Long> newSubscriber(Long userId, Set<Long> subs);
    Set<Long> addSubscribers(Set<Long> userId, Set<Long> subs);
}
