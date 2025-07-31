
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/locales';
import { Calendar as CalendarIcon, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const DateTime = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');

  // Mock available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      navigate('/booking/pool-map');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-turquoise-600 relative overflow-hidden">
      {/* Water-like animated background */}
      <div className="absolute inset-0">
        {/* Animated water waves */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-300/20 to-teal-300/40 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-radial from-cyan-300/30 to-transparent rounded-full animate-pulse delay-700"></div>
            <div className="absolute top-32 right-20 w-80 h-80 bg-gradient-radial from-teal-300/25 to-transparent rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-radial from-turquoise-300/30 to-transparent rounded-full animate-pulse delay-1500"></div>
            <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
        
        {/* Floating bubbles */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-white/25 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-32 w-5 h-5 bg-white/20 rounded-full animate-bounce delay-1100"></div>
        <div className="absolute bottom-60 right-20 w-2 h-2 bg-white/35 rounded-full animate-bounce delay-1400"></div>
        
        {/* Water ripple effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(6,182,212,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.1)_0%,transparent_50%),radial-gradient(circle_at_40%_80%,rgba(14,165,233,0.1)_0%,transparent_50%)] animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-white hover:text-blue-200 hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('dateTime.back') || 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                {t('dateTime.title') || 'Select Date & Time'}
              </h1>
              <p className="text-white/90 drop-shadow">{t('dateTime.subtitle') || 'Choose your preferred date and time'}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calendar Card */}
            <Card className="bg-white shadow-2xl border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-teal-600" />
                  {t('dateTime.selectDate') || 'Select Date'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* Time Slots Card */}
            <Card className="bg-white shadow-2xl border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-600" />
                  {t('dateTime.selectTime') || 'Select Time'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className={`h-12 ${
                        selectedTime === time
                          ? 'bg-teal-600 hover:bg-teal-700 text-white'
                          : 'border-teal-200 text-teal-700 hover:bg-teal-50'
                      }`}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
                
                {selectedDate && selectedTime && (
                  <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <h3 className="font-semibold text-teal-900 mb-2">
                      {t('dateTime.selectedDateTime') || 'Selected Date & Time'}
                    </h3>
                    <p className="text-teal-700">
                      {format(selectedDate, 'EEEE, MMMM dd, yyyy')} at {selectedTime}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Continue Button */}
          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleContinue}
              disabled={!selectedDate || !selectedTime}
              className="px-8 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 hover:from-teal-700 hover:via-cyan-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              {t('dateTime.continue') || 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTime;
