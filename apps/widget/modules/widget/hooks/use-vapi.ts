import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

  useEffect(() => {
    // only for testing
    const vapiInstence = new Vapi("851bb276-2813-44ab-8f23-55c32c409529");
    setVapi(vapiInstence);

    vapiInstence.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([]);
    });

    vapiInstence.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });

    vapiInstence.on("speech-start", () => {
      setIsSpeaking(false);
    });

    vapiInstence.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstence.on("error", (error) => {
      console.log(error);
      setIsConnecting(false);
    });

    vapiInstence.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript,
          },
        ]);
      }
    });

    return () => {
      vapiInstence?.stop();
    };
  }, []);

  const startCall = () => {
    setIsConnecting(true);

    if (vapi) {
      vapi.start("55ba635e-6068-4e6d-afce-f6eef5aa97d5");
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };
  return {
    isConnected,
    isSpeaking,
    isConnecting,
    transcript,
    startCall,
    endCall,
  };
};
