
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

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
              <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {t('bookingSummary.title') || 'Booking Summary'}
              </h1>
              <p className="text-blue-200">{t('bookingSummary.subtitle') || 'Review your reservation details'}</p>
            </div>
          </div>

          {/* Booking Details Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                {t('bookingSummary.reservationDetails') || 'Reservation Details'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date & Time */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">{bookingData.date}</p>
                    <p className="text-blue-200 text-sm">{bookingData.time}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-blue-500/20 text-blue-200 border-blue-400/50">
                  {bookingData.duration}
                </Badge>
              </div>

              <Separator className="bg-white/20" />

              {/* Location & Contact */}
              <div className="space-y-3 flex items-center gap-3">
                <div className='flex md:flex-row flex-col justify-between flex-1 gap-3'>
                  <div className='flex gap-3 items-center'>
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">{bookingData.location}</p>
                      <p className="text-blue-200 text-sm">{t('bookingSummary.room') || 'Room'} {bookingData.room}</p>
                    </div>
                  </div>
                  <div className='flex gap-3 items-center'>
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-blue-200 text-sm">{t('bookingSummary.email') || 'Email'}</p>
                      <p className="text-white text-sm">{bookingData.email}</p>
                    </div>
                  </div>
                  <div className='flex gap-3 items-center'>
                    <Phone className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-blue-200 text-sm">{t('bookingSummary.phone') || 'Phone'}</p>
                      <p className="text-white text-sm">{bookingData.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/20" />

              {/* Selected Spots */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <p className="text-white font-medium">{t('bookingSummary.selectedSpots') || 'Selected Spots'}</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {bookingData.spots.map((spot, index) => (
                    <div key={spot} className="flex items-center justify-between bg-blue-500/20 rounded-lg p-3 border border-blue-400/30">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{spot}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{t('bookingSummary.spot') || 'Spot'} {spot}</p>
                          <p className="text-blue-200 text-sm">{bookingData.areas[index]}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-500/20 text-green-200 border-green-400/50">
                        $25
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Optional Services */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Umbrella className="w-5 h-5 text-blue-400" />
                {t('bookingSummary.optionalServices') || 'Want a towel, or a parasol?'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Luxury Towel */}
              <div className="flex items-center justify-between bg-blue-500/20 rounded-lg p-4 border border-blue-400/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Umbrella className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{t('bookingSummary.luxuryTowel') || 'Luxury Towel'}</p>
                    <p className="text-blue-200 text-sm">${luxuryTowelPrice} {t('bookingSummary.each') || 'each'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => decrementService('towel')}
                    className="w-8 h-8 p-0 border-blue-400/50 text-white hover:bg-blue-500/30"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-white text-lg font-bold w-8 text-center">{luxuryTowel}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => incrementService('towel')}
                    className="w-8 h-8 p-0 border-blue-400/50 text-white hover:bg-blue-500/30"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Premium Parasol */}
              <div className="flex items-center justify-between bg-blue-500/20 rounded-lg p-4 border border-blue-400/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Umbrella className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{t('bookingSummary.premiumParasol') || 'Premium Parasol'}</p>
                    <p className="text-blue-200 text-sm">${premiumParasolPrice} {t('bookingSummary.each') || 'each'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => decrementService('parasol')}
                    className="w-8 h-8 p-0 border-blue-400/50 text-white hover:bg-blue-500/30"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-white text-lg font-bold w-8 text-center">{premiumParasol}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => incrementService('parasol')}
                    className="w-8 h-8 p-0 border-blue-400/50 text-white hover:bg-blue-500/30"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">{t('bookingSummary.subtotal') || 'Subtotal'}</span>
                  <span className="text-white">${bookingData.totalPrice}</span>
                </div>
                {servicesTotal > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">{t('bookingSummary.services') || 'Services'}</span>
                    <span className="text-white">${servicesTotal}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">{t('bookingSummary.serviceFee') || 'Service Fee'}</span>
                  <span className="text-white">$0</span>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="text-white">{t('bookingSummary.total') || 'Total'}</span>
                  <span className="text-white">${finalTotal}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confirm Button */}
          <Button
            onClick={handleConfirmBooking}
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
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
