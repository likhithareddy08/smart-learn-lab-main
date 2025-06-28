
import React from 'react';
import { BookOpen, Target, Trophy, Clock, Brain, Users, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import ProgressChart from './ProgressChart';
import QuizComponent from './QuizComponent';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const stats = [
    { title: 'Courses Completed', value: '12', icon: BookOpen, color: 'text-blue-600', action: 'courses' },
    { title: 'Study Streak', value: '28 days', icon: Target, color: 'text-green-600', action: 'streak' },
    { title: 'Achievements', value: '45', icon: Trophy, color: 'text-yellow-600', action: 'achievements' },
    { title: 'Study Time', value: '127h', icon: Clock, color: 'text-purple-600', action: 'time' },
  ];

  const courses = [
    { 
      id: 1, 
      title: 'Advanced Mathematics', 
      progress: 85, 
      difficulty: 'Advanced', 
      students: 1200,
      instructor: 'Dr. Sarah Johnson',
      nextLesson: 'Integration by Parts Advanced'
    },
    { 
      id: 2, 
      title: 'Data Science Fundamentals', 
      progress: 92, 
      difficulty: 'Intermediate', 
      students: 850,
      instructor: 'Prof. Michael Chen',
      nextLesson: 'Final Project Review'
    },
    { 
      id: 3, 
      title: 'Machine Learning Basics', 
      progress: 78, 
      difficulty: 'Beginner', 
      students: 2100,
      instructor: 'Dr. Emily Rodriguez',
      nextLesson: 'Neural Networks Introduction'
    },
    { 
      id: 4, 
      title: 'Web Development', 
      progress: 95, 
      difficulty: 'Intermediate', 
      students: 1500,
      instructor: 'John Smith',
      nextLesson: 'Course Completion Certificate'
    },
  ];

  const handleStatClick = (action: string, title: string) => {
    const actions = {
      courses: () => {
        navigate('/courses');
        toast({
          title: 'Courses Overview',
          description: 'Viewing your course library and progress',
        });
      },
      streak: () => {
        toast({
          title: 'Study Streak: 28 Days!',
          description: 'Amazing consistency! Keep up the great work to maintain your streak.',
        });
      },
      achievements: () => {
        toast({
          title: 'Achievements Unlocked',
          description: 'You have earned 45 badges and achievements. View your complete collection.',
        });
      },
      time: () => {
        toast({
          title: 'Study Time Analytics',
          description: '127 hours of focused learning across all subjects. Impressive dedication!',
        });
      }
    };

    actions[action as keyof typeof actions]?.();
  };

  const handleCourseClick = (course: any) => {
    navigate(`/course/${course.id}`);
    toast({
      title: `Opening ${course.title}`,
      description: `Continue with: ${course.nextLesson}`,
    });
  };

  const handleViewAllCourses = () => {
    navigate('/courses');
  };

  return (
    <section id="dashboard" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Learning Dashboard</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your progress, continue your courses, and achieve your learning goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 group"
              onClick={() => handleStatClick(stat.action, stat.title)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-semibold group-hover:text-indigo-600 transition-colors">
                    {stat.title}
                  </span>
                  <stat.icon className={`h-6 w-6 ${stat.color} group-hover:scale-110 transition-transform`} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 group-hover:text-indigo-600 transition-colors">
                  Click to view details
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ProgressChart />

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Active Courses</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleViewAllCourses}
                  className="hover:bg-indigo-50 hover:border-indigo-300"
                >
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="group">
                    <div 
                      className="cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200"
                      onClick={() => handleCourseClick(course)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600">by {course.instructor}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
                          <div className="text-xs text-gray-500">Complete</div>
                        </div>
                      </div>
                      
                      <Progress value={course.progress} className="h-2 mb-2" />
                      
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Next: {course.nextLesson}</span>
                        <div className="flex items-center gap-3">
                          <span>{course.difficulty}</span>
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {course.students}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button 
                  onClick={handleViewAllCourses}
                  variant="outline" 
                  className="w-full hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
                >
                  Explore More Courses
                  <BookOpen className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-indigo-600" />
              AI-Powered Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QuizComponent />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
