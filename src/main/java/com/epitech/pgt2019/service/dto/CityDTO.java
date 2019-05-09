package com.epitech.pgt2019.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the City entity.
 */
public class CityDTO implements Serializable {

    private String id;

    @NotNull
    private String name;

    @NotNull
    private String nameWithSymbols;

    @NotNull
    private String postalCode;


    private String countryId;

    private String countryName;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameWithSymbols() {
        return nameWithSymbols;
    }

    public void setNameWithSymbols(String nameWithSymbols) {
        this.nameWithSymbols = nameWithSymbols;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountryId() {
        return countryId;
    }

    public void setCountryId(String countryId) {
        this.countryId = countryId;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CityDTO cityDTO = (CityDTO) o;
        if (cityDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cityDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CityDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nameWithSymbols='" + getNameWithSymbols() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", country=" + getCountryId() +
            ", country='" + getCountryName() + "'" +
            "}";
    }
}
