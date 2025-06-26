
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/locales';
import { Calendar, Diamond, Check, ChevronDown } from 'lucide-react';

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

  const generatePoolSpots = () => {
    const spots = [];
    const centerX = 50;
    const centerY = 50;
    const radius = 35;
    
    for (let i = 0; i < 60; i++) {
      const angle = (i * 6) * (Math.PI / 180);
      const x = centerX + (radius * Math.cos(angle));
      const y = centerY + (radius * Math.sin(angle));
      
      spots.push({
        id: i + 1,
        x: `${x}%`,
        y: `${y}%`,
        opacity: 0.3 + (Math.random() * 0.7),
        color: 'bg-blue-400'
      });
    }
    
    return spots;
  };

  const poolSpots = generatePoolSpots();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Pool Zone Selection</h1>
            <p className="text-gray-600">Choose your preferred area</p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mb-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">Select Date</span>
            </div>
            <div className="flex items-center gap-2">
              <Diamond className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">Zone</span>
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
          <Card className="mb-6 bg-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  {pricingZones.slice(0, 5).map((zone) => (
                    <div key={zone.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 ${zone.color} rounded-md shadow-sm`}></div>
                        <span className="text-sm font-medium text-gray-700">
                          {zone.selected && <Check className="w-3 h-3 inline mr-1 text-green-600" />}
                          {zone.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">({zone.price})</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  {pricingZones.slice(5).map((zone) => (
                    <div key={zone.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 ${zone.color} rounded-md shadow-sm`}></div>
                        <span className="text-sm font-medium text-gray-700">
                          {zone.selected && <Check className="w-3 h-3 inline mr-1 text-green-600" />}
                          {zone.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">({zone.price})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pool Layout */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-100">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">POOL</h3>
                </div>
                
                {/* Circular Pool Container */}
                <div className="relative w-80 h-80 mx-auto">
                  {/* Pool spots */}
                  {poolSpots.map((spot, index) => (
                    <div
                      key={index}
                      className={`absolute w-3 h-3 rounded-full ${spot.color} cursor-pointer hover:scale-125 transition-all duration-200 shadow-sm`}
                      style={{ 
                        left: spot.x, 
                        top: spot.y, 
                        opacity: spot.opacity,
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  ))}

                  {/* Center Pool */}
                  <div 
                    className="absolute bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
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
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
                    Sun Area
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
                    VIP Poolside
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability Dropdown */}
          {showAvailability && (
            <Card className="mb-6 bg-white shadow-xl border-0 animate-fade-in">
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="text-sm text-red-500 font-medium">Drop down availability page 3</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Select Date</span>
                    <span className="text-xs text-red-500">click</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Diamond className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Zone</span>
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">July 2025</h3>
                </div>
                
                <div className="space-y-3">
                  {timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">{slot.date.split(' ')[0]}</div>
                          <div className="text-lg font-bold text-gray-800">{slot.date.split(' ')[1] || slot.date.split(' ')[0].slice(-2)}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">{slot.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={slot.status === 'available' ? 'secondary' : 'outline'}
                          className={`${slot.status === 'limited' ? 'bg-orange-100 text-orange-800 border-orange-200' : 'bg-green-100 text-green-800 border-green-200'} font-medium`}
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
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
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
