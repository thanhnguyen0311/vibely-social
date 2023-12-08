package com.cg_vibely_social_service.entity;

import com.cg_vibely_social_service.utils.Privacy;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name ="post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(name ="privacy")
    private Privacy privacy;
    @Column(name = "text_content")
    private String textContent;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

}
