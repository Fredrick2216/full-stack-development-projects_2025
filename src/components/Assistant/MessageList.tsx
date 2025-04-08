
import React from "react";
import { Loader2 } from "lucide-react";
import { Message } from "./types";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  isThinking: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  isThinking, 
  messagesEndRef 
}) => {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-1">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isThinking && (
        <div className="flex justify-start">
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 bg-space-accent">
              <Bot className="h-5 w-5" />
            </Avatar>
            <div className="bg-secondary rounded-2xl px-4 py-3 flex items-center gap-1">
              <div className="h-2 w-2 bg-space-accent rounded-full animate-pulse" />
              <div className="h-2 w-2 bg-space-accent rounded-full animate-pulse [animation-delay:0.2s]" />
              <div className="h-2 w-2 bg-space-accent rounded-full animate-pulse [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

// Need to add the Avatar import
import { Avatar } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

export default MessageList;
