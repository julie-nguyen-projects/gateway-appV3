package com.epitech.pgt2019.service;

import com.epitech.pgt2019.domain.City;
import com.epitech.pgt2019.repository.CityRepository;
import com.epitech.pgt2019.service.dto.CityDTO;
import com.epitech.pgt2019.service.mapper.CityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing City.
 */
@Service
public class CityService {

    private final Logger log = LoggerFactory.getLogger(CityService.class);

    private final CityRepository cityRepository;

    private final CityMapper cityMapper;

    public CityService(CityRepository cityRepository, CityMapper cityMapper) {
        this.cityRepository = cityRepository;
        this.cityMapper = cityMapper;
    }

    /**
     * Save a city.
     *
     * @param cityDTO the entity to save
     * @return the persisted entity
     */
    public CityDTO save(CityDTO cityDTO) {
        log.debug("Request to save City : {}", cityDTO);
        City city = cityMapper.toEntity(cityDTO);
        city = cityRepository.save(city);
        return cityMapper.toDto(city);
    }

    /**
     * Get all the cities.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    public Page<CityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Cities");
        return cityRepository.findAll(pageable)
            .map(cityMapper::toDto);
    }


    /**
     * Get one city by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    public Optional<CityDTO> findOne(String id) {
        log.debug("Request to get City : {}", id);
        return cityRepository.findById(id)
            .map(cityMapper::toDto);
    }

    /**
     * Delete the city by id.
     *
     * @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete City : {}", id);
        cityRepository.deleteById(id);
    }

    public List<CityDTO> findCitiesNameStartsWith(String query) {
        log.debug("Request to get Cities with name starts with : {}", query);
        return cityRepository.findByNameStartsWith(query.toUpperCase())
            .stream()
            .map(cityMapper::toDto)
            .sorted(Comparator.comparing(CityDTO::getName))
            .limit(10)
            .collect(Collectors.toCollection(LinkedList::new));
    }
}
