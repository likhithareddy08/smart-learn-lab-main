
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Clock, Users, Star, BookOpen, Download, Share } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Header from '../components/Header';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentVideo, setCurrentVideo] = useState(0);

  const course = {
    id: parseInt(courseId || '1'),
    title: 'Advanced Mathematics',
    instructor: 'Dr. Sarah Johnson',
    duration: '12 weeks',
    students: 1200,
    rating: 4.8,
    progress: 85,
    level: 'Advanced',
    description: 'Master advanced mathematical concepts including calculus, linear algebra, and differential equations. This comprehensive course will take you through complex mathematical theories and their practical applications.',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
    totalVideos: 24,
    completedVideos: 20,
    modules: [
      {
        id: 1,
        title: 'Introduction to Advanced Calculus',
        videos: [
          { id: 1, title: 'Course Overview and Objectives', duration: '15:30', completed: true },
          { id: 2, title: 'Limits and Continuity Review', duration: '22:45', completed: true },
          { id: 3, title: 'Advanced Differentiation Techniques', duration: '28:12', completed: true },
          { id: 4, title: 'Integration by Parts Advanced', duration: '31:20', completed: false }
        ]
      },
      {
        id: 2,
        title: 'Linear Algebra Fundamentals',
        videos: [
          { id: 5, title: 'Vector Spaces and Linear Independence', duration: '25:18', completed: true },
          { id: 6, title: 'Matrix Operations and Properties', duration: '33:45', completed: true },
          { id: 7, title: 'Eigenvalues and Eigenvectors', duration: '42:30', completed: false },
          { id: 8, title: 'Diagonalization', duration: '38:15', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Differential Equations',
        videos: [
          { id: 9, title: 'First Order Linear Equations', duration: '27:50', completed: false },
          { id: 10, title: 'Separable Equations', duration: '24:35', completed: false },
          { id: 11, title: 'Second Order Linear Equations', duration: '35:20', completed: false },
          { id: 12, title: 'Applications in Physics', duration: '29:45', completed: false }
        ]
      }
    ]
  };

  const handleVideoClick = (videoId: number) => {
    setCurrentVideo(videoId);
    toast({
      title: 'Video Player',
      description: 'Video functionality would be implemented with a proper video player.',
    });
  };

  const handleEnrollClick = () => {
    toast({
      title: 'Enrollment Successful!',
      description: 'You have been enrolled in this course. Start learning now!',
    });
  };

  const currentVideoData = course.modules
    .flatMap(module => module.videos)
    .find(video => video.id === currentVideo) || course.modules[0].videos[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/courses')}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <Card className="mb-6 overflow-hidden">
              <div className="relative bg-black aspect-video flex items-center justify-center">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    onClick={() => handleVideoClick(currentVideoData.id)}
                  >
                    <Play className="h-8 w-8 mr-2" />
                    Play Video
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">{currentVideoData.title}</h3>
                  <p className="text-sm opacity-80">Duration: {currentVideoData.duration}</p>
                </div>
              </div>
            </Card>

            {/* Course Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </CardTitle>
                    <p className="text-gray-600">by {course.instructor}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{course.rating}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      Rating
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{course.students.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{course.duration}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{course.level}</div>
                    <div className="text-sm text-gray-600">Level</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Course Progress</span>
                    <span>{course.progress}% Complete</span>
                  </div>
                  <Progress value={course.progress} className="h-3" />
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {course.description}
                </p>

                <Button 
                  onClick={handleEnrollClick}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Course Content */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Course Content
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {course.completedVideos} of {course.totalVideos} videos completed
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <div key={module.id} className="border-b border-gray-200 last:border-b-0">
                      <div className="p-4 bg-gray-50 font-semibold text-sm">
                        {module.title}
                      </div>
                      <div className="space-y-2">
                        {module.videos.map((video) => (
                          <div
                            key={video.id}
                            onClick={() => handleVideoClick(video.id)}
                            className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${
                              currentVideo === video.id 
                                ? 'border-indigo-600 bg-indigo-50' 
                                : video.completed 
                                  ? 'border-green-400' 
                                  : 'border-transparent'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900 mb-1">
                                  {video.title}
                                </h4>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {video.duration}
                                </div>
                              </div>
                              {video.completed && (
                                <CheckCircle className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
