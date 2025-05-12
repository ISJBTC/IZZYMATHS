import React, { useState, useEffect } from 'react';

// Define types for our data structures
interface Option {
  id: string;
  text: string;
  next?: string;
  feedback?: string;
  isCorrect?: boolean;
  action?: () => void;
}

interface Step {
  id: string;
  question: string;
  options: Option[];
  hint: string;
  solution: string;
  workArea?: string;
}

interface PathItem {
  stepId: string;
  option: string;
}

interface SolutionItem {
  stepId: string;
  solution: string;
  stepNumber: number;
}

const LinearDependenceSolver: React.FC = () => {
  // State for tracking current step, selected paths, and hints
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [path, setPath] = useState<PathItem[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [workingArea, setWorkingArea] = useState<string>("");
  const [showSolutionMap, setShowSolutionMap] = useState<boolean>(false);
  const [showStepSolution, setShowStepSolution] = useState<boolean>(false);
  const [fullSolution, setFullSolution] = useState<SolutionItem[]>([]);
  
  // The vectors from the problem
  const vectors: number[][] = [
    [2, 2, 7, -1],
    [3, -1, 2, 4],
    [1, 1, 3, 1]
  ];
  
  // Decision paths - structure that defines the problem-solving flow
  const steps: Step[] = [
    {
      id: 'start',
      question: "How would you approach testing whether these vectors are linearly dependent?",
      options: [
        { 
          id: 'check-definition', 
          text: "Check if there exists a non-trivial linear combination that equals the zero vector",
          next: 'setup-equations',
          isCorrect: true
        },
        { 
          id: 'check-rank', 
          text: "Determine if the number of vectors exceeds the dimension of the vector space",
          feedback: "This approach works in general, but here we have 3 vectors in ℝ⁴, so we can't immediately determine dependence this way. Let's try a different approach.",
          next: 'start'
        },
        { 
          id: 'check-determinant', 
          text: "Compute the determinant of the matrix formed by these vectors",
          feedback: "Since we have 3 vectors in ℝ⁴, we don't have a square matrix. The determinant approach works directly only for n vectors in ℝⁿ. Let's try a different approach.",
          next: 'start'
        },
        { 
          id: 'check-by-inspection', 
          text: "Try to find a relationship by inspection",
          feedback: "While sometimes possible for simple cases, the relationships aren't immediately obvious here. Let's use a systematic approach.",
          next: 'start'
        }
      ],
      hint: "Linear dependence means one vector can be expressed as a linear combination of the others. The formal definition involves finding scalars c₁, c₂, c₃, not all zero, such that c₁v₁ + c₂v₂ + c₃v₃ = 0.",
      solution: "The fundamental approach to checking linear dependence is to use the definition: A set of vectors is linearly dependent if there exists scalars (not all zero) such that their linear combination equals the zero vector. For our three vectors, we'll check if there exist c₁, c₂, c₃, not all zero, such that c₁v₁ + c₂v₂ + c₃v₃ = 0."
    },
    {
      id: 'setup-equations',
      question: "How do you set up the equations to check for linear dependence?",
      options: [
        { 
          id: 'system-equations', 
          text: "Write a homogeneous system of equations c₁v₁ + c₂v₂ + c₃v₃ = 0",
          next: 'equation-approach',
          isCorrect: true
        },
        { 
          id: 'matrix-approach', 
          text: "Form a matrix with the vectors as columns and find its null space",
          next: 'matrix-formation',
          isCorrect: true
        },
        { 
          id: 'try-eliminating', 
          text: "Try to eliminate one vector using the others",
          feedback: "While this can work, it's more systematic to set up equations or use a matrix approach. Let's choose one of those methods.",
          next: 'setup-equations'
        }
      ],
      hint: "Both setting up a homogeneous system and forming a matrix are valid approaches. The matrix approach is often more systematic and less error-prone.",
      solution: "To check for linear dependence, we set up the equation c₁v₁ + c₂v₂ + c₃v₃ = 0, where v₁, v₂, v₃ are our vectors and c₁, c₂, c₃ are scalars we need to find. For our vectors, this gives:\n\nc₁(2,2,7,-1) + c₂(3,-1,2,4) + c₃(1,1,3,1) = (0,0,0,0)\n\nExpanding this component-wise gives us four equations:\n2c₁ + 3c₂ + c₃ = 0\n2c₁ - c₂ + c₃ = 0\n7c₁ + 2c₂ + 3c₃ = 0\n-c₁ + 4c₂ + c₃ = 0"
    },
    {
      id: 'equation-approach',
      question: "You've decided to set up a homogeneous system. What is the next step?",
      workArea: "c₁(2,2,7,-1) + c₂(3,-1,2,4) + c₃(1,1,3,1) = (0,0,0,0)\n\nThis gives us the equations:\n2c₁ + 3c₂ + c₃ = 0\n2c₁ - c₂ + c₃ = 0\n7c₁ + 2c₂ + 3c₃ = 0\n-c₁ + 4c₂ + c₃ = 0",
      options: [
        { 
          id: 'form-augmented', 
          text: "Form an augmented matrix and use row reduction",
          next: 'augmented-matrix',
          isCorrect: true
        },
        { 
          id: 'solve-directly', 
          text: "Solve the system of equations algebraically",
          feedback: "While possible, solving a system with 4 equations and 3 unknowns algebraically can be tedious and error-prone. Row reduction is more systematic.",
          next: 'equation-approach'
        },
        { 
          id: 'check-consistency', 
          text: "Check if the system is consistent",
          feedback: "The system is homogeneous, so it's always consistent (the trivial solution always exists). We need to determine if non-trivial solutions exist.",
          next: 'equation-approach'
        }
      ],
      hint: "Converting to an augmented matrix and using row reduction (Gaussian elimination) is the most systematic approach for solving this system.",
      solution: "With our system of equations:\n2c₁ + 3c₂ + c₃ = 0\n2c₁ - c₂ + c₃ = 0\n7c₁ + 2c₂ + 3c₃ = 0\n-c₁ + 4c₂ + c₃ = 0\n\nThe most efficient approach is to form an augmented matrix and use row reduction. The augmented matrix will be:\n\n[2  3  1 | 0]\n[2 -1  1 | 0]\n[7  2  3 | 0]\n[-1 4  1 | 0]\n\nWe'll apply Gaussian elimination to transform this into row echelon form."
    },
    {
      id: 'matrix-formation',
      question: "How would you form the matrix to check for linear dependence?",
      options: [
        { 
          id: 'vectors-as-columns', 
          text: "Form a matrix with the vectors as columns",
          feedback: "While this works for checking linear independence of columns, for our specific problem of testing if vectors are linearly dependent, we need to set up a different matrix. Let's rethink our approach.",
          next: 'setup-equations'
        },
        { 
          id: 'vectors-as-rows', 
          text: "Form a matrix with the vectors as rows",
          feedback: "This would test linear dependence of rows, but we're looking at vectors in their given form. Let's try a different approach.",
          next: 'setup-equations'
        },
        { 
          id: 'coefficient-matrix', 
          text: "Form the coefficient matrix of the homogeneous system",
          next: 'augmented-matrix',
          isCorrect: true
        }
      ],
      hint: "When checking linear dependence of vectors v₁, v₂, v₃, we examine if c₁v₁ + c₂v₂ + c₃v₃ = 0 has non-trivial solutions. This gives a system of equations whose coefficient matrix can be row-reduced.",
      solution: "To check linear dependence, we set up the equation c₁v₁ + c₂v₂ + c₃v₃ = 0. This gives us a system of linear equations:\n\n2c₁ + 3c₂ + c₃ = 0\n2c₁ - c₂ + c₃ = 0\n7c₁ + 2c₂ + 3c₃ = 0\n-c₁ + 4c₂ + c₃ = 0\n\nThe coefficient matrix for this system is:\n\n[2  3  1]\n[2 -1  1]\n[7  2  3]\n[-1 4  1]\n\nWhich can be extended to an augmented matrix [A|0] for row reduction."
    },
    {
      id: 'augmented-matrix',
      question: "You've decided to use row reduction. What matrix will you form?",
      options: [
        { 
          id: 'correct-matrix', 
          text: "Form the augmented matrix [A|0] where A has the vectors as columns",
          feedback: "That's not quite right. For testing linear dependence, the vectors become rows of our coefficient matrix, not columns.",
          next: 'augmented-matrix'
        },
        { 
          id: 'coefficient-rows', 
          text: "Form the coefficient matrix from the components of the vectors",
          next: 'row-reduction',
          isCorrect: true
        },
        { 
          id: 'vectors-components', 
          text: "Form a 3×4 matrix with the vectors as rows",
          feedback: "While you can put the vectors as rows in a matrix, what we need is the coefficient matrix from the homogeneous system c₁v₁ + c₂v₂ + c₃v₃ = 0, which gives us a 4×3 matrix.",
          next: 'augmented-matrix'
        }
      ],
      hint: "From our system of equations, we need a coefficient matrix where each row represents one equation and each column represents one unknown (c₁, c₂, c₃).",
      solution: "For our homogeneous system of equations:\n\n2c₁ + 3c₂ + c₃ = 0\n2c₁ - c₂ + c₃ = 0\n7c₁ + 2c₂ + 3c₃ = 0\n-c₁ + 4c₂ + c₃ = 0\n\nWe form the coefficient matrix:\n\n[2  3  1]\n[2 -1  1]\n[7  2  3]\n[-1 4  1]\n\nAnd the augmented matrix [A|0] becomes:\n\n[2  3  1 | 0]\n[2 -1  1 | 0]\n[7  2  3 | 0]\n[-1 4  1 | 0]\n\nThis 4×3 augmented matrix represents our system where each row corresponds to one equation, each column to one variable (c₁, c₂, c₃), and the last column represents the right side of the equations (all zeros)."
    },
    {
      id: 'row-reduction',
      question: "You've formed the coefficient matrix. What's the next step?",
      workArea: "The augmented matrix for our system is:\n\n[2  3  1 | 0]\n[2 -1  1 | 0]\n[7  2  3 | 0]\n[-1 4  1 | 0]",
      options: [
        { 
          id: 'rref', 
          text: "Convert the matrix to reduced row echelon form (RREF)",
          next: 'analyze-rank',
          isCorrect: true
        },
        { 
          id: 'determinant', 
          text: "Calculate the determinant of the coefficient matrix",
          feedback: "Since our coefficient matrix is 4×3 (not square), we can't calculate its determinant. Row reduction is the way to go.",
          next: 'row-reduction'
        },
        { 
          id: 'just-pivots', 
          text: "Perform row operations until pivots are found, then count them",
          next: 'analyze-rank',
          isCorrect: true
        }
      ],
      hint: "Row reduction (transforming to RREF) will reveal the rank of the matrix and whether non-trivial solutions exist.",
      solution: "To determine if our system has non-trivial solutions, we'll perform row reduction on the augmented matrix to get the reduced row echelon form (RREF).\n\nStarting with:\n[2  3  1 | 0]\n[2 -1  1 | 0]\n[7  2  3 | 0]\n[-1 4  1 | 0]\n\nStep 1: Make the first element a 1\nR₁ = R₁/2\n[1  1.5  0.5 | 0]\n[2 -1    1   | 0]\n[7  2    3   | 0]\n[-1 4    1   | 0]\n\nStep 2: Eliminate the first column\nR₂ = R₂ - 2R₁\nR₃ = R₃ - 7R₁\nR₄ = R₄ + R₁\n[1  1.5  0.5 | 0]\n[0 -4    0   | 0]\n[0 -8.5  -0.5| 0]\n[0  5.5  1.5 | 0]\n\nStep 3: Make the second pivot a 1\nR₂ = R₂/(-4)\n[1  1.5  0.5 | 0]\n[0  1    0   | 0]\n[0 -8.5 -0.5 | 0]\n[0  5.5  1.5 | 0]\n\nStep 4: Eliminate the second column\nR₁ = R₁ - 1.5R₂\nR₃ = R₃ + 8.5R₂\nR₄ = R₄ - 5.5R₂\n[1  0  0.5 | 0]\n[0  1  0   | 0]\n[0  0 -0.5 | 0]\n[0  0  1.5 | 0]\n\nStep 5: Make the third pivot a 1\nR₃ = R₃/(-0.5)\n[1  0  0.5 | 0]\n[0  1  0   | 0]\n[0  0  1   | 0]\n[0  0  1.5 | 0]\n\nStep 6: Eliminate the third column\nR₁ = R₁ - 0.5R₃\nR₄ = R₄ - 1.5R₃\n[1  0  0 | 0]\n[0  1  0 | 0]\n[0  0  1 | 0]\n[0  0  0 | 0]\n\nThis is our final RREF form."
    },
    {
      id: 'analyze-rank',
      question: "After row reduction, you get the matrix in row echelon form. How do you interpret the results?",
      workArea: "After row reduction, we get:\n\n[1 0 0 | 0]\n[0 1 0 | 0]\n[0 0 1 | 0]\n[0 0 0 | 0]",
      options: [
        { 
          id: 'compare-rank-vectors', 
          text: "Compare the rank of the matrix with the number of vectors",
          next: 'interpret-results',
          isCorrect: true
        },
        { 
          id: 'check-free-variables', 
          text: "Check if there are any free variables in the system",
          next: 'interpret-results',
          isCorrect: true
        },
        { 
          id: 'look-for-zero-rows', 
          text: "Count the number of zero rows in the reduced matrix",
          next: 'interpret-results',
          isCorrect: true
        }
      ],
      hint: "After row reduction, if the rank equals the number of vectors, they are linearly independent. If the rank is less than the number of vectors, they are linearly dependent.",
      solution: "Looking at our reduced row echelon form matrix:\n\n[1 0 0 | 0]\n[0 1 0 | 0]\n[0 0 1 | 0]\n[0 0 0 | 0]\n\nTo analyze this result, we have several equivalent approaches:\n\n1. Rank analysis: The rank of the matrix is 3 (the number of non-zero rows), which equals the number of vectors we're testing. When rank equals the number of vectors, they are linearly independent.\n\n2. Free variables: There are no free variables in this system, as each variable c₁, c₂, and c₃ has a pivot. This means there's only the trivial solution c₁=c₂=c₃=0.\n\n3. Zero rows: We have one zero row, which is expected since we have 4 equations and 3 unknowns. The zero row indicates that our system is consistent, but doesn't give us any additional flexibility in solutions.\n\nAll three methods lead to the same conclusion: the vectors are linearly independent."
    },
    {
      id: 'interpret-results',
      question: "Based on your analysis, what conclusion can you draw about the linear dependence of the vectors?",
      workArea: "After row reduction, we have:\n\n[1 0 0 | 0]\n[0 1 0 | 0]\n[0 0 1 | 0]\n[0 0 0 | 0]\n\nThe matrix has rank 3, which equals the number of vectors.",
      options: [
        { 
          id: 'independent', 
          text: "The vectors are linearly independent",
          next: 'conclusion',
          isCorrect: true
        },
        { 
          id: 'dependent', 
          text: "The vectors are linearly dependent",
          feedback: "Let's take another look. The matrix has rank 3, which equals the number of vectors. This means there are no free variables, and the only solution to our system is the trivial solution c₁=c₂=c₃=0. Therefore, the vectors are linearly independent.",
          next: 'interpret-results'
        },
        { 
          id: 'cant-tell', 
          text: "We need additional information to determine",
          feedback: "We have all the information we need. The rank of the matrix tells us whether the vectors are linearly dependent or independent.",
          next: 'interpret-results'
        }
      ],
      hint: "If the rank of the matrix equals the number of vectors, then the vectors are linearly independent. If the rank is less than the number of vectors, then they are linearly dependent.",
      solution: "Since our reduced row echelon form has rank 3 (three pivot columns), and we're testing 3 vectors, we can conclude that the vectors are linearly independent.\n\nThis means that none of the vectors in our set {v₁, v₂, v₃} can be expressed as a linear combination of the others. Equivalently, the equation c₁v₁ + c₂v₂ + c₃v₃ = 0 has only the trivial solution c₁=c₂=c₃=0.\n\nIf the vectors had been linearly dependent, we would have had at least one free variable, which would have allowed non-zero values for the coefficients, indicating that at least one vector could be expressed as a linear combination of the others."
    },
    {
      id: 'conclusion',
      question: "Excellent! You've correctly determined that the vectors are linearly independent. How would you explain this result?",
      options: [
        { 
          id: 'rank-explanation', 
          text: "The coefficient matrix has rank 3, equal to the number of vectors, so the only solution is the trivial solution",
          next: 'complete',
          isCorrect: true
        },
        { 
          id: 'geometric-explanation', 
          text: "Geometrically, none of the vectors can be expressed as a linear combination of the others",
          next: 'complete',
          isCorrect: true
        },
        { 
          id: 'system-explanation', 
          text: "The system of equations has no free variables, so there are no non-trivial solutions",
          next: 'complete',
          isCorrect: true
        }
      ],
      hint: "All these explanations are correct. You can explain in terms of rank, geometry, or system solutions.",
      solution: "There are several valid ways to explain why the vectors are linearly independent:\n\n1. From a rank perspective: The coefficient matrix has rank 3, which equals the number of vectors we're testing. When the rank equals the number of vectors, they are linearly independent.\n\n2. From a geometric perspective: Linear independence means none of the vectors can be expressed as a linear combination of the others. In ℝ⁴, our three vectors form a 3-dimensional subspace, with each vector adding a new dimension not covered by the previous vectors.\n\n3. From a system of equations perspective: Our system c₁v₁ + c₂v₂ + c₃v₃ = 0 has no free variables, meaning there's only the trivial solution c₁=c₂=c₃=0. This indicates there's no non-trivial way to combine these vectors to get the zero vector.\n\nAll these explanations are mathematically equivalent and describe the same fundamental property from different perspectives."
    },
    {
      id: 'complete',
      question: "Congratulations! You've successfully analyzed the linear dependence of the vectors and concluded they are linearly independent. Would you like to review the solution path or try a different approach?",
      options: [
        { 
          id: 'show-map', 
          text: "Show me the solution map",
          action: () => setShowSolutionMap(true)
        },
        { 
          id: 'restart', 
          text: "Restart with a different approach",
          action: () => {
            setCurrentStep(0);
            setPath([]);
            setWorkingArea("");
            setFeedback("");
            setShowHint(false);
            setHintsUsed(0);
            setShowStepSolution(false);
            setFullSolution([]);
          }
        }
      ],
      hint: "You can see the solution map to review the optimal path for solving this problem.",
      solution: "In this problem, we've worked through a systematic approach to determine linear dependence or independence of vectors:\n\n1. First, we set up a homogeneous system of equations c₁v₁ + c₂v₂ + c₃v₃ = 0 based on the definition of linear dependence.\n\n2. We constructed an augmented coefficient matrix from this system and applied row reduction to find its reduced row echelon form.\n\n3. By analyzing the rank of the matrix (or equivalent methods like counting pivots or free variables), we determined that the vectors are linearly independent.\n\n4. This means none of the three vectors can be expressed as a linear combination of the others, and the only solution to c₁v₁ + c₂v₂ + c₃v₃ = 0 is the trivial solution c₁=c₂=c₃=0.\n\nFor linearly independent vectors, we would not be able to find any non-trivial relation between them. If they had been linearly dependent, we would have found specific coefficients c₁, c₂, c₃ (not all zero) that satisfy the equation."
    }
  ];
  
  // Update full solution when a correct option is selected
  useEffect(() => {
    if (showStepSolution && step.solution) {
      // Add this step's solution to the full solution if it's not already there
      setFullSolution(prevSolution => {
        // Check if this step's solution is already in the full solution
        if (!prevSolution.some(item => item.stepId === step.id)) {
          return [...prevSolution, {
            stepId: step.id,
            solution: step.solution,
            stepNumber: currentStep
          }];
        }
        return prevSolution;
      });
    }
  }, [showStepSolution, step, currentStep]);

  // Helper function to find step by ID
  const findStep = (stepId: string): Step | undefined => {
    return steps.find(step => step.id === stepId);
  };
  
  // Current step object
  const step: Step = steps[currentStep];
  
  // Go back to the previous step
  const goBackStep = (): void => {
    if (path.length > 0) {
      // Remove the last step from path
      const newPath = [...path];
      newPath.pop();
      setPath(newPath);
      
      // If path is now empty, go to first step
      if (newPath.length === 0) {
        setCurrentStep(0);
        setWorkingArea("");
        setFeedback("");
        setShowStepSolution(false);
        return;
      }
      
      // Otherwise, go to the step before the last one in the path
      const lastPathItem = newPath[newPath.length - 1];
      const previousStep = findStep(lastPathItem.stepId);
      
      if (previousStep) {
        const previousOption = previousStep.options.find(o => o.id === lastPathItem.option);
        
        if (previousOption && previousOption.next) {
          const targetStepIndex = steps.findIndex(s => s.id === previousOption.next);
          if (targetStepIndex >= 0) {
            setCurrentStep(targetStepIndex);
            const targetStep = steps[targetStepIndex];
            if (targetStep.workArea) {
              setWorkingArea(targetStep.workArea);
            } else {
              setWorkingArea("");
            }
            setFeedback("");
            setShowStepSolution(previousOption.isCorrect || false);
          }
        }
      }
    }
  };

  // Handle user selection
  const handleSelect = (option: Option): void => {
    if (option.action) {
      option.action();
      return;
    }
    
    if (option.feedback) {
      setFeedback(option.feedback);
      return;
    }
    
    setPath([...path, { stepId: step.id, option: option.id }]);
    setFeedback("");
    
    // If option is correct, show the step solution
    if (option.isCorrect) {
      setShowStepSolution(true);
    } else {
      setShowStepSolution(false);
    }
    
    // Find the next step index
    if (option.next) {
      const nextStep = findStep(option.next);
      const nextStepIndex = steps.findIndex(s => s.id === option.next);
      if (nextStepIndex >= 0) {
        setCurrentStep(nextStepIndex);
        if (nextStep && nextStep.workArea) {
          setWorkingArea(nextStep.workArea);
        }
      }
    }
  };
  
  // Toggle hint visibility
  const toggleHint = (): void => {
    if (!showHint) {
      setHintsUsed(hintsUsed + 1);
    }
    setShowHint(!showHint);
  };
  
  // Solution map visualization
  const SolutionMap = () => (
    <div className="bg-blue-50 p-4 rounded-lg mt-4">
      <h3 className="text-lg font-bold mb-2">Solution Map</h3>
      <p className="mb-2">Optimal path for solving this linear dependence problem:</p>
      <ol className="list-decimal pl-5">
        <li>Check if there exists a non-trivial linear combination that equals the zero vector</li>
        <li>Form a matrix with the vectors as components of homogeneous system equations</li>
        <li>Convert the matrix to row echelon form using Gaussian elimination</li>
        <li>Compare the rank of the matrix (3) with the number of vectors (3)</li>
        <li>Conclude the vectors are linearly independent because rank equals number of vectors</li>
      </ol>
      <p className="mt-2">There are multiple valid approaches to solve this problem, but this path is efficient and systematic.</p>
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
        onClick={() => setShowSolutionMap(false)}
      >
        Close Solution Map
      </button>
    </div>
  );
  
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Linear Dependence Problem Solver</h2>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">Problem:</h3>
        <p>Test the following vectors for linear dependence and find a relation between them if dependent:</p>
        <div className="my-2">
          <p>v₁ = (2, 2, 7, -1)</p>
          <p>v₂ = (3, -1, 2, 4)</p>
          <p>v₃ = (1, 1, 3, 1)</p>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="mb-4">
        <div className="h-2 w-full bg-gray-200 rounded-full">
          <div 
            className="h-full bg-green-500 rounded-full" 
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-sm">Start</span>
          <span className="text-sm">Progress</span>
          <span className="text-sm">Complete</span>
        </div>
      </div>
      
      {/* Working area for calculations */}
      {workingArea && (
        <div className="bg-yellow-50 p-4 rounded-lg mb-4 font-mono text-sm">
          <h3 className="font-semibold mb-2">Working Area:</h3>
          <pre className="whitespace-pre-wrap">{workingArea}</pre>
        </div>
      )}
      
      {/* Current question */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Decision Point:</h3>
          {currentStep > 0 && (
            <button
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm flex items-center"
              onClick={goBackStep}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
              Go Back
            </button>
          )}
        </div>
        <p className="mb-4">{step.question}</p>
        
        {/* Options */}
        <div className="space-y-2">
          {step.options.map((option, index) => (
            <button
              key={index}
              className="w-full text-left p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition"
              onClick={() => handleSelect(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
      
      {/* Feedback for incorrect answers */}
      {feedback && (
        <div className="p-3 bg-orange-100 rounded-lg mb-4">
          <p className="font-semibold">Feedback:</p>
          <p>{feedback}</p>
        </div>
      )}
      
      {/* Step-by-step solution for current step */}
      {showStepSolution && step.solution && (
        <div className="p-3 bg-green-100 rounded-lg mb-4 border border-green-300">
          <p className="font-semibold mb-2">Current Step Solution:</p>
          <pre className="whitespace-pre-wrap text-sm">{step.solution}</pre>
        </div>
      )}
      
      {/* Full solution that builds up as user progresses */}
      {fullSolution.length > 0 && (
        <div className="p-3 bg-blue-100 rounded-lg mb-4 border border-blue-300">
          <p className="font-semibold mb-2">Full Solution (Building Up):</p>
          {fullSolution
            .sort((a, b) => a.stepNumber - b.stepNumber)
            .map((item, index) => (
              <div key={index} className="mb-3">
                <p className="font-semibold text-sm">Step {index + 1}:</p>
                <pre className="whitespace-pre-wrap text-sm pl-4 border-l-2 border-blue-500">{item.solution}</pre>
              </div>
            ))
          }
        </div>
      )}
      
      {/* Hint system */}
      <div className="mb-4">
        <button
          className="text-blue-600
