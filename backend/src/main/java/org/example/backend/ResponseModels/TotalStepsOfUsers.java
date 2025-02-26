package org.example.backend.ResponseModels;

import lombok.Data;

@Data
public class TotalStepsOfUsers {

    private long userId;
    private String name;
    private long totalSteps;

    public TotalStepsOfUsers(long userId, String name, long totalSteps) {
        this.userId = userId;
        this.name = name;
        this.totalSteps = totalSteps;
    }
}
