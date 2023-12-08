package com.cg_vibely_social_service.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserRegisterRequestDto {
    @Email
    @NotBlank
    private String email;

    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!])[A-Za-z\\d@#$%^&+=!]{8,16}$"
            , message = "Must contain uppercase, lowercase, number, symbol and be between 8 - 16 characters")
    @NotBlank
    private String password;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @Pattern(regexp = "^MALE$|^FEMALE$|^OPTIONAL$", message = "Must be valid gender")
    @NotBlank
    private String gender;

    //    @Pattern(regexp = "((0[1-9]|[1|2][0-9]|3[01])/(0[1|3|5|7|8]|10|12)/\\\\d{4})|(([0][1-9]|[12][0-9]|30)/(0[469]|11)/\\\\d{4})|((0[1-9]|1[0-9]|2[0-8])/02/\\\\d{4})|((29)/02/([02468][048]00))|((29)/02/([13579][26]00))|((29)/02/(\\\\d{2}(0[48]|[2468][048]|[13579][26])))",
//            message = "Must be valid date")
    @NotBlank
    private String dayOfBirth;

}
