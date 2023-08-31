import { useContext, useReducer } from "react";

import {Item} from "./components/Item";
import { AskForKey } from "./components/AskForKey";
import { AskForPasscode } from "./components/AskForPasscode";

import { AppContext } from "./contexts/AppContext";

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

const App = () => {

  const [state, dispatch] = useReducer(reducer, { messages: [] });
  const {encryptedGPTKey, passcode, setEncryptedKey} = useContext(AppContext);

  window.onData = (msg:Message) => {
    dispatch({ type: 'add_message', msg })
  }

  if (!encryptedGPTKey) {
    return <AskForKey />
  }

  if (!passcode) {
    return <AskForPasscode />
  }

  return <>
    <button onClick={() => setEncryptedKey('')}>Change Key</button>
    {(state.messages.length ? state.messages.map((m) =>
      <Item time={m.time} text={m.data.params.entry.text} />
    ) : <p>Nothing captured yet.</p>)}
  </>
}

export default App;
