
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { plan } = await req.json();
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );
    
    // Get user from auth header
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not authenticated" }),
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Get the Stripe secret key from environment variables
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Stripe configuration error" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Initialize Stripe with explicit API key
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });
    
    // Check if the user already exists as a Stripe customer
    let customerId;
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // Create a new customer if one doesn't exist
      const customer = await stripe.customers.create({ email: user.email });
      customerId = customer.id;
    }
    
    // Set up the price and product data based on the selected plan
    let priceData = {
      currency: "usd",
      product_data: {
        name: "Budget Savvy Free",
      },
      unit_amount: 0,
    };
    
    let isSubscription = true;
    
    switch (plan) {
      case "premium":
        priceData = {
          currency: "usd",
          product_data: {
            name: "Budget Savvy Premium",
            description: "Advanced expense analytics, unlimited reports, and more",
          },
          unit_amount: 999, // $9.99
          recurring: {
            interval: "month"
          },
        };
        break;
      case "family":
        priceData = {
          currency: "usd",
          product_data: {
            name: "Budget Savvy Family",
            description: "Everything in Premium plus family budget planning for up to 5 users",
          },
          unit_amount: 1999, // $19.99
          recurring: {
            interval: "month"
          },
        };
        break;
      case "free":
      default:
        isSubscription = false;
        break;
    }
    
    // If it's a free plan, don't create a checkout session
    if (!isSubscription) {
      return new Response(
        JSON.stringify({ status: "success", message: "Free plan selected" }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/dashboard?payment=success`,
      cancel_url: `${req.headers.get("origin")}/?payment=canceled`,
    });
    
    return new Response(
      JSON.stringify({ status: "success", url: session.url }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in create-checkout:", error);
    return new Response(
      JSON.stringify({ status: "error", error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
