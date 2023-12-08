package com.cg_vibely_social_service.repository;

import com.cg_vibely_social_service.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findAllByUserId(Long userId);

    List<Follow> findAllByFollowedUserId(Long userId);

    void deleteByUserIdAndFollowedUserId(Long beingFollowedUserId, Long followedUserId);
}
