import React, { useContext, useState } from "react";
import { InterviewContext } from "./App";
import useMutation from '@apollo/client'
// import { interviewEditAction } from './InterviewContext';
// import { interviewEditAction} from './InterviewContext'

// const

const Interview = () => {
  const [text, setText] = useState({ text: "hogehoge" });
  const { state, dispatch } = useContext(InterviewContext);
  // const [hoge] = useMutation()
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          dispatch({ value: { type: "interview:edit", payload: text } })
        }
      >
        buttonA
      </button>
      {/* <button type="button" onClick={()=>interviewEditAction(state)}>buttonB</button> */}
    </div>
  );
};

export default Interview;
