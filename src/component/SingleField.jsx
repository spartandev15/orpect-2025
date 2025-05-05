import React from 'react';

export const SingleField = ({ title, answer, style }) => {
  return (
    <div className="col-lg-6 col-md-6 col-sm-12">
      <p className="addlabelcard2">{title}</p>
      <h6 className="profileimgboxcompanydetail2" style={style??style}>
        {answer}
      </h6>
    </div>
  );
};

