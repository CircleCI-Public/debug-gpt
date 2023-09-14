import { useState, useContext } from 'react';

import { AppContext } from '../contexts/AppContext';

export const AskForPasscode = (): JSX.Element => {
  const [error, setError] = useState('');
  const [passcodeValue, setPasscodeValue] = useState('');

  const { setPasscode, setEncryptedKey } = useContext(AppContext);

  const submit = (): void => {
    setError('');

    if (passcodeValue.length < 4) {
      return setError('Passcode needs to be at least 4 characters long');
    }

    setPasscode(passcodeValue);
  };

  const reset = (): void => {
    setEncryptedKey('');
  };

  return (
    <div className='container mx-auto text-neutral-900 h-screen bg-white'>
      <div className='flex flex-col items-center max-w-lg m-auto h-screen justify-center'>
        <h1 className='text-center text-neutral-900 text-2xl font-medium mb-5'>
          We need your passcode to securely use your OpenAI API Key
        </h1>

        <input
          className='w-full px-4 py-2 rounded border border-neutral-400'
          type='password'
          value={passcodeValue}
          onChange={(e): void => {
            return setPasscodeValue(e.target.value);
          }}
          placeholder='Personal passcode'
        />
        <button
          onClick={submit}
          className='w-72 h-10 mt-6 px-4 py-2 bg-gradient-to-r from-slate-600 to-cyan-950 rounded-3xl justify-center text-white text-sm font-medium'
        >
          Submit
        </button>
        <p
          onClick={reset}
          className='text-neutral-500 mt-1 underline cursor-pointer'
        >
          {`I don't remember`}
        </p>
        {error && <p className='text-red-500 my-2'>Error: {error}</p>}
      </div>
    </div>
  );
};
