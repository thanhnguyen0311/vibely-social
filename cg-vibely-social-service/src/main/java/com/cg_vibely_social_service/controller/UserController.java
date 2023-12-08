package com.cg_vibely_social_service.controller;

import com.cg_vibely_social_service.payload.request.UserInfoRequestDto;
import com.cg_vibely_social_service.payload.request.UserRegisterRequestDto;
import com.cg_vibely_social_service.payload.response.UserInfoResponseDto;
import com.cg_vibely_social_service.payload.response.UserSearchResponseDto;
import com.cg_vibely_social_service.payload.response.UserSuggestionResponseDto;
import com.cg_vibely_social_service.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> register(@Valid @RequestBody
                                      UserRegisterRequestDto userRegisterRequestDto,
                                      BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> fieldErrors = new HashMap<>();

            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                fieldErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return new ResponseEntity<>(fieldErrors, HttpStatus.BAD_REQUEST);
        } else {
            try {
                userService.save(userRegisterRequestDto);
            } catch (Exception exception) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @GetMapping("/check_email")
    public ResponseEntity<?> checkEmail(@RequestParam("email") String email) {
        if (userService.checkValidEmail(email)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }


    @GetMapping("/suggestion_friends")
    public ResponseEntity<?> showSuggestionFriends() {
        Long userId = userService.getCurrentUser().getId();
        List<UserSuggestionResponseDto> userSuggestion = userService.findFriendSuggestionByUserId(userId);
        if (!userSuggestion.isEmpty()){
            return new ResponseEntity<>(userSuggestion, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/info/{id}")
    public ResponseEntity<?> checkEmail(@PathVariable("id") Long userId) {
        if (userService.findById(userId) != null) {
            UserInfoResponseDto currentUser = userService.getUserInfoById(userId);
            return new ResponseEntity<>(currentUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<?> editUserInfo(@Valid @RequestBody
                                          UserInfoRequestDto userInfoRequestDto,
                                          BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> fieldErrors = new HashMap<>();

            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                fieldErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return new ResponseEntity<>(fieldErrors, HttpStatus.BAD_REQUEST);
        } else {
            try {
                userService.updateUserInfo(userInfoRequestDto);
            } catch (Exception exception) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchUser(@RequestParam("keyword") String keyword,
                                        @RequestParam("number-page") Integer numberPage) {
        List<UserSearchResponseDto> users = userService.findUsersByLastNameOrFirstName(keyword, numberPage);
        if (!users.isEmpty()) {
            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
