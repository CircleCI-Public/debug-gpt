import {useState, useContext} from "react";

import { AppContext } from '../contexts/AppContext';

import { encrypt } from "../utils/security";

export const AskForKey = () => {

  const [error, setError] = useState('');
  const [apiKeyValue, setAPIKeyValue] = useState('');
  const [passcodeValue, setPasscodeValue] = useState('');

  const { setPasscode, setEncryptedKey } = useContext(AppContext);

  const submit = () => {
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
  }

  return <div>
    <input type="password" value={apiKeyValue} onChange={(e) => setAPIKeyValue(e.target.value)} placeholder="chatGPT API key" />
    <input type="password" value={passcodeValue}  onChange={(e) => setPasscodeValue(e.target.value)} placeholder="passcode" />
    <p>something here about why we ask for a passcode</p>
    <button onClick={submit}>submit</button>
    {error && <p>Error: {error}</p>}
  </div>
}
