import {useState, useContext} from "react";

import { AppContext } from '../contexts/AppContext';

export const AskForPasscode = () => {

  const [error, setError] = useState('');
  const [passcodeValue, setPasscodeValue] = useState('');

  const { setPasscode } = useContext(AppContext);

  const submit = () => {
    setError('');

    if (passcodeValue.length < 4) {
      return setError('Passcode needs to be at least 4 characters long');
    }

    setPasscode(passcodeValue);
  }

  return <div>
    <input type="password" value={passcodeValue}  onChange={(e) => setPasscodeValue(e.target.value)} placeholder="passcode" />
    <button onClick={submit}>submit</button>
    {error && <p>Error: {error}</p>}

  </div>
}
