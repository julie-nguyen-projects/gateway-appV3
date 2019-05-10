package com.epitech.pgt2019.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A City.
 */
@Document(collection = "city")
public class City implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("name_with_symbols")
    private String nameWithSymbols;

    @NotNull
    @Field("postal_code")
    private String postalCode;

    @DBRef
    @Field("country")
    @JsonIgnoreProperties("cities")
    private Country country;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public City name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameWithSymbols() {
        return nameWithSymbols;
    }

    public City nameWithSymbols(String nameWithSymbols) {
        this.nameWithSymbols = nameWithSymbols;
        return this;
    }

    public void setNameWithSymbols(String nameWithSymbols) {
        this.nameWithSymbols = nameWithSymbols;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public City postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Country getCountry() {
        return country;
    }

    public City country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
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
        City city = (City) o;
        if (city.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), city.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "City{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nameWithSymbols='" + getNameWithSymbols() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            "}";
    }
}
