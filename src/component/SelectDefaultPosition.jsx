import React from "react";
import {  useSelector } from "react-redux";

const SelectDefaultPosition = ({ changePostion }) => {
  
  
  const { data} = useSelector((state) => state.data);

  // useEffect(() => {
  //   getPositionData();
  // }, []);

  // const getPositionData = async () => {
  //   try {
  //     const response = await dispatch(getPosition());
  //     setAllPosition(response?.data?.positions);
  //   } catch (error) {
  //     console.error("Failed to fetch positions:", error);
  //   }
  // };


  return (
    <div style={{ position: 'relative' }}>
      <select defaultValue="Select-Position"
        className="form-control main_inner_dropdown"
        onChange={(e) => changePostion(e.target.value)}
        style={{ 
          appearance: 'none',
          paddingRight: '30px'
        }}
      >
        <option  value=" ">
        Select Position
        </option>
        {data?.positions?.map((i) => (
          <option key={i.id} value={i.position}>
            {i.position}
          </option>
        ))}
      </select>
      <i 
        className="fa fa-chevron-down" 
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: '#666',
          fontSize: '11px'
        }}
      ></i>
    </div>
  );
};

export default SelectDefaultPosition;
