import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Quiz } from 'lucide-react';
import LinearDependenceSolver from './LinearDependenceSolver';

interface ReactorPanelProps {
  topic: string;
  chapter: number;
}

const ReactorPanel: React.FC<ReactorPanelProps> = ({ topic, chapter }) => {
  // Map of available reactors for each topic and chapter
  const reactors: Record<string, Record<number, React.ReactNode>> = {
    linearAlgebra: {
      1: <LinearAlgebraReactorCh1 />,
      2: <LinearAlgebraReactorCh2 />,
      3: <LinearAlgebraReactorCh3 />,
      4: <LinearAlgebraReactorCh4 />,
      5: <LinearAlgebraReactorCh5 />,
      6: <LinearAlgebraReactorCh6 />,
      7: <LinearDependenceSolver />,
      8: <LinearAlgebraReactorCh8 />
    },
    diffEq: {
      1: <DiffEqReactorCh1 />,
      // ... other chapters
    },
    // ... other topics
  };

  // Placeholder components for other reactors
  function LinearAlgebraReactorCh1() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Matrix Operations</CardTitle>
          <CardDescription>Practice with matrix addition, subtraction, and scalar multiplication</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
            <div className="text-center">
              <Book className="h-12 w-12 mx-auto text-math-primary mb-2" />
              <p>Matrix Operations Interactive Tool</p>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  function LinearAlgebraReactorCh2() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Matrix Multiplication</CardTitle>
          <CardDescription>Step-by-step practice with matrix multiplication</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
            <div className="text-center">
              <Book className="h-12 w-12 mx-auto text-math-primary mb-2" />
              <p>Matrix Multiplication Tool</p>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  function LinearAlgebraReactorCh3() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Determinants</CardTitle>
          <CardDescription>Calculate determinants step-by-step</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
            <div className="text-center">
              <Book className="h-12 w-12 mx-auto text-math-primary mb-2" />
              <p>Determinant Calculator</p>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  function LinearAlgebraReactorCh4() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vector Spaces</CardTitle>
          <CardDescription>Explore vector space properties</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
            <div className="text-center">
              <Book className="h-12 w-12 mx-auto text-math-primary mb-2" />
              <p>Vector Space Explorer</p>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  function LinearAlgebraReactorCh5() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Eigenvalues & Eigenvectors</CardTitle>
          <CardDescription>Calculate eigenvalues and eigenvectors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
            <div className="text-center">
              <Book className="h-12 w-12 mx-auto text-math-primary mb-2" />
              <p>Eigenvalue Calculator</p>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  function LinearAlgebraReactorCh6() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inner Product Spaces</CardTitle>
          <CardDescription>Practice with inner products and orthogonality</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
            <div className="text-center">
              <Book className="h-12 w-12 mx-auto text-math-primary mb-2" />
              <p>Inner Product Calculator</p>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  function LinearAlgebraReactorCh8() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Linear Transformations</CardTitle>
          <CardDescription>Visualize linear transformations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
            <div className="text-center">
              <Book className="h-12 w-12 mx-auto text-math-primary mb-2" />
              <p>Linear Transformation Visualizer</p>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  function DiffEqReactorCh1() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>First Order DE</CardTitle>
          <CardDescription>First order differential equations solver</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
            <div className="text-center">
              <Book className="h-12 w-12 mx-auto text-math-primary mb-2" />
              <p>Differential Equation Solver</p>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get the reactor for the current topic and chapter
  const getReactor = () => {
    if (reactors[topic] && reactors[topic][chapter]) {
      return reactors[topic][chapter];
    }
    
    // Return placeholder if no specific reactor exists
    return (
      <Card>
        <CardHeader>
          <CardTitle>Interactive Learning Tool</CardTitle>
          <CardDescription>Content for {topic} - Chapter {chapter}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
            <div className="text-center">
              <Book className="h-12 w-12 mx-auto text-math-primary mb-2" />
              <p>Interactive learning tool for this chapter</p>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">Practice Tools for {topic.charAt(0).toUpperCase() + topic.slice(1)} - Chapter {chapter}</h3>
      <div className="flex overflow-x-auto gap-4 pb-2">
        {getReactor()}
      </div>
    </div>
  );
};

export default ReactorPanel;
