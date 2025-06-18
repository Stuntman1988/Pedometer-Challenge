package org.example.backend.Repository;

import org.example.backend.Entity.StepsHistory;
import org.example.backend.ResponseModels.TotalStepsOfUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface StepsHistoryRepo extends JpaRepository<StepsHistory, Long> {

    @Query("SELECT new org.example.backend.ResponseModels.TotalStepsOfUsers(u.id, u.name, COALESCE(SUM(sh.steps), 0)) " +
            "FROM User u " +
            "LEFT JOIN StepsHistory sh ON sh.user.id = u.id " +
            "INNER JOIN Team t ON u.team.id = t.id " +
            "WHERE t.id = :teamId " +
            "GROUP BY u.id " +
            "ORDER BY COALESCE(SUM(sh.steps), 0) DESC")
    List<TotalStepsOfUsers> getTotalStepsOfUsers(@Param("teamId") int teamsId);

    List<StepsHistory> findStepsHistoriesByUserId(@RequestParam("user_id") long userId);
}
