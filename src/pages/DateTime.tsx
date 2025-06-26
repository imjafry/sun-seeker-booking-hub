
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/locales';
import { Calendar, Diamond } from 'lucide-react';

const DateTime = () => {
  const [selectedSpot, setSelectedSpot] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('6');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const spots = [
    { id: 'A4', area: 'Family Area', time: 'Wednesday, June 25, 2025: 0:00 - 12:00', duration: '6 hour', price: '20$' },
    { id: 'A5', area: 'Family Area', time: 'Wednesday, June 25, 2025: 0:00 - 12:00', duration: 'Whole day', price: '35$' },
  ];

  const handleContinue = () => {
    navigate('/booking/poolmap');
  };

  // Generate pool spots in circular layout
  const generatePoolSpots = () => {
    const spots = [];
    const areas = [
      { name: 'Sun Area', positions: 20, color: 'bg-blue-400', startAngle: -90, endAngle: 30 },
      { name: 'VIP Poolside', positions: 15, color: 'bg-blue-500', startAngle: 30, endAngle: 150 },
      { name: 'Family Area', positions: 20, color: 'bg-blue-300', startAngle: 150, endAngle: 270 },
    ];

    areas.forEach((area, areaIndex) => {
      const angleStep = (area.endAngle - area.startAngle) / area.positions;
      for (let i = 0; i < area.positions; i++) {
        const angle = (area.startAngle + (i * angleStep)) * (Math.PI / 180);
        const radius = areaIndex === 1 ? 85 : 110; // VIP closer to pool
        const x = 50 + (radius * Math.cos(angle)) / 2;
        const y = 50 + (radius * Math.sin(angle)) / 2;
        
        spots.push({
          id: i + 1,
          area: area.name,
          x: `${x}%`,
          y: `${y}%`,
          color: area.color,
          number: i + 1
        });
      }
    });

    return spots;
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
              <div className="text-red-500 text-xs">
                <div>Drop down info</div>
                <div>Page 3</div>
              </div>
            </div>
          </div>

          {/* Pool Layout */}
          <Card className="mb-6 bg-white">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">POOL</h3>
              </div>

              {/* Circular Pool Container */}
              <div className="relative w-80 h-80 mx-auto mb-6">
                {/* Pool spots */}
                {poolSpots.map((spot) => (
                  <div
                    key={`${spot.area}-${spot.id}`}
                    className={`absolute w-3 h-3 rounded-full ${spot.color} opacity-70 hover:opacity-100 cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                    style={{ left: spot.x, top: spot.y }}
                  />
                ))}

                {/* Center Pool */}
                <div 
                  className="absolute bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-gray-700 font-medium"
                  style={{ 
                    left: '50%', 
                    top: '50%', 
                    width: '120px',
                    height: '80px',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  Pool
                </div>

                {/* Area Labels */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600">
                  Sun Area
                </div>
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-600 rotate-90">
                  VIP Poolside
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600">
                  Family Area
                </div>
                <div className="absolute bottom-4 right-4 text-sm font-medium text-gray-600">
                  Pool
                </div>

                {/* Spot numbers */}
                <div className="absolute bottom-12 left-8 text-xs text-gray-500">1</div>
                <div className="absolute bottom-12 left-12 text-xs text-gray-500">2</div>
                <div className="absolute bottom-12 left-16 text-xs text-gray-500">3</div>
                <div className="absolute bottom-16 left-20 text-xs text-gray-500">4</div>
                <div className="absolute bottom-20 left-24 text-xs text-gray-500">5</div>
                <div className="absolute bottom-12 right-20 text-xs text-gray-500">6</div>
                <div className="absolute bottom-16 right-16 text-xs text-gray-500">10</div>
              </div>

              {/* Duration Selection */}
              <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow">
                <div className="text-xs text-gray-600 mb-1">Choose duration</div>
                <div className="text-xs space-y-1">
                  <div>Item 4</div>
                  <div>Item 3</div>
                  <div>6 hours</div>
                  <div>Item 5</div>
                  <div>Item 6</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Spots */}
          <div className="space-y-3 mb-6">
            {spots.map((spot) => (
              <Card 
                key={spot.id}
                className={`cursor-pointer transition-colors ${
                  selectedSpot === spot.id ? 'bg-blue-100 border-blue-300' : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setSelectedSpot(spot.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-700">Spot {spot.id}</span>
                        <span className="text-sm text-gray-500">{spot.area}</span>
                      </div>
                      <div className="text-sm text-gray-600">{spot.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
                        {spot.duration}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Confirm Button */}
          <Button 
            onClick={handleContinue}
            disabled={!selectedSpot}
            className="w-full py-3 text-lg font-semibold bg-white text-gray-800 border-2 border-gray-800 hover:bg-gray-50"
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
