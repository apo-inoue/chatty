import React, { useContext } from "react";
import { InterviewContext } from "./App";

const InterviewContainer = () => {
  const { state, dispatch } = useContext(InterviewContext);
  const interviewEditAction = (action: any) => {
    return dispatch(action);
  };
};

export default InterviewContainer;
