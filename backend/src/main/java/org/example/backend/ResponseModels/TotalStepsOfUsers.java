package org.example.backend.ResponseModels;

import lombok.Data;

@Data
public class TotalStepsOfUsers {

    private String name;
    private long totalSteps;

    public TotalStepsOfUsers(String name, long totalSteps) {
        this.name = name;
        this.totalSteps = totalSteps;
    }
}
