import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Lock, RefreshCw } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';

const Subscription: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const { user, startSubscription } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("one-time");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    // Fetch subscription details if user is already subscribed
    if (user?.subscription_active) {
      fetchSubscriptionDetails();
    }
  }, [user]);

  const fetchSubscriptionDetails = async () => {
    if (!user?.id) return;
    
    try {
      const response = await axios.get(`http://localhost:5000/api/subscription-details?id=${user.id}`);
      setSubscriptionDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch subscription details", error);
    }
  };

  // One-time payment handler (modified to open in new tab)
  const handleOneTimePayment = async () => {
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
        name: "Educational Learning Platform",
        description: "One-Time Payment (30 days access)",
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
                description: `Access until ${verifyRes.data.subscription_expiry}`
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
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            console.log('Payment window closed without completing payment');
          }
        }
      };

      // Create and open Razorpay checkout
      const razor = new (window as any).Razorpay(options);
      
      // Open in a new tab to avoid UI freezing in main window
      razor.open();
    } catch (error) {
      console.error(error);
      toast({ title: "Payment setup failed", variant: "destructive" });
      setIsProcessing(false);
    }
  };

  // Subscription with auto-renewal handler (modified to open in new tab)
  const handleSubscribe = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    try {
      // Create a subscription instead of a one-time order
      const res = await axios.post('http://localhost:5000/api/create-subscription', {
        id: user.id,
        name: user.name,
        email: user.email
      });
      
      const { subscriptionId, planId, amount, currency, key, id } = res.data;

      const options: any = {
        key,
        subscription_id: subscriptionId,
        name: "Educational Learning Platform",
        description: "Monthly Subscription with Auto-Renewal",
        recurring: true,  // Enable recurring payments
        handler: async function (response: any) {
          try {
            const verifyRes = await axios.post('http://localhost:5000/api/verify-subscription', {
              id: id,
              subscriptionId: response.razorpay_subscription_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            });
            
            if (verifyRes.data.subscription_active) {
              toast({
                title: "Subscription activated",
                description: `Access until ${verifyRes.data.subscription_expiry}`
              });
              
              await startSubscription(id);
              fetchSubscriptionDetails();
              navigate('/content');
            }
          } catch (err) {
            toast({ title: "Verification failed", variant: "destructive" });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          method: 'upi'  // Prefill UPI as the payment method
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          confirm_close: true,  // Confirm before closing payment modal
          ondismiss: function() {
            setIsProcessing(false);
            console.log('Subscription window closed without completing');
          }
        },
        notes: {
          user_id: user.id  // Store user ID in notes for webhook processing
        }
      };

      // Create and open Razorpay checkout for subscription
      const razor = new (window as any).Razorpay(options);
      
      // Open in a new tab to avoid UI freezing in main window
      razor.open();
    } catch (error) {
      console.error(error);
      toast({ title: "Subscription setup failed", variant: "destructive" });
      setIsProcessing(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!user?.id || !subscriptionDetails?.subscription_id) return;
    
    setIsProcessing(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/cancel-subscription', {
        id: user.id,
        subscription_id: subscriptionDetails.subscription_id
      });
      
      if (response.data.success) {
        toast({
          title: "Subscription cancelled",
          description: "Your subscription will remain active until the end of the current billing period."
        });
        
        // Refresh subscription details
        fetchSubscriptionDetails();
      }
    } catch (error) {
      console.error("Failed to cancel subscription", error);
      toast({ 
        title: "Unable to cancel subscription", 
        variant: "destructive" 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const oneTimeFeatures = [
    "Full access to all mathematical content",
    "Step-by-step solutions to complex problems",
    "Previous year question papers with solutions",
    "Participation in the community forum",
    "Single device access (bound to this device)",
    "Content protection and copyright compliance",
    "30 days of access from purchase date"
  ];

  const subscriptionFeatures = [
    "Full access to all mathematical content",
    "Step-by-step solutions to complex problems",
    "Previous year question papers with solutions",
    "Participation in the community forum",
    "Single device access (bound to this device)",
    "Content protection and copyright compliance",
    "Automatic renewal via UPI Autopay",
    "Cancel anytime"
  ];

  if (user?.subscription_active) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold text-center text-math-primary mb-12">
            Your Subscription
          </h1>
          
          <Card className="border-2 border-math-primary shadow-md">
            <CardHeader className="bg-math-primary text-white text-center py-8">
              <CardTitle className="text-2xl">Active Subscription</CardTitle>
              {subscriptionDetails?.subscription_id && (
                <p className="text-blue-100 mt-2">Auto-renews via UPI Autopay</p>
              )}
            </CardHeader>
            <CardContent className="pt-6">
              <div className="p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium text-math-primary">Your Subscription Details</h3>
                <p className="mt-2">Status: <span className="font-medium">Active</span></p>
                <p>Expires on: <span className="font-medium">{user.subscription_expiry}</span></p>
                {subscriptionDetails?.next_billing_date && (
                  <p>Next billing date: <span className="font-medium">{subscriptionDetails.next_billing_date}</span></p>
                )}
                {subscriptionDetails?.subscription_id && (
                  <p>Payment method: <span className="font-medium">UPI Autopay</span></p>
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-math-primary mb-3">Your Benefits</h3>
                <ul className="space-y-4">
                  {subscriptionDetails?.subscription_id 
                    ? subscriptionFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))
                    : oneTimeFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))
                  }
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center pb-8">
              {subscriptionDetails?.subscription_id ? (
                <Button 
                  size="lg" 
                  variant="destructive"
                  className="w-full"
                  onClick={handleCancelSubscription}
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
                      Cancel Subscription
                    </span>
                  )}
                </Button>
              ) : (
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-700 mb-4">
                    Renew your subscription when it expires
                  </p>
                  <Button 
                    size="lg" 
                    className="w-full" 
                    onClick={() => setSelectedTab("subscription")}
                  >
                    View Subscription Options
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </MainLayout>
    );
  }

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

        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="one-time">One-Time Payment</TabsTrigger>
            <TabsTrigger value="subscription">Auto-Renewal Subscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="one-time">
            <Card className="border-2 border-math-primary shadow-md">
              <CardHeader className="bg-math-primary text-white text-center py-8">
                <CardTitle className="text-2xl">One-Time Payment</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹100</span>
                </div>
                <p className="text-blue-100 mt-2">Access for 30 days</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {oneTimeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col items-center pb-8">
                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={handleOneTimePayment}
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
                      Pay Now
                    </span>
                  )}
                </Button>

                <p className="mt-4 text-sm text-gray-500">
                  Secure payment processing. Your data is protected.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription">
            <Card className="border-2 border-math-primary shadow-md">
              <CardHeader className="bg-math-primary text-white text-center py-8">
                <CardTitle className="text-2xl">Monthly Subscription</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹100</span>
                  <span className="text-sm ml-1">/month</span>
                </div>
                <p className="text-blue-100 mt-2">Auto-renews monthly via UPI Autopay</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {subscriptionFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col items-center pb-8">
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
                      <RefreshCw className="h-5 w-5 mr-2" />
                      Subscribe with UPI Autopay
                    </span>
                  )}
                </Button>

                <p className="mt-4 text-sm text-gray-500">
                  Secure payment processing via Razorpay. Your data is protected.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Subscription;
