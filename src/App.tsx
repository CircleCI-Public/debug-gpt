import { useContext, useReducer, useState } from 'react';

import { AskForKey } from './components/AskForKey';
import { AskForPasscode } from './components/AskForPasscode';
import { Item } from './components/Item';
import { LangPicker } from './components/LangPicker';
import { AppContext } from './contexts/AppContext';
import { Message } from './types';
import DeleteSVG from '../assets/delete.svg';
import SettingsSVG from '../assets/settings.svg';
import TranslateSVG from '../assets/translate.svg';

declare global {
  interface Window {
    onData: (msg: Message) => void;
  }
}

const reducer = (
  state: { messages: Message[] },
  action: { type: string; payload?: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
): { messages: Message[] } => {
  if (action.type === 'add_message') {
    return {
      messages: [...state.messages, action.payload?.msg],
    };
  }

  if (action.type === 'clear_messages') {
    return {
      messages: [],
    };
  }

  throw Error('Unknown action.');
};

const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, { messages: [] });
  const { encryptedGPTKey, passcode, setEncryptedKey } = useContext(AppContext);
  const [showLangPicker, setShowLangPicker] = useState(false);

  window.onData = (msg: Message): void => {
    dispatch({ type: 'add_message', payload: { msg } });
  };

  if (!encryptedGPTKey) {
    return <AskForKey />;
  }

  if (!passcode) {
    return <AskForPasscode />;
  }

  if (showLangPicker) {
    return (
      <LangPicker
        onClose={(): void => {
          return setShowLangPicker(false);
        }}
      />
    );
  }

  return (
    <>
      <div className='flex fixed w-full z-50 justify-between bg-gradient-to-r from-slate-600 to-cyan-950 text-white py-2 px-6'>
        <div>
          {state.messages.length > 0 && (
            <img
              src={DeleteSVG}
              onClick={(): void => {
                return dispatch({ type: 'clear_messages' });
              }}
              alt=''
              className='h-4 inline-block opacity-80 invert cursor-pointer'
            />
          )}
        </div>
        <div>
          <img
            src={TranslateSVG}
            onClick={(): void => {
              return setShowLangPicker(true);
            }}
            alt=''
            className='h-4 mr-2 inline-block opacity-80 invert cursor-pointer'
          />
          <img
            src={SettingsSVG}
            onClick={(): void => {
              return setEncryptedKey('');
            }}
            alt=''
            className='h-4 inline-block opacity-80 invert cursor-pointer'
          />
        </div>
      </div>

      <table className='w-full mt-[34px]'>
        <tr className='bg-neutral-100 text-neutral-900'>
          <th className='text-left font-medium py-3 px-6'>Error type</th>
          <th className='text-left font-medium py-3 px-6'>Domain</th>
          <th className='text-left font-medium py-3 px-6'>Time</th>
          <th className='text-left font-medium py-3 px-6'></th>
        </tr>

        {state.messages.length ? (
          state.messages.map((m, key) => {
            return (
              <Item
                message={m}
                key={key}
              />
            );
          })
        ) : (
          <td className='text-left font-normal py-3 px-6 w-full whitespace-break-spaces'>
            Nothing captured yet.
          </td>
        )}
      </table>
    </>
  );
};

export default App;
