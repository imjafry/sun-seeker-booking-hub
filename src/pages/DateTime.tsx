import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/locales';
import { Calendar, Diamond, Check, ChevronDown } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import React from "react";

const PoolSVGLayout = () => {
  const cx = 160, cy = 160;
  const arcs = [
    { start: 210, end: 330, radius: 120, count: 16, color: "#b3dafe" },
    { start: 330, end: 390, radius: 120, count: 8, color: "#7ec3f7" },
    { start: 390, end: 510, radius: 120, count: 16, color: "#4fa3e3" },
    { start: 510, end: 570, radius: 120, count: 8, color: "#7ec3f7" },
    { start: 210, end: 330, radius: 90, count: 14, color: "#b3dafe" },
    { start: 330, end: 390, radius: 90, count: 7, color: "#7ec3f7" },
    { start: 390, end: 510, radius: 90, count: 14, color: "#4fa3e3" },
    { start: 510, end: 570, radius: 90, count: 7, color: "#7ec3f7" },
    { start: 210, end: 330, radius: 60, count: 12, color: "#b3dafe" },
    { start: 330, end: 390, radius: 60, count: 6, color: "#7ec3f7" },
    { start: 390, end: 510, radius: 60, count: 12, color: "#4fa3e3" },
    { start: 510, end: 570, radius: 60, count: 6, color: "#7ec3f7" },
  ];
  function polarToCartesian(cx, cy, r, angle) {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }
  return (
    <svg width={450} height={450}>
      <path
        d={`
          M ${cx - 35},${cy}
          Q ${cx - 40},${cy - 28} ${cx},${cy - 32}
          Q ${cx + 50},${cy - 28} ${cx + 28},${cy}
          Q ${cx + 40},${cy + 28} ${cx},${cy + 30}
          Q ${cx - 40},${cy + 28} ${cx - 35},${cy}
          Z
        `}
        fill="#b3e0fc"
        opacity={0.7}
      />
      <text x={cx} y={cy} textAnchor="middle" dy="0.3em" fontSize={20} fill="#223">Pool</text>
      {arcs.map((arc, i) => {
        const dots = [];
        const step = (arc.end - arc.start) / (arc.count - 1);
        for (let j = 0; j < arc.count; j++) {
          const angle = arc.start + j * step;
          const { x, y } = polarToCartesian(cx, cy, arc.radius, angle);
          dots.push(
            <circle key={`${i}-${j}`} cx={x} cy={y} r={6} fill={arc.color} opacity={0.9} />
          );
        }
        return dots;
      })}
      <text x={cx-100} y={cy - 110} textAnchor="middle" fontSize={14} fill="#A7CCF1">Sun Area</text>
      <text x={cx + 70} y={cy - 110} textAnchor="start" fontSize={14} fill="#A7CCF1">VIP Poolside</text>
      <text x={cx - 80} y={cy + 120} textAnchor="end" fontSize={14} fill="#A7CCF1">Family Area</text>
      <text x={cx + 100} y={cy + 120} textAnchor="start" fontSize={14} fill="#A7CCF1">Pool</text>
    </svg>
  );
};

const DateTime = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 5, 25)); // June 25, 2025
  const [selectedZones, setSelectedZones] = useState<string[]>(['PGF', 'PGH']);
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<string>('');
  const [spotDurations, setSpotDurations] = useState<{ [key: string]: string }>({
    'A4': '6 hour',
    'A5': '6 hour'
  });
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [openPopover, setOpenPopover] = useState<string | null>(null);

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

  const NUM_SEATS = 16; // adjust as needed for each arc
  const ARC_RADIUS = [140, 120, 100, 80]; // radii for each arc

  const arcAngles = [
    { start: -120, end: -60, label: "Sun Area" },
    { start: -60, end: 0, label: "VIP Poolside" },
    { start: 0, end: 60, label: "Pool" },
    { start: 60, end: 120, label: "Family Area" },
  ];

  function polarToCartesian(cx, cy, r, angle) {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

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

  const arcs = [
    // Each arc: { startAngle, endAngle, radius, count, color }
    { start: 210, end: 330, radius: 150, count: 16, color: "#b3dafe" }, // Sun Area
    { start: 330, end: 390, radius: 150, count: 8, color: "#7ec3f7" },  // VIP Poolside
    { start: 390, end: 510, radius: 150, count: 16, color: "#4fa3e3" }, // Pool
    { start: 510, end: 570, radius: 150, count: 8, color: "#7ec3f7" },  // Family Area
    // Inner arcs (closer to pool)
    { start: 210, end: 330, radius: 120, count: 14, color: "#b3dafe" },
    { start: 330, end: 390, radius: 120, count: 7, color: "#7ec3f7" },
    { start: 390, end: 510, radius: 120, count: 14, color: "#4fa3e3" },
    { start: 510, end: 570, radius: 120, count: 7, color: "#7ec3f7" },
    // Even more inner arcs if you want
  ];

  const labels = [
    { text: "Sun Area", x: 200, y: 40, anchor: "middle" },
    { text: "VIP Poolside", x: 340, y: 120, anchor: "start" },
    { text: "Family Area", x: 60, y: 360, anchor: "end" },
    { text: "Pool", x: 340, y: 340, anchor: "start" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
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

          <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  POOL LAYOUT
                </h3>
              </div>

              <div className="relative w-80 h-80 mx-auto mb-6">
                <PoolSVGLayout />
              </div>
            </CardContent>
          </Card>

          {selectedZones.length > 0 && (
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-white text-center">Available Spots</h3>
              {availableSpots.map((spot) => (
                <Card
                  key={spot.id}
                  className={`cursor-pointer transition-all duration-300 border-2 ${selectedSpot === spot.id
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

                      <div className="flex flex-col gap-2">
                        <Popover
                          open={openPopover === spot.id}
                          onOpenChange={open => setOpenPopover(open ? spot.id : null)}
                        >
                          <PopoverTrigger asChild>
                            <button
                              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                              onClick={e => {
                                e.stopPropagation();
                                setOpenPopover(spot.id);
                              }}
                            >
                              <div>
                                {durationOptions.find(opt => opt.value === spotDurations[spot.id])?.label}
                              </div>
                              <div className="text-xs opacity-80">
                                ${durationOptions.find(opt => opt.value === spotDurations[spot.id])?.price}
                              </div>
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-40" align="end" side="bottom">
                            <div className="flex flex-col">
                              {durationOptions
                                .filter(opt => opt.value !== spotDurations[spot.id])
                                .map(option => (
                                  <button
                                    key={option.value}
                                    onClick={e => {
                                      e.stopPropagation();
                                      handleSpotDurationChange(spot.id, option.value);
                                      setOpenPopover(null);
                                    }}
                                    className="flex justify-between items-center px-4 py-2 text-left hover:bg-blue-100 text-blue-900"
                                  >
                                    <div>{option.label}</div>
                                    <div className="text-xs opacity-80">${option.price}</div>
                                  </button>
                                ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

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
