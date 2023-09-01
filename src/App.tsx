import { useContext, useEffect, useReducer } from "react";

import {Item} from "./components/Item";
import { AskForKey } from "./components/AskForKey";
import { AskForPasscode } from "./components/AskForPasscode";

import { AppContext } from "./contexts/AppContext";

import { Message } from './types';

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
    {/* <button onClick={() => setEncryptedKey('')}>Change Key</button> */}

    <table className="w-full">
      <tr className="bg-neutral-100 text-neutral-900">
        <th className="text-left font-medium py-3 px-6">Error type</th>
        <th className="text-left font-medium py-3 px-6">Domain</th>
        <th className="text-left font-medium py-3 px-6">Time</th>
        <th className="text-left font-medium py-3 px-6"></th>
      </tr>

    {(state.messages.length ? state.messages.map((m) =>
      <Item message={m} />
    ) : <td className="text-left font-normal py-3 px-6 w-full whitespace-break-spaces">Nothing captured yet.</td>)}
    </table>
  </>
}

export default App;
