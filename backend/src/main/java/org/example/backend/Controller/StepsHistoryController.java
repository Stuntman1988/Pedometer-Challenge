package org.example.backend.Controller;

import org.example.backend.Entity.StepsHistory;
import org.example.backend.Repository.StepsHistoryRepo;
import org.example.backend.RequestModels.AddStepsRequest;
import org.example.backend.ResponseModels.TotalStepsOfUsers;
import org.example.backend.Service.StepsHistoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/stepsHistory")
public class StepsHistoryController {

    private static final Logger log = LoggerFactory.getLogger(StepsHistoryController.class);
    private StepsHistoryRepo stepsHistoryRepo;
    private StepsHistoryService stepsHistoryService;

    @Autowired
    public StepsHistoryController(StepsHistoryRepo stepsHistoryRepo, StepsHistoryService stepsHistoryService) {
        this.stepsHistoryRepo = stepsHistoryRepo;
        this.stepsHistoryService = stepsHistoryService;
    }

    @GetMapping("/totalStepsOfUsers")
    public List<TotalStepsOfUsers> getTotalStepsOfUsers(@RequestParam int teamsId) {
        log.info("getTotalStepsOfUsers");
       return stepsHistoryRepo.getTotalStepsOfUsers(teamsId);
    }

    @PostMapping("/addSteps")
    public boolean addSteps(@RequestBody AddStepsRequest addStepsRequest) {
        log.info("addSteps " + addStepsRequest.getUserId());
        return stepsHistoryService.addSteps(addStepsRequest);
    }
}
