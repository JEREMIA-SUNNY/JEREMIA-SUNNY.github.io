"use client";

import { useEffect, useState } from "react";

const TYPE_SPEED_MS = 70;
const DELETE_SPEED_MS = 40;
const PAUSE_MS = 1600;

export function useTypewriter(words: readonly string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    const atWordEnd = !deleting && text === currentWord;
    const atWordStart = deleting && text === "";
    const delay = atWordEnd ? PAUSE_MS : deleting ? DELETE_SPEED_MS : TYPE_SPEED_MS;

    const timeout = setTimeout(() => {
      if (atWordEnd) {
        setDeleting(true);
      } else if (atWordStart) {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText((t) =>
          deleting ? currentWord.slice(0, t.length - 1) : currentWord.slice(0, t.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}
