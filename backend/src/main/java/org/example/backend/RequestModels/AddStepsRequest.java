package org.example.backend.RequestModels;

import lombok.Data;

@Data
public class AddStepsRequest {

    private long userId;
    private long steps;

    public AddStepsRequest(long userId, long steps) {
        this.userId = userId;
        this.steps = steps;
    }
}
