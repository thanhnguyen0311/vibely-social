package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.payload.response.DataMailDto;
import com.cg_vibely_social_service.service.MailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.context.Context;


@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    @Autowired
    private final JavaMailSender mailSender;
    @Autowired
    private final ITemplateEngine templateEngine;

    @Override
    public void sendHtmlMail(DataMailDto dataMailDto, String templateName) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

        Context context = new Context();
        context.setVariables(dataMailDto.getProps());

        String html = templateEngine.process(templateName, context);

        helper.setTo(dataMailDto.getTo());
        helper.setSubject(dataMailDto.getSubject());
        helper.setText(html, true);

        mailSender.send(message);

    }
}
