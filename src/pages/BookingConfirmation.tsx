
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Calendar, MapPin, CreditCard, Download, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
  const navigate = useNavigate();

  const bookingDetails = {
    bookingId: 'PB-2024-001',
    qrCode: '🔲', // Placeholder for QR code
    date: 'Saturday, June 29, 2024',
    time: '12:00 - 14:00',
    seats: ['P1 - VIP Lounger', 'L2 - Premium Lounger'],
    guest: 'John Doe',
    room: '205',
    total: 85,
    paymentMethod: 'Online Payment',
    extras: [
      { name: 'Pool Cocktail', quantity: 2, price: 24 },
      { name: 'Premium Parasol', quantity: 1, price: 15 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-100 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Booking Confirmed! 🎉
            </h1>
            <p className="text-xl text-gray-600">
              Your pool seats have been reserved successfully
            </p>
          </div>

          {/* Booking Details Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* QR Code & Booking ID */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 text-center">
                  📱 Your Booking QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-8xl">🔲</div>
                <div>
                  <p className="font-mono text-lg font-bold text-green-700">
                    {bookingDetails.bookingId}
                  </p>
                  <p className="text-sm text-gray-600">
                    Show this at the pool entrance
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-lg">{bookingDetails.date}</p>
                  <p className="text-blue-600 font-medium">{bookingDetails.time}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="font-medium text-gray-700 mb-2">Reserved Seats:</p>
                  <div className="space-y-1">
                    {bookingDetails.seats.map((seat, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 mr-2">
                        {seat}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Guest:</p>
                    <p className="font-medium">{bookingDetails.guest}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Room:</p>
                    <p className="font-medium">{bookingDetails.room}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Extras & Payment Summary */}
          <Card className="border-2 border-purple-200 mb-8">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookingDetails.extras.length > 0 && (
                  <>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Add-ons:</h4>
                      <div className="space-y-2">
                        {bookingDetails.extras.map((extra, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span>{extra.name} x{extra.quantity}</span>
                            <span>${extra.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}
                
                <div className="flex justify-between items-center text-lg font-bold text-purple-700">
                  <span>Total Paid:</span>
                  <span>${bookingDetails.total}</span>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p>Payment Method: {bookingDetails.paymentMethod}</p>
                  <p>Status: ✅ Confirmed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="border-2 border-yellow-200 bg-yellow-50 mb-8">
            <CardHeader>
              <CardTitle className="text-yellow-800">⚠️ Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Before Your Visit:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Arrive 15 minutes before your time slot</li>
                    <li>• Bring your booking QR code</li>
                    <li>• Valid room key required</li>
                    <li>• Towels available at pool service</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cancellation Policy:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Free cancellation 2 hours before</li>
                    <li>• 50% refund 1 hour before</li>
                    <li>• No refund for no-shows</li>
                    <li>• Contact reception for changes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              className="flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Confirmation
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Add to Calendar
            </Button>
            
            <Button 
              onClick={() => navigate('/')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </div>

          {/* Contact Information */}
          <div className="text-center mt-8 p-6 bg-gray-100 rounded-xl">
            <p className="text-gray-600 mb-2">Need help with your booking?</p>
            <p className="font-semibold">📞 Reception: +1 (555) 123-4567</p>
            <p className="font-semibold">📧 pool@hotel.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
