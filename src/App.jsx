import { useState } from 'react'
import langData from './language.json'
import {InputBox,Container} from './components'
import model from  './Model'

function App() {
  const [to, setTo] = useState('hi');
  const [from, setFrom] = useState('detect');
  const [toValue, setToValue] = useState('');
  const [fromValue, setFromValue] = useState('');

  const handleTranslation = async (text) => {
    try {
      if (from === 'detect') {
        const detectedLanguage = await model.detectLanguage(text);
        if (detectedLanguage && detectedLanguage.content) {
          setFromValue(detectedLanguage.content);
        }
      }

      const translation = await model.translate({ from, to, text });
      if (translation && translation.content) {
        setToValue(translation.content);
      }
    } catch (error) {
      console.error('Error during translation:', error);
    }
  };

  return (
    <Container className="bg-gray-800 text-white h-screen">
      <header></header>

      <Container className="grid grid-cols-2">
        <Container>
          <select
            className="bg-gray-600 p-1"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="detect" key="detect">
              Detect Language
            </option>
            {Object.keys(langData).map((lang) => (
              <option value={lang} key={lang}>
                {langData[lang]}
              </option>
            ))}
          </select>
          <InputBox
            value={toValue}
            onChange={(e) => {
              const text = e.target.value;
              setToValue(text);
              handleTranslation(text);
            }}
          />
        </Container>

        <Container>
          <select
            className="bg-gray-600 p-1"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {Object.keys(langData).map((lang) => (
              <option value={lang} key={lang}>
                {langData[lang]}
              </option>
            ))}
          </select>
          <InputBox value={fromValue} readOnly={true} />
        </Container>
      </Container>
    </Container>
  );
}

export default App
