import React, { useEffect, useRef, useState } from "react";

const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.interimResults = true;
    recognition.lang = "de-DE";  // Change language to German
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        interimTranscript += event.results[i][0].transcript;
      }

      setTranscript(interimTranscript); // Update with the new text only
    };

    recognition.onend = () => {
      setIsListening(false); // Stop listening
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    return () => {
      if (recognition) recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript(""); // Clear previous transcript
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  return {
    startListening,
    stopListening,
    transcript,
    isListening,
  };
};

export default useSpeechToText;
