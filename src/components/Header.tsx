
import React from 'react';
import { Brain, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleNavigation = (path: string, sectionId?: string) => {
    if (path === '/') {
      navigate('/');
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  const handleGetStarted = () => {
    navigate('/courses');
    toast({
      title: 'Welcome to LearnAI!',
      description: 'Explore our course library and start your learning journey.',
    });
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              LearnAI
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/', 'dashboard')}
              className={`transition-colors ${
                isActive('/') && location.hash === '#dashboard' 
                  ? 'text-indigo-600 font-medium' 
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation('/courses')}
              className={`transition-colors ${
                isActive('/courses') 
                  ? 'text-indigo-600 font-medium' 
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => handleNavigation('/', 'features')}
              className={`transition-colors ${
                location.hash === '#features' 
                  ? 'text-indigo-600 font-medium' 
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => toast({ title: 'AI Tutor', description: 'AI Tutor feature coming soon!' })}
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              AI Tutor
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
            <Button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
