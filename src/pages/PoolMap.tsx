
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingLayout } from '@/components/BookingLayout';
import { Badge } from '@/components/ui/badge';

const PoolMap = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const navigate = useNavigate();

  const loungerTypes = {
    standard: { name: 'Standard', price: 25, color: 'bg-blue-400', icon: '🪑' },
    double: { name: 'Double', price: 40, color: 'bg-purple-400', icon: '🛏️' },
    vip: { name: 'VIP', price: 60, color: 'bg-yellow-400', icon: '👑' },
    cabana: { name: 'Cabana', price: 100, color: 'bg-green-400', icon: '🏖️' },
    shade: { name: 'Shade', price: 35, color: 'bg-gray-400', icon: '☂️' }
  };

  const poolLayout = [
    // VIP Area (Front row near pool)
    { id: 'V1', type: 'vip', status: 'available', position: { x: 2, y: 1 }, zone: 'VIP' },
    { id: 'V2', type: 'vip', status: 'available', position: { x: 4, y: 1 }, zone: 'VIP' },
    { id: 'V3', type: 'vip', status: 'booked', position: { x: 6, y: 1 }, zone: 'VIP' },
    { id: 'V4', type: 'vip', status: 'available', position: { x: 8, y: 1 }, zone: 'VIP' },
    
    // Double loungers
    { id: 'D1', type: 'double', status: 'available', position: { x: 1, y: 2 }, zone: 'Premium' },
    { id: 'D2', type: 'double', status: 'available', position: { x: 3, y: 2 }, zone: 'Premium' },
    { id: 'D3', type: 'double', status: 'booked', position: { x: 7, y: 2 }, zone: 'Premium' },
    { id: 'D4', type: 'double', status: 'available', position: { x: 9, y: 2 }, zone: 'Premium' },
    
    // Standard loungers
    { id: 'S1', type: 'standard', status: 'available', position: { x: 1, y: 3 }, zone: 'Standard' },
    { id: 'S2', type: 'standard', status: 'available', position: { x: 2, y: 3 }, zone: 'Standard' },
    { id: 'S3', type: 'standard', status: 'available', position: { x: 3, y: 3 }, zone: 'Standard' },
    { id: 'S4', type: 'standard', status: 'available', position: { x: 4, y: 3 }, zone: 'Standard' },
    { id: 'S5', type: 'standard', status: 'booked', position: { x: 5, y: 3 }, zone: 'Standard' },
    { id: 'S6', type: 'standard', status: 'available', position: { x: 6, y: 3 }, zone: 'Standard' },
    { id: 'S7', type: 'standard', status: 'available', position: { x: 7, y: 3 }, zone: 'Standard' },
    { id: 'S8', type: 'standard', status: 'available', position: { x: 8, y: 3 }, zone: 'Standard' },
    { id: 'S9', type: 'standard', status: 'available', position: { x: 9, y: 3 }, zone: 'Standard' },
    
    // Cabanas and Shade areas
    { id: 'C1', type: 'cabana', status: 'available', position: { x: 1, y: 4 }, zone: 'Cabana' },
    { id: 'SH1', type: 'shade', status: 'available', position: { x: 3, y: 4 }, zone: 'Shade' },
    { id: 'SH2', type: 'shade', status: 'available', position: { x: 5, y: 4 }, zone: 'Shade' },
    { id: 'C2', type: 'cabana', status: 'unavailable', position: { x: 7, y: 4 }, zone: 'Cabana' },
    { id: 'C3', type: 'cabana', status: 'available', position: { x: 9, y: 4 }, zone: 'Cabana' },
  ];

  const handleSeatSelect = (seatId: string, status: string) => {
    if (status === 'booked' || status === 'unavailable') return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatColor = (seat: any) => {
    if (seat.status === 'booked') return 'bg-red-400 cursor-not-allowed opacity-75';
    if (seat.status === 'unavailable') return 'bg-gray-300 cursor-not-allowed opacity-50';
    if (selectedSeats.includes(seat.id)) return 'bg-green-500 shadow-xl scale-110 ring-4 ring-green-200';
    return `${loungerTypes[seat.type as keyof typeof loungerTypes].color} hover:scale-105 cursor-pointer hover:shadow-lg`;
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = poolLayout.find(s => s.id === seatId);
      if (seat) {
        return total + loungerTypes[seat.type as keyof typeof loungerTypes].price;
      }
      return total;
    }, 0);
  };

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      navigate('/booking/summary');
    }
  };

  return (
    <BookingLayout 
      title="Pick Your Spot" 
      step={2} 
      totalSteps={4}
    >
      <div className="space-y-6">
        {/* Interactive Pool Map Intro */}
        <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">
              Interactive pool map – tap and explore loungers
            </h2>
            <p className="text-blue-600">
              Color-coded availability • See exact lounger number, zone, and type • One tap to select
            </p>
          </CardContent>
        </Card>

        {/* Legend with Color-coded availability */}
        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-800">Lounger Types & Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {Object.entries(loungerTypes).map(([key, type]) => (
                <div key={key} className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className={`w-6 h-6 rounded-lg ${type.color} flex items-center justify-center text-xs`}>
                    {type.icon}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">{type.name}</div>
                    <div className="text-gray-500">${type.price}/day</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500"></div>
                <span className="text-sm font-medium">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-400"></div>
                <span className="text-sm font-medium">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-400"></div>
                <span className="text-sm font-medium">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-300"></div>
                <span className="text-sm font-medium">Unavailable</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Pool Map */}
        <Card className="border-2 border-blue-200 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardTitle className="text-center text-xl">
              🏊‍♂️ Pool Area Layout
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
              {/* Pool representation */}
              <div className="absolute inset-x-1/4 top-12 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-80 flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-xl animate-pulse">POOL</span>
              </div>
              
              {/* Zone Labels */}
              <div className="absolute top-2 left-4 text-xs font-semibold text-blue-600 bg-white/80 px-2 py-1 rounded">VIP AREA</div>
              <div className="absolute top-20 left-4 text-xs font-semibold text-purple-600 bg-white/80 px-2 py-1 rounded">PREMIUM</div>
              <div className="absolute top-36 left-4 text-xs font-semibold text-gray-600 bg-white/80 px-2 py-1 rounded">STANDARD</div>
              <div className="absolute bottom-20 left-4 text-xs font-semibold text-green-600 bg-white/80 px-2 py-1 rounded">CABANA & SHADE</div>
              
              {/* Loungers grid */}
              <div className="grid grid-cols-10 gap-3 pt-48 pb-8" style={{minHeight: '400px'}}>
                {poolLayout.map((seat) => (
                  <div
                    key={seat.id}
                    className={`
                      relative rounded-xl p-3 transition-all duration-300 
                      ${getSeatColor(seat)}
                      flex flex-col items-center justify-center text-white font-bold text-xs
                      border-2 border-white/20
                    `}
                    style={{
                      gridColumn: seat.position.x,
                      gridRow: seat.position.y,
                      aspectRatio: '1',
                      minHeight: '60px'
                    }}
                    onClick={() => handleSeatSelect(seat.id, seat.status)}
                  >
                    <div className="text-lg mb-1">
                      {loungerTypes[seat.type as keyof typeof loungerTypes].icon}
                    </div>
                    <div className="font-bold">{seat.id}</div>
                    <div className="text-xs opacity-80">{seat.zone}</div>
                    
                    {seat.status === 'booked' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-red-500/80 rounded-xl">
                        <span className="text-lg">❌</span>
                      </div>
                    )}
                    {seat.status === 'unavailable' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-500/80 rounded-xl">
                        <span className="text-lg">🚫</span>
                      </div>
                    )}
                    {selectedSeats.includes(seat.id) && (
                      <div className="absolute -top-2 -right-2 bg-white rounded-full p-1">
                        <span className="text-green-600 text-lg">✅</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selection Summary with Confirm */}
        {selectedSeats.length > 0 && (
          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-green-800 mb-3 text-lg">Selected Seats</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSeats.map(seatId => {
                      const seat = poolLayout.find(s => s.id === seatId);
                      const type = seat ? loungerTypes[seat.type as keyof typeof loungerTypes] : null;
                      return (
                        <Badge key={seatId} className="bg-green-200 text-green-800 hover:bg-green-300 p-2">
                          {type?.icon} {seatId} - {type?.name} (${type?.price})
                        </Badge>
                      );
                    })}
                  </div>
                  <div className="text-3xl font-bold text-green-700">
                    Total: ${getTotalPrice()}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={handleContinue}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 px-8 py-6 text-lg font-semibold animate-pulse"
                  >
                    Confirm Selection →
                  </Button>
                  <p className="text-sm text-green-600 text-center">
                    {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </BookingLayout>
  );
};

export default PoolMap;
