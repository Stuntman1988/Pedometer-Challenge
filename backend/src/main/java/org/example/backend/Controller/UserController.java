package org.example.backend.Controller;

import org.example.backend.Entity.User;
import org.example.backend.RequestModels.AddToTeamRequest;
import org.example.backend.RequestModels.EditPersonalInfoRequest;
import org.example.backend.Service.Argon2Service;
import org.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.68.108:5173", "http://stuntman.ddns.net:5173"})
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

    @PostMapping("/registerUser")
    public void registerUser(@RequestBody User user) throws Exception {
        userService.registerUser(user);
    }

    @PostMapping("/editPersonalInfo")
    public void editUser(@RequestBody EditPersonalInfoRequest editPersonalInfoRequest) throws Exception {
        userService.editUser(editPersonalInfoRequest);
    }

    @PutMapping("/leaveTeam")
    public void leaveTeam(@RequestHeader(value = "userId") long userId) throws Exception {
        userService.leaveTeam(userId);
    }
}
