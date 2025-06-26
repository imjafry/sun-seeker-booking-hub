
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/locales';
import { CheckCircle, Home } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4 shadow-lg">
              <span className="text-sm font-medium text-gray-600">Page 5</span>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t('booking.bookingConfirmed')} 🎉
            </h1>
            <p className="text-gray-600">
              {t('booking.seatsReserved')}
            </p>
          </div>

          {/* QR Code Card */}
          <Card className="mb-6 border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <h2 className="text-lg font-semibold mb-4">📱 {t('booking.bookingQRCode')}</h2>
              
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
              
              <p className="font-mono text-lg font-bold text-green-700 mb-2">
                {bookingDetails.bookingId}
              </p>
              <p className="text-sm text-gray-600">
                {t('booking.showAtEntrance')}
              </p>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="mb-6 border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold">{t('booking.bookingDetails')}</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-lg">{bookingDetails.date}</p>
                  <p className="text-blue-600 font-medium">{bookingDetails.time}</p>
                </div>
                
                <div className="border-t pt-3">
                  <p className="text-gray-600 text-sm mb-1">{t('booking.reservedSeats')}:</p>
                  <p className="font-medium">{bookingDetails.seats}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-3 border-t text-sm">
                  <div>
                    <p className="text-gray-600">{t('booking.guest')}:</p>
                    <p className="font-medium">{bookingDetails.guest}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t('booking.room')}:</p>
                    <p className="font-medium">{bookingDetails.room}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card className="mb-8 border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">{t('booking.paymentSummary')}</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{t('booking.addOns')}: Parasol 1x</span>
                  <span>{bookingDetails.addOnsTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>2 Spots</span>
                  <span>$15</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>{t('booking.totalPaid')}:</span>
                  <span>{bookingDetails.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="mb-8 border-0 shadow-2xl bg-yellow-50/90 backdrop-blur-sm border-yellow-200">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-yellow-800">⚠️ {t('booking.importantInfo')}</h2>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">{t('booking.beforeVisit')}:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• {t('booking.arriveEarly')}</li>
                    <li>• {t('booking.bringQR')}</li>
                    <li>• {t('booking.validKey')}</li>
                    <li>• {t('booking.towelsAvailable')}</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">{t('booking.cancellationPolicy')}:</h4>
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
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-xl"
            size="lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
