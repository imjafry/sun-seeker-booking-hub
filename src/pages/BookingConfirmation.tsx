
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/locales';
import { CheckCircle, Home, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const bookingDetails = {
    bookingId: 'PB-2024-001',
    date: 'Saturday, June 29, 2024',
    time: '12:00 - 14:00',
    seats: 'A1, A2',
    guest: 'John Doe',
    room: '205',
    addOnsTotal: '$24',
    seatsTotal: '$85',
    total: '$85'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        
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

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-bounce shadow-2xl">
                  <CheckCircle className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent animate-fade-in leading-tight">
                {t('booking.bookingConfirmed')} 🎉
              </h1>
            </div>
            
            <p className="text-blue-100/90 text-lg leading-relaxed px-4">
              {t('booking.seatsReserved')}
            </p>
          </div>

          {/* QR Code Card */}
          <Card className="mb-6 bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:bg-white/15">
            <CardContent className="p-6 text-center">
              <h2 className="text-lg font-semibold mb-4 text-white">📱 {t('booking.bookingQRCode')}</h2>
              
              {/* QR Code */}
              <div className="w-32 h-32 mx-auto mb-4 bg-black rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-8 gap-0.5 p-2">
                  {Array.from({length: 64}).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-1.5 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                    ></div>
                  ))}
                </div>
              </div>
              
              <p className="font-mono text-lg font-bold text-green-300 mb-2">
                {bookingDetails.bookingId}
              </p>
              <p className="text-sm text-blue-200">
                {t('booking.showAtEntrance')}
              </p>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="mb-6 bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:bg-white/15">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">{t('booking.bookingDetails')}</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-lg text-white">{bookingDetails.date}</p>
                  <p className="text-blue-300 font-medium">{bookingDetails.time}</p>
                </div>
                
                <div className="border-t border-white/20 pt-3">
                  <p className="text-blue-200 text-sm mb-1">{t('booking.reservedSeats')}:</p>
                  <p className="font-medium text-white">{bookingDetails.seats}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/20 text-sm">
                  <div>
                    <p className="text-blue-200">{t('booking.guest')}:</p>
                    <p className="font-medium text-white">{bookingDetails.guest}</p>
                  </div>
                  <div>
                    <p className="text-blue-200">{t('booking.room')}:</p>
                    <p className="font-medium text-white">{bookingDetails.room}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:bg-white/15">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-white">{t('booking.paymentSummary')}</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-200">{t('booking.addOns')}: {t('booking.premiumParasol')} 1x</span>
                  <span className="text-white">{bookingDetails.addOnsTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">2 {t('booking.summary.spots')}</span>
                  <span className="text-white">$15</span>
                </div>
                <div className="border-t border-white/20 pt-3 flex justify-between font-bold text-lg">
                  <span className="text-white">{t('booking.totalPaid')}:</span>
                  <span className="text-green-300">{bookingDetails.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:bg-white/15">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-yellow-100">⚠️ {t('booking.importantInfo')}</h2>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 text-yellow-50">{t('booking.beforeVisit')}:</h4>
                  <ul className="space-y-1 text-yellow-50">
                    <li>• {t('booking.arriveEarly')}</li>
                    <li>• {t('booking.bringQR')}</li>
                    <li>• {t('booking.validKey')}</li>
                    <li>• {t('booking.towelsAvailable')}</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-yellow-50">{t('booking.cancellationPolicy')}:</h4>
                  <ul className="space-y-1 text-yellow-50">
                    <li>• {t('booking.freeCancellation')}</li>
                    <li>• {t('booking.halfRefund')}</li>
                    <li>• {t('booking.noRefund')}</li>
                    <li>• {t('booking.contactReception')}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <Button 
            onClick={() => navigate('/')}
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-xl rounded-xl group transition-all duration-200"
            size="lg"
          >
            <Home className="w-5 h-5 mr-2" />
            {t('booking.confirmation.backHome')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
