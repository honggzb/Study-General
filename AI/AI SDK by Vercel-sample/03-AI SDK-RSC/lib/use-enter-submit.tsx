"use client";

import { useRef } from "react";

export function useEnterSubmit(): {
  formRef: React.RefObject<HTMLFormElement>;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
} {

  const formRef = useRef<HTMLFormElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if(e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  return { formRef, onKeyDown: handleKeyDown };

}