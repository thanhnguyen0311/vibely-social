package com.cg_vibely_social_service.service.impl;

import com.cg_vibely_social_service.configuration.security.JwtTokenProvider;
import com.cg_vibely_social_service.converter.Converter;
import com.cg_vibely_social_service.entity.Friend;
import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.payload.request.Oauth2RequestDto;
import com.cg_vibely_social_service.payload.request.UserInfoRequestDto;
import com.cg_vibely_social_service.payload.request.UserLoginRequestDto;
import com.cg_vibely_social_service.payload.request.UserRegisterRequestDto;
import com.cg_vibely_social_service.payload.response.UserInfoResponseDto;
import com.cg_vibely_social_service.payload.response.UserLoginResponseDto;
import com.cg_vibely_social_service.payload.response.UserSearchResponseDto;
import com.cg_vibely_social_service.payload.response.UserSuggestionResponseDto;
import com.cg_vibely_social_service.repository.UserRepository;
import com.cg_vibely_social_service.service.ImageService;
import com.cg_vibely_social_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final Converter<UserRegisterRequestDto, User> userRegisterRequestDtoUserConverter;

    private final Converter<UserSuggestionResponseDto, User> suggestionFriendConverter;
    private final ImageService imageService;

    private final Converter<UserInfoResponseDto, User> userInfoResponseConverter;

    private final Converter<UserInfoRequestDto, User> userInfoRequestConverter;

    private final Converter<Oauth2RequestDto, User> oauth2RequestDtoUserConverter;
    private final Converter<UserSearchResponseDto, User> userSearchResponseConverter;
    @Value("${app.friendSuggestionNumber}")
    private Integer friendSuggestionNumber;

    @Override
    public UserImpl getCurrentUser() {
        try {
            return (UserImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch (ClassCastException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void save(UserRegisterRequestDto userRegisterRequestDto) {
        userRepository.save(userRegisterRequestDtoUserConverter.convert(userRegisterRequestDto));
    }

    @Override
    public void save(Oauth2RequestDto oauth2RequestDto) {
        userRepository.save(oauth2RequestDtoUserConverter.convert(oauth2RequestDto));
    }

    @Override
    public void update(Long id, User user) {
        Optional<User> loadUser = userRepository.findById(id);
        if (loadUser.isPresent()) {
            userRepository.save(user);
        }
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }


    public User loadUserByEmail(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("Invalid username");
        }
        return user.get();
    }

    @Override
    public UserLoginResponseDto authenticate(UserLoginRequestDto userLoginRequestDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        userLoginRequestDto.getEmail(), userLoginRequestDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = loadUserByEmail(userLoginRequestDto.getEmail());

        String token = jwtUtil.generateToken(authentication);
        String refreshToken = jwtUtil.generateRefreshToken(authentication);

        UserLoginResponseDto userLoginResponseDto = UserLoginResponseDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .accessToken(token)
                .refreshToken(refreshToken)
                .background(imageService
                        .getImageUrl(user.getBackground()
                                == null
                                ? "null.jpg"
                                : user.getBackground()))
                .build();

        if (user.getAvatar() == null && user.getGoogleAvatar() != null) {
            userLoginResponseDto.setAvatarUrl(user.getGoogleAvatar());
        } else {
            userLoginResponseDto.setAvatarUrl(imageService.getImageUrl(user.getAvatar()));
        }

        return userLoginResponseDto;
    }

    @Override
    public String refreshToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return jwtUtil.generateToken(authentication);
    }

    @Override
    public boolean checkValidEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isEmpty();
    }

    @Override
    public List<UserSuggestionResponseDto> findFriendSuggestionByUserId(Long userId) {
        List<User> suggestionFriends = userRepository.findFriendSuggestionByUserId(userId, Pageable.ofSize(friendSuggestionNumber));
        List<UserSuggestionResponseDto> userSuggestionResponseDtos = suggestionFriendConverter.revert(suggestionFriends);

        List<Long> user1FriendIds = userRepository.findById(userId).orElse(null).getFriendList().stream().map(Friend::getFriendId).collect(Collectors.toList());

        for (UserSuggestionResponseDto dto : userSuggestionResponseDtos) {
            User user = userRepository.findById(dto.getId()).orElse(null);
            if (user != null) {
                List<Long> user2FriendIds = user.getFriendList().stream().map(Friend::getFriendId).collect(Collectors.toList());
                int mutualFriends = (int) user1FriendIds.stream().filter(user2FriendIds::contains).count();
                dto.setNumberMutualFriend(mutualFriends);
            }
        }
        return userSuggestionResponseDtos;
    }

    public UserPrincipal getUserPrincipal(String email) {
        System.out.println("calling getUserPrincipal");
        User user = userRepository.findByEmail(email).orElseThrow();
        return UserPrincipal.builder()
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }

    @Override
    public void updateUserPassword(String email, String tempPassword) {
        User user = loadUserByEmail(email);
        String hashedPassword = passwordEncoder.encode(tempPassword);
        user.setPassword(hashedPassword);
        userRepository.save(user);
    }

    private boolean checkPassword(User user, String password) {
        return BCrypt.checkpw(password, user.getPassword());
    }

    @Override
    public UserInfoResponseDto getUserInfoById(Long userId) {
        return userInfoResponseConverter.revert(userRepository.findById(userId).orElseThrow());
    }

    @Override
    public void updateUserInfo(UserInfoRequestDto userInfoRequestDto) {
        UserImpl currentUser = getCurrentUser();
        User user = userRepository.findById(currentUser.getId()).orElseThrow();
        BeanUtils.copyProperties(userInfoRequestDto, user);

        userRepository.save(user);
    }

    @Override
    public List<UserSearchResponseDto> findUsersByLastNameOrFirstName(String keyword, Integer pageNumber) {
        List<User> users = userRepository.findUsersByLastNameOrFirstName
                (keyword, PageRequest.of(pageNumber, 20)).getContent();
        return userSearchResponseConverter.revert(users);
    }
}
