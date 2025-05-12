
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PDFViewer from '@/components/PDFViewer';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import LinearDependenceSolver from '@/components/LinearDependenceSolver';

const Content: React.FC = () => {
  const [topic, setTopic] = useState('linearAlgebra');
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get search parameters
  const queryParams = new URLSearchParams(location.search);
  const topicParam = queryParams.get('topic');
  const searchParam = queryParams.get('search');

  // Map topics to their display names, chapters, and keywords for searching
  const topics = {
    linearAlgebra: {
      displayName: "Linear Algebra",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"],
      keywords: ["vectors", "matrices", "determinants", "eigenvalues", "linear transformations", "vector spaces"]
    },
    diffEq: {
      displayName: "Differential Equations",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"],
      keywords: ["derivatives", "integrals", "ordinary", "partial", "separation of variables", "exact equations"]
    },
    calculusForEngineers: {
      displayName: "Calculus for Engineers",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"],
      keywords: ["limits", "derivatives", "integrals", "series", "convergence", "applications"]
    },
    engineeringVector: {
      displayName: "Vector Calculus",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"],
      keywords: ["gradient", "divergence", "curl", "line integrals", "surface integrals", "green's theorem"]
    },
    complexAnalysis: {
      displayName: "Complex Analysis",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"],
      keywords: ["complex numbers", "functions", "contour integrals", "cauchy's theorem", "residues"]
    },
    probStats: {
      displayName: "Probability and Statistics",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"],
      keywords: ["random variables", "distributions", "hypothesis testing", "confidence intervals", "regression"]
    },
    engineeringTransforms: {
      displayName: "Engineering Transforms",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"],
      keywords: ["laplace", "fourier", "z-transform", "convolution", "transfer functions"]
    },
    numericalMethods: {
      displayName: "Numerical Methods for Engineers",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"],
      keywords: ["approximation", "interpolation", "numerical integration", "finite difference", "algorithms"]
    },
    engineeringPhysics: {
      displayName: "Engineering Physics",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"],
      keywords: ["mechanics", "thermodynamics", "electromagnetism", "optics", "quantum physics"]
    },
    engineeringChemistry: {
      displayName: "Engineering Chemistry",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8"],
      keywords: ["stoichiometry", "thermochemistry", "kinetics", "electrochemistry", "organic chemistry"]
    }
  };

  useEffect(() => {
    // Redirect to subscription if not subscribed
    if (!user || !user.subscription_active) {
      navigate('/subscription');
      return;
    }
    
    // Set topic from URL parameter if provided
    if (topicParam) {
      // Check if the topic exists in our topics object
      if (topics.hasOwnProperty(topicParam)) {
        setTopic(topicParam);
        
        // Handle search parameter if present
        if (searchParam) {
          setSearchTerm(searchParam);
          
          // Check if the search term is in the current topic's keywords
          const currentTopic = topics[topicParam as keyof typeof topics];
          if (currentTopic && currentTopic.keywords.some(keyword => 
            keyword.toLowerCase().includes(searchParam.toLowerCase())
          )) {
            toast({
              title: "Content found",
              description: `Found "${searchParam}" in ${currentTopic.displayName}`,
            });
          }
        }
      } else {
        // If topic doesn't exist, show toast or redirect to 404
        console.error(`Topic not found: ${topicParam}`);
        navigate('/not-found');
      }
    }
  }, [user, topicParam, searchParam, navigate]);

  const handleTopicClick = (topicKey: keyof typeof topics) => {
    setTopic(topicKey);
    // Clear search term when changing topics
    setSearchTerm(null);
    // Update URL without search parameter
    navigate(`/content?topic=${topicKey}`);
  };

  // Find which chapter might contain the search term
  const findRelevantChapter = (): number | null => {
    if (!searchTerm) return null;
    
    // This is a simulated chapter match based on keywords
    // In a real app, this would search through actual chapter content
    const currentTopic = topics[topic as keyof typeof topics];
    const searchLower = searchTerm.toLowerCase();
    
    // For demo purposes, we'll just return chapter based on keyword position
    const keywordIndex = currentTopic.keywords.findIndex(keyword => 
      keyword.toLowerCase().includes(searchLower)
    );
    
    if (keywordIndex >= 0) {
      // Map keyword index to a chapter (simplified logic)
      return (keywordIndex % currentTopic.chapters.length) + 1;
    }
    
    return null;
  };

  const relevantChapter = findRelevantChapter();

  // Check if we're on Linear Algebra Chapter 7
  const isLinearAlgebraChapter7 = topic === 'linearAlgebra' && 
    (queryParams.get('chapter') === '7' || relevantChapter === 7);

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
            <Tabs defaultValue={relevantChapter ? `${topic}_chapter${relevantChapter}` : `${topic}_chapter1`}>
              <div className="bg-white rounded-t-lg shadow px-4 pt-4">
                <h1 className="text-2xl font-bold mb-4 text-math-primary">
                  {topics[topic as keyof typeof topics].displayName}
                  {searchTerm && (
                    <span className="ml-2 text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded">
                      Search: {searchTerm}
                    </span>
                  )}
                </h1>
                <TabsList>
                  {topics[topic as keyof typeof topics].chapters.map((chapter, index) => (
                    <TabsTrigger 
                      key={`${topic}_chapter${index + 1}`} 
                      value={`${topic}_chapter${index + 1}`}
                      className={relevantChapter === index + 1 ? 'border-2 border-math-primary' : ''}
                      onClick={() => {
                        const urlParams = new URLSearchParams(location.search);
                        urlParams.set('chapter', `${index + 1}`);
                        navigate(`/content?${urlParams.toString()}`);
                      }}
                    >
                      {chapter}
                      {relevantChapter === index + 1 && (
                        <span className="ml-1 text-xs bg-yellow-100 text-yellow-800 px-1 rounded">
                          Match
                        </span>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="mt-px">
                {topics[topic as keyof typeof topics].chapters.map((_, index) => (
                  <TabsContent key={`${topic}_chapter${index + 1}`} value={`${topic}_chapter${index + 1}`}>
                    {/* Add LinearDependenceSolver for Linear Algebra Chapter 7 */}
                    {topic === 'linearAlgebra' && index === 6 && (
                      <div className="mb-6">
                        <LinearDependenceSolver />
                      </div>
                    )}
                    <PDFViewer pdfPath={`/pdfs/${topic}_chapter${index + 1}.pdf`} searchTerm={searchTerm} />
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
