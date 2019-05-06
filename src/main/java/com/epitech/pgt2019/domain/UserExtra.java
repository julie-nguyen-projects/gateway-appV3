package com.epitech.pgt2019.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A UserExtra.
 */
@Document(collection = "user_extra")
public class UserExtra implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("title")
    private String title;

    @Field("birthdate")
    private LocalDate birthdate;

    @DBRef
    @Field("user")
    private User user;

    @DBRef
    @Field("city")
    @JsonIgnoreProperties("userExtras")
    private City city;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public UserExtra title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public UserExtra birthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
        return this;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public User getUser() {
        return user;
    }

    public UserExtra user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public City getCity() {
        return city;
    }

    public UserExtra city(City city) {
        this.city = city;
        return this;
    }

    public void setCity(City city) {
        this.city = city;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserExtra userExtra = (UserExtra) o;
        if (userExtra.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userExtra.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserExtra{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", birthdate='" + getBirthdate() + "'" +
            "}";
    }
}
