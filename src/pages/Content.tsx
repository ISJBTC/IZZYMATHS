
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { validateDeviceFingerprint } from '@/utils/deviceFingerprint';
import ProtectedContentViewer from '@/components/content/ProtectedContentViewer';

const Content: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const { toast } = useToast();
  const { user } = useAuth();
  const [deviceVerified, setDeviceVerified] = useState(false);

  useEffect(() => {
    // Check if user is accessing from registered device
    if (user) {
      const isVerifiedDevice = validateDeviceFingerprint(user.id);
      setDeviceVerified(isVerifiedDevice);
      
      if (!isVerifiedDevice) {
        toast({
          title: "Device not recognized",
          description: "You can only access content from your registered device.",
          variant: "destructive",
        });
      }
    }
  }, [user, toast]);

  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel(prev => prev + 10);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) {
      setZoomLevel(prev => prev - 10);
    }
  };

  const handleFullScreen = () => {
    const element = document.getElementById('content-container');
    if (element) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        element.requestFullscreen().catch(err => {
          toast({
            title: "Error",
            description: `Could not enable full-screen mode: ${err.message}`,
            variant: "destructive",
          });
        });
      }
    }
  };

  // Sample content for demonstration
  const linearAlgebraContent = (
    <>
      <h2>1.1 Introduction to Linear Algebra</h2>
      
      <p>Linear algebra is the branch of mathematics concerning linear equations, linear functions and their representations through matrices and vector spaces.</p>

      <p>The main objects of study in linear algebra are vector spaces. A vector space consists of a set of objects called vectors, a field whose elements are called scalars, and two operations: vector addition and scalar multiplication.</p>
      
      <div className="math-formula">
        Let V be a vector space and let u, v, w be vectors in V, and let a, b be scalars.<br />
        Vector addition: u + v = v + u (commutative property)<br />
        Scalar multiplication: a(bv) = (ab)v
      </div>

      <h2>1.2 Matrix Operations</h2>
      
      <p>A matrix is a rectangular array of numbers arranged in rows and columns. The dimensions of a matrix are given as m × n, where m is the number of rows and n is the number of columns.</p>
      
      <div className="math-formula">
        A = [a<sub>ij</sub>]<sub>m×n</sub> = 
        {`
        \\begin{pmatrix} 
        a_{11} & a_{12} & \\cdots & a_{1n} \\\\
        a_{21} & a_{22} & \\cdots & a_{2n} \\\\
        \\vdots & \\vdots & \\ddots & \\vdots \\\\
        a_{m1} & a_{m2} & \\cdots & a_{mn}
        \\end{pmatrix}
        `}
      </div>

      <p>Matrix addition is performed element by element:</p>
      
      <div className="math-formula">
        If A = [a<sub>ij</sub>] and B = [b<sub>ij</sub>], then A + B = [a<sub>ij</sub> + b<sub>ij</sub>]
      </div>
      
      <p>Matrix multiplication is a bit more complex. For two matrices A and B to be multiplied, the number of columns in A must equal the number of rows in B.</p>

      <div className="math-formula">
        If A is an m × n matrix and B is an n × p matrix, then the product AB is the m × p matrix whose (i,j)-entry is:<br />
        (AB)<sub>ij</sub> = Σ<sub>k=1</sub><sup>n</sup> a<sub>ik</sub>b<sub>kj</sub>
      </div>

      <h2>1.3 Determinants and Inverses</h2>
      
      <p>The determinant of a square matrix A is a scalar value that can be computed from the elements of A. It has many interpretations and applications.</p>
      
      <div className="math-formula">
        For a 2 × 2 matrix A = 
        {`
        \\begin{pmatrix} 
        a & b \\\\
        c & d 
        \\end{pmatrix}
        `}
        , the determinant is:<br />
        det(A) = |A| = ad - bc
      </div>
      
      <p>The inverse of a matrix A is denoted A<sup>-1</sup> and satisfies the equation AA<sup>-1</sup> = A<sup>-1</sup>A = I, where I is the identity matrix.</p>

      <div className="math-formula">
        For a 2 × 2 matrix A = 
        {`
        \\begin{pmatrix} 
        a & b \\\\
        c & d 
        \\end{pmatrix}
        `}
        , the inverse is:<br />
        A<sup>-1</sup> = {`\\frac{1}{det(A)}`}
        {`
        \\begin{pmatrix} 
        d & -b \\\\
        -c & a 
        \\end{pmatrix}
        `}
        = {`\\frac{1}{ad - bc}`}
        {`
        \\begin{pmatrix} 
        d & -b \\\\
        -c & a 
        \\end{pmatrix}
        `}
      </div>

      <p>A matrix is invertible if and only if its determinant is non-zero.</p>
    </>
  );

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

              <TabsContent value="chapter1">
                {user && (user.isSubscribed || deviceVerified) ? (
                  <ProtectedContentViewer 
                    initialContent={linearAlgebraContent}
                    zoomLevel={zoomLevel}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onFullScreen={handleFullScreen}
                  />
                ) : (
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <h3 className="text-xl font-medium mb-4">Subscription Required</h3>
                    <p className="mb-4">Please subscribe to access this content. Note that content can only be accessed from a single registered device.</p>
                    <Button asChild>
                      <a href="/subscription">Subscribe Now</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="chapter2">
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <h3 className="text-xl font-medium text-gray-600">Chapter 2: Vector Spaces</h3>
                  <p className="mt-4">Content will be available soon.</p>
                </div>
              </TabsContent>

              <TabsContent value="chapter3">
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <h3 className="text-xl font-medium text-gray-600">Chapter 3: Eigenvalues and Eigenvectors</h3>
                  <p className="mt-4">Content will be available soon.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Content;
