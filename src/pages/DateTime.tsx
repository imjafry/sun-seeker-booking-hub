
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/locales';
import { Calendar, Diamond } from 'lucide-react';

const DateTime = () => {
  const [selectedSpot, setSelectedSpot] = useState<string>('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const spots = [
    { id: 'A4', area: 'Family Area', time: 'Wednesday, June 25, 2025: 0:00 - 12:00', duration: '6 hour', price: '20$' },
    { id: 'A5', area: 'Family Area', time: 'Wednesday, June 25, 2025: 0:00 - 12:00', duration: 'Whole day', price: '35$' },
  ];

  const handleContinue = () => {
    navigate('/booking/poolmap');
  };

  // Generate pool spots to match the exact image layout
  const generatePoolSpots = () => {
    const spots = [];
    
    // Sun Area (top-left) - lighter blue dots
    const sunAreaSpots = [
      // Row 1 (topmost)
      { x: 15, y: 25, number: null, opacity: 0.4 },
      { x: 20, y: 25, number: null, opacity: 0.4 },
      { x: 25, y: 25, number: null, opacity: 0.4 },
      { x: 30, y: 25, number: null, opacity: 0.4 },
      // Row 2
      { x: 12, y: 30, number: null, opacity: 0.4 },
      { x: 17, y: 30, number: null, opacity: 0.6 },
      { x: 22, y: 30, number: null, opacity: 0.6 },
      { x: 27, y: 30, number: null, opacity: 0.6 },
      { x: 32, y: 30, number: null, opacity: 0.4 },
      // Row 3
      { x: 10, y: 35, number: null, opacity: 0.4 },
      { x: 15, y: 35, number: null, opacity: 0.7 },
      { x: 20, y: 35, number: null, opacity: 0.8 },
      { x: 25, y: 35, number: null, opacity: 0.8 },
      { x: 30, y: 35, number: null, opacity: 0.7 },
      { x: 35, y: 35, number: null, opacity: 0.4 },
      // Row 4
      { x: 8, y: 40, number: 1, opacity: 0.8 },
      { x: 13, y: 40, number: 2, opacity: 0.9 },
      { x: 18, y: 40, number: 3, opacity: 1.0 },
      { x: 23, y: 40, number: null, opacity: 1.0 },
      { x: 28, y: 40, number: null, opacity: 1.0 },
      { x: 33, y: 40, number: null, opacity: 0.9 },
      { x: 38, y: 40, number: null, opacity: 0.8 },
    ];

    // VIP Poolside (top-right) - darker blue dots
    const vipPoolsideSpots = [
      // Top row
      { x: 55, y: 25, number: null, opacity: 0.6 },
      { x: 60, y: 25, number: null, opacity: 0.7 },
      { x: 65, y: 25, number: null, opacity: 0.8 },
      { x: 70, y: 25, number: null, opacity: 0.7 },
      { x: 75, y: 25, number: null, opacity: 0.6 },
      // Second row
      { x: 58, y: 30, number: null, opacity: 0.7 },
      { x: 63, y: 30, number: null, opacity: 0.9 },
      { x: 68, y: 30, number: null, opacity: 1.0 },
      { x: 73, y: 30, number: null, opacity: 0.9 },
      { x: 78, y: 30, number: null, opacity: 0.7 },
      // Third row
      { x: 60, y: 35, number: 5, opacity: 0.8 },
      { x: 65, y: 35, number: null, opacity: 1.0 },
      { x: 70, y: 35, number: null, opacity: 1.0 },
      { x: 75, y: 35, number: null, opacity: 1.0 },
      { x: 80, y: 35, number: null, opacity: 0.8 },
      // Fourth row
      { x: 62, y: 40, number: null, opacity: 0.9 },
      { x: 67, y: 40, number: null, opacity: 1.0 },
      { x: 72, y: 40, number: null, opacity: 1.0 },
      { x: 77, y: 40, number: null, opacity: 0.9 },
      // Right side vertical
      { x: 85, y: 45, number: 13, opacity: 1.0 },
      { x: 87, y: 50, number: null, opacity: 1.0 },
      { x: 85, y: 55, number: 10, opacity: 1.0 },
    ];

    // Family Area (bottom) - lighter blue dots  
    const familyAreaSpots = [
      // Bottom rows
      { x: 8, y: 75, number: null, opacity: 0.4 },
      { x: 13, y: 75, number: null, opacity: 0.6 },
      { x: 18, y: 75, number: null, opacity: 0.7 },
      { x: 23, y: 75, number: null, opacity: 0.8 },
      { x: 28, y: 75, number: null, opacity: 0.8 },
      { x: 33, y: 75, number: null, opacity: 0.7 },
      { x: 38, y: 75, number: null, opacity: 0.6 },
      { x: 43, y: 75, number: null, opacity: 0.4 },
      // Second bottom row
      { x: 10, y: 70, number: null, opacity: 0.5 },
      { x: 15, y: 70, number: null, opacity: 0.7 },
      { x: 20, y: 70, number: null, opacity: 0.8 },
      { x: 25, y: 70, number: null, opacity: 0.9 },
      { x: 30, y: 70, number: null, opacity: 0.9 },
      { x: 35, y: 70, number: null, opacity: 0.8 },
      { x: 40, y: 70, number: null, opacity: 0.7 },
      { x: 45, y: 70, number: null, opacity: 0.5 },
      // Third row
      { x: 12, y: 65, number: null, opacity: 0.6 },
      { x: 17, y: 65, number: null, opacity: 0.8 },
      { x: 22, y: 65, number: null, opacity: 0.9 },
      { x: 27, y: 65, number: null, opacity: 1.0 },
      { x: 32, y: 65, number: null, opacity: 1.0 },
      { x: 37, y: 65, number: null, opacity: 0.9 },
      { x: 42, y: 65, number: null, opacity: 0.8 },
      { x: 47, y: 65, number: null, opacity: 0.6 },
      // Fourth row with numbers
      { x: 15, y: 60, number: null, opacity: 0.9 },
      { x: 20, y: 60, number: null, opacity: 1.0 },
      { x: 25, y: 60, number: 6, opacity: 1.0 },
      { x: 30, y: 60, number: null, opacity: 1.0 },
      { x: 35, y: 60, number: 10, opacity: 1.0 },
      { x: 40, y: 60, number: null, opacity: 1.0 },
      { x: 45, y: 60, number: null, opacity: 0.9 },
    ];

    // Pool area (right side) - darker blue dots
    const poolAreaSpots = [
      { x: 60, y: 75, number: null, opacity: 0.6 },
      { x: 65, y: 75, number: null, opacity: 0.7 },
      { x: 70, y: 75, number: null, opacity: 0.8 },
      { x: 75, y: 75, number: null, opacity: 0.7 },
      { x: 80, y: 75, number: null, opacity: 0.6 },
      // Second row
      { x: 58, y: 70, number: null, opacity: 0.7 },
      { x: 63, y: 70, number: null, opacity: 0.8 },
      { x: 68, y: 70, number: null, opacity: 0.9 },
      { x: 73, y: 70, number: null, opacity: 0.8 },
      { x: 78, y: 70, number: null, opacity: 0.7 },
      // Third row
      { x: 60, y: 65, number: null, opacity: 0.8 },
      { x: 65, y: 65, number: null, opacity: 0.9 },
      { x: 70, y: 65, number: null, opacity: 1.0 },
      { x: 75, y: 65, number: null, opacity: 0.9 },
      { x: 80, y: 65, number: null, opacity: 0.8 },
      // Fourth row
      { x: 62, y: 60, number: null, opacity: 0.9 },
      { x: 67, y: 60, number: null, opacity: 1.0 },
      { x: 72, y: 60, number: null, opacity: 1.0 },
      { x: 77, y: 60, number: null, opacity: 0.9 },
    ];

    return {
      sunArea: sunAreaSpots,
      vipPoolside: vipPoolsideSpots,
      familyArea: familyAreaSpots,
      poolArea: poolAreaSpots
    };
  };

  const poolSpots = generatePoolSpots();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-red-500 text-sm font-medium mb-2">Page 3</div>
          </div>

          {/* Top Navigation */}
          <div className="flex justify-between items-center mb-6 bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Select Date</span>
            </div>
            <div className="flex items-center gap-2">
              <Diamond className="w-5 h-5" />
              <span className="font-medium">Zone</span>
            </div>
          </div>

          {/* Pool Layout */}
          <Card className="mb-6 bg-white">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">POOL</h3>
              </div>

              {/* Pool Container */}
              <div className="relative w-full h-96 mx-auto mb-6 bg-gray-100 rounded-lg">
                {/* Area Labels */}
                <div className="absolute top-2 left-4 text-sm font-medium text-gray-600">Sun Area</div>
                <div className="absolute top-2 right-4 text-sm font-medium text-gray-600">VIP Poolside</div>
                <div className="absolute bottom-2 left-4 text-sm font-medium text-gray-600">Family Area</div>
                <div className="absolute bottom-2 right-4 text-sm font-medium text-gray-600">Pool</div>

                {/* Center Pool - irregular oval shape */}
                <div 
                  className="absolute bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center text-gray-700 font-medium"
                  style={{ 
                    left: '35%', 
                    top: '45%', 
                    width: '120px',
                    height: '60px',
                    borderRadius: '60px 40px 50px 70px',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  Pool
                </div>

                {/* Sun Area Spots */}
                {poolSpots.sunArea.map((spot, index) => (
                  <div
                    key={`sun-${index}`}
                    className="absolute w-3 h-3 bg-blue-400 rounded-full cursor-pointer hover:scale-110 transition-transform"
                    style={{ 
                      left: `${spot.x}%`, 
                      top: `${spot.y}%`, 
                      opacity: spot.opacity,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {spot.number && (
                      <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                        {spot.number}
                      </span>
                    )}
                  </div>
                ))}

                {/* VIP Poolside Spots */}
                {poolSpots.vipPoolside.map((spot, index) => (
                  <div
                    key={`vip-${index}`}
                    className="absolute w-3 h-3 bg-blue-600 rounded-full cursor-pointer hover:scale-110 transition-transform"
                    style={{ 
                      left: `${spot.x}%`, 
                      top: `${spot.y}%`, 
                      opacity: spot.opacity,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {spot.number && (
                      <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                        {spot.number}
                      </span>
                    )}
                  </div>
                ))}

                {/* Family Area Spots */}
                {poolSpots.familyArea.map((spot, index) => (
                  <div
                    key={`family-${index}`}
                    className="absolute w-3 h-3 bg-blue-300 rounded-full cursor-pointer hover:scale-110 transition-transform"
                    style={{ 
                      left: `${spot.x}%`, 
                      top: `${spot.y}%`, 
                      opacity: spot.opacity,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {spot.number && (
                      <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                        {spot.number}
                      </span>
                    )}
                  </div>
                ))}

                {/* Pool Area Spots */}
                {poolSpots.poolArea.map((spot, index) => (
                  <div
                    key={`pool-${index}`}
                    className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-pointer hover:scale-110 transition-transform"
                    style={{ 
                      left: `${spot.x}%`, 
                      top: `${spot.y}%`, 
                      opacity: spot.opacity,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {spot.number && (
                      <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                        {spot.number}
                      </span>
                    )}
                  </div>
                ))}

                {/* Duration Selection Dropdown */}
                <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border">
                  <div className="text-xs text-gray-600 mb-2 font-medium">Choose duration</div>
                  <div className="text-xs space-y-1">
                    <div className="text-gray-500">Item 4</div>
                    <div className="text-gray-500">Item 3</div>
                    <div className="font-medium text-blue-600">6 hours</div>
                    <div className="text-gray-500">Item 5</div>
                    <div className="text-gray-500">Item 6</div>
                  </div>
                </div>

                {/* Animation Zoom In indicator */}
                <div className="absolute top-1/2 right-8 text-xs text-red-500 rotate-45">
                  Animation Zoom In
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Spots */}
          <div className="space-y-3 mb-6">
            {spots.map((spot) => (
              <div 
                key={spot.id}
                className={`p-4 rounded-xl bg-blue-100 border-2 border-blue-200 cursor-pointer transition-colors ${
                  selectedSpot === spot.id ? 'bg-blue-200 border-blue-400' : 'hover:bg-blue-150'
                }`}
                onClick={() => setSelectedSpot(spot.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-700">Spot {spot.id}</span>
                      <span className="text-sm text-gray-600">{spot.area}</span>
                    </div>
                    <div className="text-sm text-gray-600">{spot.time}</div>
                  </div>
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {spot.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Confirm Button */}
          <Button 
            onClick={handleContinue}
            disabled={!selectedSpot}
            className="w-full py-4 text-lg font-semibold bg-white text-gray-800 border-2 border-gray-800 hover:bg-gray-50 rounded-none"
            size="lg"
          >
            Confirm your spot &nbsp;&nbsp;&nbsp; 20$
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateTime;
