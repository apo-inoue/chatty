import React, { Context, createContext, useReducer } from "react";
import Amplify from "@aws-amplify/core";
import awsmoblile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import Interview from "./Interview";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
  useMutation,
  gql,
} from "@apollo/client";

Amplify.configure(awsmoblile);

// const greet = (value:{type:string, payload:any}) => console.log("hello", value.type)
export const InterviewContext: Context<{
  state: { text: string };
  dispatch: React.Dispatch<any>;
}> = createContext({ state: {} as any, dispatch: {} as any });

const reducer = (state: any, action: { type: any; payload: any }) => {
  const { type, payload } = action;
  console.log(action, state);
  switch (type) {
    case "interview:edit":
      console.log("edit!");
      return { ...state, ...payload };
    default:
      console.log("default!");
      return state;
  }
};

const initialState = { text: "新規問診票" };

const WRITE_ANYTHING = gql`
  mutation WriteAnything {
    writeAnything @client {
      todos
    }
  }
`;

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  console.log("App, state", state);
  const [writeAnything] = useMutation(WRITE_ANYTHING);
  return (
    <InterviewContext.Provider value={value}>
      <Interview />
      <button type="button" onClick={() => writeAnything()}>
        buto
      </button>
    </InterviewContext.Provider>
  );
};

//@ts-ignore
export default App;
