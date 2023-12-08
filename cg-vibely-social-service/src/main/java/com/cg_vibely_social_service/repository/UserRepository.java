package com.cg_vibely_social_service.repository;

import com.cg_vibely_social_service.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findAllById(Long id);

    User findUserById(Long userId);
    @Query(value = "SELECT DISTINCT u FROM User u " +
            "WHERE u.id != :userId " +
            "AND u.id NOT IN (SELECT f.friendId FROM Friend f WHERE f.userId = :userId) " +
            "AND u.id NOT IN (SELECT f.userId FROM Friend f WHERE f.friendId = :userId) " +
            "AND u.id NOT IN (SELECT fr.sender FROM FriendRequest fr) " +
            "AND u.id NOT IN (SELECT fr.receiver FROM FriendRequest fr) "
//            + "ORDER BY RAND()"
    )
    List<User> findFriendSuggestionByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query(value = "SELECT u FROM User u WHERE u.lastName LIKE %:keyword% OR u.firstName LIKE %:keyword%")
    Page<User> findUsersByLastNameOrFirstName(@Param("keyword") String keyword, Pageable pageable);
}
