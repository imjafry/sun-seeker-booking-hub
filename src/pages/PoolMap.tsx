
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/locales';
import { Calendar, Diamond, Check } from 'lucide-react';

const PoolMap = () => {
  const [showAvailability, setShowAvailability] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const pricingZones = [
    { id: 'PGA', name: 'PG A', price: '$30,00', color: 'bg-blue-600', selected: false },
    { id: 'PGB', name: 'PG B', price: '$55,00', color: 'bg-blue-500', selected: false },
    { id: 'PGC', name: 'PG C', price: '$15,00', color: 'bg-teal-600', selected: false },
    { id: 'PGD', name: 'PG D', price: '$39,00', color: 'bg-green-400', selected: false },
    { id: 'PGE', name: 'PG E', price: '$15,00', color: 'bg-green-600', selected: false },
    { id: 'PGF', name: 'PG F', price: '$40,00', color: 'bg-green-500', selected: true },
    { id: 'PGG', name: 'PG G', price: '$10,00', color: 'bg-gray-600', selected: false },
    { id: 'PGH', name: 'PG H', price: '$10,00', color: 'bg-gray-500', selected: true },
    { id: 'PGI', name: 'PG I', price: '$10,00', color: 'bg-purple-600', selected: false },
  ];

  const timeSlots = [
    { date: 'jul 22', time: 'Tue - 15:30', status: 'limited' },
    { date: 'jul 23', time: 'onsdag - 11:00', status: 'available' },
    { date: 'jul 23', time: '11:00 - 11:00', status: 'available' },
    { date: 'jul 24', time: 'onsdag - 15:30', status: 'available' },
    { date: 'jul 25', time: 'tuesday - 11:00', status: 'available' },
    { date: 'jul 26', time: 'fredag - 15:30', status: 'available' },
  ];

  // Generate pool spots in exact circular layout
  const generatePoolSpots = () => {
    const spots = [];
    const areas = [
      { name: 'Sun Area', positions: 28, color: 'bg-blue-400', startAngle: -90, endAngle: 30, radius: 120 },
      { name: 'VIP Poolside', positions: 20, color: 'bg-blue-500', startAngle: 30, endAngle: 150, radius: 100 },
      { name: 'Family Area', positions: 25, color: 'bg-blue-300', startAngle: 150, endAngle: 270, radius: 120 },
    ];

    areas.forEach((area) => {
      const angleStep = (area.endAngle - area.startAngle) / area.positions;
      for (let i = 0; i < area.positions; i++) {
        const angle = (area.startAngle + (i * angleStep)) * (Math.PI / 180);
        const x = 50 + (area.radius * Math.cos(angle)) / 4;
        const y = 50 + (area.radius * Math.sin(angle)) / 4;
        
        spots.push({
          id: i + 1,
          area: area.name,
          x: `${x}%`,
          y: `${y}%`,
          color: area.color,
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
          {/* Top Navigation */}
          <div className="flex justify-between items-center mb-6 bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Select Date</span>
            </div>
            <div className="flex items-center gap-2">
              <Diamond className="w-5 h-5" />
              <span className="font-medium">Zone</span>
              <button 
                onClick={() => setShowAvailability(!showAvailability)}
                className="text-red-500 text-xs ml-2"
              >
                <div>Drop down info</div>
                <div>Page 3</div>
                <div className="text-red-600 underline">click</div>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <Card className="mb-6 bg-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  {pricingZones.slice(0, 5).map((zone) => (
                    <div key={zone.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 ${zone.color} rounded`}></div>
                        <span className="text-sm font-medium">
                          {zone.selected && <Check className="w-3 h-3 inline mr-1" />}
                          {zone.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold">({zone.price})</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  {pricingZones.slice(5).map((zone) => (
                    <div key={zone.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 ${zone.color} rounded`}></div>
                        <span className="text-sm font-medium">
                          {zone.selected && <Check className="w-3 h-3 inline mr-1" />}
                          {zone.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold">({zone.price})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pool Layout */}
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">POOL</h3>
                </div>
                
                {/* Circular Pool Container */}
                <div className="relative w-80 h-80 mx-auto">
                  {/* Pool spots */}
                  {poolSpots.map((spot, index) => (
                    <div
                      key={index}
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
                      width: '140px',
                      height: '100px',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    Pool
                  </div>

                  {/* Area Labels */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600">
                    Sun Area
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-600">
                    VIP Poolside
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability Dropdown */}
          {showAvailability && (
            <Card className="mb-6 bg-white animate-fade-in">
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="text-sm text-red-500 font-medium">Drop down availability page 3</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Select Date</span>
                    <span className="text-xs text-red-500">click</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Diamond className="w-4 h-4" />
                    <span className="text-sm font-medium">Zone</span>
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold">July 2025</h3>
                </div>
                
                <div className="space-y-3">
                  {timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">{slot.date.split(' ')[0]}</div>
                          <div className="text-lg font-bold">{slot.date.split(' ')[1] || slot.date.split(' ')[0].slice(-2)}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{slot.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={slot.status === 'available' ? 'secondary' : 'outline'}
                          className={slot.status === 'limited' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}
                        >
                          {slot.status === 'limited' ? (
                            <>
                              Limited availability
                              <span className="ml-2">✈️</span>
                            </>
                          ) : (
                            'Available'
                          )}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Continue Button */}
          <Button 
            onClick={() => navigate('/booking/summary')}
            className="w-full py-3 text-lg font-semibold bg-white text-gray-800 border-2 border-gray-800 hover:bg-gray-50"
            size="lg"
          >
            {t('booking.confirmSpot')} →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PoolMap;
