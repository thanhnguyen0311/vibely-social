package com.cg_vibely_social_service.logging;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppLogger {
    static {
        PropertyConfigurator.configure("src/main/resources/log4j.properties");
    }
    public static final Logger LOGGER = LogManager.getLogger(AppLogger.class);
}
