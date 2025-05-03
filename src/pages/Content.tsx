
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PDFViewer from '@/components/PDFViewer';

const Content: React.FC = () => {
  const [topic, setTopic] = useState('linearAlgebra');

  // Map topics to their display names and chapters
  const topics = {
    linearAlgebra: {
      displayName: "Linear Algebra",
      chapters: ["Matrix Fundamentals", "Normal Form", "Row Echleon Form", "System of Equations", "Linear Transformations", "Eigen Values & Eigen Vectors", "Vector Space"]
    },
    diffEq: {
      displayName: "Differential Equations",
      chapters: ["Prerequisites", "ODE", "First Order ODE"]
    },
    calculusForEngineers: {
      displayName: "Calculus for Engineers",
      chapters: ["Prerequisites", "Reduction Formulae", "Gamma and Beta Function", "DUIS & Error Function"]
    },
    complexAnalysis: {
      displayName: "Complex Analysis",
      chapters: ["Chapter 1", "Chapter 2"]
    },
    probStats: {
      displayName: "Probability and Statistics",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3"]
    },
    engineeringTransforms: {
      displayName: "Engineering Transforms",
      chapters: ["Chapter 1", "Chapter 2"]
    },
    numericalMethods: {
      displayName: "Numerical Methods for Engineers",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3"]
    },
    engineeringVector: {
      displayName: "Vector Calculus",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6"]
    },
    engineeringPhysics: {
      displayName: "Engineering Physics",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3"]
    },
    engineeringChemistry: {
      displayName: "Engineering Chemistry",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3"]
    }
  };

  const handleTopicClick = (topicKey: keyof typeof topics) => {
    setTopic(topicKey);
  };

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-3">Topics</h3>
              <Separator className="my-2" />
              <ul className="space-y-1">
                {Object.entries(topics).map(([key, { displayName }]) => (
                  <li key={key}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${topic === key ? 'text-math-primary font-medium' : ''}`}
                      onClick={() => handleTopicClick(key as keyof typeof topics)}
                    >
                      {displayName}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue={`${topic}_chapter1`}>
              <div className="bg-white rounded-t-lg shadow px-4 pt-4">
                <h1 className="text-2xl font-bold mb-4 text-math-primary">{topics[topic as keyof typeof topics].displayName}</h1>
                <TabsList>
                  {topics[topic as keyof typeof topics].chapters.map((chapter, index) => (
                    <TabsTrigger 
                      key={`${topic}_chapter${index + 1}`} 
                      value={`${topic}_chapter${index + 1}`}
                    >
                      {chapter}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="mt-px">
                {topics[topic as keyof typeof topics].chapters.map((_, index) => (
                  <TabsContent key={`${topic}_chapter${index + 1}`} value={`${topic}_chapter${index + 1}`}>
                    <PDFViewer pdfPath={`/pdfs/${topic}_chapter${index + 1}.pdf`} />
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Content;
