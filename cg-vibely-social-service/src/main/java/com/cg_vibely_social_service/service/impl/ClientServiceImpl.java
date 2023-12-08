package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.payload.response.DataMailDto;
import com.cg_vibely_social_service.payload.sdi.ClientSdi;
import com.cg_vibely_social_service.service.ClientService;
import com.cg_vibely_social_service.service.MailService;
import com.cg_vibely_social_service.service.UserService;
import com.cg_vibely_social_service.utils.Const;
import com.cg_vibely_social_service.utils.DataUtils;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
@RequiredArgsConstructor
@Service
public class ClientServiceImpl implements ClientService {

    private final MailService mailService;
    private final UserService userService;


    public Boolean create(ClientSdi sdi) {
        try {
            DataMailDto dataMail = new DataMailDto();
            String email = sdi.getEmail();
            dataMail.setTo(email);
            dataMail.setSubject(Const.SEND_MAIL_SUBJECT.CLIENT_REGISTER);

            Map<String, Object> props = new HashMap<>();
            String tempPassword = DataUtils.generateTempPwd(6);
            userService.updateUserPassword(email,tempPassword);
            props.put("password", tempPassword);
            dataMail.setProps(props);

            mailService.sendHtmlMail(dataMail,Const.TEMPLATE_FILE_NAME.CLIENT_REGISTER);
            return true;
        } catch (MessagingException exp){
            exp.printStackTrace();
        }
        return null;
    }
}
