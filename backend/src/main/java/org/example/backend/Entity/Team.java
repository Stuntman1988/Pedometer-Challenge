package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.Data;

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

    @Column(name = "created_at")
    private Date createdAt;

}
