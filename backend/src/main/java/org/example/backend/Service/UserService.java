package org.example.backend.Service;

import org.example.backend.Entity.Teams;
import org.example.backend.Entity.User;
import org.example.backend.Repository.TeamsRepo;
import org.example.backend.Repository.UserRepo;
import org.example.backend.RequestModels.AddToTeamRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    private UserRepo userRepo;
    private TeamsRepo teamsRepo;

    @Autowired
    public UserService(UserRepo userRepo, TeamsRepo teamsRepo) {
        this.userRepo = userRepo;
        this.teamsRepo = teamsRepo;
    }

    public void addUserToTeam(AddToTeamRequest addToTeamRequest) throws Exception {
        Optional<User> user = userRepo.findById(addToTeamRequest.getUserId());
        Optional<Teams> team = teamsRepo.findById(addToTeamRequest.getTeamId());
        if (user.isEmpty() || team.isEmpty()) {
            throw new Exception("User or team not found");
        }
        user.get().setTeams(team.get());
        userRepo.save(user.get());
    }
}
