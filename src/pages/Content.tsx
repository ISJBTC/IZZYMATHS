import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PDFViewer from '@/components/PDFViewer';

const Content: React.FC = () => {
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
                <li>
                  <Button variant="ghost" className="w-full justify-start text-math-primary font-medium">
                    Linear Algebra
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    Calculus
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    Differential Equations
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    Probability and Statistics
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    Complex Analysis
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="chapter1">
              <div className="bg-white rounded-t-lg shadow px-4 pt-4">
                <h1 className="text-2xl font-bold mb-4 text-math-primary">Linear Algebra</h1>
                <TabsList>
                  <TabsTrigger value="chapter1">Chapter 1</TabsTrigger>
                  <TabsTrigger value="chapter2">Chapter 2</TabsTrigger>
                  <TabsTrigger value="chapter3">Chapter 3</TabsTrigger>
                </TabsList>
              </div>

              <div className="mt-px">
                <TabsContent value="chapter1">
                  <PDFViewer pdfPath="/pdfs/chapter1.pdf" />
                </TabsContent>
                
                <TabsContent value="chapter2">
                  <PDFViewer pdfPath="/pdfs/chapter2.pdf" />
                </TabsContent>

                <TabsContent value="chapter3">
                  <PDFViewer pdfPath="/pdfs/chapter3.pdf" />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Content;
