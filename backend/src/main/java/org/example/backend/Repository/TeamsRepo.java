package org.example.backend.Repository;

import org.example.backend.Entity.Teams;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamsRepo extends JpaRepository<Teams, Long> {
}
