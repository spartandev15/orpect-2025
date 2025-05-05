import { useState } from 'react';

const Stars = ({rating}) => {


  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starIcon;
      if (i <= rating) {
        starIcon = <i key={i} className="fas fa-star" style={{color:"#f6a21e"}} />;
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        starIcon = <i key={i} className="fas fa-star-half-alt"  style={{color:"#f6a21e"}}/>;
      } else {
        starIcon = <i key={i} className="far fa-star" style={{color:"#f6a21e"}}/>;
      }
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : ''}`}
        //   onClick={() => handleRatingClick(i)}
        >
          {starIcon}
        </span>
      );
    }
    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default Stars;




// import React from "react";

// const Stars = ({ stars }) => {
//   const ratingStars = Array.from({ length: 5 }, (elem, index) => {
//     let number = index + 0.5;
//     return (
//       <span key={index}>
//         {stars > index + 1 ? (
//           <i className="fa fa-star" style={{ color: "yellow" }} />
//         ) : stars > number ? (
//           <i className="fas fa-star-half-alt" style={{ color: "yellow" }} />
//         ) : (
//           <i className="fas fa-star-half-alt" style={{ color: "yellow" }} />
//         )}
//       </span>
//     );
//   });
//   return <div>{ratingStars}</div>;
// };

// export default Stars;
