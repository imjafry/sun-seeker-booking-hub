
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/locales';
import { Calendar, Diamond, Check, ChevronDown } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

const DateTime = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 5, 25)); // June 25, 2025
  const [selectedZones, setSelectedZones] = useState<string[]>(['PGF', 'PGH']);
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<string>('');
  const [spotDurations, setSpotDurations] = useState<{[key: string]: string}>({
    'A4': '6 hour',
    'A5': '6 hour'
  });
  const navigate = useNavigate();
  const { t } = useLanguage();

  const zones = [
    { id: 'PGA', name: 'PG A', price: '$30,00', color: 'bg-blue-600' },
    { id: 'PGB', name: 'PG B', price: '$55,00', color: 'bg-blue-500' },
    { id: 'PGC', name: 'PG C', price: '$15,00', color: 'bg-teal-600' },
    { id: 'PGD', name: 'PG D', price: '$39,00', color: 'bg-green-400' },
    { id: 'PGE', name: 'PG E', price: '$15,00', color: 'bg-green-600' },
    { id: 'PGF', name: 'PG F', price: '$40,00', color: 'bg-green-500' },
    { id: 'PGG', name: 'PG G', price: '$10,00', color: 'bg-gray-600' },
    { id: 'PGH', name: 'PG H', price: '$10,00', color: 'bg-gray-500' },
  ];

  const durationOptions = [
    { value: '3 hour', label: '3 hours', price: 15 },
    { value: '6 hour', label: '6 hours', price: 20 },
    { value: '9 hour', label: '9 hours', price: 30 },
    { value: 'Whole day', label: 'Whole day', price: 35 },
  ];

  const availableSpots = [
    { id: 'A4', area: 'Family Area', time: 'Wednesday, June 25, 2025: 0:00 - 12:00' },
    { id: 'A5', area: 'Family Area', time: 'Wednesday, June 25, 2025: 0:00 - 12:00' },
  ];

  const handleZoneToggle = (zoneId: string) => {
    setSelectedZones(prev => 
      prev.includes(zoneId) 
        ? prev.filter(id => id !== zoneId)
        : [...prev, zoneId]
    );
  };

  const handleSpotDurationChange = (spotId: string, duration: string) => {
    setSpotDurations(prev => ({
      ...prev,
      [spotId]: duration
    }));
  };

  const handleContinue = () => {
    navigate('/booking/poolmap');
  };

  const generatePoolLayout = () => {
    const spots = [];
    const centerX = 50;
    const centerY = 50;
    const numRows = 6;
    const spotsPerRow = 3;
    
    let spotId = 1;
    
    for (let row = 0; row < numRows; row++) {
      const radius = 35 - (row * 4);
      
      for (let spot = 0; spot < spotsPerRow; spot++) {
        const angle = (spot * (360 / spotsPerRow) + (row * 20)) * (Math.PI / 180);
        const x = centerX + (radius * Math.cos(angle));
        const y = centerY + (radius * Math.sin(angle));
        
        spots.push({
          id: spotId,
          x: `${x}%`,
          y: `${y}%`,
          opacity: 0.6 + (Math.random() * 0.4),
        });
        
        spotId++;
      }
    }
    
    return spots;
  };

  const poolSpots = generatePoolLayout();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-amber-400 text-sm font-medium">Step 3 of 4</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Select Your Perfect Spot
            </h1>
            <p className="text-blue-200">Choose your ideal poolside experience</p>
          </div>

          {/* Date & Zone Selection */}
          <div className="flex justify-between items-center mb-8 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div className="text-left">
                    <div className="text-xs text-blue-200">Select Date</div>
                    <div className="font-medium">{format(selectedDate, "MMM dd, yyyy")}</div>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-lg border-white/20" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                  className="rounded-md"
                />
              </PopoverContent>
            </Popover>
            
            <div className="flex items-center gap-3 relative">
              <Diamond className="w-5 h-5 text-blue-400" />
              <button 
                onClick={() => setShowZoneDropdown(!showZoneDropdown)}
                className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
              >
                <div className="text-left">
                  <div className="text-xs text-blue-200">Zones</div>
                  <div className="font-medium">{selectedZones.length} Selected</div>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${showZoneDropdown ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Zone Selection Dropdown */}
          {showZoneDropdown && (
            <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20 animate-fade-in">
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-4">
                  {zones.map((zone) => (
                    <div 
                      key={zone.id} 
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-all duration-200"
                      onClick={() => handleZoneToggle(zone.id)}
                    >
                      <div className="relative">
                        {selectedZones.includes(zone.id) && (
                          <Check className="absolute -top-2 -left-1 w-4 h-4 text-green-400 bg-green-400/20 rounded-full p-0.5" />
                        )}
                        <div className={`w-8 h-8 ${zone.color} rounded-lg shadow-lg`}></div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-white">{zone.name}</div>
                        <div className="text-xs text-blue-200">{zone.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pool Layout */}
          <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  POOL LAYOUT
                </h3>
              </div>

              {/* Circular Pool Container */}
              <div className="relative w-80 h-80 mx-auto mb-6">
                {/* Pool spots in circular arrangement */}
                {poolSpots.map((spot, index) => (
                  <div
                    key={index}
                    className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-sm transition-all duration-200 hover:scale-125 hover:shadow-lg cursor-pointer"
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
                  className="absolute bg-gradient-to-br from-blue-400/30 via-cyan-400/30 to-blue-500/30 backdrop-blur-sm flex items-center justify-center text-white font-bold shadow-2xl border border-blue-300/30"
                  style={{ 
                    left: '50%', 
                    top: '50%', 
                    width: '140px',
                    height: '100px',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
                  }}
                >
                  Pool
                </div>

                {/* Area Labels */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                  Sun Area
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                  VIP Poolside
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                  Family Area
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Spots */}
          {selectedZones.length > 0 && (
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-white text-center">Available Spots</h3>
              {availableSpots.map((spot) => (
                <Card 
                  key={spot.id}
                  className={`cursor-pointer transition-all duration-300 border-2 ${
                    selectedSpot === spot.id 
                      ? 'border-blue-400 bg-blue-500/20 backdrop-blur-lg shadow-xl shadow-blue-500/20' 
                      : 'border-white/20 bg-white/10 backdrop-blur-lg hover:border-blue-300/50 hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedSpot(spot.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-bold text-xl text-white">Spot {spot.id}</span>
                          <span className="text-sm text-blue-200 bg-blue-500/30 px-3 py-1 rounded-full border border-blue-400/30">
                            {spot.area}
                          </span>
                        </div>
                        <div className="text-sm text-blue-200 mb-4">{spot.time}</div>
                      </div>
                      
                      {/* Duration Selection */}
                      <div className="flex flex-col gap-2">
                        {durationOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpotDurationChange(spot.id, option.value);
                            }}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                              spotDurations[spot.id] === option.value
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105'
                                : 'bg-white/20 text-blue-200 hover:bg-white/30 border border-white/30'
                            }`}
                          >
                            <div>{option.label}</div>
                            <div className="text-xs opacity-80">${option.price}</div>
                          </button>
                        ))}
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
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            <span className="flex items-center gap-3">
              Confirm Your Spot
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                ${durationOptions.find(opt => opt.value === spotDurations[selectedSpot])?.price || 20}
              </div>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateTime;
