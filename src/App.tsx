import { useReducer } from "react";
import {Item} from "./components/Item";

interface Message {
  uuid: string;
  time: Date;
  data: {
    source: any;
    method: string;
    params: any;
  };
}

declare global {
  interface Window { onData: (msg: Message) => void; }
}

const reducer = (state:{messages: Message[]}, action:{type: string, msg: Message}) => {
  if (action.type === 'add_message') {
    return {
      messages: [...state.messages, action.msg]
    };
  }
  throw Error('Unknown action.');
}

function App() {

  const [state, dispatch] = useReducer(reducer, { messages: [] });

  window.onData = (msg:Message) => {
    dispatch({ type: 'add_message', msg })
  }

  if (!state.messages) {
    return <p>No events yet. Configure your key?</p>
  }

  return <>
    {state.messages.map((m) =>
      <Item time={m.time} text={m.data.params.entry.text} />
    )}
  </>
}

export default App;
