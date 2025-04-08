
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { toast } from "sonner";
import { Message } from "./types";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { generateDynamicResponse } from "./chatUtils";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Hello! I'm your financial assistant. I can help you track expenses, analyze your spending habits, or answer questions about your finances. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsThinking(true);
    
    try {
      // Simulate API delay - in a real app, we'd integrate with a real AI service
      setTimeout(() => {
        const dynamicResponse = generateDynamicResponse(userMessage.text);
        
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: dynamicResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsThinking(false);
      }, 1000);
    } catch (error) {
      toast.error("Failed to get a response. Please try again.");
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-full bg-card/90 backdrop-blur-sm border-space-purple/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Bot className="h-5 w-5 text-space-accent" />
          Financial Assistant
        </CardTitle>
        <CardDescription>
          Ask me anything about your finances, expenses, or budgeting
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <MessageList 
          messages={messages} 
          isThinking={isThinking} 
          messagesEndRef={messagesEndRef} 
        />
        <MessageInput 
          inputValue={inputValue}
          isThinking={isThinking}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          onSend={handleSendMessage}
        />
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
