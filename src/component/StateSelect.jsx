import Select from 'react-select';

export const SateSelect = ({ selectedCountry, values, stateOptions, handleStateChange }) => {
    const defaultValue = values.company_state
      ? { label: values.company_state, value: values.company_state }
      : null;
  
    return (
      <Select
        className="basic-single"
        classNamePrefix="select"
        placeholder="Select State.."
        isDisabled={!selectedCountry?.name}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        name="color"
        defaultValue={defaultValue}
        options={stateOptions}
        onChange={handleStateChange}
        style={{ textAlign: "center" }}
      />
    );
  };
  