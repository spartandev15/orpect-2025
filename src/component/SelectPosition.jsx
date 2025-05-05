// import React from "react";
// import { useSelector } from "react-redux";

// const SelectPostion = ({ nameValue, value, handleChange }) => {
//   const { data } = useSelector((state) => state.data);
  

//   return (
//     <select
//       className="form-control main_inner_dropdown"
//       name={nameValue}
//       value={value ?? value}
//       onChange={handleChange}
//     >
//          {/* <option  value=" "> */}
//       <input type="text" placeholder="serach"/>
//       {/* </option> */}
//       {data?.positions?.map((i) => (
//         <option key={i.id} value={i.position} selected={i.position} >
//           {i.position}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default SelectPostion;

import React from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

const SelectPostion = ({ nameValue, value, handleChange }) => {
  const { data } = useSelector((state) => state.data);

  // Map your positions to options for react-select
  const options = data?.positions?.map((i) => ({
    value: i.position,
    label: i.position,
  }));

  return (
    <Select
      name={nameValue}
      value={options?.find((option) => option.value === value)}
      onChange={(selectedOption) =>
        handleChange({
          target: { name: nameValue, value: selectedOption?.value },
        })
      }
      options={options}
      isSearchable
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder={<span>Search and select position <span style={{color: 'red'}}>*</span></span>}
      />
  );
};

export default SelectPostion;
