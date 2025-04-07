
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { SendIcon, Bot, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

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
      // Simulate API delay - in a real app, we'd integrate with ChatGPT/Gemini here
      setTimeout(() => {
        const responses = [
          "I can help you analyze your recent expenses. Would you like me to show you which categories you're spending the most on?",
          "Based on your spending patterns, I recommend setting a budget of around $150 for your entertainment expenses next month.",
          "Your expenses this month are 15% higher than last month, primarily due to increased spending in the Shopping category.",
          "I notice you've been spending regularly at coffee shops. Setting up a dedicated 'Coffee' budget might help you track this specific expense.",
          "Looking at your historical data, your highest expense months tend to be December and July. You might want to plan ahead for these periods.",
        ];
        
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: responses[Math.floor(Math.random() * responses.length)],
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
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-1">
          {messages.map((message) => (
            <div
              key={message.id}
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

        <div className="mt-auto relative">
          <Input
            placeholder="Ask a question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
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
            onClick={handleSendMessage}
          >
            {isThinking ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
