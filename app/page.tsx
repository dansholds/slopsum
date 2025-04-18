"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Helpers
const PHRASES = Object.freeze([
  "skibidi",
  "rizz",
  "fr fr",
  "sigma",
  "no cap",
  "bussin",
  "sheesh",
  "based",
  "sus",
  "vibing",
  "caught in 4k",
  "ratio",
  "mid",
  "yeet",
  "slay",
  "bet",
  "finna",
  "on god",
  "deadass",
  "lowkey",
  "highkey",
  "cringe",
  "chad",
  "L",
  "W",
  "glizzy",
  "bruh moment",
  "simp",
  "main character energy",
  "rent free",
  "living my best life",
  "understood the assignment",
  "it's giving",
  "ate that",
  "slept on",
  "hits different",
  "down bad",
  "touch grass",
  "unhinged",
  "vibe check",
  "pressed",
  "boujee",
  "drip",
  "glow up",
  "sending me",
  "that's fire",
  "straight facts",
  "cap",
  "banger",
  "valid",
  "shook",
  "goated",
  "built different",
  "say less",
  "slaps",
  "stan",
  "tea",
  "woke",
  "clout",
  "fit",
  "flex",
  "iconic",
  "lit",
  "mood",
  "periodt",
  "snatched",
  "soft launch",
  "toxic",
] as const);

const ENDINGS = [".", "!", "?"] as const;

const clampInput = (value: number, min = 1, max = 10) =>
  Math.max(min, Math.min(max, value));

const getRandomItem = <T,>(arr: readonly T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const generateSentence = () => {
  const length = 5 + Math.floor(Math.random() * 10);
  return (
    Array.from({ length }, (_, i) => {
      let word = getRandomItem(PHRASES);
      if (i === 0) word = word.charAt(0).toUpperCase() + word.slice(1);
      if (i < length - 1 && Math.random() > 0.7) word += ",";
      return word;
    }).join(" ") + getRandomItem(ENDINGS)
  );
};

const generateParagraph = (sentences: number) =>
  Array.from({ length: sentences }, generateSentence).join(" ");

export default function BrainRotGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentencesPerParagraph, setSentencesPerParagraph] = useState(4);
  const [generatedText, setGeneratedText] = useState("");
  const { toast } = useToast();

  const generateText = useCallback(() => {
    const output = Array.from({ length: paragraphs }, () =>
      generateParagraph(sentencesPerParagraph),
    ).join("\n\n");
    setGeneratedText(output);
  }, [paragraphs, sentencesPerParagraph]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      toast({
        title: "Copied to clipboard",
        description: "The generated text has been copied to your clipboard.",
        duration: 3000,
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Something went wrong while copying.",
        variant: "destructive",
      });
    }
  }, [generatedText, toast]);

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-blue-50 py-2 text-center text-sm text-blue-600">
        ✨ Introducing: Brain Rot Generator. No cap.
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl mb-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-600 mb-4 font-fira tracking-wider">
            slop my ipsum
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A sigma lorem ipsum alternative that slaps low key on god fr.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                max={10}
                value={paragraphs}
                onChange={(e) =>
                  setParagraphs(clampInput(parseInt(e.target.value) || 1))
                }
                className="w-24"
              />
              <span className="text-gray-500">paragraphs</span>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                max={10}
                value={sentencesPerParagraph}
                onChange={(e) =>
                  setSentencesPerParagraph(
                    clampInput(parseInt(e.target.value) || 1),
                  )
                }
                className="w-24"
              />
              <span className="text-gray-500">sentences each</span>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-16">
            <Button
              onClick={generateText}
              className="bg-blue-600 hover:bg-blue-700 gap-2"
              size="lg"
            >
              <RefreshCw className="w-4 h-4" />
              Generate now
            </Button>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="gap-2"
              size="lg"
              disabled={!generatedText}
            >
              <Copy className="w-4 h-4" />
              Copy text
            </Button>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 text-left">
            <Textarea
              value={generatedText}
              readOnly
              rows={12}
              className="font-mono text-sm bg-transparent border-0 text-gray-300 focus-visible:ring-0 resize-none"
              placeholder="Your generated text will appear here..."
            />
          </div>
        </div>
      </div>

      <footer className="mt-8 pb-8 text-center text-sm text-gray-500">
        Created by{" "}
        <a
          href="https://x.com/grapplingdev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Dan
        </a>
      </footer>
    </div>
  );
}
