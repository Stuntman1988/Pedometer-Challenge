package org.example.backend.Controller;

import org.example.backend.RequestModels.AddToTeamRequest;
import org.example.backend.Service.Argon2Service;
import org.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/addToTeam")
    public void addToTeam(@RequestBody AddToTeamRequest addToTeamRequest) throws Exception {
        userService.addUserToTeam(addToTeamRequest);
    }

    @GetMapping("/checkPassword")
    public boolean checkPassword(@RequestHeader(value = "userPass") String userPass) throws Exception {
        return userService.verifyPassword(userPass);
    }
}
