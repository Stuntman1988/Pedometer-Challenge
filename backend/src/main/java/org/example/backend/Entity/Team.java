package org.example.backend.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "team")
public class Team {

    @Id
    @Column(name = "id")
    private long id;

    @Column(name = "steps_goal")
    private long stepsGoal;

}
