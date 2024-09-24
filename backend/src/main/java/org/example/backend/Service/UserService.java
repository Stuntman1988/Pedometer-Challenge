package org.example.backend.Service;

import org.example.backend.Entity.Team;
import org.example.backend.Entity.User;
import org.example.backend.Repository.TeamRepo;
import org.example.backend.Repository.UserRepo;
import org.example.backend.RequestModels.AddToTeamRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private UserRepo userRepo;
    private TeamRepo teamRepo;
    private Argon2Service argon2Service;

    @Autowired
    public UserService(UserRepo userRepo, TeamRepo teamsRepo, Argon2Service argon2Service) {
        this.userRepo = userRepo;
        this.teamRepo = teamsRepo;
        this.argon2Service = argon2Service;
    }

    public void addUserToTeam(AddToTeamRequest addToTeamRequest) throws Exception {
        Optional<User> user = userRepo.findById(addToTeamRequest.getUserId());
        Optional<Team> team = teamRepo.findById(addToTeamRequest.getTeamId());
        if (user.isEmpty() || team.isEmpty()) {
            throw new Exception("User or team not found");
        }
        user.get().setTeam(team.get());
        userRepo.save(user.get());
        log.info("User added to team");
    }

    public boolean verifyPassword(String userPass) throws Exception {
        String[] userPassArray = userPass.split(":");
        Optional<User> user = userRepo.findUserByEmail(userPassArray[0]);
        if (user.isEmpty()) {
            throw new Exception("Could not find user");
        }
        return argon2Service.verifyPassword(userPassArray[1], user.get().getPassword());
    }
}
