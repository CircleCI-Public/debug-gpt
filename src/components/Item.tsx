import { useState, useContext } from 'react';

import { AppContext } from '../contexts/AppContext';
import { Message } from '../types';

import ErrorSVG from '../../assets/error.svg';
import AiSVG from '../../assets/ai.svg';

interface Props {
  message: Message;
}

export const Item = (props: Props) => {
  const { message } = props;
  const [aiResult, setAiResult] = useState<string|null>(null);
  const [loadingResult, setLoadingResult] = useState(false);

  const { chatGPTClient } = useContext(AppContext);

  const callAI = async () => {
    setLoadingResult(true);
    const explanation = await chatGPTClient?.getErrorCompletion(message.event);
    setLoadingResult(false);
    setAiResult(explanation);
  }

  return <div className="item">
    <div className={aiResult ? 'data data-ai' : 'data'}>
      <p>
        <img src={ErrorSVG} className='error' alt="" />
        {aiResult ? aiResult : `[${message.domain}] ${message.event}`}
      </p>
      <p className="time">{message.time.toString()}</p>
    </div>
    {!aiResult && <button className="enhance" onClick={callAI} disabled={loadingResult}>
      <img src={AiSVG} alt="" className='ai'/>
      {loadingResult ? 'Loading...' : 'Enhance'}
    </button>}
  </div>
}
