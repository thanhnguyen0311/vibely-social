package com.cg_vibely_social_service.converter;

import com.cg_vibely_social_service.entity.User;
import com.cg_vibely_social_service.payload.response.UserResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;


@Mapper
public interface IUserMapper {
    IUserMapper INSTANCE = Mappers.getMapper(IUserMapper.class);

    @Mapping(target = "id", source="user.id")
    @Mapping(target = "firstName", source="user.firstName")
    @Mapping(target = "lastName", source="user.lastName")
    @Mapping(target = "avatar", source="user.avatar")
    UserResponseDto  userResponseDTOConvert(User user);

}
