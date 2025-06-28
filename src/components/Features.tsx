
import React from 'react';
import { Brain, Target, BarChart3, Users, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Features = () => {
  const { toast } = useToast();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Personalization',
      description: 'Advanced machine learning algorithms analyze your learning patterns to create personalized study paths and recommendations.',
      color: 'text-indigo-600 bg-indigo-100'
    },
    {
      icon: Target,
      title: 'Adaptive Learning',
      description: 'Content difficulty automatically adjusts based on your performance, ensuring optimal challenge level for maximum growth.',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Comprehensive progress tracking with detailed insights into your strengths, weaknesses, and learning velocity.',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Connect with peers, join study groups, and learn from a community of motivated learners worldwide.',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Clock,
      title: 'Smart Scheduling',
      description: 'AI-optimized study schedules that fit your lifestyle and maximize retention through spaced repetition.',
      color: 'text-orange-600 bg-orange-100'
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Get immediate, detailed feedback on your work with AI-powered explanations and improvement suggestions.',
      color: 'text-red-600 bg-red-100'
    }
  ];

  const handleFeatureClick = (title: string) => {
    const featureMessages: { [key: string]: string } = {
      'AI-Powered Personalization': 'AI is analyzing your learning patterns to create a personalized study path just for you!',
      'Adaptive Learning': 'Content difficulty will automatically adjust based on your performance.',
      'Real-time Analytics': 'Access detailed insights about your learning progress and performance metrics.',
      'Collaborative Learning': 'Connect with study groups and join our learning community.',
      'Smart Scheduling': 'AI will create an optimized study schedule that fits your lifestyle.',
      'Instant Feedback': 'Get immediate feedback and explanations powered by AI.'
    };

    toast({
      title: title,
      description: featureMessages[title] || 'Feature coming soon!',
    });
  };

  const handleStartTrial = () => {
    toast({
      title: 'Free Trial Starting!',
      description: 'Welcome to your personalized learning journey. Redirecting to registration...',
    });
    
    // Scroll to dashboard section
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful AI Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience cutting-edge AI technology designed to revolutionize your learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleFeatureClick(feature.title)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Learning?</h3>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join thousands of learners who have already experienced the power of AI-driven personalized education
          </p>
          <button 
            onClick={handleStartTrial}
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
