
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
              <h1 className="text-4xl font-bold text-white drop-shadow-lg leading-tight">
                {t('booking.bookingConfirmed')} 🎉
              </h1>
            </div>
            
            <p className="text-white/90 text-lg leading-relaxed px-4 drop-shadow">
              {t('booking.seatsReserved')}
            </p>
          </div>

          {/* QR Code Card */}
          <Card className="mb-6 bg-white shadow-2xl border-0 rounded-2xl">
            <CardContent className="p-6 text-center">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">📱 {t('booking.bookingQRCode')}</h2>
              
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
              
              <p className="font-mono text-lg font-bold text-green-600 mb-2">
                {bookingDetails.bookingId}
              </p>
              <p className="text-sm text-gray-600">
                {t('booking.showAtEntrance')}
              </p>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="mb-6 bg-white shadow-2xl border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <h2 className="text-lg font-semibold text-gray-900">{t('booking.bookingDetails')}</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-lg text-gray-900">{bookingDetails.date}</p>
                  <p className="text-teal-600 font-medium">{bookingDetails.time}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-gray-600 text-sm mb-1">{t('booking.reservedSeats')}:</p>
                  <p className="font-medium text-gray-900">{bookingDetails.seats}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200 text-sm">
                  <div>
                    <p className="text-gray-600">{t('booking.guest')}:</p>
                    <p className="font-medium text-gray-900">{bookingDetails.guest}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t('booking.room')}:</p>
                    <p className="font-medium text-gray-900">{bookingDetails.room}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card className="mb-8 bg-white shadow-2xl border-0 rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">{t('booking.paymentSummary')}</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('booking.addOns')}: {t('booking.premiumParasol')} 1x</span>
                  <span className="text-gray-900">{bookingDetails.addOnsTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">2 {t('booking.summary.spots')}</span>
                  <span className="text-gray-900">$15</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                  <span className="text-gray-900">{t('booking.totalPaid')}:</span>
                  <span className="text-green-600">{bookingDetails.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="mb-8 bg-white shadow-2xl border-0 rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-amber-700">⚠️ {t('booking.importantInfo')}</h2>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900">{t('booking.beforeVisit')}:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• {t('booking.bringQR')}</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900">{t('booking.cancellationPolicy')}:</h4>
                  <ul className="space-y-1 text-gray-700">
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
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-xl rounded-2xl group transition-all duration-200"
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
