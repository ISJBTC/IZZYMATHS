import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, Check, X, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizPanelProps {
  topic: string;
  chapter: number;
}

const QuizPanel: React.FC<QuizPanelProps> = ({ topic, chapter }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  // Sample quiz questions for Linear Algebra Chapter 7
  const linearAlgebraCh7Questions: QuizQuestion[] = [
    {
      id: 1,
      question: "A set of vectors is linearly dependent if and only if:",
      options: [
        "At least one vector can be expressed as a linear combination of the others",
        "All vectors are orthogonal to each other",
        "The vectors span the entire vector space",
        "None of the vectors can be expressed as a linear combination of the others"
      ],
      correctAnswer: 0,
      explanation: "Linear dependence means at least one vector can be written as a linear combination of the others. Equivalently, there exists a non-trivial solution to the equation c₁v₁ + c₂v₂ + ... + cₙvₙ = 0."
    },
    {
      id: 2,
      question: "If a set of n vectors in R^m is linearly independent, then which of the following must be true?",
      options: [
        "n = m",
        "n ≤ m",
        "n ≥ m",
        "n < m"
      ],
      correctAnswer: 1,
      explanation: "In R^m, you can have at most m linearly independent vectors. Therefore, if n vectors are linearly independent in R^m, then n must be less than or equal to m."
    },
    {
      id: 3,
      question: "To check if vectors v₁, v₂, v₃ are linearly dependent, what equation do we need to solve?",
      options: [
        "v₁ + v₂ + v₃ = 0",
        "c₁v₁ + c₂v₂ + c₃v₃ = 0, where not all c₁, c₂, c₃ are zero",
        "v₁v₂v₃ = 0",
        "c₁v₁ = c₂v₂ = c₃v₃"
      ],
      correctAnswer: 1,
      explanation: "We need to find if there exist scalars c₁, c₂, c₃, not all zero, such that c₁v₁ + c₂v₂ + c₃v₃ = 0. If such scalars exist, then the vectors are linearly dependent."
    }
  ];

  // Sample quiz questions for other chapters
  const quizQuestions: Record<string, Record<number, QuizQuestion[]>> = {
    linearAlgebra: {
      1: [
        {
          id: 1,
          question: "What is the result of adding matrix A = [[1, 2], [3, 4]] and B = [[5, 6], [7, 8]]?",
          options: [
            "[[6, 8], [10, 12]]",
            "[[5, 12], [21, 32]]",
            "[[1, 2, 5, 6], [3, 4, 7, 8]]",
            "Not possible to add"
          ],
          correctAnswer: 0,
          explanation: "Matrix addition is done element-wise. So A + B = [[1+5, 2+6], [3+7, 4+8]] = [[6, 8], [10, 12]]."
        }
      ],
      2: [
        {
          id: 1,
          question: "What is the result of multiplying matrix A = [[1, 2], [3, 4]] and B = [[5, 6], [7, 8]]?",
          options: [
            "[[19, 22], [43, 50]]",
            "[[5, 12], [21, 32]]",
            "[[1, 2, 5, 6], [3, 4, 7, 8]]",
            "[[6, 8], [10, 12]]"
          ],
          correctAnswer: 0,
          explanation: "Matrix multiplication: (AB)ᵢⱼ = Σₖ AᵢₖBₖⱼ. So AB = [[1×5+2×7, 1×6+2×8], [3×5+4×7, 3×6+4×8]] = [[19, 22], [43, 50]]."
        }
      ],
      3: [
        {
          id: 1,
          question: "What is the determinant of matrix A = [[4, 3], [2, 1]]?",
          options: [
            "-2",
            "2",
            "4",
            "10"
          ],
          correctAnswer: 0,
          explanation: "For a 2×2 matrix [[a, b], [c, d]], the determinant is ad - bc. So det(A) = 4×1 - 3×2 = 4 - 6 = -2."
        }
      ],
      4: [
        {
          id: 1,
          question: "Which of the following is a property of a vector space?",
          options: [
            "Closure under addition and scalar multiplication",
            "Every element must be a vector",
            "Must be in three dimensions",
            "Must contain the origin"
          ],
          correctAnswer: 0,
          explanation: "A vector space must be closed under addition and scalar multiplication, meaning if u and v are in the space, then u+v and cu (for any scalar c) must also be in the space."
        }
      ],
      5: [
        {
          id: 1,
          question: "For a 3×3 matrix, how many eigenvalues can it have?",
          options: [
            "Exactly 3, counting multiplicities",
            "Exactly 3, distinct values",
            "At most 3",
            "At least 3"
          ],
          correctAnswer: 0,
          explanation: "A square matrix of size n×n has exactly n eigenvalues when counting with their multiplicities. So a 3×3 matrix has exactly 3 eigenvalues (though some may be repeated)."
        }
      ],
      6: [
        {
          id: 1,
          question: "What is the inner product of vectors u = [1, 2, 3] and v = [4, 5, 6]?",
          options: [
            "32",
            "14",
            "9",
            "6"
          ],
          correctAnswer: 0,
          explanation: "The inner product of vectors u = [u₁, u₂, u₃] and v = [v₁, v₂, v₃] is u₁v₁ + u₂v₂ + u₃v₃. So u·v = 1×4 + 2×5 + 3×6 = 4 + 10 + 18 = 32."
        }
      ],
      7: linearAlgebraCh7Questions,
      8: [
        {
          id: 1,
          question: "Which of the following is a characteristic of a linear transformation T?",
          options: [
            "T(u + v) = T(u) + T(v) and T(cu) = cT(u) for any scalar c",
            "T(u × v) = T(u) × T(v) for cross product ×",
            "T(u · v) = T(u) · T(v) for dot product ·",
            "T(u + v) = T(u) × T(v)"
          ],
          correctAnswer: 0,
          explanation: "A linear transformation must preserve vector addition and scalar multiplication. These are the defining properties: T(u + v) = T(u) + T(v) and T(cu) = cT(u) for any scalar c."
        }
      ]
    },
    diffEq: {
      1: [
        {
          id: 1,
          question: "Which of the following is a first-order differential equation?",
          options: [
            "dy/dx + y = x",
            "d²y/dx² + y = 0",
            "y = x² + 2x + 1",
            "d³y/dx³ + d²y/dx² = sin(x)"
          ],
          correctAnswer: 0,
          explanation: "A first-order differential equation contains only the first derivative of the unknown function. The equation dy/dx + y = x involves only dy/dx, making it first-order."
        }
      ],
      // Other chapters for diffEq
    },
    // Other topics with their chapter questions
  };

  // Get questions for current topic and chapter
  const getQuestions = (): QuizQuestion[] => {
    if (quizQuestions[topic] && quizQuestions[topic][chapter]) {
      return quizQuestions[topic][chapter];
    }
    
    // Return default questions if none exist for this topic/chapter
    return [
      {
        id: 1,
        question: `Quiz questions for ${topic} Chapter ${chapter} coming soon!`,
        options: [
          "Option A",
          "Option B",
          "Option C",
          "Option D"
        ],
        correctAnswer: 0,
        explanation: "This is a placeholder quiz. Real questions will be added soon."
      }
    ];
  };

  const questions = getQuestions();
  const currentQuestion = questions[currentQuestionIndex || 0];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Select an answer",
        description: "Please select an answer before checking.",
      });
      return;
    }

    setShowExplanation(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      toast({
        title: "Quiz completed!",
        description: `Your score: ${score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)}/${questions.length}`,
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="h-5 w-5 text-math-primary" />
        <h3 className="text-lg font-bold">Chapter Quiz</h3>
      </div>

      {!quizCompleted ? (
        <Card className="border-t-4 border-t-math-primary">
          <CardHeader>
            <CardTitle className="text-base">Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
            <CardDescription className="font-medium text-black text-base">
              {currentQuestion.question}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md cursor-pointer border transition-colors ${
                    selectedAnswer === index
                      ? "border-math-primary bg-math-primary/10"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => !showExplanation && handleAnswerSelect(index)}
                >
                  <div className="flex items-start gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedAnswer === index ? "bg-math-primary text-white" : "bg-gray-100"
                    }`}>
                      {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                    </div>
                    <div className="flex-1">
                      {option}
                    </div>
                    {showExplanation && index === currentQuestion.correctAnswer && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                    {showExplanation && index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer && (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {showExplanation && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
                <p className="font-medium text-sm">Explanation:</p>
                <p className="text-sm">{currentQuestion.explanation}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {!showExplanation ? (
              <Button 
                variant="default" 
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
              >
                Check Answer
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={handleNextQuestion}
                className="flex items-center gap-1"
              >
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Quiz"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            <div className="text-sm">
              Score: {score}/{questions.length}
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Quiz Completed!</CardTitle>
            <CardDescription>
              You scored {score}/{questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <div className="text-4xl font-bold mb-2">
                {Math.round((score / questions.length) * 100)}%
              </div>
              <p className="text-gray-500">
                {score === questions.length
                  ? "Perfect! You've mastered this content."
                  : score >= questions.length / 2
                  ? "Good job! Keep practicing to improve."
                  : "Keep studying and try again soon."}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={resetQuiz} className="w-full">
              Retry Quiz
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default QuizPanel;
