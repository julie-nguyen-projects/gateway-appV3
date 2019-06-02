package com.epitech.pgt2019.repository;

import com.epitech.pgt2019.domain.UserExtra;
import com.epitech.pgt2019.service.dto.UserDTO;
import com.epitech.pgt2019.service.dto.UserExtraDTO;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data MongoDB repository for the UserExtra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtraRepository extends MongoRepository<UserExtra, String> {

    List<UserExtra> findByUserIn(List<UserDTO> usersDto);
}
