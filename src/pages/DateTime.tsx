import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingLayout } from '@/components/BookingLayout';
import { Clock } from 'lucide-react';

const DateTime = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const navigate = useNavigate();

  const timeSlots = [
    { id: '10:00-12:00', label: '10:00 - 12:00', available: true },
    { id: '12:00-14:00', label: '12:00 - 14:00', available: true },
    { id: '14:00-16:00', label: '14:00 - 16:00', available: false },
    { id: '16:00-18:00', label: '16:00 - 18:00', available: true },
    { id: '18:00-20:00', label: '18:00 - 20:00', available: true },
  ];

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      navigate('/booking/poolmap');
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <BookingLayout 
      title="Choose Date & Time" 
      step={1} 
      totalSteps={4}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full max-w-full">
        {/* Calendar */}
        <Card className="border-2 border-blue-100 w-full">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-blue-800 text-lg sm:text-xl">
              📅 Select Date
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={isPastDate}
              className="rounded-md border w-full max-w-full"
            />
            <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
              * Maximum 2 bookings per day allowed
            </p>
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card className="border-2 border-blue-100 w-full">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-blue-800 text-lg sm:text-xl">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Available Time Slots</span>
              <span className="sm:hidden">Time Slots</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            {selectedDate ? (
              <div className="space-y-2 sm:space-y-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedTime === slot.id ? "default" : "outline"}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.id)}
                    className={`w-full justify-start py-3 sm:py-6 text-left text-sm sm:text-base ${
                      selectedTime === slot.id 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : slot.available 
                          ? 'hover:bg-blue-50 border-blue-200' 
                          : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex-1 truncate">{slot.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ${
                      slot.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {slot.available ? 'Available' : 'Full'}
                    </span>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 text-gray-500">
                <Clock className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-50" />
                <p className="text-sm sm:text-base">Please select a date first</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Selected Info & Continue */}
      {selectedDate && selectedTime && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 rounded-xl border-2 border-blue-200 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-blue-800 mb-1 text-sm sm:text-base">Selected Booking</h3>
              <p className="text-blue-600 text-sm sm:text-base break-words">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} at {timeSlots.find(t => t.id === selectedTime)?.label}
              </p>
            </div>
            <Button 
              onClick={handleContinue}
              className="bg-blue-600 hover:bg-blue-700 px-4 sm:px-8 w-full sm:w-auto"
              size="lg"
            >
              <span className="hidden sm:inline">Choose Seats →</span>
              <span className="sm:hidden">Choose Seats</span>
            </Button>
          </div>
        </div>
      )}
    </BookingLayout>
  );
};

export default DateTime;
