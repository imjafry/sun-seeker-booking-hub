
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4 shadow-lg">
              <span className="text-sm font-medium text-gray-600">Page 4</span>
            </div>
          </div>

          {/* Extras Selection */}
          <Card className="mb-6 border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-2xl mb-2">🔷</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t('booking.wantExtras')}</h2>
              </div>

              <div className="space-y-6">
                {/* Luxury Towel */}
                <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-purple-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <span className="text-2xl">🏖️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('booking.luxuryTowel')}</h3>
                      <p className="text-sm text-gray-500">$10 {t('booking.each')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTowelCount(Math.max(0, towelCount - 1))}
                      disabled={towelCount === 0}
                      className="w-8 h-8 p-0 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-bold text-lg">{towelCount}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTowelCount(towelCount + 1)}
                      className="w-8 h-8 p-0 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Premium Parasol */}
                <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-purple-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-pink-100 rounded-xl">
                      <span className="text-2xl">🏖️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('booking.premiumParasol')}</h3>
                      <p className="text-sm text-gray-500">$8 {t('booking.each')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setParasolCount(Math.max(0, parasolCount - 1))}
                      disabled={parasolCount === 0}
                      className="w-8 h-8 p-0 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-bold text-lg">{parasolCount}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setParasolCount(parasolCount + 1)}
                      className="w-8 h-8 p-0 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-600 text-center">{t('booking.onlyOptions')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              onClick={handleContinue}
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl"
              size="lg"
            >
              Continue →
            </Button>
            
            <Button 
              onClick={handleContinue}
              variant="outline"
              className="w-full py-4 text-lg font-medium border-2 hover:bg-gray-50"
              size="lg"
            >
              {t('booking.skip')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
