
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

  const generateDynamicResponse = (question: string): string => {
    // Convert question to lowercase for easier comparison
    const lowerQuestion = question.toLowerCase();
    
    // Check for definition questions first
    if (lowerQuestion.includes("what is") || lowerQuestion.includes("define") || lowerQuestion.includes("meaning") || lowerQuestion.includes("means")) {
      if (lowerQuestion.includes("expense") || lowerQuestion.includes("expenses")) {
        return "Expenses are costs or charges you incur to manage your daily life, business, or specific activities. These are the outflows of money from your account, like bills, groceries, rent, or entertainment costs that you pay for.";
      } else if (lowerQuestion.includes("budget")) {
        return "A budget is a financial plan that outlines your expected income and expenses for a specific period. It's a tool to help you allocate your money efficiently and ensure you don't spend more than you earn.";
      } else if (lowerQuestion.includes("debt")) {
        return "Debt refers to money that you've borrowed from a lender with the agreement to pay it back, usually with interest. Common forms include credit cards, mortgages, student loans, and personal loans.";
      } else if (lowerQuestion.includes("interest")) {
        return "Interest is the cost of borrowing money, typically expressed as a percentage rate. When you borrow, you pay interest; when you save or invest, you may earn interest on your money.";
      } else if (lowerQuestion.includes("investment")) {
        return "An investment is an asset purchased with the expectation that it will generate income or appreciate in value over time. Investments can include stocks, bonds, real estate, or starting a business.";
      } else if (lowerQuestion.includes("credit score")) {
        return "A credit score is a numerical rating that represents your creditworthiness based on your credit history. Higher scores (usually on a scale of 300-850) indicate lower risk to lenders and can help you secure better loan terms.";
      }
    }
    
    // Check for report requests
    if (lowerQuestion.includes("report") && lowerQuestion.includes("expense")) {
      return "Based on your financial data, I can see that your spending this month totals $2,450. Your largest expenses are housing (35%), transportation (20%), food (15%), and utilities (10%). Compared to last month, your food expenses have increased by 12%, while your entertainment costs decreased by 8%.";
    }
    
    // Check for savings questions
    if (lowerQuestion.includes("save") || lowerQuestion.includes("saving")) {
      return "Based on your current spending patterns, I see opportunities to increase your savings. You're currently spending about $320 monthly on dining out and food delivery. Reducing this by half could add $160 to your savings each month. Additionally, your subscription services total $95/month - reviewing these for services you don't frequently use could further increase your savings.";
    }
    
    // Check for budget questions
    if (lowerQuestion.includes("budget") || lowerQuestion.includes("spending")) {
      return "Looking at your financial data, I recommend allocating your budget as follows: 35% for housing, 15% for food, 15% for transportation, 10% for utilities, 15% for savings and debt repayment, and 10% for discretionary spending. Based on your income, this would mean approximately $1,750 for housing, $750 for food, and so on.";
    }
    
    // Check for investment questions
    if (lowerQuestion.includes("invest") || lowerQuestion.includes("stocks")) {
      return "Based on your financial profile, a diversified investment approach might work well for you. Consider allocating 60% to broad market index funds, 20% to bond funds (for stability), 10% to international stocks (for geographic diversification), and 10% to individual stocks or sectors you understand well. Remember that all investments carry risk, and this isn't personalized investment advice.";
    }
    
    // Check for debt-related questions
    if (lowerQuestion.includes("debt") || lowerQuestion.includes("loan")) {
      return "Looking at your current debt profile, prioritizing payments on your highest interest debt (likely your credit card at 18.9% APR) would be most efficient. By increasing your monthly payment on this account by just $100, you could save approximately $480 in interest and pay it off 8 months sooner.";
    }
    
    // Hello or greeting
    if (lowerQuestion.includes("hello") || lowerQuestion.includes("hi") || lowerQuestion.includes("hey")) {
      return "Hello! I'm your AI financial assistant. How can I help with your finances today? I can analyze expenses, help with budgeting, provide savings tips, or answer financial questions.";
    }
    
    // Help or capabilities question
    if (lowerQuestion.includes("help") || lowerQuestion.includes("what can you do") || lowerQuestion.includes("capabilities")) {
      return "As your financial assistant, I can help you with expense tracking and analysis, budgeting advice, debt management strategies, savings tips, investment guidance (non-advisory), retirement planning basics, and answering general financial questions. What specific area would you like to focus on today?";
    }
    
    // Default response for unknown questions - more personalized than before
    return "I'm not sure I fully understand your question about '" + question + "'. Could you provide more details or rephrase it? I'm here to help with expense tracking, budgeting, savings strategies, debt management, and other financial matters.";
  };

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
