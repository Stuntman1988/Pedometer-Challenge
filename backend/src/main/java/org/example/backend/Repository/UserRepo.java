package org.example.backend.Repository;

import org.example.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findUserByEmail(@RequestParam("email") String email);

    List<User> findUsersByTeamId(@RequestParam("team_id") long teamId);

    Optional<User> findUserById(@RequestParam("id") long id);
}
