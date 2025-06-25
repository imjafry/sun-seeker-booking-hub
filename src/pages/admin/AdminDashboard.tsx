
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, DollarSign, TrendingUp, MapPin, Clock, Star, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Bookings',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Users',
      value: '856',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Revenue',
      value: '$45,230',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Occupancy Rate',
      value: '78%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentBookings = [
    { id: 'B001', customer: 'John Doe', seat: 'V1', time: '10:00 AM', status: 'confirmed', price: '$60' },
    { id: 'B002', customer: 'Jane Smith', seat: 'D2', time: '11:30 AM', status: 'pending', price: '$40' },
    { id: 'B003', customer: 'Mike Johnson', seat: 'C1', time: '2:00 PM', status: 'confirmed', price: '$100' },
    { id: 'B004', customer: 'Sarah Wilson', seat: 'S3', time: '3:30 PM', status: 'confirmed', price: '$25' },
  ];

  const occupancyData = [
    { time: '9 AM', occupied: 12, total: 20 },
    { time: '10 AM', occupied: 18, total: 20 },
    { time: '11 AM', occupied: 20, total: 20 },
    { time: '12 PM', occupied: 19, total: 20 },
    { time: '1 PM', occupied: 15, total: 20 },
    { time: '2 PM', occupied: 17, total: 20 },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-2xl shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-blue-100">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Last updated: 2 min ago</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                        <span className="text-xs text-gray-500">vs last month</span>
                      </div>
                    </div>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <Card className="lg:col-span-2 shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Bookings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{booking.customer}</p>
                        <p className="text-sm text-gray-600">Seat {booking.seat} • {booking.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900">{booking.price}</span>
                      <Badge 
                        className={`${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Occupancy Overview */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Today's Occupancy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {occupancyData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">{data.time}</span>
                      <span className="text-sm font-bold text-gray-900">{data.occupied}/{data.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(data.occupied / data.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-xl">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Calendar className="w-4 h-4 mr-2" />
                New Booking
              </Button>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <MapPin className="w-4 h-4 mr-2" />
                Pool Layout
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <DollarSign className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
