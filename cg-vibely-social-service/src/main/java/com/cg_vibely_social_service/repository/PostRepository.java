package com.cg_vibely_social_service.repository;

import com.cg_vibely_social_service.entity.Feed.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Feed, Long> {
    @Query(value = "SELECT * FROM FEED ORDER BY id DESC LIMIT ?,20;" , nativeQuery = true)
    List<Feed> findLatestFeeds(int limit);

    @Query(value = "SELECT * FROM FEED WHERE JSON_EXTRACT(feed_items, '$.authorId' ) = ?1 ORDER BY id DESC", nativeQuery = true)
    List<Feed> findAllByAuthorId(Long authorId);

}
