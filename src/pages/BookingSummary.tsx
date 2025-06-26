
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/locales';
import { MapPin, Clock, Calendar, Users, Plus, Minus, Waves, Umbrella } from 'lucide-react';

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
    { id: 'towel', name: 'Pool Towel', price: 5, icon: Waves, quantity: towelQuantity, setQuantity: setTowelQuantity },
    { id: 'parasol', name: 'Parasol', price: 8, icon: Umbrella, quantity: parasolQuantity, setQuantity: setParasolQuantity }
  ];

  const calculateTotal = () => {
    const addOnTotal = addOns.reduce((total, addon) => total + (addon.price * addon.quantity), 0);
    return bookingDetails.price + addOnTotal;
  };

  const handleConfirm = () => {
    navigate('/booking/confirmation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Summary</h1>
            <p className="text-gray-600">Review your selection</p>
          </div>

          {/* Booking Details */}
          <Card className="mb-6 bg-white shadow-xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Spot Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-gray-800">Spot {bookingDetails.spot}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {bookingDetails.area}
                    </span>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    Zone {bookingDetails.zone}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">{bookingDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">{bookingDetails.time}</span>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Duration: {bookingDetails.duration}</span>
                  <span className="font-bold text-lg text-blue-600">${bookingDetails.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add-ons */}
          <Card className="mb-6 bg-white shadow-xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Add-ons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {addOns.map((addon) => {
                const Icon = addon.icon;
                return (
                  <div key={addon.id} className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">{addon.name}</span>
                        <div className="text-sm text-gray-600">${addon.price} each</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => addon.setQuantity(Math.max(0, addon.quantity - 1))}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="font-bold text-lg min-w-[2rem] text-center">{addon.quantity}</span>
                      <button
                        onClick={() => addon.setQuantity(addon.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
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
          <Card className="mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Spot {bookingDetails.spot}</span>
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
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confirm Button */}
          <Button 
            onClick={handleConfirm}
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
            size="lg"
          >
            Confirm Booking - ${calculateTotal()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
