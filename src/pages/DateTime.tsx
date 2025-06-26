
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/locales';
import { CalendarDays, MapPin, Clock } from 'lucide-react';

const DateTime = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('3');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const zones = [
    { id: 'sun-area', name: t('booking.sunArea'), color: 'bg-blue-400', spots: 15 },
    { id: 'vip-poolside', name: t('booking.vipPoolside'), color: 'bg-purple-400', spots: 8 },
    { id: 'family-area', name: t('booking.familyArea'), color: 'bg-green-400', spots: 12 },
  ];

  const durations = [
    { value: '2', label: '2 hours' },
    { value: '3', label: '3 hours' },
    { value: '4', label: '4 hours' },
    { value: '6', label: '6 hours' },
  ];

  const handleContinue = () => {
    if (selectedDate && selectedZone) {
      navigate('/booking/poolmap');
    }
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-200/20 rounded-full blur-lg animate-bounce"></div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4 shadow-lg">
              <span className="text-sm font-medium text-gray-600">Page 3</span>
            </div>
          </div>

          {/* Date Selection */}
          <Card className="mb-6 border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{t('booking.selectDate')}</h2>
              </div>
              
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={isPastDate}
                className="w-full bg-white rounded-lg border"
              />
            </CardContent>
          </Card>

          {/* Zone Selection */}
          <Card className="mb-6 border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{t('booking.zone')}</h2>
              </div>

              {/* Pool Visual */}
              <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 mb-6">
                <div className="text-center mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">{t('booking.pool')}</h3>
                </div>
                
                {/* Circular Pool Layout */}
                <div className="relative w-48 h-48 mx-auto">
                  {/* Center Pool */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">{t('booking.pool')}</span>
                  </div>
                  
                  {/* Zone dots around pool */}
                  <div className="absolute inset-0">
                    {/* Sun Area - Top */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="grid grid-cols-4 gap-1 mb-2">
                        {Array.from({length: 12}).map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-blue-400 rounded-full opacity-70"></div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">{t('booking.sunArea')}</span>
                    </div>
                    
                    {/* VIP Poolside - Right */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-center">
                      <div className="grid grid-cols-2 gap-1 mb-2">
                        {Array.from({length: 8}).map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-purple-400 rounded-full opacity-70"></div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 writing-mode-vertical">{t('booking.vipPoolside')}</span>
                    </div>
                    
                    {/* Family Area - Bottom */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                      <span className="text-xs text-gray-600 block mb-2">{t('booking.familyArea')}</span>
                      <div className="grid grid-cols-4 gap-1">
                        {Array.from({length: 12}).map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-green-400 rounded-full opacity-70"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zone Options */}
              <div className="space-y-3">
                {zones.map((zone) => (
                  <Button
                    key={zone.id}
                    variant={selectedZone === zone.id ? "default" : "outline"}
                    onClick={() => setSelectedZone(zone.id)}
                    className={`w-full justify-between p-4 h-auto ${
                      selectedZone === zone.id ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${zone.color}`}></div>
                      <span className="font-medium">{zone.name}</span>
                    </div>
                    <span className="text-sm opacity-75">({zone.spots} spots)</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Duration Selection */}
          <Card className="mb-6 border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{t('booking.chooseDuration')}</h2>
              </div>
              
              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value}>
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <Button 
            onClick={handleContinue}
            disabled={!selectedDate || !selectedZone}
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            {t('booking.confirmSpot')} →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateTime;
