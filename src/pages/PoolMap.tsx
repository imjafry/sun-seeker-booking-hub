
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/locales';
import { ChevronDown } from 'lucide-react';

const PoolMap = () => {
  const [showAvailability, setShowAvailability] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const timeSlots = [
    { time: 'Tue - 15:30', status: 'limited', date: 'JUL 22' },
    { time: 'onsdag - 11:00', status: 'available', date: 'JUL 23' },
    { time: '11:00 - 11:00', status: 'available', date: 'JUL 23' },
    { time: 'onsdag - 15:30', status: 'available', date: 'JUL 24' },
    { time: 'tirsdag - 11:00', status: 'available', date: 'JUL 25' },
    { time: 'fredag - 15:30', status: 'available', date: 'JUL 26' },
  ];

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
              <span className="text-sm font-medium text-gray-600">Page 3</span>
            </div>
          </div>

          {/* Zone Selection Bar */}
          <Card className="mb-6 border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{t('booking.selectDate')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{t('booking.zone')}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowAvailability(!showAvailability)}
                    className="text-red-500"
                  >
                    Drop down info
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Zone Pricing */}
          <Card className="mb-6 border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                      <span className="text-sm">PG A</span>
                    </div>
                    <span className="text-sm font-semibold">($30,00)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-teal-600 rounded"></div>
                      <span className="text-sm">PG C</span>
                    </div>
                    <span className="text-sm font-semibold">($15,00)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                      <span className="text-sm">PG E</span>
                    </div>
                    <span className="text-sm font-semibold">($15,00)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-600 rounded"></div>
                      <span className="text-sm">PG G</span>
                    </div>
                    <span className="text-sm font-semibold">($10,00)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-600 rounded"></div>
                      <span className="text-sm">PG I</span>
                    </div>
                    <span className="text-sm font-semibold">($10,00)</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-400 rounded"></div>
                      <span className="text-sm">PG B</span>
                    </div>
                    <span className="text-sm font-semibold">($55,00)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-400 rounded"></div>
                      <span className="text-sm">PG D</span>
                    </div>
                    <span className="text-sm font-semibold">($39,00)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-sm">✓ PG F</span>
                    </div>
                    <span className="text-sm font-semibold">($40,00)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-500 rounded"></div>
                      <span className="text-sm">✓ PG H</span>
                    </div>
                    <span className="text-sm font-semibold">($10,00)</span>
                  </div>
                </div>
              </div>

              {/* Pool Layout */}
              <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8">
                <div className="text-center mb-4">
                  <h3 className="font-medium text-gray-700">{t('booking.pool')}</h3>
                </div>
                
                {/* Circular Pool Layout */}
                <div className="relative w-48 h-48 mx-auto">
                  {/* Center Pool */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">{t('booking.pool')}</span>
                  </div>
                  
                  {/* Zone dots around pool */}
                  <div className="absolute inset-0">
                    {/* Sun Area - Top */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="grid grid-cols-5 gap-1 mb-2">
                        {Array.from({length: 15}).map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-blue-400 rounded-full opacity-70 hover:opacity-100 cursor-pointer"></div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">{t('booking.sunArea')}</span>
                    </div>
                    
                    {/* VIP Poolside - Right */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-center">
                      <div className="grid grid-cols-2 gap-1 mb-2">
                        {Array.from({length: 8}).map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-purple-400 rounded-full opacity-70 hover:opacity-100 cursor-pointer"></div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 transform rotate-90 origin-center block mt-4">{t('booking.vipPoolside')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability Dropdown */}
          {showAvailability && (
            <Card className="mb-6 border-0 shadow-2xl bg-white/90 backdrop-blur-sm animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">{t('booking.availabilityInfo')}</span>
                </div>
                
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold">July 2025</h3>
                </div>
                
                <div className="space-y-3">
                  {timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">{slot.date.split(' ')[0]}</div>
                          <div className="text-sm font-semibold">{slot.date.split(' ')[1]}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{slot.time}</div>
                        </div>
                      </div>
                      <Badge 
                        variant={slot.status === 'available' ? 'secondary' : 'outline'}
                        className={slot.status === 'limited' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}
                      >
                        {slot.status === 'limited' ? t('booking.limitedAvailability') : t('booking.available')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Continue Button */}
          <Button 
            onClick={() => navigate('/booking/summary')}
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl"
            size="lg"
          >
            {t('booking.confirmSpot')} →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PoolMap;
