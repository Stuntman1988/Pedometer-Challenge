package org.example.backend;

import org.example.backend.Service.LogfileService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);

        LogfileService logfileService = new LogfileService();
        logfileService.initializeLogFile();
    }

}
