
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);

  const questionPool = [
    {
      question: "What is the solution to the equation 2x + 5 = 13?",
      options: ["x = 4", "x = 6", "x = 8", "x = 9"],
      correct: "x = 4",
      explanation: "Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4"
    },
    {
      question: "Which literary device is used in 'The stars danced in the sky'?",
      options: ["Metaphor", "Personification", "Simile", "Alliteration"],
      correct: "Personification",
      explanation: "Personification gives human qualities (dancing) to non-human objects (stars)"
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
      correct: "Mitochondria",
      explanation: "Mitochondria produce ATP, the energy currency of the cell"
    },
    {
      question: "What is the derivative of x²?",
      options: ["2x", "x", "2", "x²"],
      correct: "2x",
      explanation: "Using the power rule: d/dx(x²) = 2x¹ = 2x"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correct: "William Shakespeare",
      explanation: "William Shakespeare wrote this famous tragedy in the early part of his career"
    },
    {
      question: "What is the formula for the area of a circle?",
      options: ["πr", "2πr", "πr²", "2πr²"],
      correct: "πr²",
      explanation: "The area of a circle is π times the radius squared"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: "Mars",
      explanation: "Mars appears red due to iron oxide (rust) on its surface"
    },
    {
      question: "What is the past tense of 'run'?",
      options: ["Runned", "Ran", "Running", "Runs"],
      correct: "Ran",
      explanation: "The past tense of 'run' is 'ran' - it's an irregular verb"
    },
    {
      question: "What is 15% of 200?",
      options: ["25", "30", "35", "40"],
      correct: "30",
      explanation: "15% of 200 = 0.15 × 200 = 30"
    },
    {
      question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correct: "Carbon Dioxide",
      explanation: "Plants absorb CO₂ and release oxygen during photosynthesis"
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correct: "Canberra",
      explanation: "Canberra is the capital city of Australia, not Sydney or Melbourne"
    },
    {
      question: "What does 'www' stand for in a website address?",
      options: ["World Wide Web", "World Web Wide", "Web World Wide", "Wide World Web"],
      correct: "World Wide Web",
      explanation: "WWW stands for World Wide Web, the information system on the Internet"
    }
  ];

  const shuffleQuestions = () => {
    const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled.slice(0, 3)); // Select 3 random questions
  };

  useEffect(() => {
    shuffleQuestions();
  }, []);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === shuffledQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    shuffleQuestions(); // Get new random questions
  };

  if (quizCompleted) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    return (
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">
          {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Quiz Completed!</h3>
        <p className="text-lg text-gray-600">You scored {score} out of {shuffledQuestions.length}</p>
        <div className="text-3xl font-bold text-indigo-600">{percentage}%</div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            {percentage >= 80 ? 'Excellent work! You have a strong understanding.' :
             percentage >= 60 ? 'Good job! Consider reviewing the missed topics.' :
             'Keep practicing! Focus on the fundamentals.'}
          </p>
          <Button onClick={resetQuiz} className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <RefreshCw className="h-4 w-4 mr-2" />
            Take Quiz Again
          </Button>
        </div>
      </div>
    );
  }

  if (shuffledQuestions.length === 0) {
    return <div>Loading quiz...</div>;
  }

  const currentQ = shuffledQuestions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Question {currentQuestion + 1} of {shuffledQuestions.length}
        </h3>
        <div className="text-sm text-gray-500">Score: {score}/{shuffledQuestions.length}</div>
      </div>

      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">{currentQ.question}</h4>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={`w-full p-3 text-left rounded-lg border transition-colors ${
                  selectedAnswer === option
                    ? showResult
                      ? option === currentQ.correct
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-indigo-100 border-indigo-500 text-indigo-800'
                    : showResult && option === currentQ.correct
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && option === currentQ.correct && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  {showResult && selectedAnswer === option && option !== currentQ.correct && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h5 className="font-semibold text-blue-900 mb-1">Explanation:</h5>
              <p className="text-blue-800 text-sm">{currentQ.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <div className="text-sm text-gray-500">
          {showResult ? 'AI adapting difficulty...' : 'Select your answer'}
        </div>
        {!showResult ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
            className="bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            Submit Answer
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            className="bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            {currentQuestion < shuffledQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
