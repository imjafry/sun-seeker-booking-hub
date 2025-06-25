
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
    standard: { name: 'Standard Lounger', price: 25, color: 'bg-blue-400' },
    premium: { name: 'Premium Lounger', price: 35, color: 'bg-purple-400' },
    vip: { name: 'VIP Lounger', price: 50, color: 'bg-gold-400' },
    cabana: { name: 'Private Cabana', price: 100, color: 'bg-green-400' },
    daybed: { name: 'Daybed', price: 75, color: 'bg-pink-400' }
  };

  const poolLayout = [
    // Row 1 - Premium spots near pool
    { id: 'P1', type: 'vip', status: 'available', position: { x: 2, y: 1 } },
    { id: 'P2', type: 'vip', status: 'available', position: { x: 4, y: 1 } },
    { id: 'P3', type: 'vip', status: 'occupied', position: { x: 6, y: 1 } },
    { id: 'P4', type: 'vip', status: 'available', position: { x: 8, y: 1 } },
    
    // Row 2 - Premium loungers
    { id: 'L1', type: 'premium', status: 'available', position: { x: 1, y: 2 } },
    { id: 'L2', type: 'premium', status: 'available', position: { x: 3, y: 2 } },
    { id: 'L3', type: 'premium', status: 'available', position: { x: 5, y: 2 } },
    { id: 'L4', type: 'premium', status: 'occupied', position: { x: 7, y: 2 } },
    { id: 'L5', type: 'premium', status: 'available', position: { x: 9, y: 2 } },
    
    // Row 3 - Standard loungers
    { id: 'S1', type: 'standard', status: 'available', position: { x: 1, y: 3 } },
    { id: 'S2', type: 'standard', status: 'available', position: { x: 2, y: 3 } },
    { id: 'S3', type: 'standard', status: 'available', position: { x: 3, y: 3 } },
    { id: 'S4', type: 'standard', status: 'available', position: { x: 4, y: 3 } },
    { id: 'S5', type: 'standard', status: 'occupied', position: { x: 5, y: 3 } },
    { id: 'S6', type: 'standard', status: 'available', position: { x: 6, y: 3 } },
    { id: 'S7', type: 'standard', status: 'available', position: { x: 7, y: 3 } },
    { id: 'S8', type: 'standard', status: 'available', position: { x: 8, y: 3 } },
    { id: 'S9', type: 'standard', status: 'available', position: { x: 9, y: 3 } },
    
    // Row 4 - Cabanas and Daybeds
    { id: 'C1', type: 'cabana', status: 'available', position: { x: 1, y: 4 } },
    { id: 'D1', type: 'daybed', status: 'available', position: { x: 3, y: 4 } },
    { id: 'D2', type: 'daybed', status: 'available', position: { x: 5, y: 4 } },
    { id: 'C2', type: 'cabana', status: 'occupied', position: { x: 7, y: 4 } },
    { id: 'C3', type: 'cabana', status: 'available', position: { x: 9, y: 4 } },
  ];

  const handleSeatSelect = (seatId: string, status: string) => {
    if (status === 'occupied') return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatColor = (seat: any) => {
    if (seat.status === 'occupied') return 'bg-red-400 cursor-not-allowed';
    if (selectedSeats.includes(seat.id)) return 'bg-green-500 shadow-lg scale-110';
    return `${loungerTypes[seat.type as keyof typeof loungerTypes].color} hover:scale-105 cursor-pointer`;
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
      title="Choose Your Pool Spot" 
      step={2} 
      totalSteps={4}
    >
      <div className="space-y-8">
        {/* Legend */}
        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-800">Lounger Types & Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(loungerTypes).map(([key, type]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${type.color}`}></div>
                  <div className="text-sm">
                    <div className="font-medium">{type.name}</div>
                    <div className="text-gray-500">${type.price}/day</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500"></div>
                <span className="text-sm">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-400"></div>
                <span className="text-sm">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-400"></div>
                <span className="text-sm">Available</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pool Map */}
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-blue-800">🏊‍♂️ Pool Area Layout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Pool representation */}
              <div className="absolute inset-x-1/4 top-8 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-30 flex items-center justify-center">
                <span className="text-white font-bold text-lg">POOL</span>
              </div>
              
              {/* Loungers grid */}
              <div className="grid grid-cols-10 gap-4 pt-48 pb-8" style={{minHeight: '400px'}}>
                {poolLayout.map((seat) => (
                  <div
                    key={seat.id}
                    className={`
                      relative rounded-lg p-3 transition-all duration-200 
                      ${getSeatColor(seat)}
                      flex items-center justify-center text-white font-bold text-xs
                    `}
                    style={{
                      gridColumn: seat.position.x,
                      gridRow: seat.position.y,
                      aspectRatio: '1',
                      minHeight: '50px'
                    }}
                    onClick={() => handleSeatSelect(seat.id, seat.status)}
                  >
                    {seat.id}
                    {seat.status === 'occupied' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs">❌</span>
                      </div>
                    )}
                    {selectedSeats.includes(seat.id) && (
                      <div className="absolute -top-1 -right-1">
                        <span className="text-xs">✅</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selection Summary */}
        {selectedSeats.length > 0 && (
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Selected Seats</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map(seatId => {
                      const seat = poolLayout.find(s => s.id === seatId);
                      const type = seat ? loungerTypes[seat.type as keyof typeof loungerTypes] : null;
                      return (
                        <Badge key={seatId} variant="secondary" className="bg-green-200 text-green-800">
                          {seatId} - {type?.name} (${type?.price})
                        </Badge>
                      );
                    })}
                  </div>
                  <p className="text-2xl font-bold text-green-700 mt-3">
                    Total: ${getTotalPrice()}
                  </p>
                </div>
                <Button 
                  onClick={handleContinue}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 px-8"
                >
                  Add Extras →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </BookingLayout>
  );
};

export default PoolMap;
