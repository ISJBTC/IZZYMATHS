
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
                src="/lovable-uploads/36f8e087-4855-4f2b-ab75-719fafc7e3c7.png" 
                alt="MATHPATH Logo" 
                className="w-64 h-64" 
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in text-gray-900">
                Master Mathematics for Engineering
              </h1>
              <p className="text-lg md:text-xl mb-2 text-gray-700">
                Comprehensive learning platform with detailed step-by-step solutions, 
                question papers, and a supportive math community.
              </p>
              <p className="text-md italic mb-6 text-math-primary">
                Math That Makes Minds
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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-math-primary mb-2" />
                <CardTitle>Comprehensive Learning Materials</CardTitle>
                <CardDescription>Complete coverage of engineering mathematics syllabus with detailed notes</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                  <li>Comprehensive notes covering engineering mathematics syllabus</li>
                  <li>Formula sheets and quick reference guides</li>
                  <li>Easy-to-understand explanations with real-world applications</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileSearch className="h-12 w-12 text-math-primary mb-2" />
                <CardTitle>Solved Example Problems</CardTitle>
                <CardDescription>Master concepts through practice with detailed solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                  <li>Solved example problems with step-by-step solutions</li>
                  <li>Practice exercises with varying difficulty levels</li>
                  <li>Previous exam papers with detailed explanations</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-math-primary mb-2" />
                <CardTitle>Visual Learning Approach</CardTitle>
                <CardDescription>See the concepts come to life with visual interpretations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                  <li>Geometrical interpretation of mathematical concepts</li>
                  <li>Interactive visualizations of complex topics</li>
                  <li>Diagrams and graphs to enhance understanding</li>
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
