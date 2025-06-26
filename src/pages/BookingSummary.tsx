
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/locales';
import { Plus, Minus } from 'lucide-react';

const BookingSummary = () => {
  const [towelCount, setTowelCount] = useState(0);
  const [parasolCount, setParasolCount] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleContinue = () => {
    navigate('/booking/confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-red-500 text-sm font-medium mb-4">Page 4</div>
          </div>

          {/* Main Content */}
          <Card className="mb-6 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="text-center mb-8">
                <div className="text-3xl mb-4">🔷</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Want a towel, or a parasol?
                </h2>
              </div>

              <div className="space-y-4 mb-8">
                {/* Luxury Towel */}
                <div className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">🏖️</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Luxury Towel</h3>
                      <p className="text-gray-600">$10 each</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTowelCount(Math.max(0, towelCount - 1))}
                      disabled={towelCount === 0}
                      className="w-10 h-10 p-0 rounded-full border-2"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-bold text-xl">{towelCount}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTowelCount(towelCount + 1)}
                      className="w-10 h-10 p-0 rounded-full border-2"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Premium Parasol */}
                <div className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">🏖️</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Premium Parasol</h3>
                      <p className="text-gray-600">$8 each</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setParasolCount(Math.max(0, parasolCount - 1))}
                      disabled={parasolCount === 0}
                      className="w-10 h-10 p-0 rounded-full border-2"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-bold text-xl">{parasolCount}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setParasolCount(parasolCount + 1)}
                      className="w-10 h-10 p-0 rounded-full border-2"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <p className="text-red-600 font-medium">Only 2 options</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              onClick={handleContinue}
              className="w-full py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              size="lg"
            >
              Continue →
            </Button>
            
            <Button 
              onClick={handleContinue}
              className="w-full py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              size="lg"
            >
              Skip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
