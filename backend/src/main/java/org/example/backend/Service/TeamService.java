package org.example.backend.Service;

import org.example.backend.Entity.Team;
import org.example.backend.Repository.TeamRepo;
import org.example.backend.RequestModels.AddToTeamRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Random;

@Service
@Transactional
public class TeamService {

    private static final Logger log = LoggerFactory.getLogger(TeamService.class);
    private TeamRepo teamRepo;
    private UserService userService;

    @Autowired
    public TeamService(TeamRepo teamRepo, UserService userService) {
        this.teamRepo = teamRepo;
        this.userService = userService;
    }

    public long createNewTeam(long stepGoal, long userId) throws Exception{
        Team newTeam = new Team();
        Random random = new Random();
        long randomId = 0;
        boolean notUniqueId = true;
        while (notUniqueId) {
            randomId = random.nextInt(900000) + 100000;
            Optional<Team> team = teamRepo.findById(randomId);
            if (team.isEmpty()) {
                newTeam.setId(randomId);
                newTeam.setStepsGoal(stepGoal);
                teamRepo.save(newTeam);
                notUniqueId = false;
                log.info("Created a new team with id " + randomId);
            }
        }
        userService.addUserToTeam(new AddToTeamRequest(userId, randomId));
        return randomId;
    }

}
