
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/locales';
import { Calendar, Clock, MapPin, Users, CreditCard, ArrowLeft, Mail, Phone, Plus, Minus, Umbrella } from 'lucide-react';

const BookingSummary = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [luxuryTowel, setLuxuryTowel] = useState(0);
  const [premiumParasol, setPremiumParasol] = useState(0);

  // Mock booking data - in real app this would come from context/state
  const bookingData = {
    date: 'Wednesday, June 25, 2025',
    time: '10:00 AM - 6:00 PM',
    duration: '8 hours',
    spots: ['S1', 'S15', 'S23'],
    areas: ['Sun Area', 'VIP Poolside', 'Pool Side'],
    totalPrice: 75,
    location: 'Resort Paradise',
    room: '205',
    email: 'john.doe@email.com',
    phone: '+1 234 567 8900'
  };

  const luxuryTowelPrice = 10;
  const premiumParasolPrice = 8;
  const servicesTotal = (luxuryTowel * luxuryTowelPrice) + (premiumParasol * premiumParasolPrice);
  const finalTotal = bookingData.totalPrice + servicesTotal;

  const handleConfirmBooking = () => {
    navigate('/booking/payment');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const incrementService = (service: 'towel' | 'parasol') => {
    if (service === 'towel') {
      setLuxuryTowel(prev => prev + 1);
    } else {
      setPremiumParasol(prev => prev + 1);
    }
  };

  const decrementService = (service: 'towel' | 'parasol') => {
    if (service === 'towel') {
      setLuxuryTowel(prev => Math.max(0, prev - 1));
    } else {
      setPremiumParasol(prev => Math.max(0, prev - 1));
    }
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
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-white hover:text-blue-200 hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('bookingSummary.back') || 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                {t('bookingSummary.title') || 'Booking Summary'}
              </h1>
              <p className="text-white/90 drop-shadow">{t('bookingSummary.subtitle') || 'Review your reservation details'}</p>
            </div>
          </div>

          {/* Booking Details Card */}
          <Card className="bg-white shadow-2xl border-0 rounded-2xl mb-8">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                {t('bookingSummary.reservationDetails') || 'Reservation Details'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date & Time */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-gray-900 font-medium">{bookingData.date}</p>
                    <p className="text-teal-600 text-sm">{bookingData.time}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                  {bookingData.duration}
                </Badge>
              </div>

              <Separator className="bg-gray-200" />

              {/* Location & Contact */}
              <div className="space-y-3 flex items-center gap-3">
                <div className='flex md:flex-row flex-col justify-between flex-1 gap-3'>
                  <div className='flex gap-3 items-center'>
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-gray-900 font-medium">{bookingData.location}</p>
                      <p className="text-teal-600 text-sm">{t('bookingSummary.room') || 'Room'} {bookingData.room}</p>
                    </div>
                  </div>
                  <div className='flex gap-3 items-center'>
                    <Mail className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-teal-600 text-sm">{t('bookingSummary.email') || 'Email'}</p>
                      <p className="text-gray-900 text-sm">{bookingData.email}</p>
                    </div>
                  </div>
                  <div className='flex gap-3 items-center'>
                    <Phone className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-teal-600 text-sm">{t('bookingSummary.phone') || 'Phone'}</p>
                      <p className="text-gray-900 text-sm">{bookingData.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-200" />

              {/* Selected Spots */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-teal-600" />
                  <p className="text-gray-900 font-medium">{t('bookingSummary.selectedSpots') || 'Selected Spots'}</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {bookingData.spots.map((spot, index) => (
                    <div key={spot} className="flex items-center justify-between bg-teal-50 rounded-lg p-3 border border-teal-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{spot}</span>
                        </div>
                        <div>
                          <p className="text-gray-900 font-medium">{t('bookingSummary.spot') || 'Spot'} {spot}</p>
                          <p className="text-teal-600 text-sm">{bookingData.areas[index]}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        $25
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Optional Services */}
          <Card className="bg-white shadow-2xl border-0 rounded-2xl mb-8">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Umbrella className="w-5 h-5 text-teal-600" />
                {t('bookingSummary.optionalServices') || 'Want a towel, or a parasol?'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Luxury Towel */}
              <div className="flex items-center justify-between bg-teal-50 rounded-lg p-4 border border-teal-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Umbrella className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">{t('bookingSummary.luxuryTowel') || 'Luxury Towel'}</p>
                    <p className="text-teal-600 text-sm">${luxuryTowelPrice} {t('bookingSummary.each') || 'each'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => decrementService('towel')}
                    className="w-8 h-8 p-0 border-teal-300 text-teal-600 hover:bg-teal-50"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-gray-900 text-lg font-bold w-8 text-center">{luxuryTowel}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => incrementService('towel')}
                    className="w-8 h-8 p-0 border-teal-300 text-teal-600 hover:bg-teal-50"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Premium Parasol */}
              <div className="flex items-center justify-between bg-teal-50 rounded-lg p-4 border border-teal-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Umbrella className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">{t('bookingSummary.premiumParasol') || 'Premium Parasol'}</p>
                    <p className="text-teal-600 text-sm">${premiumParasolPrice} {t('bookingSummary.each') || 'each'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => decrementService('parasol')}
                    className="w-8 h-8 p-0 border-teal-300 text-teal-600 hover:bg-teal-50"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-gray-900 text-lg font-bold w-8 text-center">{premiumParasol}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => incrementService('parasol')}
                    className="w-8 h-8 p-0 border-teal-300 text-teal-600 hover:bg-teal-50"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card className="bg-white shadow-2xl border-0 rounded-2xl mb-8">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-teal-600">{t('bookingSummary.subtotal') || 'Subtotal'}</span>
                  <span className="text-gray-900">${bookingData.totalPrice}</span>
                </div>
                {servicesTotal > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-teal-600">{t('bookingSummary.services') || 'Services'}</span>
                    <span className="text-gray-900">${servicesTotal}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-teal-600">{t('bookingSummary.serviceFee') || 'Service Fee'}</span>
                  <span className="text-gray-900">$0</span>
                </div>
                <Separator className="bg-gray-200" />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="text-gray-900">{t('bookingSummary.total') || 'Total'}</span>
                  <span className="text-gray-900">${finalTotal}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confirm Button */}
          <Button
            onClick={handleConfirmBooking}
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 hover:from-teal-700 hover:via-cyan-700 hover:to-teal-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            size="lg"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            {t('bookingSummary.confirmBooking') || 'Confirm Booking'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
