import {useState} from 'react';

import { Configuration, ChatGPTClient } from '../utils/chatgpt-api-client.js'

import ErrorSVG from '../../assets/error.svg';
import AiSVG from '../../assets/ai.svg';

const apiKey = 'YOUR_KEY_HERE' //chrome.storage.local.get("apiKey").catch(console.error);
const client = new ChatGPTClient(new Configuration({ apiKey }))

interface Props {
  time: Date;
  text: String;
}

export const Item = (props: Props) => {
  const {time, text} = props;
  const [aiResult, setAiResult] = useState<string|null>(null);
  const [loadingResult, setLoadingResult] = useState(false);

  const callAI = async () => {
    setLoadingResult(true);
    const explanation = await client.getErrorCompletion(text);
    setLoadingResult(false);
    setAiResult(explanation);
  }

  return <div className="item">
    <div className={aiResult ? 'data data-ai' : 'data'}>
      <p>
        <img src={ErrorSVG} className='error' alt="" />
        {aiResult ? aiResult : text}
      </p>
      <p className="time">{time.toString()}</p>
    </div>
    {!aiResult && <button className="enhance" onClick={callAI} disabled={loadingResult}>
      <img src={AiSVG} alt="" className='ai'/>
      {loadingResult ? 'Loading...' : 'Enhance'}
    </button>}
  </div>
}
