package com.cg_vibely_social_service.logging;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class ServiceLogger {
    private final Logger LOGGER = AppLogger.LOGGER;

    @Pointcut("execution(public * com.cg_vibely_social_service.service.*.*(..))")
    public void serviceMethods() {
    }

    @Pointcut("execution(public * com.cg_vibely_social_service.service.impl.ImageServiceImpl.save(..))")
    public void uploadMethods() {
    }

    @AfterThrowing(value = "serviceMethods()", throwing = "e")
    public void serviceLogging(JoinPoint joinPoint, Exception e) {
        LOGGER.warn(String.format("```yaml\n!##EXCEPTION: %s.%s() !ARGS: %s!```",
                joinPoint.getTarget().getClass().getName(),
                joinPoint.getSignature().getName(),
                Arrays.toString(joinPoint.getArgs())));
        LOGGER.error("||[" + e + "]||");
    }

    @Before("uploadMethods()")
    public void uploadLogging(JoinPoint joinPoint) {
        LOGGER.info(String.format("```bash\n!##Begining upload... !ARGS: %s!```",
                Arrays.toString(joinPoint.getArgs())));
    }

    @AfterReturning(value = "uploadMethods()", returning = "result")
    public void uploadLogging(Object result) {
        LOGGER.info(String.format("```diff\n+##Upload success!... %s!```",
                result));
    }
}
