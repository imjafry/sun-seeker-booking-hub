
import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BookingLayoutProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
  step?: number;
  totalSteps?: number;
}

export const BookingLayout = ({ 
  children, 
  title, 
  showBack = true, 
  step, 
  totalSteps 
}: BookingLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            {showBack && (
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            
            {step && totalSteps && (
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-gray-500">
                  Step {step} of {totalSteps}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < step ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 text-center">
            {title}
          </h1>

          {/* Content */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
