
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Plus, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Community: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleNewTopic = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a new topic.",
        variant: "destructive",
      });
    } else if (!user.isSubscribed) {
      toast({
        title: "Subscription required",
        description: "Please subscribe to participate in the community.",
        variant: "destructive",
      });
    } else {
      // Handle new topic creation
      toast({
        title: "Coming soon",
        description: "This feature will be available in the next update.",
      });
    }
  };

  const topics = [
    {
      id: 1,
      title: "Understanding Eigenvalues and Eigenvectors",
      author: "MathPro123",
      replies: 23,
      views: 156,
      lastActivity: "2 hours ago",
      category: "Linear Algebra"
    },
    {
      id: 2,
      title: "Help with double integral problem",
      author: "CalcStudent",
      replies: 8,
      views: 42,
      lastActivity: "5 hours ago",
      category: "Calculus"
    },
    {
      id: 3,
      title: "Solving systems of differential equations",
      author: "EquationMaster",
      replies: 15,
      views: 87,
      lastActivity: "1 day ago",
      category: "Differential Equations"
    },
    {
      id: 4,
      title: "Proof of the Cayley-Hamilton theorem",
      author: "TheoremFinder",
      replies: 12,
      views: 93,
      lastActivity: "2 days ago",
      category: "Linear Algebra"
    },
    {
      id: 5,
      title: "Applications of Laplace transforms",
      author: "EngineeringStudent",
      replies: 7,
      views: 64,
      lastActivity: "3 days ago",
      category: "Differential Equations"
    }
  ];

  const categories = [
    { name: "All Topics", count: 156 },
    { name: "Linear Algebra", count: 42 },
    { name: "Calculus", count: 38 },
    { name: "Differential Equations", count: 29 },
    { name: "Probability & Statistics", count: 24 },
    { name: "Complex Analysis", count: 18 },
    { name: "Numerical Methods", count: 5 }
  ];

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-math-primary">Community Forum</h1>
          <Button onClick={handleNewTopic}>
            <Plus className="h-4 w-4 mr-2" />
            New Topic
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-3">Categories</h3>
              <Separator className="my-2" />
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li key={category.name} className="flex justify-between items-center py-1.5 px-2 hover:bg-gray-50 rounded">
                    <span>{category.name}</span>
                    <span className="text-sm bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                      {category.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-3">Community Guidelines</h3>
              <Separator className="my-2" />
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Be respectful and constructive</li>
                <li>• Stay on topic and focused on mathematics</li>
                <li>• Show your work when asking for help</li>
                <li>• No plagiarism or cheating assistance</li>
                <li>• Use LaTeX for mathematical formulas</li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Discussion Topics</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                      className="pl-8 w-[240px]" 
                      placeholder="Search topics..." 
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {topics.map((topic) => (
                    <div key={topic.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <MessageSquare className="h-5 w-5 text-math-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-lg hover:text-math-primary cursor-pointer">
                              {topic.title}
                            </h3>
                            <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                              {topic.category}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span>Posted by {topic.author}</span>
                            <span className="mx-2">•</span>
                            <span>{topic.replies} replies</span>
                            <span className="mx-2">•</span>
                            <span>{topic.views} views</span>
                            <span className="mx-2">•</span>
                            <span>Last activity: {topic.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Showing 5 of 156 topics
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Community;
