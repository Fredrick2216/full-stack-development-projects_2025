
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { Message } from "./types";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-3 max-w-[80%] ${
          message.sender === "user" ? "flex-row-reverse" : ""
        }`}
      >
        <Avatar className={`h-8 w-8 ${message.sender === "user" ? "bg-space-purple" : "bg-space-accent"}`}>
          {message.sender === "user" ? (
            <User className="h-5 w-5" />
          ) : (
            <Bot className="h-5 w-5" />
          )}
        </Avatar>
        <div
          className={`rounded-2xl px-4 py-2 ${
            message.sender === "user"
              ? "bg-space-purple text-white"
              : "bg-secondary"
          }`}
        >
          <p className="text-sm">{message.text}</p>
          <p className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
