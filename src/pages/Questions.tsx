
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Upload } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Questions: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmitQuestion = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit question papers.",
        variant: "destructive",
      });
    } else {
      // Open Google Forms link in new tab
      window.open('https://forms.gle/exampleSubmissionForm', '_blank');
    }
  };

  const questions = [
    {
      id: 1,
      title: "Linear Algebra Mid-Term Examination",
      institution: "SPPU University",
      year: "2023",
      hasSolution: true,
      category: "Linear Algebra"
    },
    {
      id: 2,
      title: "Calculus I Final Examination",
      institution: "MITWPU",
      year: "2022",
      hasSolution: true,
      category: "Calculus"
    },
    {
      id: 3,
      title: "Differential Equations Assignment 3",
      institution: "MITADT",
      year: "2023",
      hasSolution: false,
      category: "Differential Equations"
    },
    {
      id: 4,
      title: "Linear Algebra Practice Problems",
      institution: "PCCOE",
      year: "2022",
      hasSolution: true,
      category: "Linear Algebra"
    },
    {
      id: 5,
      title: "Numerical Methods End Semester",
      institution: "JSPM University",
      year: "2021",
      hasSolution: true,
      category: "Numerical Methods"
    }
  ];

  const institutions = [
    { name: "SPPU University", count: 28 },
    { name: "MITWPU", count: 26 },
    { name: "MITADT", count: 23 },
    { name: "ADYPATIL", count: 19 },
    { name: "PCCOE", count: 15 },
    { name: "ZEAL", count: 13 },
    { name: "JSPM University", count: 10 }
  ];

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-math-primary">Question Papers</h1>
          <Button onClick={handleSubmitQuestion}>
            <Upload className="h-4 w-4 mr-2" />
            Submit Question Paper
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - Only Institution Filter */}
          <div className="md:w-64 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-3">Filter by Institution</h3>
              <Separator className="my-2" />
              <ul className="space-y-1">
                {institutions.map((institution) => (
                  <li key={institution.name} className="flex justify-between items-center py-1.5 px-2 hover:bg-gray-50 rounded">
                    <span>{institution.name}</span>
                    <span className="text-sm bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                      {institution.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Available Question Papers</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                      className="pl-8 w-[240px]" 
                      placeholder="Search papers..." 
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {questions.map((question) => (
                    <div key={question.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FileText className="h-5 w-5 text-math-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-lg hover:text-math-primary cursor-pointer">
                              {question.title}
                              {question.hasSolution && (
                                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                  Solution Available
                                </Badge>
                              )}
                            </h3>
                            <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                              {question.year}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span>{question.institution}</span>
                            <span className="mx-2">•</span>
                            <span>{question.category}</span>
                          </div>
                          <div className="mt-3">
                            <Button variant="outline" size="sm" className="mr-2">
                              View Question Paper
                            </Button>
                            {question.hasSolution && (
                              <Button size="sm">
                                View Solution
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Showing 5 of 124 question papers
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

export default Questions;
