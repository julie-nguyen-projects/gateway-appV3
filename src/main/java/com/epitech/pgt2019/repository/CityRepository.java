package com.epitech.pgt2019.repository;

import com.epitech.pgt2019.domain.City;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data MongoDB repository for the City entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CityRepository extends MongoRepository<City, String> {

    List<City> findByNameStartsWith(String query);
}
