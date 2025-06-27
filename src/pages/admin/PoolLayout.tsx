
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PoolLayoutView from '@/components/PoolLayoutView';
import { MapPin, Users, Clock, Eye, Calendar, Star, Diamond, Zap } from 'lucide-react';

const PoolLayout = () => {
  const zones = [
    { id: 'SUN', name: 'Sun Area', spots: 42, occupied: 28, color: 'bg-blue-400', price: '$25' },
    { id: 'VIP', name: 'VIP Poolside', spots: 15, occupied: 12, color: 'bg-purple-500', price: '$60' },
    { id: 'POOL', name: 'Pool Side', spots: 42, occupied: 35, color: 'bg-cyan-500', price: '$40' },
    { id: 'FAMILY', name: 'Family Area', spots: 15, occupied: 8, color: 'bg-green-500', price: '$30' },
  ];

  const recentActivity = [
    { time: '2 min ago', action: 'New booking in VIP Poolside', spot: 'V12', user: 'John Doe' },
    { time: '5 min ago', action: 'Check-in at Sun Area', spot: 'S24', user: 'Sarah Wilson' },
    { time: '8 min ago', action: 'Booking cancelled', spot: 'F8', user: 'Mike Johnson' },
    { time: '12 min ago', action: 'New booking in Pool Side', spot: 'P15', user: 'Emma Davis' },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
        {/* Premium background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
        
        <div className="relative p-6 space-y-8">
          {/* Premium Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-lg">
                    <MapPin className="w-6 h-6 text-emerald-300" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                      Pool Layout Overview
                    </h1>
                    <p className="text-emerald-100 text-lg">Real-time view of your premium pool areas</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-2xl border border-white/20">
                  <Zap className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-medium">Live View</span>
                </div>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-lg">
                  <Eye className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pool Layout Display */}
            <Card className="lg:col-span-2 border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white rounded-t-3xl p-8">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Diamond className="w-6 h-6" />
                  </div>
                  Live Pool Layout
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-50/10 to-cyan-50/10 rounded-3xl p-8 backdrop-blur-lg border border-white/10">
                  <PoolLayoutView />
                  
                  {/* Legend */}
                  <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {zones.map((zone) => (
                      <div key={zone.id} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl backdrop-blur-lg border border-white/10">
                        <div className={`w-4 h-4 rounded-full ${zone.color} shadow-lg`}></div>
                        <div>
                          <p className="text-white font-semibold text-sm">{zone.name}</p>
                          <p className="text-blue-200/80 text-xs">{zone.occupied}/{zone.spots} occupied</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Zone Statistics */}
            <div className="space-y-6">
              <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-3xl p-6">
                  <CardTitle className="flex items-center gap-3">
                    <Star className="w-6 h-6" />
                    Zone Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {zones.map((zone) => {
                    const occupancyRate = Math.round((zone.occupied / zone.spots) * 100);
                    return (
                      <div key={zone.id} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${zone.color}`}></div>
                            <span className="text-white font-semibold">{zone.name}</span>
                          </div>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 border">
                            {zone.price}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-blue-200/80">{zone.occupied}/{zone.spots} spots</span>
                            <span className="text-white font-bold">{occupancyRate}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-1000 ${zone.color.replace('bg-', 'bg-gradient-to-r from-').replace('-400', '-500 to-').replace('-500', '-600')}`}
                              style={{ width: `${occupancyRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-3xl p-6">
                  <CardTitle className="flex items-center gap-3">
                    <Clock className="w-6 h-6" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl backdrop-blur-lg border border-white/10">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 space-y-1">
                        <p className="text-white text-sm font-medium">{activity.action}</p>
                        <div className="flex items-center gap-2 text-xs text-blue-200/80">
                          <span>{activity.spot}</span>
                          <span>•</span>
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PoolLayout;
