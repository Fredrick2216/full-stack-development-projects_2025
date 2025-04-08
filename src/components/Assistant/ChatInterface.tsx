
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
    
    // Dynamic response based on keywords in the question
    if (lowerQuestion.includes("budget") || lowerQuestion.includes("budgeting")) {
      return "Creating a budget is an important step in managing your finances. I recommend the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment. Based on your recent spending, you might want to adjust your budget for dining out.";
    } else if (lowerQuestion.includes("save") || lowerQuestion.includes("saving")) {
      return "To improve your savings, consider automating transfers to a high-yield savings account right after payday. Based on your spending patterns, you could potentially save an additional $150 per month by reducing discretionary expenses.";
    } else if (lowerQuestion.includes("invest") || lowerQuestion.includes("investment")) {
      return "For investments, consider your risk tolerance and time horizon. A diversified portfolio typically includes a mix of stocks, bonds, and other assets. I'd recommend consulting with a financial advisor for personalized investment advice.";
    } else if (lowerQuestion.includes("debt") || lowerQuestion.includes("loan")) {
      return "To manage debt effectively, focus on high-interest debt first while making minimum payments on others. Consider the snowball method (smallest balance first) or avalanche method (highest interest first) depending on your preference.";
    } else if (lowerQuestion.includes("expense") || lowerQuestion.includes("spending")) {
      return "Looking at your recent expenses, your highest spending categories are housing, transportation, and food. Your spending in the food category has increased by 15% compared to last month.";
    } else if (lowerQuestion.includes("report") || lowerQuestion.includes("analysis")) {
      return "I can generate detailed financial reports based on your transaction history. Would you like to see a breakdown by category, a monthly comparison, or a year-to-date summary?";
    } else if (lowerQuestion.includes("credit") || lowerQuestion.includes("credit score")) {
      return "Maintaining a good credit score involves paying bills on time, keeping credit utilization low (under 30%), and monitoring your credit report regularly. Consider setting up automatic payments to avoid late fees.";
    } else if (lowerQuestion.includes("tax") || lowerQuestion.includes("taxes")) {
      return "For tax optimization, consider maximizing your retirement contributions, tracking deductible expenses throughout the year, and taking advantage of tax credits you may qualify for.";
    } else if (lowerQuestion.includes("income") || lowerQuestion.includes("earn")) {
      return "Based on your income patterns, you might want to consider diversifying your income streams. Side hustles, freelance work, or passive income sources could help increase your overall earnings.";
    } else if (lowerQuestion.includes("retirement") || lowerQuestion.includes("retire")) {
      return "For retirement planning, consider maximizing contributions to tax-advantaged accounts like 401(k)s and IRAs. Aim to save 15-20% of your income for retirement, and adjust your asset allocation as you get closer to retirement age.";
    } else {
      // Default response for questions that don't match specific categories
      return "That's an interesting financial question. To give you a more personalized answer, could you provide more details about your specific situation? I'm here to help with budgeting, expense tracking, savings strategies, and other financial matters.";
    }
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
