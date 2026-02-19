import CustomButton from './CustomButton';
import { useState, useEffect, useRef } from 'react';
import Microphone from '../assets/microphone.svg';

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

type AIPickerProps = {
  prompt: string;
  setPrompt: (prompt: string) => void;
  generatingImg: boolean;
  handleSubmit: (type: string) => void;
}

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }: AIPickerProps) => {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            setPrompt(finalTranscript);
          } else if (interimTranscript) {
            setPrompt(interimTranscript);
          }
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [setPrompt]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // const handleChatSubmit = async () => {
  //   if (!prompt) return alert("Please enter a prompt");
  //   try {
  //     setIsLoadingChat(true);
  //     const response = await fetch('http://localhost:5000/api/v1/openai/chat', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ prompt })
  //     });
  //     const data = await response.json();
  //     setAiResponse(data.response);
  //   } catch (error: any) {
  //     alert(error.message || 'Failed to get AI response');
  //   } finally {
  //     setIsLoadingChat(false);
  //   }
  // };

  return (
    <div className="aipicker-container">
      <div className="relative">
        <textarea
          placeholder="Ask AI... (or use voice input)"
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="aipicker-textarea"
        />
        {speechSupported && (
          <button
            onClick={toggleListening}
            className={`absolute right-2 bottom-2 p-2 rounded-full transition-colors ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {/* <Microphone className="w-5 h-5" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
          </button>
        )}
      </div>

      {isListening && (
        <p className="text-xs text-red-500 mt-1 animate-pulse">
          🎤 Listening... Speak now
        </p>
      )}

      {aiResponse && (
        <div className="mt-3 p-3 bg-gray-100 rounded-lg max-h-32 overflow-y-auto">
          <p className="text-xs text-gray-500 font-semibold mb-1">AI Response:</p>
          <p className="text-sm text-gray-700">{aiResponse}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-3">
        {generatingImg || isLoadingChat ? (
          <CustomButton
            type="outline"
            title={isLoadingChat ? "Getting response..." : "Asking AI..."}
            customStyles="text-xs"
          />
        ) : (
          <>
            {/* <CustomButton
              type="outline"
              title="AI Chat"
              handleClick={handleChatSubmit}
              customStyles="text-xs"
            /> */}
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit('logo')}
              customStyles="text-xs"
            />

            <CustomButton
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit('full')}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker