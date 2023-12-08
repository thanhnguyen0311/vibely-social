package com.cg_vibely_social_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "following")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "followed_user_id")
    private Long followedUserId;
}
