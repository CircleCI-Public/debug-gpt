import { useState, useContext } from 'react';

import { AppContext } from '../contexts/AppContext';
import { encrypt } from '../utils/security';

export const AskForKey = (): JSX.Element => {
  const [error, setError] = useState('');
  const [apiKeyValue, setAPIKeyValue] = useState('');
  const [passcodeValue, setPasscodeValue] = useState('');

  const { setPasscode, setEncryptedKey } = useContext(AppContext);

  const submit = (): void => {
    setError('');

    if (passcodeValue.length < 4) {
      return setError('Passcode needs to be at least 4 characters long');
    }

    if (!apiKeyValue.length) {
      return setError('API key cannot be empty');
    }

    if (apiKeyValue.length && passcodeValue) {
      const encryptedKey = encrypt(apiKeyValue, passcodeValue);
      setEncryptedKey(encryptedKey);
      setPasscode(passcodeValue);
    }
  };

  return (
    <div className='container mx-auto text-neutral-900 h-screen bg-white'>
      <div className='flex flex-col items-center max-w-lg m-auto h-screen justify-center'>
        <h1 className='text-center text-neutral-900 text-2xl font-medium mb-5'>
          To enhance your debugging session with Debug-GPT, add your OpenAI API
          key
        </h1>

        <input
          className='w-full px-4 py-2 rounded border border-neutral-400'
          type='password'
          value={apiKeyValue}
          onChange={(e): void => {
            return setAPIKeyValue(e.target.value);
          }}
          placeholder='OpenAI API key'
        />
        <p className='text-neutral-400 mt-1 mb-2'>
          Visit the{' '}
          <a
            className='text-blue-500 underline'
            href='https://platform.openai.com/account/api-keys'
            rel='noreferrer'
          >
            API Keys
          </a>{' '}
          page in your OpenAI user settings to retrieve the key.
        </p>

        <input
          className='w-full px-4 py-2 rounded border border-neutral-500'
          type='password'
          value={passcodeValue}
          onChange={(e): void => {
            return setPasscodeValue(e.target.value);
          }}
          placeholder='Personal passcode'
        />
        <p className='text-neutral-400 mt-1 text-center'>
          For added security, we encrypt your API key with a personal passcode.
        </p>
        <p className='text-neutral-400 text-center'>
          We recommend storing this in a password manager.
        </p>

        <button
          onClick={submit}
          className='w-72 h-10 mt-6 px-4 py-2 bg-gradient-to-r from-slate-600 to-cyan-950 rounded-3xl justify-center text-white text-sm font-medium'
        >
          Submit
        </button>
        {error && <p className='text-red-500 my-2'>Error: {error}</p>}
      </div>
    </div>
  );
};
