import React from 'react';
import Select from 'react-select';

const CountrySelect = ({ selectedCountry, countryOptions, handleCountryChange }) => {
  const defaultValue = selectedCountry
    ? { label: selectedCountry, value: selectedCountry }
    : null;

  return (
      <Select
        className="basic-single"
        classNamePrefix="select"
        placeholder="Select Country.."
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        defaultValue={
          selectedCountry
            ? {
                label: selectedCountry,
                value: selectedCountry,
              }
            : null
        }
        options={countryOptions}
        id="company_country"
        name="company_country"
        onChange={handleCountryChange}
      />
  );
};

export default CountrySelect;
