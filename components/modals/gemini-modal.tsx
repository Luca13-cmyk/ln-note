"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGemini } from "@/hooks/use-gemini";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import model from "@/lib/gemini";
import ReactMarkdown from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  Clipboard,
  ClipboardCheck,
  MessageCircleQuestion,
  ScanText,
  SendHorizonalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

export const GeminiModal = () => {
  const toggle = useGemini((store) => store.toggle);
  const isOpen = useGemini((store) => store.isOpen);
  const onClose = useGemini((store) => store.onClose);
  const selectedText = useGemini((store) => store.selectedText);
  const onResponse = useGemini((store) => store.onResponse);
  // const response = useGemini((store) => store.response);
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "g" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 4000);
  };
  if (!isMounted) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setText("");
        onClose();
      }}
    >
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Gemini</h2>
          <p>
            Selecione o texto no editor e pressione{" "}
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>G
            </kbd>
          </p>
          <div className="flex justify-between items-center  space-y-4">
            <div className="flex space-x-2">
              <Button
                className="gap-x-2"
                variant="outline"
                size="sm"
                onClick={async () => {
                  setText("");
                  const result = await model.generateContentStream(
                    `Reescreva o seguinte: ${selectedText}`
                  );

                  for await (const chunk of result.stream) {
                    const chunkText = chunk.text();

                    setText((prev) => (prev += "Gemini: " + chunkText));
                  }
                  onResponse(text);
                }}
              >
                <span>Reescrever</span>
                <ScanText />
              </Button>
              <Button
                className="gap-x-2"
                variant="outline"
                size="sm"
                onClick={async () => {
                  setText("");
                  const result = await model.generateContentStream(
                    `Responda a seguinte pergunta: ${selectedText}`
                  );

                  for await (const chunk of result.stream) {
                    const chunkText = chunk.text();

                    setText((prev) => (prev += "Gemini: " + chunkText));
                  }
                  onResponse(text);
                }}
              >
                <span>Perguntar</span>
                <MessageCircleQuestion />
              </Button>
            </div>

            <CopyToClipboard text={text} onCopy={handleCopy}>
              {isCopied ? (
                <ClipboardCheck className="self-end text-green-400 scale-110" />
              ) : (
                <Clipboard
                  className="self-end cursor-pointer"
                  onClick={handleCopy}
                />
              )}
            </CopyToClipboard>
          </div>
        </DialogHeader>
        <div className="flex flex-col items-center justify-between gap-y-4">
          <div className="overflow-y-auto h-[350px] w-full text-base  rounded-md p-4 dark:bg-black bg-gray-100 select-all">
            <ReactMarkdown className={cn("prose dark:prose-invert")}>
              {text ? text : selectedText}
            </ReactMarkdown>
          </div>
          <DialogFooter className="w-full">
            <div className="flex justify-around items-center w-full gap-x-2">
              <div className="w-full">
                <Input
                  placeholder="Pergunte qualquer coisa..."
                  onChange={(value) => setInputText(value.target.value)}
                  value={inputText}
                />
              </div>
              <Button
                className="gap-x-2"
                variant="outline"
                size="sm"
                onClick={async () => {
                  // setText((prev) => (prev += "Você: " + inputText));
                  setText("");

                  const result = await model.generateContentStream(
                    `${inputText}`
                  );
                  setInputText("");
                  for await (const chunk of result.stream) {
                    const chunkText = chunk.text();

                    setText((prev) => (prev += "Gemini: " + chunkText));
                  }
                  onResponse(text);
                }}
              >
                <SendHorizonalIcon />
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
