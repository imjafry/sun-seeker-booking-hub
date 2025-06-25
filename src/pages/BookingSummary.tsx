
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookingLayout } from '@/components/BookingLayout';
import { Plus, Minus, CreditCard, Building2 } from 'lucide-react';

const BookingSummary = () => {
  const [guestName, setGuestName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'reception'>('stripe');
  const [extras, setExtras] = useState<Record<string, number>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const navigate = useNavigate();

  const extrasMenu = [
    { id: 'coke', name: 'Cold Coke', price: 5 },
    { id: 'water', name: 'Premium Water', price: 3 },
    { id: 'cocktail', name: 'Pool Cocktail', price: 12 },
    { id: 'parasol', name: 'Premium Parasol', price: 15 },
    { id: 'towel', name: 'Luxury Towel Set', price: 10 },
    { id: 'snacks', name: 'Pool Snacks', price: 8 },
  ];

  const mockBookingData = {
    date: 'Saturday, June 29, 2024',
    time: '12:00 - 14:00',
    seats: ['P1', 'L2'],
    seatTotal: 60
  };

  const updateExtra = (extraId: string, change: number) => {
    setExtras(prev => {
      const current = prev[extraId] || 0;
      const newValue = Math.max(0, current + change);
      if (newValue === 0) {
        const { [extraId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [extraId]: newValue };
    });
  };

  const getExtrasTotal = () => {
    return Object.entries(extras).reduce((total, [extraId, quantity]) => {
      const extra = extrasMenu.find(e => e.id === extraId);
      return total + (extra ? extra.price * quantity : 0);
    }, 0);
  };

  const getTotalAmount = () => {
    return mockBookingData.seatTotal + getExtrasTotal();
  };

  const handleConfirmBooking = () => {
    if (guestName && roomNumber && acceptedTerms) {
      navigate('/booking/confirmation');
    }
  };

  return (
    <BookingLayout 
      title="Review & Confirm Booking" 
      step={3} 
      totalSteps={4}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Booking Summary */}
        <div className="space-y-6">
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-800">📅 Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Date & Time</Label>
                <p className="font-semibold">{mockBookingData.date}</p>
                <p className="text-blue-600">{mockBookingData.time}</p>
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Selected Seats</Label>
                <div className="flex gap-2 mt-1">
                  {mockBookingData.seats.map(seat => (
                    <Badge key={seat} variant="secondary" className="bg-blue-100 text-blue-800">
                      {seat}
                    </Badge>
                  ))}
                </div>
                <p className="text-right font-semibold mt-2">${mockBookingData.seatTotal}</p>
              </div>
            </CardContent>
          </Card>

          {/* Add Extras */}
          <Card className="border-2 border-purple-100">
            <CardHeader>
              <CardTitle className="text-purple-800">🍹 Add Extras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {extrasMenu.map(extra => (
                  <div key={extra.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                    <div className="flex-1">
                      <h4 className="font-medium">{extra.name}</h4>
                      <p className="text-sm text-gray-500">${extra.price} each</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateExtra(extra.id, -1)}
                        disabled={!extras[extra.id]}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {extras[extra.id] || 0}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateExtra(extra.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {getExtrasTotal() > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between font-semibold text-purple-700">
                    <span>Extras Total:</span>
                    <span>${getExtrasTotal()}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Guest Information & Payment */}
        <div className="space-y-6">
          <Card className="border-2 border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">👤 Guest Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="guestName">Full Name *</Label>
                <Input
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="roomNumber">Room Number *</Label>
                <Input
                  id="roomNumber"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  placeholder="e.g., 205"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any special requirements or requests..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="border-2 border-orange-100">
            <CardHeader>
              <CardTitle className="text-orange-800">💳 Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button
                  variant={paymentMethod === 'stripe' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('stripe')}
                  className="w-full justify-start h-auto py-4"
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Pay Online (Stripe)</div>
                    <div className="text-sm opacity-70">Secure payment with card</div>
                  </div>
                </Button>
                
                <Button
                  variant={paymentMethod === 'reception' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('reception')}
                  className="w-full justify-start h-auto py-4"
                >
                  <Building2 className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Pay at Reception</div>
                    <div className="text-sm opacity-70">Pay when you arrive</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Total & Confirm */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-2xl font-bold text-center text-blue-800">
                  Total: ${getTotalAmount()}
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I accept the terms and conditions and cancellation policy
                  </Label>
                </div>
                
                <Button
                  onClick={handleConfirmBooking}
                  disabled={!guestName || !roomNumber || !acceptedTerms}
                  className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  Confirm Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BookingLayout>
  );
};

export default BookingSummary;
