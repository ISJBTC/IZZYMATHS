import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, 
  Shield, 
  Smartphone
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [contentProtection, setContentProtection] = useState(true);

  const handleNotificationChange = (type: 'email' | 'push', value: boolean) => {
    if (type === 'email') {
      setEmailNotifications(value);
    } else {
      setPushNotifications(value);
    }
    
    toast({
      title: `${type === 'email' ? 'Email' : 'Push'} notifications ${value ? 'enabled' : 'disabled'}`,
      description: "Your preference has been saved.",
    });
  };

  const handleContentProtectionChange = (value: boolean) => {
    setContentProtection(value);
    toast({
      title: `Content protection ${value ? 'enabled' : 'disabled'}`,
      description: "Your preference has been saved.",
    });
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto py-12 px-4">
          <Card>
            <CardContent className="text-left py-8">
              <p className="text-left">Please log in to view your settings</p>
              <Button asChild className="mt-4">
                <a href="/login">Sign In</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-left">Settings</h1>

        <div className="space-y-8">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Bell className="h-5 w-5 text-math-primary" />
                  <div>
                    <p className="font-medium text-left">Email Notifications</p>
                    <p className="text-sm text-gray-500 text-left">Receive updates about subscription and content</p>
                  </div>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={(value) => handleNotificationChange('email', value)} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Smartphone className="h-5 w-5 text-math-primary" />
                  <div>
                    <p className="font-medium text-left">Push Notifications</p>
                    <p className="text-sm text-gray-500 text-left">Receive instant alerts on this device</p>
                  </div>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={(value) => handleNotificationChange('push', value)} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Security & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Shield className="h-5 w-5 text-math-primary" />
                  <div>
                    <p className="font-medium text-left">Content Protection</p>
                    <p className="text-sm text-gray-500 text-left">Prevent unauthorized copying of content</p>
                  </div>
                </div>
                <Switch 
                  checked={contentProtection} 
                  onCheckedChange={handleContentProtectionChange} 
                />
              </div>
              
              <Separator />
              
              <div>
                <p className="font-medium mb-2 text-left">Password Management</p>
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto"
                  onClick={() => navigate('/forgot-password')}
                >
                  Reset Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-left">Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-left">
                {user.subscription_active 
                  ? "You currently have an active subscription." 
                  : "You don't have an active subscription."}
              </p>
              <Button 
                onClick={() => navigate('/subscription')}
                variant={user.subscription_active ? "outline" : "default"}
              >
                {user.subscription_active ? "Manage Subscription" : "Subscribe Now"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;