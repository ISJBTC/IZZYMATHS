import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, Check, X, ArrowRight, ArrowLeft, Expand, Minimize, SkipForward } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QuizQuestion } from '@/types/quiz-types';
import { fetchQuestions } from '@/lib/quiz-service';

interface QuizPanelProps {
  topic: string;
  chapter: number;
}

// Add MathJax type definition to window
declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: () => Promise<any>;
      [key: string]: any;
    }
  }
}

const QuizPanel: React.FC<QuizPanelProps> = ({ topic, chapter }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [skippedQuestions, setSkippedQuestions] = useState<number[]>([]);
  const { toast } = useToast();

  // MathJax initialization
  const mathJaxScript = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Add MathJax script if it doesn't exist
    if (!window.MathJax) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      script.id = 'MathJax-script';
      
      // Configure MathJax
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']],
          processEscapes: true
        },
        svg: {
          fontCache: 'global'
        },
        options: {
          enableMenu: false
        }
      };
      
      document.head.appendChild(script);
      mathJaxScript.current = script;
    }
  }, []);

  // Function to typeset math when content changes
  const typesetMath = () => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch(err => console.error('MathJax typesetting failed:', err));
    }
  };

  // Typeset math when questions change or current question changes
  useEffect(() => {
    if (questions.length > 0) {
      // Small delay to ensure DOM is updated
      const timer = setTimeout(() => {
        typesetMath();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [questions, currentQuestionIndex, showExplanation]);

  // Fetch questions based on topic and chapter
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const loadedQuestions = await fetchQuestions(topic, chapter);
        setQuestions(loadedQuestions);
      } catch (error) {
        console.error("Error loading questions:", error);
        toast({
          title: "Error loading questions",
          description: "Could not load quiz questions. Please try again later.",
          variant: "destructive",
        });
        // Set fallback questions
        setQuestions([
          {
            id: 1,
            question: `Quiz questions for ${topic} Chapter ${chapter} could not be loaded.`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: 0,
            explanation: "This is a placeholder. Please try again later."
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    // Reset quiz state when topic or chapter changes
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setSkippedQuestions([]);

    loadQuestions();
  }, [topic, chapter, toast]);

  const currentQuestion = questions[currentQuestionIndex] || null;

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
    
    if (currentQuestion && selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Check if there are any skipped questions
      if (skippedQuestions.length > 0) {
        toast({
          title: "Skipped Questions",
          description: `You have ${skippedQuestions.length} skipped questions. Would you like to review them?`,
          action: (
            <Button variant="outline" onClick={goToFirstSkippedQuestion}>
              Review
            </Button>
          ),
        });
      } else {
        completeQuiz();
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleSkipQuestion = () => {
    // Add current question to skipped list if not already skipped
    if (!skippedQuestions.includes(currentQuestionIndex)) {
      setSkippedQuestions([...skippedQuestions, currentQuestionIndex]);
    }
    
    // Move to next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // If we're at the last question, go to the first skipped question
      goToFirstSkippedQuestion();
    }
  };

  const goToFirstSkippedQuestion = () => {
    if (skippedQuestions.length > 0) {
      setCurrentQuestionIndex(skippedQuestions[0]);
      // Remove this question from the skipped list
      setSkippedQuestions(skippedQuestions.slice(1));
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
    toast({
      title: "Quiz completed!",
      description: `Your score: ${score + (currentQuestion && selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)}/${questions.length}`,
    });
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setSkippedQuestions([]);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
        <p>Loading questions...</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="w-full h-full bg-white rounded-lg shadow-md p-4">
        <div className="text-center p-4">
          <p>No questions available for this topic and chapter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-300 ease-in-out bg-white rounded-lg shadow-md p-4 ${expanded ? 'fixed inset-4 z-50 overflow-auto' : 'w-full h-full'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-math-primary" />
          <h3 className="text-lg font-bold">Chapter Quiz</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleExpand}
          className="ml-auto"
        >
          {expanded ? <Minimize className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
        </Button>
      </div>

      {!quizCompleted ? (
        <Card className="border-t-4 border-t-math-primary">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">
                Question {currentQuestionIndex + 1} of {questions.length}
                {skippedQuestions.includes(currentQuestionIndex) && (
                  <span className="ml-2 text-amber-500 text-xs font-medium">(Skipped)</span>
                )}
              </CardTitle>
              {skippedQuestions.length > 0 && (
                <span className="text-xs text-gray-500">
                  Skipped: {skippedQuestions.length}
                </span>
              )}
            </div>
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
                <p className="text-sm">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2 justify-between">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              {!showExplanation ? (
                <>
                  <Button 
                    variant="default" 
                    onClick={handleCheckAnswer}
                    disabled={selectedAnswer === null}
                  >
                    Check Answer
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleSkipQuestion}
                    className="flex items-center gap-1"
                  >
                    Skip
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button 
                  variant="default" 
                  onClick={handleNextQuestion}
                  className="flex items-center gap-1"
                >
                  {currentQuestionIndex < questions.length - 1 || skippedQuestions.length > 0 
                    ? "Next Question" 
                    : "Complete Quiz"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
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