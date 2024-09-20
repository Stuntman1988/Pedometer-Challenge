package org.example.backend.Service;

import org.example.backend.Entity.StepsHistory;
import org.example.backend.Entity.User;
import org.example.backend.Repository.StepsHistoryRepo;
import org.example.backend.Repository.UserRepo;
import org.example.backend.RequestModels.AddStepsRequest;
import org.example.backend.ResponseModels.TotalStepsOfUsers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StepsHistoryService {

    private static final Logger log = LoggerFactory.getLogger(StepsHistoryService.class);
    private StepsHistoryRepo stepsHistoryRepo;
    private UserRepo userRepo;

    @Autowired
    public StepsHistoryService(StepsHistoryRepo stepsHistoryRepo, UserRepo userRepo) {
        this.stepsHistoryRepo = stepsHistoryRepo;
        this.userRepo = userRepo;
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
        log.info("addSteps " + addStepsRequest.getUserId());
        return true;
    }

}
