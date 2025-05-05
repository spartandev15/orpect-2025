
import React, { useContext } from "react";
import SignupStepA from "./SignupStepA";
import { FormContext } from "../../pages/auth-pages/Register";
import SignupStepB from "./SignupStepB";

function Step() {
  const { activeStepIndex } = useContext(FormContext);
  let stepContent;
  switch (activeStepIndex) {
    case 0:
      stepContent = <SignupStepA  />;
      break;
    case 1:
      stepContent = <SignupStepB/>;
      break;
    default:
      break;
  }

  return stepContent;
}

export default Step;
