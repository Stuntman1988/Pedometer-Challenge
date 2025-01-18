package org.example.backend.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class LogfileService {

    private static final Logger log = LoggerFactory.getLogger(LogfileService.class);
    private final Path appDirectory;
    private final Path filePath;
    DateTimeFormatter dateTimeFormatter;

    public LogfileService() {
        String userHome = System.getProperty("user.home");
        this.appDirectory = Paths.get(userHome, ".pedometerApp");
        this.filePath = appDirectory.resolve("log.txt");
        this.dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    }

    public void initializeLogFile() {
        try {
            if (!Files.exists(filePath)) {
                if (!Files.exists(appDirectory)) {
                    Files.createDirectories(appDirectory);
                    log.info("Created directory: {}", appDirectory);
                }

                Files.createFile(filePath);
                log.info("Created file: {}", filePath);

                Files.writeString(filePath, "Created: " + dateTimeFormatter.format(LocalDateTime.now()) + System.lineSeparator());
            } else {
                log.info("File already exists: {}", filePath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error LogService: " + e.getMessage(), e);
        }
    }

    public void writeToLogfile(String textToWrite) {
        try {
            String timeStamp = dateTimeFormatter.format(LocalDateTime.now());
            Files.writeString(filePath, timeStamp + " - " + textToWrite + System.lineSeparator(), StandardOpenOption.APPEND);
        } catch (IOException e) {
            throw new RuntimeException("Error LogService - WriteToLogfile: " + e.getMessage(), e);
        }

    }


}
