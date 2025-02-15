package org.example.backend.Service;

import org.example.backend.Entity.Team;
import org.example.backend.Entity.User;
import org.example.backend.Repository.TeamRepo;
import org.example.backend.Repository.UserRepo;
import org.example.backend.RequestModels.AddToTeamRequest;
import org.example.backend.RequestModels.EditPersonalInfoRequest;
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
    private final UserRepo userRepo;
    private final TeamRepo teamRepo;
    private final Argon2Service argon2Service;
    private final LogfileService logfileService;

    @Autowired
    public UserService(UserRepo userRepo, TeamRepo teamsRepo, Argon2Service argon2Service, LogfileService logfileService) {
        this.userRepo = userRepo;
        this.teamRepo = teamsRepo;
        this.argon2Service = argon2Service;
        this.logfileService = logfileService;
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
        logfileService.writeToLogfile("User: " + user.get().getEmail() + "was added to team: " + team.get().getId());
    }

    public boolean verifyPassword(String userPass) throws Exception {
        String[] userPassArray = userPass.split(":");
        Optional<User> user = userRepo.findUserByEmail(userPassArray[0]);
        if (user.isEmpty()) {
            throw new Exception("Could not find user");
        }
        return argon2Service.verifyPassword(userPassArray[1], user.get().getPassword());
    }

    public void registerUser(User user) throws Exception {
        Optional<User> existedUser = userRepo.findUserByEmail(user.getEmail());
        if (existedUser.isPresent()) {
            throw new Exception("User already exists");
        }
        User newUser = new User();
        newUser.setName(user.getName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(argon2Service.hashPassword(user.getPassword()));
        userRepo.save(newUser);
        logfileService.writeToLogfile("New user was registered: " + newUser.getEmail());
    }

    public void editUser(EditPersonalInfoRequest ePIR) throws Exception {
        Optional<User> user = userRepo.findUserById(ePIR.getUserId());
        if (user.isEmpty()) {
            throw new Exception("User doesn't exists");
        }
        user.get().setName(ePIR.getName());
        user.get().setEmail(ePIR.getEmail());
        userRepo.save(user.get());
        log.info("User updated");
        logfileService.writeToLogfile(user.get().getEmail() + " was updated");
    }

    public void leaveTeam(long userId) throws Exception {
        Optional<User> user = userRepo.findUserById(userId);
        if (user.isEmpty()) {
            throw new Exception("User doesn't exists");
        }
        user.get().setTeam(null);
        userRepo.save(user.get());
        log.info("User leaved team");
        logfileService.writeToLogfile(user.get().getEmail() + " has leaved a team");
    }
}
