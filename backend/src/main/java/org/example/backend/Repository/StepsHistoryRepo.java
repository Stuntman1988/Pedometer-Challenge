package org.example.backend.Repository;

import org.example.backend.Entity.StepsHistory;
import org.example.backend.ResponseModels.TotalStepsOfUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StepsHistoryRepo extends JpaRepository<StepsHistory, Long> {

    @Query("SELECT new org.example.backend.ResponseModels.TotalStepsOfUsers(sh.user.name, SUM(sh.steps)) " +
            "FROM StepsHistory sh " +
            "GROUP BY sh.user.id " +
            "ORDER BY SUM(sh.steps) DESC")
    List<TotalStepsOfUsers> getTotalStepsOfUsers();
}
