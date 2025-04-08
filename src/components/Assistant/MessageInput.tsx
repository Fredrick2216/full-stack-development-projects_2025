
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon, Loader2 } from "lucide-react";

interface MessageInputProps {
  inputValue: string;
  isThinking: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputValue,
  isThinking,
  onChange,
  onKeyPress,
  onSend,
}) => {
  return (
    <div className="mt-auto relative">
      <Input
        placeholder="Ask a question..."
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyPress}
        disabled={isThinking}
        className="pr-12 bg-secondary/60 text-sm"
      />
      <Button
        size="icon"
        className={`absolute right-1 top-[5px] h-8 w-8 ${
          !inputValue.trim() || isThinking
            ? "text-muted-foreground"
            : "text-space-accent"
        }`}
        disabled={!inputValue.trim() || isThinking}
        onClick={onSend}
      >
        {isThinking ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <SendIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default MessageInput;
