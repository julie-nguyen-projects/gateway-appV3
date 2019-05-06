package com.epitech.pgt2019.service.mapper;

import com.epitech.pgt2019.domain.*;
import com.epitech.pgt2019.service.dto.UserExtraDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserExtra and its DTO UserExtraDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, CityMapper.class})
public interface UserExtraMapper extends EntityMapper<UserExtraDTO, UserExtra> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "city.id", target = "cityId")
    @Mapping(source = "city.name", target = "cityName")
    UserExtraDTO toDto(UserExtra userExtra);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "cityId", target = "city")
    UserExtra toEntity(UserExtraDTO userExtraDTO);

    default UserExtra fromId(String id) {
        if (id == null) {
            return null;
        }
        UserExtra userExtra = new UserExtra();
        userExtra.setId(id);
        return userExtra;
    }
}
