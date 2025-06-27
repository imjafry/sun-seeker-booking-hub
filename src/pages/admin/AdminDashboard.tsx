
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, DollarSign, TrendingUp, MapPin, Clock, Star, Activity, Eye, Zap, Crown, Diamond } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Bookings',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      bgGlow: 'shadow-blue-500/20'
    },
    {
      title: 'Active Users',
      value: '856',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'from-emerald-500 to-teal-500',
      bgGlow: 'shadow-emerald-500/20'
    },
    {
      title: 'Revenue',
      value: '$45,230',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-500',
      bgGlow: 'shadow-yellow-500/20'
    },
    {
      title: 'Occupancy Rate',
      value: '78%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgGlow: 'shadow-purple-500/20'
    }
  ];

  const recentBookings = [
    { id: 'B001', customer: 'John Doe', seat: 'V1', time: '10:00 AM', status: 'confirmed', price: '$60', avatar: 'JD' },
    { id: 'B002', customer: 'Jane Smith', seat: 'D2', time: '11:30 AM', status: 'pending', price: '$40', avatar: 'JS' },
    { id: 'B003', customer: 'Mike Johnson', seat: 'C1', time: '2:00 PM', status: 'confirmed', price: '$100', avatar: 'MJ' },
    { id: 'B004', customer: 'Sarah Wilson', seat: 'S3', time: '3:30 PM', status: 'confirmed', price: '$25', avatar: 'SW' },
  ];

  const occupancyData = [
    { time: '9 AM', occupied: 12, total: 20, percentage: 60 },
    { time: '10 AM', occupied: 18, total: 20, percentage: 90 },
    { time: '11 AM', occupied: 20, total: 20, percentage: 100 },
    { time: '12 PM', occupied: 19, total: 20, percentage: 95 },
    { time: '1 PM', occupied: 15, total: 20, percentage: 75 },
    { time: '2 PM', occupied: 17, total: 20, percentage: 85 },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
        {/* Premium background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
        
        <div className="relative p-6 space-y-8">
          {/* Premium Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-lg">
                    <Crown className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      Premium Dashboard
                    </h1>
                    <p className="text-blue-100 text-lg">Welcome back, Admin! Your pool empire awaits.</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-2xl border border-white/20">
                  <Zap className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-medium">Live Updates</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-2xl border border-white/20">
                  <Clock className="w-5 h-5 text-blue-300" />
                  <span className="text-sm font-medium">Last updated: 2 min ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className={`relative overflow-hidden border-0 bg-white/5 backdrop-blur-xl shadow-2xl ${stat.bgGlow} hover:shadow-3xl transition-all duration-500 hover:scale-105 group`}>
                  {/* Premium glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <CardContent className="p-8 relative">
                    <div className="flex items-center justify-between">
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-blue-200/80 uppercase tracking-wider">{stat.title}</p>
                        <p className="text-4xl font-bold text-white mb-3">{stat.value}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-semibold text-green-400">{stat.change}</span>
                          </div>
                          <span className="text-xs text-blue-200/60">vs last month</span>
                        </div>
                      </div>
                      <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-2xl ${stat.bgGlow} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Premium Recent Bookings */}
            <Card className="lg:col-span-2 border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-3xl p-8">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Activity className="w-6 h-6" />
                  </div>
                  Recent Premium Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-6 bg-white/5 backdrop-blur-lg rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10 group">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">{booking.avatar}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-white text-lg">{booking.customer}</p>
                          <p className="text-blue-200/80 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Seat {booking.seat} • {booking.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-white text-xl">{booking.price}</p>
                          <Badge 
                            className={`${
                              booking.status === 'confirmed' 
                                ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            } border backdrop-blur-lg`}
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-300 hover:text-white hover:bg-white/10">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Premium Occupancy Overview */}
            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-t-3xl p-8">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  Live Occupancy
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {occupancyData.map((data, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-blue-200">{data.time}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-white">{data.occupied}/{data.total}</span>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 border">
                            {data.percentage}%
                          </Badge>
                        </div>
                      </div>
                      <div className="relative w-full bg-white/10 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full transition-all duration-1000 shadow-lg"
                          style={{ width: `${data.percentage}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Premium Quick Actions */}
          {/* <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white rounded-t-3xl p-8">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Diamond className="w-6 h-6" />
                </div>
                Premium Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button className="h-16 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border-0 rounded-2xl">
                  <div className="flex flex-col items-center gap-2">
                    <Calendar className="w-6 h-6" />
                    <span className="font-semibold">New Booking</span>
                  </div>
                </Button>
                <Button className="h-16 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 border-0 rounded-2xl">
                  <div className="flex flex-col items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    <span className="font-semibold">Pool Layout</span>
                  </div>
                </Button>
                <Button className="h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 border-0 rounded-2xl">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="w-6 h-6" />
                    <span className="font-semibold">Manage Users</span>
                  </div>
                </Button>
                <Button className="h-16 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 border-0 rounded-2xl">
                  <div className="flex flex-col items-center gap-2">
                    <DollarSign className="w-6 h-6" />
                    <span className="font-semibold">View Reports</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
