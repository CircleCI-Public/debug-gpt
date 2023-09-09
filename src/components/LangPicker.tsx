import {useContext, useState} from "react";

import { AppContext } from '../contexts/AppContext';

interface Props {
  onClose: () => void;
}

export const LangPicker = ({onClose}: Props) => {
  const { gptLang, setGPTLang } = useContext(AppContext);
  const [selectValue, setSelectValue] = useState(gptLang);

  const submit = () => {
    if (gptLang !== selectValue) {
      setGPTLang(selectValue);
    }
    onClose();
  }

  return <div className="container mx-auto text-neutral-900 h-screen bg-white">
    <div className="flex flex-col items-center max-w-lg m-auto h-screen justify-center">
      <h1 className="text-center text-neutral-900 text-2xl font-medium mb-5">Select which language Debug-GPT should answer in:</h1>

      <select name="lang" className="w-full px-1 py-2 rounded border border-neutral-400" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
        <option value="English">English</option>
        <option value="Arabic">Arabic</option>
        <option value="Chinese">Chinese</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Hindi">Hindi</option>
        <option value="Italian">Italian</option>
        <option value="Japanese">Japanese</option>
        <option value="Korean">Korean</option>
        <option value="Portuguese">Portuguese</option>
        <option value="Spanish">Spanish</option>
        <option value="Thai">Thai</option>
      </select>
      <p className="text-neutral-400 mt-1 mb-2">Note: OpenAI translations quality can vary depending on the complexity of your errors.</p>

      <button onClick={submit} className="w-72 h-10 mt-6 px-4 py-2 bg-gradient-to-r from-slate-600 to-cyan-950 rounded-3xl justify-center text-white text-sm font-medium">Submit</button>
    </div>
  </div>
}
