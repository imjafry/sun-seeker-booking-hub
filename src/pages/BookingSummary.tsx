
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/locales';
import { MapPin, Clock, Calendar, Users, Plus, Minus, Waves, Umbrella, Sparkles } from 'lucide-react';

const BookingSummary = () => {
  const [towelQuantity, setTowelQuantity] = useState(1);
  const [parasolQuantity, setParasolQuantity] = useState(1);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const bookingDetails = {
    spot: 'A4',
    area: 'Family Area',
    date: 'Wednesday, June 25, 2025',
    time: '0:00 - 12:00',
    duration: '6 hours',
    price: 20,
    zone: 'PG F'
  };

  const addOns = [
    { id: 'towel', name: t('booking.luxuryTowel'), price: 5, icon: Waves, quantity: towelQuantity, setQuantity: setTowelQuantity },
    { id: 'parasol', name: t('booking.premiumParasol'), price: 8, icon: Umbrella, quantity: parasolQuantity, setQuantity: setParasolQuantity }
  ];

  const calculateTotal = () => {
    const addOnTotal = addOns.reduce((total, addon) => total + (addon.price * addon.quantity), 0);
    return bookingDetails.price + addOnTotal;
  };

  const handleConfirm = () => {
    navigate('/booking/confirmation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-1/4 left-1/3 animate-bounce delay-500">
          <Sparkles className="w-4 h-4 text-yellow-300/60" />
        </div>
        <div className="absolute top-2/3 right-1/4 animate-bounce delay-1500">
          <Sparkles className="w-3 h-3 text-blue-300/60" />
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-8 z-10">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent animate-fade-in leading-tight mb-2">
              {t('booking.summary.title')}
            </h1>
            <p className="text-blue-100/90 text-lg">
              {t('booking.summary.subtitle')}
            </p>
          </div>

          {/* Booking Details */}
          <Card className="mb-6 bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:bg-white/15">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                {t('booking.summary.spotDetails')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-white">{t('booking.summary.spot')} {bookingDetails.spot}</span>
                    <span className="bg-blue-500/30 text-blue-100 px-2 py-1 rounded-full text-xs font-medium border border-blue-400/30">
                      {bookingDetails.area}
                    </span>
                  </div>
                  <span className="bg-green-400/20 text-green-200 px-3 py-1 rounded-full text-sm font-bold border border-green-400/30">
                    {t('booking.zone')} {bookingDetails.zone}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-200">{bookingDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-200">{bookingDetails.time}</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-blue-200">{t('booking.summary.duration')}: {bookingDetails.duration}</span>
                  <span className="font-bold text-lg text-blue-200">${bookingDetails.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add-ons */}
          <Card className="mb-6 bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:bg-white/15">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                {t('booking.addOns')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {addOns.map((addon) => {
                const Icon = addon.icon;
                return (
                  <div
                    key={addon.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-lg hover:border-blue-400/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/30 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <span className="font-medium text-white">{addon.name}</span>
                        <div className="text-sm text-blue-200">${addon.price} {t('booking.each')}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => addon.setQuantity(Math.max(0, addon.quantity - 1))}
                        className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-blue-200" />
                      </button>
                      <span className="font-bold text-lg min-w-[2rem] text-center text-white">{addon.quantity}</span>
                      <button
                        onClick={() => addon.setQuantity(addon.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center hover:from-blue-600 hover:to-cyan-600 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Total */}
          <Card className="mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl border-0 transform transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">{t('booking.summary.spot')} {bookingDetails.spot}</span>
                  <span className="font-medium">${bookingDetails.price}</span>
                </div>
                
                {addOns.map((addon) => addon.quantity > 0 && (
                  <div key={addon.id} className="flex justify-between items-center">
                    <span className="text-blue-100">{addon.name} x{addon.quantity}</span>
                    <span className="font-medium">${addon.price * addon.quantity}</span>
                  </div>
                ))}
                
                <Separator className="bg-blue-400" />
                
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>{t('booking.total')}</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confirm Button */}
          <Button 
            onClick={handleConfirm}
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0 group"
            size="lg"
          >
            {t('booking.summary.confirmButton')} - ${calculateTotal()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
