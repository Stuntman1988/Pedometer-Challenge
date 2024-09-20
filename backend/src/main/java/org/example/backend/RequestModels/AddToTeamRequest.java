package org.example.backend.RequestModels;

import lombok.Data;

@Data
public class AddToTeamRequest {

    private long userId;
    private long teamId;

    public AddToTeamRequest(long userId, long teamId) {
        this.userId = userId;
        this.teamId = teamId;
    }
}
