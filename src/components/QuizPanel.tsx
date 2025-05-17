import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  Check, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Expand, 
  Minimize, 
  SkipForward, 
  Star, 
  BookmarkPlus,
  BookmarkCheck,
  ListOrdered,
  ChevronDown,
  Pencil,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QuizQuestion } from '@/types/quiz-types';
import { fetchQuestions } from '@/lib/quiz-service';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

// Extended user data for questions
interface UserQuestionData {
  isImportant: boolean;
  notes: string;
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
  const [userQuestionData, setUserQuestionData] = useState<Record<number, UserQuestionData>>({});
  const [showNotesEditor, setShowNotesEditor] = useState<boolean>(false);
  const [tempNotes, setTempNotes] = useState<string>('');
  const [showQuestionSelector, setShowQuestionSelector] = useState<boolean>(false);
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
  }, [questions, currentQuestionIndex, showExplanation, showNotesEditor]);

  // Load user data from localStorage
  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedData = localStorage.getItem(`quiz_data_${topic}_${chapter}`);
        if (savedData) {
          setUserQuestionData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Error loading user data from localStorage:", error);
      }
    };
    
    loadUserData();
  }, [topic, chapter]);

  // Save user data to localStorage when it changes
  useEffect(() => {
    if (Object.keys(userQuestionData).length > 0) {
      try {
        localStorage.setItem(`quiz_data_${topic}_${chapter}`, JSON.stringify(userQuestionData));
      } catch (error) {
        console.error("Error saving user data to localStorage:", error);
      }
    }
  }, [userQuestionData, topic, chapter]);

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

  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (questions.length === 0) return 0;
    return Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  };

  // Toggle marking a question as important
  const toggleImportant = () => {
    const questionId = currentQuestion?.id || 0;
    if (questionId) {
      setUserQuestionData(prev => {
        const current = prev[questionId] || { isImportant: false, notes: '' };
        return {
          ...prev,
          [questionId]: {
            ...current,
            isImportant: !current.isImportant
          }
        };
      });

      toast({
        title: `Question ${userQuestionData[questionId]?.isImportant ? 'unmarked' : 'marked'} as important`,
        description: `Question ${currentQuestionIndex + 1} has been ${userQuestionData[questionId]?.isImportant ? 'removed from' : 'added to'} your important questions.`,
      });
    }
  };

  // Save notes for a question
  const saveNotes = () => {
    const questionId = currentQuestion?.id || 0;
    if (questionId) {
      setUserQuestionData(prev => {
        const current = prev[questionId] || { isImportant: false, notes: '' };
        return {
          ...prev,
          [questionId]: {
            ...current,
            notes: tempNotes
          }
        };
      });
      setShowNotesEditor(false);
      toast({
        title: "Notes saved",
        description: "Your notes for this question have been saved.",
      });
    }
  };

  // Open notes editor
  const editNotes = () => {
    const questionId = currentQuestion?.id || 0;
    setTempNotes(userQuestionData[questionId]?.notes || '');
    setShowNotesEditor(true);
  };

  // Navigate to a specific question
  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowQuestionSelector(false);
    }
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

  // Quiz completion screen
  if (quizCompleted) {
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
              
              {/* Important questions summary */}
              {Object.entries(userQuestionData).filter(([_, data]) => data.isImportant).length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-left mb-2">Your Important Questions:</h4>
                  <div className="text-left text-sm">
                    {Object.entries(userQuestionData)
                      .filter(([_, data]) => data.isImportant)
                      .map(([id]) => {
                        const questionIndex = questions.findIndex(q => q.id === Number(id));
                        if (questionIndex === -1) return null;
                        return (
                          <div key={id} className="mb-2 p-2 bg-gray-50 rounded-md">
                            <div className="font-medium">Question {questionIndex + 1}</div>
                            <div className="text-gray-600 text-xs mt-1">{questions[questionIndex].question}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={resetQuiz} className="w-full">
              Retry Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestionId = currentQuestion.id;
  const isCurrentQuestionImportant = Boolean(userQuestionData[currentQuestionId]?.isImportant);
  const currentQuestionNotes = userQuestionData[currentQuestionId]?.notes || '';

  // Collapsed compact view
  if (!expanded) {
    return (
      <div className="w-full h-full bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-math-primary" />
            <h3 className="text-lg font-bold">Chapter Quiz</h3>
          </div>
          <div className="flex items-center gap-2">
            <Popover open={showQuestionSelector} onOpenChange={setShowQuestionSelector}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs px-2 flex items-center gap-1"
                >
                  {currentQuestionIndex + 1}/{questions.length}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0" align="end">
                <div className="max-h-60 overflow-auto py-1">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      className={`w-full text-left px-3 py-1.5 text-sm ${
                        index === currentQuestionIndex 
                          ? 'bg-math-primary text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => goToQuestion(index)}
                    >
                      Question {index + 1}
                      {skippedQuestions.includes(index) && (
                        <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-1 py-0.5 rounded">Skipped</span>
                      )}
                      {Object.entries(userQuestionData).some(([id, data]) => 
                        Number(id) === questions[index]?.id && data.isImportant
                      ) && (
                        <Star className="inline-block h-3 w-3 ml-1 text-yellow-500" />
                      )}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleExpand}
            >
              <Expand className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-math-primary h-2 rounded-full" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-black text-base">{currentQuestion.question}</h4>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0" 
                onClick={toggleImportant}
              >
                {isCurrentQuestionImportant ? (
                  <BookmarkCheck className="h-4 w-4 text-yellow-500" />
                ) : (
                  <BookmarkPlus className="h-4 w-4" />
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0" 
                onClick={editNotes}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Notes editor */}
          {showNotesEditor && (
            <div className="mb-3 border rounded-md p-2 bg-gray-50">
              <Textarea 
                value={tempNotes} 
                onChange={(e) => setTempNotes(e.target.value)}
                placeholder="Add your notes here..."
                className="min-h-[80px] text-sm"
              />
              <div className="flex justify-end mt-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-xs mr-2"
                  onClick={() => setShowNotesEditor(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  variant="default"
                  className="text-xs"
                  onClick={saveNotes}
                >
                  Save Notes
                </Button>
              </div>
            </div>
          )}
          
          {/* Display notes if they exist */}
          {!showNotesEditor && currentQuestionNotes && (
            <div className="mb-3 border-l-2 border-math-primary pl-2 italic text-xs text-gray-600">
              {currentQuestionNotes}
            </div>
          )}
          
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`p-2.5 rounded-md cursor-pointer border transition-colors ${
                  selectedAnswer === index
                    ? "border-math-primary bg-math-primary/10"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => !showExplanation && handleAnswerSelect(index)}
              >
                <div className="flex items-start gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedAnswer === index ? "bg-math-primary text-white" : "bg-gray-100"
                  }`}>
                    {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                  </div>
                  <div className="flex-1 text-sm">
                    {option}
                  </div>
                  {showExplanation && index === currentQuestion.correctAnswer && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                  {showExplanation && index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer && (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {showExplanation && (
          <div className="mb-3 p-2 bg-blue-50 rounded-md border border-blue-100">
            <p className="font-medium text-xs">Explanation:</p>
            <p className="text-xs">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 justify-between border-t pt-3">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              size="sm"
              className="h-8 px-2"
            >
              <ArrowLeft className="h-3 w-3 mr-1" />
              Prev
            </Button>
            
            {!showExplanation ? (
              <>
                <Button 
                  variant="default" 
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null}
                  size="sm"
                  className="h-8 px-2"
                >
                  Check
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSkipQuestion}
                  size="sm"
                  className="h-8 px-2"
                >
                  Skip
                </Button>
              </>
            ) : (
              <Button 
                variant="default" 
                onClick={handleNextQuestion}
                size="sm"
                className="h-8 px-2"
              >
                {currentQuestionIndex < questions.length - 1 || skippedQuestions.length > 0 
                  ? "Next" 
                  : "Complete"}
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
          <div className="text-sm flex items-center">
            <span className="text-xs">Score: </span>
            <span className="font-medium ml-1">{score}/{questions.length}</span>
          </div>
        </div>
      </div>
    );
  }
// Expanded view
  return (
    <div className="fixed inset-4 z-50 overflow-auto bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-math-primary" />
          <h3 className="text-lg font-bold">Chapter Quiz</h3>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <ListOrdered className="h-4 w-4 mr-1" />
                Question {currentQuestionIndex + 1}/{questions.length}
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 max-h-80 overflow-auto">
              {questions.map((_, index) => (
                <DropdownMenuItem 
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={`${index === currentQuestionIndex ? 'bg-math-primary/10 font-medium' : ''}`}
                >
                  <div className="flex items-center w-full justify-between">
                    <span>Question {index + 1}</span>
                    <div className="flex items-center">
                      {skippedQuestions.includes(index) && (
                        <span className="text-xs bg-amber-100 text-amber-800 px-1 py-0.5 rounded mr-1">Skipped</span>
                      )}
                      {Object.entries(userQuestionData).some(([id, data]) => 
                        Number(id) === questions[index]?.id && data.isImportant
                      ) && (
                        <Star className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleExpand}
            className="ml-auto"
          >
            <Minimize className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="border-t-4 border-t-math-primary">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CardTitle className="text-base">
                Question {currentQuestionIndex + 1} of {questions.length}
                {skippedQuestions.includes(currentQuestionIndex) && (
                  <span className="ml-2 text-amber-500 text-xs font-medium">(Skipped)</span>
                )}
              </CardTitle>
              <div className="ml-2 flex">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0" 
                  onClick={toggleImportant}
                  title={isCurrentQuestionImportant ? "Unmark as important" : "Mark as important"}
                >
                  {isCurrentQuestionImportant ? (
                    <BookmarkCheck className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <BookmarkPlus className="h-4 w-4" />
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0" 
                  onClick={editNotes}
                  title="Add/edit notes"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {skippedQuestions.length > 0 && (
              <span className="text-xs text-gray-500">
                Skipped: {skippedQuestions.length}
              </span>
            )}
          </div>
          <CardDescription className="font-medium text-black text-base">
            {currentQuestion.question}
          </CardDescription>
          
          {/* Notes editor in expanded view */}
          {showNotesEditor && (
            <div className="mt-2 border rounded-md p-2 bg-gray-50">
              <Textarea 
                value={tempNotes} 
                onChange={(e) => setTempNotes(e.target.value)}
                placeholder="Add your notes here..."
                className="min-h-[100px]"
              />
              <div className="flex justify-end mt-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="mr-2"
                  onClick={() => setShowNotesEditor(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={saveNotes}
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save Notes
                </Button>
              </div>
            </div>
          )}
          
          {/* Display notes if they exist */}
          {!showNotesEditor && currentQuestionNotes && (
            <div className="mt-2 border-l-4 border-math-primary pl-3 py-2 bg-gray-50 rounded-r-md">
              <div className="flex items-center justify-between mb-1">
                <h5 className="text-sm font-medium">Your Notes:</h5>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0" 
                  onClick={editNotes}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-sm text-gray-700">{currentQuestionNotes}</p>
            </div>
          )}
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
      
      {/* Question navigation panel */}
      <div className="mt-4 border rounded-md p-3">
        <h4 className="font-medium text-sm mb-3">Question Navigator</h4>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {questions.map((_, index) => {
            const questionId = questions[index]?.id || 0;
            const isImportant = Boolean(userQuestionData[questionId]?.isImportant);
            const isSkipped = skippedQuestions.includes(index);
            const hasNotes = Boolean(userQuestionData[questionId]?.notes);
            
            return (
              <Button 
                key={index}
                variant={index === currentQuestionIndex ? "default" : "outline"}
                className={`relative h-10 w-10 p-0 ${
                  isImportant ? 'border-yellow-500' : ''
                }`}
                onClick={() => goToQuestion(index)}
              >
                <span>{index + 1}</span>
                {isImportant && (
                  <div className="absolute -top-1 -right-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  </div>
                )}
                {isSkipped && (
                  <div className="absolute -bottom-1 -right-1">
                    <span className="flex h-3 w-3 bg-amber-500 rounded-full"></span>
                  </div>
                )}
                {hasNotes && (
                  <div className="absolute -bottom-1 -left-1">
                    <Pencil className="h-3 w-3 text-blue-500" />
                  </div>
                )}
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* Important questions list */}
      {Object.entries(userQuestionData).filter(([_, data]) => data.isImportant).length > 0 && (
        <div className="mt-4 border rounded-md p-3">
          <h4 className="font-medium text-sm mb-2">Important Questions</h4>
          <div className="space-y-2">
            {Object.entries(userQuestionData)
              .filter(([_, data]) => data.isImportant)
              .map(([id]) => {
                const questionIndex = questions.findIndex(q => q.id === Number(id));
                if (questionIndex === -1) return null;
                return (
                  <div key={id} className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100">
                    <div className="text-sm">
                      <span className="font-medium">Question {questionIndex + 1}:</span> 
                      <span className="text-gray-600 ml-1 line-clamp-1">
                        {questions[questionIndex].question}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => goToQuestion(questionIndex)}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPanel;