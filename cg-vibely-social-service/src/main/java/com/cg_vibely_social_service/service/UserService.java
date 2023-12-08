package com.cg_vibely_social_service.service;

import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.payload.request.Oauth2RequestDto;
import com.cg_vibely_social_service.payload.request.UserInfoRequestDto;
import com.cg_vibely_social_service.payload.request.UserLoginRequestDto;
import com.cg_vibely_social_service.payload.request.UserRegisterRequestDto;
import com.cg_vibely_social_service.payload.response.UserInfoResponseDto;
import com.cg_vibely_social_service.payload.response.UserLoginResponseDto;
import com.cg_vibely_social_service.payload.response.UserSearchResponseDto;
import com.cg_vibely_social_service.payload.response.UserSuggestionResponseDto;
import com.cg_vibely_social_service.service.impl.UserImpl;
import com.cg_vibely_social_service.service.impl.UserPrincipal;

import java.util.List;


public interface UserService{
    UserImpl getCurrentUser();
    void save(UserRegisterRequestDto userRegisterRequestDto);

    void save(Oauth2RequestDto oauth2RequestDto);

    void update(Long id, User user);

    User findById(Long id);

    UserLoginResponseDto authenticate(UserLoginRequestDto userLoginRequestDto);

    String refreshToken();

    boolean checkValidEmail(String email);
    List<UserSuggestionResponseDto> findFriendSuggestionByUserId(Long id);

    UserInfoResponseDto getUserInfoById (Long userId);

    void updateUserInfo(UserInfoRequestDto userInfoRequestDto);
    UserPrincipal getUserPrincipal(String email);

    List<UserSearchResponseDto> findUsersByLastNameOrFirstName(String keyword, Integer pageNumber);
    void updateUserPassword(String email, String tempPassword);

//    UserLoginResponseDto oauth2Authenticate(Oauth2RequestDto oauth2RequestDto);
}
