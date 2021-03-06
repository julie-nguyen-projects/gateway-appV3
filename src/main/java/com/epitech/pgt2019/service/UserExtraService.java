package com.epitech.pgt2019.service;

import com.epitech.pgt2019.domain.UserExtra;
import com.epitech.pgt2019.repository.UserExtraRepository;
import com.epitech.pgt2019.service.dto.UserDTO;
import com.epitech.pgt2019.service.dto.UserExtraDTO;
import com.epitech.pgt2019.service.mapper.UserExtraMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing UserExtra.
 */
@Service
public class UserExtraService {

    private final Logger log = LoggerFactory.getLogger(UserExtraService.class);

    private final UserExtraRepository userExtraRepository;

    private final UserExtraMapper userExtraMapper;

    private final UserService userService;

    public UserExtraService(UserExtraRepository userExtraRepository, UserExtraMapper userExtraMapper,
                            UserService userService) {
        this.userExtraRepository = userExtraRepository;
        this.userExtraMapper = userExtraMapper;
        this.userService = userService;
    }

    /**
     * Save a userExtra.
     *
     * @param userExtraDTO the entity to save
     * @return the persisted entity
     */
    public UserExtraDTO save(UserExtraDTO userExtraDTO) {
        log.debug("Request to save UserExtra : {}", userExtraDTO);
        UserExtra userExtra = userExtraMapper.toEntity(userExtraDTO);
        userExtra = userExtraRepository.save(userExtra);
        return userExtraMapper.toDto(userExtra);
    }

    /**
     * Get all the userExtras.
     *
     * @return the list of entities
     */
    public List<UserExtraDTO> findAll() {
        log.debug("Request to get all UserExtras");
        return userExtraRepository.findAll().stream()
            .map(userExtraMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one userExtra by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    public Optional<UserExtraDTO> findOne(String id) {
        log.debug("Request to get UserExtra : {}", id);
        return userExtraRepository.findById(id)
            .map(userExtraMapper::toDto);
    }

    /**
     * Delete the userExtra by id.
     *
     * @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete UserExtra : {}", id);
        userExtraRepository.deleteById(id);
    }

    /**
     * Get users which firstname or lastname contains research parameters
     * @param firstname : text searched in firstname
     * @param lastname : text searched in lastname
     * @return : found users
     */
    public List<UserExtraDTO> findUsersNameContains(String firstname, String lastname) {
        // Retrieves users
        List<UserDTO> usersDto = userService.findUsersNameContains(firstname, lastname);

        // Stores ids
        List<String> ids = usersDto.stream().map(UserDTO::getId).collect(Collectors.toList());

        // Retrieves associated Users extras
        return userExtraRepository.findByIdIn(ids).stream()
        .map(userExtraMapper::toDto)
        .collect(Collectors.toCollection(LinkedList::new));
    }
}
