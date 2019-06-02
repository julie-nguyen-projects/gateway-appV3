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

    /**
     * Retrieves users Extra which id are contained in the list passed in parameters
     * @param usersDtoIds : searched ids
     * @return : found users
     */
    List<UserExtra> findByIdIn(List<String> usersDtoIds);
}
