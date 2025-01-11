import { useState } from 'react'
import langData from './language.json'
import {InputBox,Container} from './components'
import axios from 'axios'

function App() {
  const [to, setTo] = useState(langData['hi']);
  const [from, setFrom] = useState(langData['en']);
  const [toValue, setToValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [translating,setTranslating] = useState(false)
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  console.log('API URL:', apiUrl);
  const axiosInstance = axios.create({
    baseURL: apiUrl, // Backend URL
    withCredentials: true, // Include cookies or auth headers if needed
  });

  console.log('Rendering App component');

  const handleTranslation = async (text = '') => {
    setTranslating(true)
    console.log('From:', from);
    console.log('To:', to);
    console.log('FromValue:', text);
    console.log('ToValue:', toValue);

    let sourceLang = from
    try {
      if (from === 'detect') {
        console.log('Detecting language');
        const detectedLanguage = await axiosInstance.get('/detect', {
          params: {
            text,
          },
        });
        console.log('Detected language response:', detectedLanguage);
        console.log('Detected language data:', detectedLanguage.data);
        if (detectedLanguage && detectedLanguage.data) {
          const detectedLang = detectedLanguage.data.trim();
          console.log('Detected language:', detectedLang);
          sourceLang = detectedLang;
          setFrom(detectedLang);
          console.log('Detected language set to:', from);
        }
      }

      if (from !== 'detect') {
        console.log('Translating text');
        const translation = await axiosInstance.get('/translate', {
          params: {
            from:sourceLang,
            to,
            text,
          },
        });
        console.log('Translation response:', translation);
        console.log('Translation data:', translation.data);
        if (translation && translation.data) {
          setToValue(translation.data);
          console.log('Translated text set to:', toValue);
        }
      }

      setTranslating(false)
    } catch (error) {
      console.error('Error during translation:', error);
    }
  };

  return (
    <Container className={'bg-blue-500 w-full overflow-hidden min-h-screen ' }>
      <Container className={'text-white'}>
        <h1 className='text-[2em] text-center '>AI Translator</h1>
        <Container className={'flex justify-center'}>
          <img src='../assets/github_svg.svg' className='w-6 invert'/>
          <a href="https://github.com/akilkhatri104/" target='_blank' className='px-2'>
          Github</a>

          <img src='../assets/linkedin.svg' className='w-6 invert' />
          <a href="https://www.linkedin.com/in/akil-khatri-70a445319/" target='_blank' className='px-2'>Linkedin</a>

          <img src='../assets/twitter_x_svg.svg' className='w-6 invert'/>
          <a href="https://x.com/AkilKhatri61892" target='_blank' className='px-2'>Twitter</a>
        </Container>
      </Container>
      <Container className={'bg-blue-300 mx-auto my-auto sm:w-[50%] flex flex-col justify-items-center justify-center p-5'}>

        <select onChange={(e) => setFrom(e.target.value)} value={from} className='p-2 rounded-md'>
          
          {
            Object.keys(langData).map(lang => 
              <option value={langData[lang]} key={langData[lang]}>{langData[lang]}</option>
            )
          }
        </select>
        <InputBox className={''}  value={fromValue} onChange={(e) => setFromValue(e.target.value)} 
        placeholder='Enter the the text to translate'
        />

        <button className='bg-blue-600 text-white rounded-lg p-2 m-2 mx-auto' onClick={() => handleTranslation(fromValue)}>Translate</button>
        {
          translating && (
            <p className='text-black text-center text-lg p-2'>Translating...</p>
          )
        }
        
        <select onChange={(e) => setTo(e.target.value)} value={to} className='p-2 rounded-md'>
          {
            Object.keys(langData).map(lang => 
              <option value={langData[lang]} key={langData[lang]}>{langData[lang]}</option>
            )
          }
        </select>
        <InputBox className={''} readOnly
        placeholder='translated text will be showed here'
        value={toValue}
        />
      </Container>
    </Container>
  );
}

export default App
