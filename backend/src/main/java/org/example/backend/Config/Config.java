package org.example.backend.Config;

import org.example.backend.Entity.StepsHistory;
import org.example.backend.Entity.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;


@Configuration
public class Config implements RepositoryRestConfigurer {

        @Override
        public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                         CorsRegistry cors) {

            config.exposeIdsFor(User.class);
            config.exposeIdsFor(StepsHistory.class);

            cors.addMapping("/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*");

        }

}
