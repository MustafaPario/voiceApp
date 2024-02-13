import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState } from "react";

const App = () => {
    const [textToCopy, setTextToCopy] = useState("");
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

    const cleanText = () => {
        setTextToCopy("");
        resetTranscript();
    };

    const copyToClipboard = () => {
        if (textToCopy.trim() !== "") {
            setCopied(textToCopy);
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    return (
        <>
        <center>
            <div className="container">
                <h2>Speech to Text Converter</h2>
                <br />
                <p className="speech-to-text">An innovative tool that captures speech from the microphone and converts it into text.</p>

                <div className="main-content" onClick={() => setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="btn-style">
                    <button onClick={copyToClipboard}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button onClick={cleanText}>Clean Clipboard</button>
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                </div>
            </div>
            </center>

            
        </>
    );
};



export default App;
