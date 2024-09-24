package org.example.backend.Repository;

import org.example.backend.Entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface TeamRepo extends JpaRepository<Team, Long> {

    Team findTeamById(@RequestParam("id") long teamId);
}
