package org.example.backend.Controller;

import org.example.backend.Service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.68.108:5173"})
@RestController
@RequestMapping("/api/team")
public class TeamController {

    private TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping("/createNewTeam")
    public void createNewTeam(@RequestParam long stepGoal) {
        teamService.createNewTeam(stepGoal);
    }
}
