package org.example.backend.RequestModels;

import lombok.Data;

@Data
public class EditPersonalInfoRequest {

    private long userId;
    private String name;
    private String email;

    public EditPersonalInfoRequest(long userId, String name, String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }
}
