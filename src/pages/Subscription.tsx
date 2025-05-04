
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Lock } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';

const Subscription: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, startSubscription } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    try {
      const res = await axios.post('http://localhost:5000/api/create-order', {
        id: user.id,
        name: user.name,
        email: user.email
      });
      const { orderId, amount, currency, key, id } = res.data;

      const options: any = {
        key,
        amount,
        currency,
        name: "My App",
        description: "Monthly Subscription",
        order_id: orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await axios.post('http://localhost:5000/api/verify-payment', {
              id: id,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature
            });
            if (verifyRes.data.subscription_active) {
              toast({
                title: "Payment successful",
                description: `Access until ${verifyRes.data.expires_at}`
              });
              
              await startSubscription(id);
              navigate('/content');
            }
          } catch (err) {
            toast({ title: "Verification failed", variant: "destructive" });
          }
        },
        prefill: {
          name: user.name,
          email: user.email
        },
        theme: {
          color: "#3399cc"
        }
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      toast({ title: "Payment setup failed", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post('http://localhost:5000/api/manage-subscription', {
        id: user?.id,
        email: user?.email
      });
      
      // Open the management portal URL in new tab or redirect
      window.open(response.data.portalUrl, '_blank');
    } catch (error) {
      console.error("Failed to open subscription management portal", error);
      toast({ 
        title: "Unable to access subscription management", 
        variant: "destructive" 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const features = [
    "Full access to all mathematical content",
    "Step-by-step solutions to complex problems",
    "Previous year question papers with solutions",
    "Participation in the community forum",
    "Single device access (bound to this device)",
    "Content protection and copyright compliance"
  ];

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center text-math-primary mb-12">
          Choose Your Subscription Plan
        </h1>

        <Alert className="mb-8 bg-blue-50 border-blue-200">
          <AlertTitle className="text-math-primary font-medium">Important Information</AlertTitle>
          <AlertDescription>
            Your subscription will be bound to the device you're currently using.
            Our content is protected by copyright laws and advanced protection measures.
          </AlertDescription>
        </Alert>

        <Card className="border-2 border-math-primary shadow-md">
          <CardHeader className="bg-math-primary text-white text-center py-8">
            <CardTitle className="text-2xl">Monthly Subscription</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">₹100</span>
              <span className="text-sm ml-1">/month</span>
            </div>
            <p className="text-blue-100 mt-2">Billed monthly, cancel anytime</p>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col items-center pb-8">
            {user?.subscription_active ? (
              <Button 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleManageSubscription}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Manage Subscription
                  </span>
                )}
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="w-full" 
                onClick={handleSubscribe}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Subscribe Now
                  </span>
                )}
              </Button>
            )}

            <p className="mt-4 text-sm text-gray-500">
              Secure payment processing. Your data is protected.
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Subscription;
