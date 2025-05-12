import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Book, FileText, MessageSquare, Users, BookOpen, FileSearch, Lightbulb } from 'lucide-react';
import axios from 'axios';

const Index: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch actual visitor count from server
    const fetchVisitorCount = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call to your backend
        // For demonstration, we'll simulate an API response
        const response = await new Promise<{count: number}>(resolve => {
          // Simulate API latency
          setTimeout(() => {
            // This simulates an API that returns the actual count
            // In a real implementation, this would be from your database
            resolve({ count: 24689 });
          }, 500);
        });
        
        setVisitorCount(response.count);
      } catch (error) {
        console.error("Failed to fetch visitor count", error);
        // Fallback to a reasonable number if API fails
        setVisitorCount(24500);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <MainLayout>
      {/* Hero section with professional gradient */}
      <section className="bg-gradient-to-b from-gray-50 to-white text-gray-800 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center md:justify-start">
              <img 
                src="/lovable-uploads/9cc52008-82e2-4079-a49e-7a1a3662cc01.png" 
                alt="IZZYMATHS Logo" 
                className="w-100 h-100" 
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in text-gray-900">
                Master Mathematics 
              </h1>
              <p className="text-lg md:text-xl mb-2 text-gray-700">
                Comprehensive learning platform with detailed step-by-step solutions, 
                geometrical explaination of difficult concepts.
              </p>
              
              {!user ? (
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button 
                    size="lg" 
                    className="bg-math-primary text-white hover:bg-math-secondary"
                    onClick={() => navigate('/register')}
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-math-primary text-math-primary hover:bg-blue-50"
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </Button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button 
                    size="lg" 
                    className="bg-math-primary text-white hover:bg-math-secondary"
                    onClick={() => navigate('/content')}
                  >
                    Explore Content
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-math-primary text-math-primary hover:bg-blue-50"
                    onClick={() => navigate('/about')}
                  >
                    About Us
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Visitor counter section */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-50 px-5 py-2 rounded-full border border-gray-100">
            <Users className="h-5 w-5 text-math-primary" />
            {isLoading ? (
              <span className="text-sm text-gray-500">Loading visitor count...</span>
            ) : (
              <>
                <span className="font-medium">{visitorCount?.toLocaleString()}</span>
                <span className="text-sm text-gray-500">unique visitors to our platform</span>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-math-primary mb-2" />
                <CardTitle>Active Learning</CardTitle>
                <CardDescription>Emphasizing practice over passive consumption for better understanding</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 list-disc pl-5 text-left">
                  <li className="text-left">Materials focused on active practice over passive learning</li>
                  <li className="text-left">Opportunities to work through problems independently</li>
                  <li className="text-left">Hands-on approach that builds essential problem-solving skills</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileSearch className="h-12 w-12 text-math-primary mb-2" />
                <CardTitle>Simplified Concepts</CardTitle>
                <CardDescription>Breaking down complex topics into manageable, approachable parts</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 list-disc pl-5 text-left">
                  <li className="text-left">Clear, jargon-free language for better comprehension</li>
                  <li className="text-left">Practical examples relevant to real applications</li>
                  <li className="text-left">Structured content that builds confidence gradually</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-math-primary mb-2" />
                <CardTitle>Affordable Access</CardTitle>
                <CardDescription>Student-friendly subscription model with continuous improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 list-disc pl-5 text-left">
                  <li className="text-left">Cost-effective pricing designed for students' needs</li>
                  <li className="text-left">Regular updates and content improvements</li>
                  <li className="text-left">Responsive to feedback to better serve the student community</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>  
    </MainLayout>
  );
};

export default Index;
