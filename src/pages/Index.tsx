import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Book, FileText, MessageSquare } from 'lucide-react';

const Index: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* Hero section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-700 text-white py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="max-w-3xl flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img 
                src="/lovable-uploads/36f8e087-4855-4f2b-ab75-719fafc7e3c7.png" 
                alt="MATHPATH Logo" 
                className="w-48 h-48 mb-4 md:mb-0 rounded-full" 
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                Master Mathematics for Engineering
              </h1>
              <p className="text-lg md:text-xl mb-2 text-blue-100">
                Comprehensive learning platform with detailed step-by-step solutions, 
                question papers, and a supportive math community.
              </p>
              <p className="text-md italic mb-6 text-blue-200">
                Math That Makes Minds
              </p>
              {!user ? (
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-900 hover:bg-blue-100"
                    onClick={() => navigate('/register')}
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-blue-800"
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </Button>
                </div>
              ) : (
                <Button 
                  size="lg" 
                  className="bg-white text-blue-900 hover:bg-blue-100"
                  onClick={() => navigate('/content')}
                >
                  Explore Content
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          {/* <h2 className="text-3xl font-bold text-center mb-12 text-math-primary">
            Why Choose Our Platform
          </h2> */}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* <Card className="border border-gray-200">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Book className="text-math-primary h-6 w-6" />
                </div>
                <CardTitle>Comprehensive Content</CardTitle>
                <CardDescription>
                  Detailed explanations of complex mathematical concepts with step-by-step solutions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our content covers multiple engineering topics with clear derivations and practical examples.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => navigate('/content')}>
                  Explore Content
                </Button>
              </CardFooter>
            </Card> */}
            
            {/* <Card className="border border-gray-200">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FileText className="text-math-primary h-6 w-6" />
                </div>
                <CardTitle>Question Paper Repository</CardTitle>
                <CardDescription>
                  Access previous year question papers with detailed solutions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Practice with real exam questions and understand the solution approach for each problem.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => navigate('/questions')}>
                  Browse Questions
                </Button>
              </CardFooter>
            </Card> */}
            
            {/* <Card className="border border-gray-200">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="text-math-primary h-6 w-6" />
                </div>
                <CardTitle>Supportive Community</CardTitle>
                <CardDescription>
                  Engage with fellow students and experts in our math community.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ask questions, share insights, and learn collaboratively with our moderated forum.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => navigate('/community')}>
                  Join Community
                </Button>
              </CardFooter>
            </Card> */}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      {/* <section className="py-16 bg-blue-50">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-math-primary">
            Unlock Full Access
          </h2>
          <p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto">
            Subscribe for just ₹100 per month and get unlimited access to all our content,
            question papers, and community features.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/subscription')}
            className="bg-math-primary hover:bg-blue-800"
          >
            View Subscription Plans
          </Button>
        </div>
      </section> */}
    </MainLayout>
  );
};

export default Index;
