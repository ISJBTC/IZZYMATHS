import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, BarChart2 } from 'lucide-react';
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
      2: <DiffEqReactorCh2 />,
      3: <DiffEqReactorCh3 />,
      4: <DiffEqReactorCh4 />,
      5: <DiffEqReactorCh5 />,
      6: <DiffEqReactorCh6 />,
      7: <DiffEqReactorCh7 />,
      8: <DiffEqReactorCh8 />
    },
    partialDifferentiation: {
      1: <PartialDiffReactorCh1 />,
      2: <PartialDiffReactorCh2 />,
      3: <PartialDiffReactorCh3 />,
      4: <PartialDiffReactorCh4 />,
      5: <PartialDiffReactorCh5 />,
      6: <PartialDiffReactorCh6 />,
      7: <PartialDiffReactorCh7 />,
      8: <PartialDiffReactorCh8 />
    },
    calculusForEngineers: {
      1: <CalculusReactorCh1 />,
      2: <CalculusReactorCh2 />,
      3: <CalculusReactorCh3 />,
      4: <CalculusReactorCh4 />,
      5: <CalculusReactorCh5 />,
      6: <CalculusReactorCh6 />,
      7: <CalculusReactorCh7 />,
      8: <CalculusReactorCh8 />
    },
    engineeringVector: {
      1: <VectorReactorCh1 />,
      2: <VectorReactorCh2 />,
      3: <VectorReactorCh3 />,
      4: <VectorReactorCh4 />,
      5: <VectorReactorCh5 />,
      6: <VectorReactorCh6 />,
      7: <VectorReactorCh7 />,
      8: <VectorReactorCh8 />
    },
    complexAnalysis: {
      1: <ComplexReactorCh1 />,
      2: <ComplexReactorCh2 />,
      3: <ComplexReactorCh3 />,
      4: <ComplexReactorCh4 />,
      5: <ComplexReactorCh5 />,
      6: <ComplexReactorCh6 />,
      7: <ComplexReactorCh7 />,
      8: <ComplexReactorCh8 />
    },
    probStats: {
      1: <ProbReactorCh1 />,
      2: <ProbReactorCh2 />,
      3: <ProbReactorCh3 />,
      4: <ProbReactorCh4 />,
      5: <ProbReactorCh5 />,
      6: <ProbReactorCh6 />,
      7: <ProbReactorCh7 />,
      8: <ProbReactorCh8 />
    },
    engineeringTransforms: {
      1: <TransformReactorCh1 />,
      2: <TransformReactorCh2 />,
      3: <TransformReactorCh3 />,
      4: <TransformReactorCh4 />,
      5: <TransformReactorCh5 />,
      6: <TransformReactorCh6 />,
      7: <TransformReactorCh7 />,
      8: <TransformReactorCh8 />
    },
    numericalMethods: {
      1: <NumericalReactorCh1 />,
      2: <NumericalReactorCh2 />,
      3: <NumericalReactorCh3 />,
      4: <NumericalReactorCh4 />,
      5: <NumericalReactorCh5 />,
      6: <NumericalReactorCh6 />,
      7: <NumericalReactorCh7 />,
      8: <NumericalReactorCh8 />
    },
    engineeringPhysics: {
      1: <PhysicsReactorCh1 />,
      2: <PhysicsReactorCh2 />,
      3: <PhysicsReactorCh3 />,
      4: <PhysicsReactorCh4 />,
      5: <PhysicsReactorCh5 />,
      6: <PhysicsReactorCh6 />,
      7: <PhysicsReactorCh7 />,
      8: <PhysicsReactorCh8 />
    },
    engineeringChemistry: {
      1: <ChemistryReactorCh1 />,
      2: <ChemistryReactorCh2 />,
      3: <ChemistryReactorCh3 />,
      4: <ChemistryReactorCh4 />,
      5: <ChemistryReactorCh5 />,
      6: <ChemistryReactorCh6 />,
      7: <ChemistryReactorCh7 />,
      8: <ChemistryReactorCh8 />
    }
  };

  // Placeholder components for Linear Algebra reactors
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

  // Placeholder components for Differential Equations reactors
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

  function DiffEqReactorCh2() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Second Order DE</CardTitle>
          <CardDescription>Second order differential equations solver</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
            <div className="text-center">
              <Book className="h-12 w-12 mx-auto text-math-primary mb-2" />
              <p>Second Order DE Solver</p>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  function DiffEqReactorCh3() {
    return createDefaultReactor("Higher Order DE", "Higher order differential equations solver");
  }

  function DiffEqReactorCh4() {
    return createDefaultReactor("Systems of DE", "Systems of differential equations solver");
  }

  function DiffEqReactorCh5() {
    return createDefaultReactor("Laplace Transforms", "Differential equations with Laplace transforms");
  }

  function DiffEqReactorCh6() {
    return createDefaultReactor("Series Solutions", "Series solutions for differential equations");
  }

  function DiffEqReactorCh7() {
    return createDefaultReactor("Numerical DE", "Numerical methods for differential equations");
  }

  function DiffEqReactorCh8() {
    return createDefaultReactor("Partial DE", "Introduction to partial differential equations");
  }

  // Create reactors for other topics with helper function
  function createDefaultReactor(title: string, description: string) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
            <div className="text-center">
              <Book className="h-12 w-12 mx-auto text-math-primary mb-2" />
              <p>Interactive Learning Tool</p>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Partial Differentiation reactors
  function PartialDiffReactorCh1() {
    return createDefaultReactor("Partial Derivatives", "Introduction to partial derivatives");
  }

  function PartialDiffReactorCh2() {
    return createDefaultReactor("Multiple Integrals", "Double and triple integrals");
  }

  function PartialDiffReactorCh3() {
    return createDefaultReactor("Vector Fields", "Vector fields and line integrals");
  }

  function PartialDiffReactorCh4() {
    return createDefaultReactor("Surface Integrals", "Surface and flux integrals");
  }

  function PartialDiffReactorCh5() {
    return createDefaultReactor("Gradient & Divergence", "Gradient, divergence, and curl operations");
  }

  function PartialDiffReactorCh6() {
    return createDefaultReactor("Vector Identities", "Important vector calculus identities");
  }

  function PartialDiffReactorCh7() {
    return createDefaultReactor("Green's Theorem", "Green's theorem and applications");
  }

  function PartialDiffReactorCh8() {
    return createDefaultReactor("Stokes' Theorem", "Stokes' and divergence theorems");
  }

  // Calculus for Engineers reactors
  function CalculusReactorCh1() {
    return createDefaultReactor("Limits", "Limit calculations and applications");
  }

  function CalculusReactorCh2() {
    return createDefaultReactor("Differentiation", "Differentiation rules and techniques");
  }

  function CalculusReactorCh3() {
    return createDefaultReactor("Applications of Derivatives", "Engineering applications of derivatives");
  }

  function CalculusReactorCh4() {
    return createDefaultReactor("Integration", "Integration techniques and formulas");
  }

  function CalculusReactorCh5() {
    return createDefaultReactor("Applications of Integrals", "Engineering applications of integrals");
  }

  function CalculusReactorCh6() {
    return createDefaultReactor("Series", "Infinite series and convergence");
  }

  function CalculusReactorCh7() {
    return createDefaultReactor("Power Series", "Power series and applications");
  }

  function CalculusReactorCh8() {
    return createDefaultReactor("Taylor Series", "Taylor and Maclaurin series");
  }

  // Vector Calculus reactors
  function VectorReactorCh1() { return createDefaultReactor("Vector Algebra", "Vector operations and properties"); }
  function VectorReactorCh2() { return createDefaultReactor("Vector Functions", "Vector-valued functions"); }
  function VectorReactorCh3() { return createDefaultReactor("Motion in Space", "Velocity and acceleration in 3D"); }
  function VectorReactorCh4() { return createDefaultReactor("Curvature", "Curvature and motion along curves"); }
  function VectorReactorCh5() { return createDefaultReactor("Vector Fields", "Vector fields and applications"); }
  function VectorReactorCh6() { return createDefaultReactor("Line Integrals", "Line integrals in vector fields"); }
  function VectorReactorCh7() { return createDefaultReactor("Surface Integrals", "Surface integrals and flux"); }
  function VectorReactorCh8() { return createDefaultReactor("Integral Theorems", "Fundamental theorems of vector calculus"); }

  // Complex Analysis reactors
  function ComplexReactorCh1() { return createDefaultReactor("Complex Numbers", "Operations with complex numbers"); }
  function ComplexReactorCh2() { return createDefaultReactor("Complex Functions", "Complex functions and mappings"); }
  function ComplexReactorCh3() { return createDefaultReactor("Analytic Functions", "Analyticity and Cauchy-Riemann equations"); }
  function ComplexReactorCh4() { return createDefaultReactor("Complex Integration", "Contour integrals"); }
  function ComplexReactorCh5() { return createDefaultReactor("Cauchy's Theorem", "Cauchy's integral theorem"); }
  function ComplexReactorCh6() { return createDefaultReactor("Series Expansions", "Laurent series"); }
  function ComplexReactorCh7() { return createDefaultReactor("Residue Theory", "Residues and evaluation of integrals"); }
  function ComplexReactorCh8() { return createDefaultReactor("Conformal Mapping", "Conformal mappings and applications"); }

  // Probability and Statistics reactors
  function ProbReactorCh1() { return createDefaultReactor("Probability Basics", "Sample spaces and events"); }
  function ProbReactorCh2() { return createDefaultReactor("Random Variables", "Discrete and continuous random variables"); }
  function ProbReactorCh3() { return createDefaultReactor("Probability Distributions", "Common probability distributions"); }
  function ProbReactorCh4() { return createDefaultReactor("Expectation & Variance", "Expected values and moments"); }
  function ProbReactorCh5() { return createDefaultReactor("Statistical Inference", "Sampling and estimation"); }
  function ProbReactorCh6() { return createDefaultReactor("Hypothesis Testing", "Statistical hypothesis tests"); }
  function ProbReactorCh7() { return createDefaultReactor("Regression", "Linear regression models"); }
  function ProbReactorCh8() { return createDefaultReactor("ANOVA", "Analysis of variance"); }

  // Engineering Transforms reactors
  function TransformReactorCh1() { return createDefaultReactor("Laplace Transform", "Laplace transform basics"); }
  function TransformReactorCh2() { return createDefaultReactor("Inverse Laplace", "Inverse Laplace transform"); }
  function TransformReactorCh3() { return createDefaultReactor("Fourier Series", "Fourier series expansions"); }
  function TransformReactorCh4() { return createDefaultReactor("Fourier Transform", "Fourier transform applications"); }
  function TransformReactorCh5() { return createDefaultReactor("Z-Transform", "Z-transform and discrete systems"); }
  function TransformReactorCh6() { return createDefaultReactor("Transfer Functions", "Transfer functions and system response"); }
  function TransformReactorCh7() { return createDefaultReactor("State Space", "State space representations"); }
  function TransformReactorCh8() { return createDefaultReactor("Discrete Systems", "Analysis of discrete-time systems"); }

  // Numerical Methods reactors
  function NumericalReactorCh1() { return createDefaultReactor("Error Analysis", "Numerical errors and propagation"); }
  function NumericalReactorCh2() { return createDefaultReactor("Root Finding", "Numerical methods for finding roots"); }
  function NumericalReactorCh3() { return createDefaultReactor("Linear Systems", "Solving systems of linear equations"); }
  function NumericalReactorCh4() { return createDefaultReactor("Curve Fitting", "Interpolation and curve fitting"); }
  function NumericalReactorCh5() { return createDefaultReactor("Numerical Integration", "Numerical integration methods"); }
  function NumericalReactorCh6() { return createDefaultReactor("Numerical Differentiation", "Numerical differentiation techniques"); }
  function NumericalReactorCh7() { return createDefaultReactor("ODE Solvers", "Numerical solution of ODEs"); }
  function NumericalReactorCh8() { return createDefaultReactor("PDE Methods", "Finite difference methods for PDEs"); }

  // Engineering Physics reactors
  function PhysicsReactorCh1() { return createDefaultReactor("Mechanics", "Newton's laws and applications"); }
  function PhysicsReactorCh2() { return createDefaultReactor("Fluid Mechanics", "Fluid statics and dynamics"); }
  function PhysicsReactorCh3() { return createDefaultReactor("Thermodynamics", "Laws of thermodynamics"); }
  function PhysicsReactorCh4() { return createDefaultReactor("Waves", "Wave phenomena and applications"); }
  function PhysicsReactorCh5() { return createDefaultReactor("Optics", "Geometric and physical optics"); }
  function PhysicsReactorCh6() { return createDefaultReactor("Electricity", "Electric fields and circuits"); }
  function PhysicsReactorCh7() { return createDefaultReactor("Magnetism", "Magnetic fields and induction"); }
  function PhysicsReactorCh8() { return createDefaultReactor("Modern Physics", "Quantum mechanics introduction"); }

  // Engineering Chemistry reactors
  function ChemistryReactorCh1() { return createDefaultReactor("Stoichiometry", "Chemical equations and reactions"); }
  function ChemistryReactorCh2() { return createDefaultReactor("Thermochemistry", "Energy changes in chemical reactions"); }
  function ChemistryReactorCh3() { return createDefaultReactor("Chemical Bonding", "Atomic structure and bonding"); }
  function ChemistryReactorCh4() { return createDefaultReactor("States of Matter", "Properties of gases, liquids, and solids"); }
  function ChemistryReactorCh5() { return createDefaultReactor("Chemical Kinetics", "Reaction rates and mechanisms"); }
  function ChemistryReactorCh6() { return createDefaultReactor("Equilibrium", "Chemical equilibrium principles"); }
  function ChemistryReactorCh7() { return createDefaultReactor("Electrochemistry", "Electrochemical cells and electrolysis"); }
  function ChemistryReactorCh8() { return createDefaultReactor("Organic Chemistry", "Organic compounds and reactions"); }

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
