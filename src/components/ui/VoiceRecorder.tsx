'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language-context';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  isProcessing?: boolean;
}

const langMap: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  mr: 'mr-IN',
  pa: 'pa-IN',
  gu: 'gu-IN'
};

export function VoiceRecorder({ onTranscription, isProcessing = false }: VoiceRecorderProps) {
  const { t, lang } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsRecording(true);
        setError('');
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscription(transcript);
        setIsRecording(false);
      };
      
      recognition.onerror = (event: any) => {
        if (event.error === 'aborted') {
          return; // Expected when user manually stops recording
        }
        
        console.error('Speech recognition error', event.error);
        setError(event.error === 'not-allowed' ? t("voice.micDenied") : t("voice.recognitionFailed"));
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      setError(t("voice.apiNotSupported"));
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onTranscription]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      if (!recognitionRef.current) return;
      // Set the appropriate language based on user context
      recognitionRef.current.lang = langMap[lang] || 'en-IN';
      recognitionRef.current.start();
    }
  };

  const disabled = isProcessing || !recognitionRef.current;

  return (
    <div className="flex items-center justify-center relative group">
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={toggleRecording}
        disabled={disabled}
        title={error || t("voice.recordVoice")}
        className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-colors
          ${error ? 'bg-rose-500 text-white hover:bg-rose-600' : isRecording ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'}
          ${disabled && !error ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isRecording && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-red-400"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        
        {disabled && !error ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : error ? (
          <AlertCircle className="w-5 h-5" />
        ) : isRecording ? (
          <Square className="w-5 h-5 fill-current" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
}
