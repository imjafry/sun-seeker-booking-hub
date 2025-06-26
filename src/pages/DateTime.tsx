
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/locales';
import { Calendar, Diamond, Check, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DateTime = () => {
  const [selectedDate, setSelectedDate] = useState<string>('Wednesday, June 25, 2025');
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('6 hour');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const zones = [
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

  const availableSpots = [
    { id: 'A4', area: 'Family Area', time: 'Wednesday, June 25, 2025: 0:00 - 12:00', duration: '6 hour', price: '20$' },
    { id: 'A5', area: 'Family Area', time: 'Wednesday, June 25, 2025: 0:00 - 12:00', duration: 'Whole day', price: '35$' },
  ];

  const handleContinue = () => {
    navigate('/booking/poolmap');
  };

  const generatePoolSpots = () => {
    const spots = [];
    const centerX = 50;
    const centerY = 50;
    const radius = 35;
    
    // Generate circular arrangement of dots
    for (let i = 0; i < 60; i++) {
      const angle = (i * 6) * (Math.PI / 180); // 6 degrees apart
      const x = centerX + (radius * Math.cos(angle));
      const y = centerY + (radius * Math.sin(angle));
      
      spots.push({
        id: i + 1,
        x: `${x}%`,
        y: `${y}%`,
        opacity: 0.3 + (Math.random() * 0.7), // Random opacity for variation
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
            <div className="text-red-500 text-sm font-medium mb-2">Page 3</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Select Your Spot</h1>
            <p className="text-gray-600">Choose your perfect poolside location</p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mb-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">Select Date</span>
            </div>
            <div className="flex items-center gap-2 relative">
              <Diamond className="w-5 h-5 text-blue-600" />
              <button 
                onClick={() => setShowZoneDropdown(!showZoneDropdown)}
                className="font-medium text-gray-700 flex items-center gap-1"
              >
                Zone
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="text-xs text-red-500">
                <div>Drop down info</div>
                <div>Page 3</div>
                <div className="text-red-600 underline cursor-pointer">click</div>
              </div>
            </div>
          </div>

          {/* Zone Selection Dropdown */}
          {showZoneDropdown && (
            <Card className="mb-6 bg-white shadow-xl border-0">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {zones.slice(0, 5).map((zone) => (
                      <div 
                        key={zone.id} 
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedZone(zone.id)}
                      >
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
                    {zones.slice(5).map((zone) => (
                      <div 
                        key={zone.id} 
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedZone(zone.id)}
                      >
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
              </CardContent>
            </Card>
          )}

          {/* Pool Layout */}
          <Card className="mb-6 bg-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  POOL
                </h3>
              </div>

              {/* Circular Pool Container */}
              <div className="relative w-80 h-80 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full border-4 border-blue-100 shadow-inner">
                {/* Pool spots in circular arrangement */}
                {poolSpots.map((spot, index) => (
                  <div
                    key={index}
                    className={`absolute w-3 h-3 rounded-full ${spot.color} cursor-pointer hover:scale-125 transition-all duration-200 shadow-sm hover:shadow-md`}
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
                    transform: 'translate(-50%, -50%)',
                    clipPath: 'ellipse(70px 50px at center)'
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
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
                  Family Area
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Spots */}
          {selectedZone && (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 text-center">Available Spots</h3>
              {availableSpots.map((spot) => (
                <Card 
                  key={spot.id}
                  className={`cursor-pointer transition-all duration-200 border-2 ${
                    selectedSpot === spot.id 
                      ? 'border-blue-500 bg-blue-50 shadow-lg' 
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedSpot(spot.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-gray-800">Spot {spot.id}</span>
                          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{spot.area}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{spot.time}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Choose duration:</span>
                          <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                            <SelectTrigger className="w-32 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6 hour">6 hours</SelectItem>
                              <SelectItem value="Whole day">Whole day</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                        {selectedDuration}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Confirm Button */}
          <Button 
            onClick={handleContinue}
            disabled={!selectedSpot}
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
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
