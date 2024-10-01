package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Data
@Table(name = "team")
public class Team {

    @Id
    @Column(name = "id")
    private long id;

    @Column(name = "steps_goal")
    private long stepsGoal;

    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;

}
