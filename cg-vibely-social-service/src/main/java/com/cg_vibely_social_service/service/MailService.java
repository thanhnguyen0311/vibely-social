package com.cg_vibely_social_service.service;

import com.cg_vibely_social_service.payload.response.DataMailDto;
import jakarta.mail.MessagingException;


public interface MailService {
    void sendHtmlMail (DataMailDto dataMailDto, String templateName) throws MessagingException;
}
