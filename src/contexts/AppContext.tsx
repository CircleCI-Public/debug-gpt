import { createContext, useState, useEffect } from 'react';

import { useChromeStorageLocal } from 'use-chrome-storage';

import { Configuration, ChatGPTClient } from '../utils/chatgpt-api-client.js';
import { decrypt } from '../utils/security';

export interface AppContextProps {
  chatGPTClient: ChatGPTClient | null;
  encryptedGPTKey: string;
  setEncryptedKey: (key: string) => void;
  passcode: string;
  setPasscode: (passcode: string) => void;
  gptLang: string;
  setGPTLang: (lang: string) => void;
}

export const AppProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [chatGPTClient, setChatGPTClient] = useState<ChatGPTClient | null>(
    null,
  );
  const [encryptedGPTKey, setEncryptedKey] = useChromeStorageLocal(
    'gptkey',
    '',
  );
  const [passcode, setPasscode] = useState('');

  const [gptLang, setGPTLang] = useChromeStorageLocal('gptlang', 'english');

  useEffect(() => {
    if (passcode && encryptedGPTKey) {
      const apiKey = decrypt(encryptedGPTKey, passcode);
      setChatGPTClient(new ChatGPTClient(new Configuration({ apiKey })));
    }
  }, [encryptedGPTKey, passcode]);

  return (
    <AppContext.Provider
      value={{
        chatGPTClient,
        encryptedGPTKey,
        setEncryptedKey,
        passcode,
        setPasscode,
        gptLang,
        setGPTLang,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppContext = createContext<AppContextProps | null>(
  null,
) as React.Context<AppContextProps>;
