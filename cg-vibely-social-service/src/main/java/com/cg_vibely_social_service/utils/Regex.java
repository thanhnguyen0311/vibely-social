package com.cg_vibely_social_service.utils;

import org.springframework.stereotype.Component;

@Component
public class Regex {
   public final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!])[A-Za-z\\d@#$%^&+=!]{8,16}$";

   public final String GENDER_REGEX = "^MALE$|^FEMALE$|^OTHER$";

   public final String PHONE_REGEX = "^[0-9]{10}$";
}
