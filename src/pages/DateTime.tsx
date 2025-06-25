
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
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              📅 Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={isPastDate}
              className="rounded-md border w-full"
            />
            <p className="text-sm text-gray-500 mt-4">
              * Maximum 2 bookings per day allowed
            </p>
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Clock className="w-5 h-5" />
              Available Time Slots
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedTime === slot.id ? "default" : "outline"}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.id)}
                    className={`w-full justify-start py-6 text-left ${
                      selectedTime === slot.id 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : slot.available 
                          ? 'hover:bg-blue-50 border-blue-200' 
                          : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex-1">{slot.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
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
              <div className="text-center py-12 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Please select a date first</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Selected Info & Continue */}
      {selectedDate && selectedTime && (
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">Selected Booking</h3>
              <p className="text-blue-600">
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
              className="bg-blue-600 hover:bg-blue-700 px-8"
              size="lg"
            >
              Choose Seats →
            </Button>
          </div>
        </div>
      )}
    </BookingLayout>
  );
};

export default DateTime;
