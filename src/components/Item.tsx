import { useState, useContext } from 'react';

import { AppContext } from '../contexts/AppContext';
import { Message } from '../types';

import SparkleSVG from '../../assets/sparkle.svg';
import PassedSVG from '../../assets/passed.svg';

interface Props {
  message: Message;
}

export const Item = (props: Props) => {
  const { message } = props;
  const [aiResult, setAiResult] = useState<string|null>('');
  const [loadingResult, setLoadingResult] = useState(false);

  const { chatGPTClient } = useContext(AppContext);

  const callAI = async () => {
    setLoadingResult(true);
    const explanation = await chatGPTClient?.getErrorCompletion(message.event);
    setLoadingResult(false);
    console.log(explanation);
    setAiResult(explanation);
  }

  return <tr className={`border-b border-neutral-100 ${aiResult ? 'bg-gradient-to-r from-slate-600 to-cyan-950 text-white': 'bg-white hover:bg-neutral-50'}`}>
    <td className="text-left font-normal py-3 px-6 w-[99%] whitespace-break-spaces">
      {aiResult && <>
        <p>
          <img src={SparkleSVG} alt="" className='h-5 mr-1 inline-block'/>
          <span className="align-bottom">{aiResult}</span>
        </p>
        <details className='opacity-50 cursor-pointer mt-4'>
          <summary className='underline inline-block'>Original Message</summary>
          <p>{message.event}</p>
        </details>
      </>}
      {!aiResult && <p>{message.event}</p>}
    </td>
    <td className="text-left font-normal py-3 px-6 whitespace-nowrap align-baseline">{message.domain}</td>
    <td className="text-left font-normal py-3 px-6 whitespace-nowrap align-baseline">{new Date(message.time).toLocaleTimeString()}</td>
    <td className="py-3 px-6 whitespace-nowrap align-baseline">{!aiResult && <button className="w-28 px-4 py-2 bg-gradient-to-r from-slate-600 to-cyan-950 rounded-3xl justify-center opacity-90 hover:opacity-100" onClick={callAI} disabled={loadingResult}>
      <img src={SparkleSVG} alt="" className='h-5 inline-block'/>
      <span className='text-white align-bottom ml-1'>{loadingResult ? 'Loading...' : 'Enhance'}</span>
    </button>}

    {aiResult && <button className="w-28 px-4 py-2 bg-gradient-to-r from-slate-600 to-cyan-950 rounded-3xl justify-center opacity-90 cursor-not-allowed" disabled={true}>
      <img src={PassedSVG} alt="" className='h-5 inline-block'/>
      <span className='text-white align-bottom ml-1'>Enhanced</span>
    </button>}
    </td>
  </tr>
}
