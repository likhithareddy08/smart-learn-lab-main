
import React, { useState } from 'react';
import { Play, Clock, Users, Star, BookOpen, Filter, Search, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Courses = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'programming', name: 'Programming' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'science', name: 'Data Science' },
    { id: 'design', name: 'Design' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      category: 'mathematics',
      instructor: 'Dr. Sarah Johnson',
      duration: '12 weeks',
      students: 1200,
      rating: 4.8,
      progress: 85,
      status: 'in-progress',
      level: 'Advanced',
      videos: 24,
      description: 'Master advanced mathematical concepts including calculus, linear algebra, and differential equations.',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      price: 'Free'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      category: 'science',
      instructor: 'Prof. Michael Chen',
      duration: '10 weeks',
      students: 850,
      rating: 4.9,
      progress: 92,
      status: 'completed',
      level: 'Intermediate',
      videos: 18,
      description: 'Learn the foundations of data science, including statistics, Python programming, and data visualization.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      price: 'Free'
    },
    {
      id: 3,
      title: 'Machine Learning Basics',
      category: 'programming',
      instructor: 'Dr. Emily Rodriguez',
      duration: '8 weeks',
      students: 2100,
      rating: 4.7,
      progress: 78,
      status: 'in-progress',
      level: 'Beginner',
      videos: 16,
      description: 'Introduction to machine learning algorithms, supervised and unsupervised learning techniques.',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      price: 'Free'
    },
    {
      id: 4,
      title: 'Web Development Mastery',
      category: 'programming',
      instructor: 'John Smith',
      duration: '16 weeks',
      students: 1500,
      rating: 4.6,
      progress: 95,
      status: 'completed',
      level: 'Intermediate',
      videos: 32,
      description: 'Complete web development course covering HTML, CSS, JavaScript, React, and backend technologies.',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
      price: 'Free'
    },
    {
      id: 5,
      title: 'UI/UX Design Principles',
      category: 'design',
      instructor: 'Lisa Wang',
      duration: '6 weeks',
      students: 950,
      rating: 4.8,
      progress: 0,
      status: 'not-started',
      level: 'Beginner',
      videos: 12,
      description: 'Learn the fundamentals of user interface and user experience design.',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      price: 'Free'
    },
    {
      id: 6,
      title: 'Python for Beginners',
      category: 'programming',
      instructor: 'Alex Thompson',
      duration: '4 weeks',
      students: 3200,
      rating: 4.9,
      progress: 0,
      status: 'not-started',
      level: 'Beginner',
      videos: 20,
      description: 'Start your programming journey with Python, one of the most popular programming languages.',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
      price: 'Free'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCourseClick = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'not-started': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'not-started': return 'Not Started';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Library</h1>
          <p className="text-gray-600">Explore our comprehensive collection of courses and start learning today</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search courses or instructors..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card 
              key={course.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden"
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                    {getStatusText(course.status)}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                  <Play className="h-3 w-3 mr-1" />
                  {course.videos} videos
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-indigo-600 font-medium uppercase tracking-wide">
                    {course.level}
                  </span>
                  <span className="text-xs text-green-600 font-semibold">
                    {course.price}
                  </span>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2">
                  {course.title}
                </CardTitle>
                <p className="text-sm text-gray-600">by {course.instructor}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                {course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                    {course.rating}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
