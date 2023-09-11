import { useContext, useReducer } from "react";

import {Item} from "./components/Item";
import { AskForKey } from "./components/AskForKey";
import { AskForPasscode } from "./components/AskForPasscode";

import SettingsSVG from '../assets/settings.svg';
import DeleteSVG from '../assets/delete.svg';

import { AppContext } from "./contexts/AppContext";

import { Message } from './types';

declare global {
  interface Window { onData: (msg: Message) => void; }
}

const reducer = (state: {messages: Message[]}, action: {type: string, payload?: any}) => {
  if (action.type === 'add_message') {
    return {
      messages: [...state.messages, action.payload?.msg]
    };
  }

  if (action.type === 'clear_messages') {
    return {
      messages: []
    };
  }

  throw Error('Unknown action.');
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, { messages: [] });
  const {encryptedGPTKey, passcode, setEncryptedKey} = useContext(AppContext);

  window.onData = (msg:Message) => {
    dispatch({ type: 'add_message', payload: {msg} })
  }

  if (!encryptedGPTKey) {
    return <AskForKey />
  }

  if (!passcode) {
    return <AskForPasscode />
  }

  return <>
    <div className="flex gap-2 items-end bg-gradient-to-r from-slate-600 to-cyan-950 text-white py-2 px-6">
      <img src={SettingsSVG} onClick={() => setEncryptedKey('')} alt="" className='h-4 inline-block opacity-80 invert cursor-pointer'/>
      {state.messages.length > 0 && <img src={DeleteSVG} onClick={() => dispatch({ type: 'clear_messages' })} alt="" className='h-4 inline-block opacity-80 invert cursor-pointer'/>}
    </div>

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
