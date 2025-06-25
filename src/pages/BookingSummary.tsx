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
import { Plus, Minus, CreditCard, Building2, CheckCircle } from 'lucide-react';

const BookingSummary = () => {
  const [guestName, setGuestName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'reception'>('stripe');
  const [extras, setExtras] = useState<Record<string, number>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const navigate = useNavigate();

  const extrasMenu = [
    { id: 'coke', name: 'Cold Coke', price: 5, icon: '🥤' },
    { id: 'water', name: 'Premium Water', price: 3, icon: '💧' },
    { id: 'cocktail', name: 'Pool Cocktail', price: 12, icon: '🍹' },
    { id: 'towel', name: 'Luxury Towel', price: 10, icon: '🏖️' },
    { id: 'parasol', name: 'Premium Parasol', price: 15, icon: '☂️' },
    { id: 'snacks', name: 'Pool Snacks', price: 8, icon: '🍿' },
  ];

  const mockBookingData = {
    date: 'Saturday, June 29, 2024',
    time: '12:00 - 14:00',
    seats: ['V1 - VIP Lounger', 'S2 - Standard Lounger'],
    seatTotal: 85
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
      title="Review & Confirm" 
      step={3} 
      totalSteps={4}
    >
      <div className="space-y-3 sm:space-y-6">
        {/* Full Booking Summary Header */}
        <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardContent className="p-3 sm:p-6 text-center">
            <h2 className="text-base sm:text-2xl font-bold text-blue-800 mb-2 leading-tight">
              Full booking summary: time, lounger, add-ons, total price
            </h2>
            <p className="text-xs sm:text-base text-blue-600 leading-relaxed">
              Add your name and room number • Choose how you want to pay • Accept the terms and you're done
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-3 sm:gap-6">
          {/* Left Column - Booking Details & Extras */}
          <div className="space-y-3 sm:space-y-6">
            {/* Booking Details */}
            <Card className="border-2 border-blue-100">
              <CardHeader className="pb-2 sm:pb-4 px-3 sm:px-6">
                <CardTitle className="text-blue-800 flex items-center gap-2 text-sm sm:text-base">
                  📅 Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-600">Date & Time</Label>
                  <p className="font-semibold text-sm sm:text-lg break-words">{mockBookingData.date}</p>
                  <p className="text-blue-600 font-medium text-xs sm:text-base">{mockBookingData.time}</p>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-600">Selected Loungers</Label>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                    {mockBookingData.seats.map(seat => (
                      <Badge key={seat} className="bg-blue-100 text-blue-800 p-1 sm:p-2 text-xs break-words">
                        {seat}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-right font-bold text-base sm:text-xl mt-3 text-blue-700">
                    ${mockBookingData.seatTotal}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Add Extras */}
            <Card className="border-2 border-purple-100">
              <CardHeader className="pb-2 sm:pb-4 px-3 sm:px-6">
                <CardTitle className="text-purple-800 text-sm sm:text-base leading-tight">
                  🍹 Want a cold Coke, a towel, or a parasol?
                </CardTitle>
                <p className="text-xs sm:text-sm text-purple-600 leading-relaxed">
                  Simply tap to add – prices shown clearly • Quantity selectors • Live price summary updates
                </p>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="grid gap-2 sm:gap-4">
                  {extrasMenu.map(extra => (
                    <div key={extra.id} className="flex items-center justify-between p-2 sm:p-4 rounded-lg border-2 hover:bg-purple-50 transition-colors">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <span className="text-base sm:text-2xl flex-shrink-0">{extra.icon}</span>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-xs sm:text-base break-words">{extra.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-500">${extra.price} each</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateExtra(extra.id, -1)}
                          disabled={!extras[extra.id]}
                          className="w-6 h-6 sm:w-8 sm:h-8 p-0"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <span className="w-5 sm:w-8 text-center font-bold text-xs sm:text-lg">
                          {extras[extra.id] || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateExtra(extra.id, 1)}
                          className="w-6 h-6 sm:w-8 sm:h-8 p-0"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {getExtrasTotal() > 0 && (
                  <div className="mt-3 sm:mt-6 pt-2 sm:pt-4 border-t-2">
                    <div className="flex justify-between font-bold text-sm sm:text-lg text-purple-700">
                      <span>Add-ons Total:</span>
                      <span>${getExtrasTotal()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Guest Info & Payment */}
          <div className="space-y-3 sm:space-y-6">
            {/* Guest Information */}
            <Card className="border-2 border-green-100">
              <CardHeader className="pb-2 sm:pb-4 px-3 sm:px-6">
                <CardTitle className="text-green-800 text-sm sm:text-base">👤 Add your name and room number</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
                <div>
                  <Label htmlFor="guestName" className="text-xs sm:text-sm">Full Name *</Label>
                  <Input
                    id="guestName"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-1 h-9 sm:h-12 text-sm sm:text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="roomNumber" className="text-xs sm:text-sm">Room Number *</Label>
                  <Input
                    id="roomNumber"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    placeholder="e.g., 205"
                    className="mt-1 h-9 sm:h-12 text-sm sm:text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="specialRequests" className="text-xs sm:text-sm">Optional comment (e.g., "We have a toddler")</Label>
                  <Textarea
                    id="specialRequests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requirements..."
                    className="mt-1 text-sm sm:text-base"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-2 border-orange-100">
              <CardHeader className="pb-2 sm:pb-4 px-3 sm:px-6">
                <CardTitle className="text-orange-800 text-sm sm:text-base">💳 Choose how you want to pay</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="space-y-2 sm:space-y-3">
                  <Button
                    variant={paymentMethod === 'stripe' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('stripe')}
                    className="w-full justify-start h-auto py-2 sm:py-4 text-left"
                  >
                    <div className="p-1 sm:p-2 bg-blue-100 rounded mr-2 sm:mr-3 flex-shrink-0">
                      <CreditCard className="w-3 h-3 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-xs sm:text-base break-words">💳 Pay now (Stripe or in-app)</div>
                      <div className="text-xs sm:text-sm opacity-70">Secure payment with card</div>
                    </div>
                  </Button>
                  
                  <Button
                    variant={paymentMethod === 'reception' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('reception')}
                    className="w-full justify-start h-auto py-2 sm:py-4 text-left"
                  >
                    <div className="p-1 sm:p-2 bg-orange-100 rounded mr-2 sm:mr-3 flex-shrink-0">
                      <Building2 className="w-3 h-3 sm:w-6 sm:h-6 text-orange-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-xs sm:text-base break-words">🏨 Pay at the reception</div>
                      <div className="text-xs sm:text-sm opacity-70">Pay when you arrive</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Final Summary & Confirmation */}
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardContent className="p-3 sm:p-6">
                <div className="space-y-3 sm:space-y-6">
                  <div className="text-center">
                    <div className="text-xl sm:text-4xl font-bold text-blue-800 mb-2">
                      ${getTotalAmount()}
                    </div>
                    <p className="text-blue-600 text-xs sm:text-base">Total Amount</p>
                  </div>
                  
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-4 bg-white/80 rounded-lg">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 flex-shrink-0"
                    />
                    <Label htmlFor="terms" className="text-xs sm:text-sm cursor-pointer leading-relaxed break-words">
                      Accept the terms and you're done • I accept the terms and conditions and cancellation policy
                    </Label>
                  </div>
                  
                  <Button
                    onClick={handleConfirmBooking}
                    disabled={!guestName || !roomNumber || !acceptedTerms}
                    className="w-full py-3 sm:py-6 text-sm sm:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
                    size="lg"
                  >
                    <CheckCircle className="w-3 h-3 sm:w-6 sm:h-6 mr-2" />
                    Confirm Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BookingLayout>
  );
};

export default BookingSummary;
