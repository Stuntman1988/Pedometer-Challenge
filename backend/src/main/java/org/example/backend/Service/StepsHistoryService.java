package org.example.backend.Service;

import org.example.backend.Entity.StepsHistory;
import org.example.backend.Entity.User;
import org.example.backend.Repository.StepsHistoryRepo;
import org.example.backend.Repository.UserRepo;
import org.example.backend.RequestModels.AddStepsRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
@Transactional
public class StepsHistoryService {

    private static final Logger log = LoggerFactory.getLogger(StepsHistoryService.class);
    private StepsHistoryRepo stepsHistoryRepo;
    private UserRepo userRepo;
    private LogfileService logfileService;

    @Autowired
    public StepsHistoryService(StepsHistoryRepo stepsHistoryRepo, UserRepo userRepo, LogfileService logfileService) {
        this.stepsHistoryRepo = stepsHistoryRepo;
        this.userRepo = userRepo;
        this.logfileService = logfileService;
    }

    public boolean addSteps(AddStepsRequest addStepsRequest) {
        Optional<User> user = userRepo.findById(addStepsRequest.getUserId());
        if (user.isEmpty()) {
            log.error("User not found");
            return false;
        }
        StepsHistory sh = new StepsHistory();
        sh.setUser(user.get());
        sh.setSteps(addStepsRequest.getSteps());
        stepsHistoryRepo.save(sh);
        log.info("addSteps {}", addStepsRequest.getUserId());
        logfileService.writeToLogfile("Added " + addStepsRequest.getSteps() + " steps to: (ID:" + addStepsRequest.getUserId() + ") " + user.get().getEmail());
        return true;
    }

    public boolean deleteStepsHistory(long stepId) {
        Optional<StepsHistory> sh = stepsHistoryRepo.findById(stepId);
        if (sh.isEmpty()) {
            log.error("Step not found");
            return false;
        }
        stepsHistoryRepo.delete(sh.get());
        logfileService.writeToLogfile("Deleted steps for " + sh.get().getUser().getEmail());
        return true;
    }

}
