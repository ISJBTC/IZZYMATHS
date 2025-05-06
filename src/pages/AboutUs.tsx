
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Book, FileText, Users } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-math-primary mb-6 text-center">
          About Us
        </h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-lg mb-6">
              MathPath is an online platform offering subscription-based mathematics 
              resources specifically for students. Material is developed by a small 
              team of members, we provide focused content that simplifies complex 
              mathematical concepts.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold text-math-primary mb-4">
          What We Offer
        </h2>
        <Card className="mb-8">
          <CardContent className="pt-6">
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Comprehensive notes covering engineering mathematics syllabus</li>
              <li>Solved example problems with step-by-step solutions</li>
              <li>Geometrical interpretation of mathematical concepts</li>
              <li>Formula sheets and quick reference guides</li>
              <li>Easy-to-understand explanations with real-world applications</li>
            </ul>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold text-math-primary mb-4">
          Our Approach
        </h2>
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start mb-6">
              <div className="mr-4 mt-1">
                <Book className="h-6 w-6 text-math-primary" />
              </div>
              <p>
                We believe that mathematics shouldn't be a barrier to engineering success. 
                Our materials emphasize practice over passive learning, providing students 
                with opportunities to work through problems rather than simply reading or 
                watching videos.
              </p>
            </div>
            
            <div className="flex items-start mb-6">
              <div className="mr-4 mt-1">
                <FileText className="h-6 w-6 text-math-primary" />
              </div>
              <p>
                We break down difficult concepts into manageable parts, using clear 
                language and practical examples relevant to engineering applications.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Users className="h-6 w-6 text-math-primary" />
              </div>
              <p>
                Our subscription model keeps costs affordable while allowing us to 
                continuously update and improve our content.
              </p>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold text-math-primary mb-4">
          Contact
        </h2>
        <Card className="mb-8">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-medium text-math-primary italic">
              "Math That Makes Minds"
            </p>
            <div className="mt-4">
              <a 
                href="mailto:contact@mathpath.com" 
                className="text-blue-600 hover:underline"
              >
                contact@mathpath.com
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
