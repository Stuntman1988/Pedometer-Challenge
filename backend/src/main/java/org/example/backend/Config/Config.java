package org.example.backend.Config;

import org.example.backend.Entity.StepsHistory;
import org.example.backend.Entity.Team;
import org.example.backend.Entity.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class Config implements RepositoryRestConfigurer, WebMvcConfigurer{

        @Override
        public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                         CorsRegistry cors) {

            config.exposeIdsFor(User.class);
            config.exposeIdsFor(StepsHistory.class);
            config.exposeIdsFor(Team.class);

            cors.addMapping("/**")
                    .allowedOrigins("http://localhost:5173", "http://192.168.68.108:5173", "http://stuntman.ddns.net:5173")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*");

        }
}
