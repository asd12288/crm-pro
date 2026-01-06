"use client";

import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const { isConnected, isConnecting, transcript, startCall, endCall } =
    useVapi();

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <p>Apps/Widget</p>
      <Button onClick={() => startCall()}>Start Call</Button>
      <Button variant="destructive" onClick={() => endCall()}>
        End call
      </Button>
      <p>isConnected: {`${isConnected}`}</p>
      <p>isConnected: {`${isConnecting}`}</p>
      <p>{JSON.stringify(transcript, null, 2)}</p>
    </div>
  );
}
