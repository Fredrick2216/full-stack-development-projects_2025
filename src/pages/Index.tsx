
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to auth page
    navigate("/auth");
  }, [navigate]);

  return (
    <div className="min-h-screen w-full space-bg animate-space flex items-center justify-center">
      <StarField />
      <div className="text-center">
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-space-purple border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-lg">Loading Smart Expense...</p>
      </div>
    </div>
  );
};

export default Index;
