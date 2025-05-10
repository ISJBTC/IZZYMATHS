
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Book, FileText, Users } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-12 px-4 relative">
        {/* Content with cards (positioned under the watermark) */}
        <div className="relative z-0">
          <h1 className="text-3xl md:text-4xl font-bold text-math-primary mb-6 text-center">
            About Us
          </h1>
          
          {/* Watermark - centered, above cards but behind card content */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img 
              src="/lovable-uploads/36f8e087-4855-4f2b-ab75-719fafc7e3c7.png" 
              alt="MATHPATH Logo Watermark" 
              className="w-[120px] h-[120px] opacity-5" 
            />
          </div>
          
          <Card className="mb-8 relative z-10">
            <CardContent className="pt-6">
              <p className="text-lg mb-4 text-justify">
                MathPath is an online platform dedicated to providing subscription-based mathematics resources specifically for undergraduate students. Founded and developed by a small, passionate team of experts, we focus on transforming complex mathematical concepts into accessible, clear content that resonates with students at all levels. Our mission is to break down the barriers that often prevent students from mastering the mathematical foundations crucial to their success.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-math-primary mb-4">
            What We Offer
          </h2>
          <Card className="mb-8 relative z-10">
            <CardContent className="pt-6">
              <p className="text-lg mb-4 text-justify">
                At MathPath, we provide comprehensive resources designed with students in mind. Our extensive collection of notes covers the majority of mathematics required at undergraduate level, offering in-depth explanations of key concepts and theories. We pride ourselves on our detailed, solved example problems that walk students through solutions step-by-step, building confidence and competence. Our materials emphasize the geometrical interpretation of mathematical concepts, helping students visualize abstract ideas. Currently we are in the development mode, so we will be updating and madifying with variety of contents in different form on our website in due course of time. Students are advised to explore content as per their course. 
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-math-primary mb-4">
            Our Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="h-full relative z-10">
              <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                <Book className="h-10 w-10 text-math-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Active Learning</h3>
                <p className="text-justify">
                  We firmly believe that mathematics shouldn't be a barrier to success. Unlike traditional learning methods, our materials emphasize active practice over passive consumption. We provide students with ample opportunities to work through problems themselves, rather than simply reading text or watching videos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="h-full relative z-10">
              <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                <FileText className="h-10 w-10 text-math-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Simplified Concepts</h3>
                <p className="text-justify">
                  Our methodology breaks down difficult concepts into manageable parts, using clear, jargon-free language and practical examples relevant to applications. We carefully structure our content to build confidence gradually, allowing students to master fundamentals before tackling more advanced topics.
                </p>
              </CardContent>
            </Card>
            
            <Card className="h-full relative z-10">
              <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                <Users className="h-10 w-10 text-math-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Affordable Access</h3>
                <p className="text-justify">
                  Our subscription model is designed with students' needs in mind, keeping costs affordable while enabling us to continuously update and improve our content. This sustainable approach allows us to respond to feedback, incorporate new methods, and expand our offerings to better serve the student community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
