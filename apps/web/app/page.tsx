"use client";
import { Authenticated, Unauthenticated } from "convex/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <>
      <Authenticated>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <UserButton />
          <p>Apps/web</p>
          <Button onClick={() => addUser()}>Add test user</Button>
          <div className="max-w-sm w-full mx-auto gap-y-4">
            {JSON.stringify(users)}
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Must be logged in</p>
        <SignInButton>Sign In</SignInButton>
      </Unauthenticated>
    </>
  );
}
