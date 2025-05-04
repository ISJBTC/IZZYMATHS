
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { CalendarIcon, Key, Mail, User } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto py-12 px-4">
          <Card>
            <CardContent className="text-center py-8">
              <p>Please log in to view your profile</p>
              <Button asChild className="mt-4">
                <Link to="/login">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-math-primary" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-math-primary" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-math-primary" />
                <div className="flex items-center">
                  <p className="text-sm text-gray-500 mr-2">Password</p>
                  <p className="font-medium">••••••••</p>
                  <Link to="/forgot-password" className="ml-4 text-sm text-math-primary hover:underline">
                    Reset password
                  </Link>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CalendarIcon className="w-5 h-5 text-math-primary" />
                <div>
                  <p className="text-sm text-gray-500">Institute</p>
                  <p className="font-medium">{user.collegeName || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Subscription Information</CardTitle>
          </CardHeader>
          <CardContent>
            {user.subscription_active ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <p className="font-medium text-green-600">Active</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p className="font-medium">{formatDate(user.subscription_expiry)}</p>
                </div>
                <Button asChild variant="outline">
                  <Link to="/subscription">Manage Subscription</Link>
                </Button>
              </div>
            ) : (
              <div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                  <p className="font-medium text-gray-500">No active subscription</p>
                </div>
                <Button asChild className="mt-4">
                  <Link to="/subscription">Subscribe Now</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
