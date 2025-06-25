
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
    premium: { name: 'Premium', price: 40, color: 'bg-purple-400', icon: '🛏️' },
    vip: { name: 'VIP', price: 60, color: 'bg-yellow-400', icon: '👑' },
    cabana: { name: 'Cabana', price: 100, color: 'bg-green-400', icon: '🏖️' },
    shade: { name: 'Shade', price: 35, color: 'bg-gray-400', icon: '☂️' }
  };

  // More realistic pool layout based on the reference image
  const poolLayout = [
    // VIP Area (Front row near pool) - Row 1
    { id: 'V1', type: 'vip', status: 'available', row: 1, col: 2 },
    { id: 'V2', type: 'vip', status: 'available', row: 1, col: 3 },
    { id: 'V3', type: 'vip', status: 'booked', row: 1, col: 4 },
    { id: 'V4', type: 'vip', status: 'available', row: 1, col: 5 },
    
    // Premium Area - Row 2
    { id: 'D1', type: 'premium', status: 'available', row: 2, col: 1 },
    { id: 'D2', type: 'premium', status: 'available', row: 2, col: 2 },
    { id: 'D3', type: 'premium', status: 'booked', row: 2, col: 3 },
    { id: 'D4', type: 'premium', status: 'available', row: 2, col: 6 },
    
    // Standard Area - Row 3 (Main row)
    { id: 'S1', type: 'standard', status: 'available', row: 3, col: 1 },
    { id: 'S2', type: 'standard', status: 'available', row: 3, col: 2 },
    { id: 'S3', type: 'standard', status: 'available', row: 3, col: 3 },
    { id: 'S4', type: 'standard', status: 'available', row: 3, col: 4 },
    { id: 'S5', type: 'standard', status: 'booked', row: 3, col: 5 },
    { id: 'S6', type: 'standard', status: 'available', row: 3, col: 6 },
    { id: 'S7', type: 'standard', status: 'available', row: 3, col: 7 },
    { id: 'S8', type: 'standard', status: 'available', row: 3, col: 8 },
    { id: 'S9', type: 'standard', status: 'available', row: 3, col: 9 },
    
    // Cabanas and Shade areas - Row 4
    { id: 'C1', type: 'cabana', status: 'available', row: 4, col: 1 },
    { id: 'SH1', type: 'shade', status: 'available', row: 4, col: 3 },
    { id: 'SH2', type: 'shade', status: 'available', row: 4, col: 5 },
    { id: 'C2', type: 'cabana', status: 'unavailable', row: 4, col: 7 },
    { id: 'C3', type: 'cabana', status: 'available', row: 4, col: 9 },
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
      <div className="space-y-4 sm:space-y-6">
        {/* Interactive Pool Map Intro */}
        <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardContent className="p-4 sm:p-6 text-center">
            <h2 className="text-lg sm:text-2xl font-bold text-blue-800 mb-2">
              🏊‍♂️ Pool Area Layout
            </h2>
            <p className="text-sm sm:text-base text-blue-600">
              Color-coded availability • Tap to select loungers
            </p>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="border-2 border-blue-100">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-blue-800 text-base sm:text-lg">Lounger Types & Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-6">
              {Object.entries(loungerTypes).map(([key, type]) => (
                <div key={key} className="flex items-center gap-2 p-2 sm:p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className={`w-4 h-4 sm:w-6 sm:h-6 rounded-lg ${type.color} flex items-center justify-center text-xs`}>
                    <span className="hidden sm:inline">{type.icon}</span>
                  </div>
                  <div className="text-xs sm:text-sm">
                    <div className="font-medium">{type.name}</div>
                    <div className="text-gray-500">${type.price}/day</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-3 sm:gap-6 pt-3 sm:pt-4 border-t text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-green-500"></div>
                <span className="font-medium">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-blue-400"></div>
                <span className="font-medium">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-red-400"></div>
                <span className="font-medium">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-gray-300"></div>
                <span className="font-medium">Unavailable</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pool Map */}
        <Card className="border-2 border-blue-200 overflow-hidden">
          <CardContent className="p-3 sm:p-6">
            <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 overflow-x-auto">
              {/* Pool representation */}
              <div className="absolute inset-x-1/4 top-8 sm:top-12 h-20 sm:h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-80 flex items-center justify-center shadow-2xl min-w-[200px]">
                <span className="text-white font-bold text-sm sm:text-xl animate-pulse">POOL</span>
              </div>
              
              {/* Zone Labels */}
              <div className="absolute top-1 sm:top-2 left-2 sm:left-4 text-xs font-semibold text-blue-600 bg-white/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded">VIP</div>
              <div className="absolute top-12 sm:top-20 left-2 sm:left-4 text-xs font-semibold text-purple-600 bg-white/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded">PREMIUM</div>
              <div className="absolute top-24 sm:top-36 left-2 sm:left-4 text-xs font-semibold text-gray-600 bg-white/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded">STANDARD</div>
              <div className="absolute bottom-12 sm:bottom-20 left-2 sm:left-4 text-xs font-semibold text-green-600 bg-white/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded">CABANA & SHADE</div>
              
              {/* Loungers grid */}
              <div className="pt-32 sm:pt-48 pb-6 sm:pb-8 min-w-[300px] sm:min-w-[500px]" style={{minHeight: '300px'}}>
                <div className="grid grid-cols-9 gap-1 sm:gap-3 max-w-full">
                  {Array.from({length: 4}, (_, rowIndex) => (
                    <div key={rowIndex} className="contents">
                      {Array.from({length: 9}, (_, colIndex) => {
                        const seat = poolLayout.find(s => s.row === rowIndex + 1 && s.col === colIndex + 1);
                        if (!seat) {
                          return <div key={`${rowIndex}-${colIndex}`} className="aspect-square"></div>;
                        }
                        
                        return (
                          <div
                            key={seat.id}
                            className={`
                              relative rounded-lg sm:rounded-xl p-1 sm:p-3 transition-all duration-300 
                              ${getSeatColor(seat)}
                              flex flex-col items-center justify-center text-white font-bold text-xs
                              border border-white/20 sm:border-2
                              aspect-square cursor-pointer
                              min-h-[40px] sm:min-h-[60px]
                            `}
                            onClick={() => handleSeatSelect(seat.id, seat.status)}
                          >
                            <div className="text-sm sm:text-lg mb-0 sm:mb-1 hidden sm:block">
                              {loungerTypes[seat.type as keyof typeof loungerTypes].icon}
                            </div>
                            <div className="font-bold text-xs sm:text-sm">{seat.id}</div>
                            
                            {seat.status === 'booked' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-red-500/80 rounded-lg sm:rounded-xl">
                                <span className="text-sm sm:text-lg">❌</span>
                              </div>
                            )}
                            {seat.status === 'unavailable' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-gray-500/80 rounded-lg sm:rounded-xl">
                                <span className="text-sm sm:text-lg">🚫</span>
                              </div>
                            )}
                            {selectedSeats.includes(seat.id) && (
                              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-white rounded-full p-0.5 sm:p-1">
                                <span className="text-green-600 text-sm sm:text-lg">✅</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selection Summary */}
        {selectedSeats.length > 0 && (
          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 animate-fade-in">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-bold text-green-800 mb-3 text-base sm:text-lg">Selected Seats</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSeats.map(seatId => {
                      const seat = poolLayout.find(s => s.id === seatId);
                      const type = seat ? loungerTypes[seat.type as keyof typeof loungerTypes] : null;
                      return (
                        <Badge key={seatId} className="bg-green-200 text-green-800 hover:bg-green-300 p-2 text-xs sm:text-sm">
                          {type?.icon} {seatId} - {type?.name} (${type?.price})
                        </Badge>
                      );
                    })}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-700">
                    Total: ${getTotalPrice()}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={handleContinue}
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold animate-pulse"
                  >
                    Confirm Selection →
                  </Button>
                  <p className="text-xs sm:text-sm text-green-600 text-center">
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
