
import React from "react";
import Sidebar from "@/components/Sidebar";
import StarField from "@/components/StarField";
import ChatInterface from "@/components/Assistant/ChatInterface";

const AssistantPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full space-bg animate-space flex">
      <StarField />
      <Sidebar className="w-64 min-w-64" />
      
      <div className="flex-1 p-6 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Financial Assistant</h1>
            <p className="text-muted-foreground">Your AI-powered financial advisor</p>
          </div>
          
          <div className="flex-1">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPage;
