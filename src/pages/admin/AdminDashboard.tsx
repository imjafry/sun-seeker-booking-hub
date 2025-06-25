
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/AdminLayout';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  MapPin, 
  Clock,
  DollarSign,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const todayStats = {
    totalBookings: 24,
    occupancyRate: 78,
    revenue: 1850,
    activeGuests: 18
  };

  const recentBookings = [
    { id: 'PB-001', guest: 'John Doe', room: '205', time: '10:00-12:00', seats: ['P1', 'P2'], status: 'confirmed' },
    { id: 'PB-002', guest: 'Jane Smith', room: '310', time: '12:00-14:00', seats: ['L3'], status: 'arrived' },
    { id: 'PB-003', guest: 'Mike Johnson', room: '158', time: '14:00-16:00', seats: ['C1'], status: 'pending' },
    { id: 'PB-004', guest: 'Sarah Wilson', room: '422', time: '16:00-18:00', seats: ['D1', 'D2'], status: 'confirmed' },
  ];

  const poolOccupancy = [
    { section: 'VIP Area', occupied: 4, total: 6, percentage: 67 },
    { section: 'Premium Loungers', occupied: 7, total: 10, percentage: 70 },
    { section: 'Standard Loungers', occupied: 12, total: 15, percentage: 80 },
    { section: 'Cabanas', occupied: 2, total: 4, percentage: 50 },
    { section: 'Daybeds', occupied: 3, total: 5, percentage: 60 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'arrived': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Today's Bookings</p>
                  <p className="text-3xl font-bold text-blue-800">{todayStats.totalBookings}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Occupancy Rate</p>
                  <p className="text-3xl font-bold text-green-800">{todayStats.occupancyRate}%</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Today's Revenue</p>
                  <p className="text-3xl font-bold text-purple-800">${todayStats.revenue}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Active Guests</p>
                  <p className="text-3xl font-bold text-orange-800">{todayStats.activeGuests}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{booking.guest}</h4>
                        <Badge variant="outline" className="text-xs">
                          Room {booking.room}
                        </Badge>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📅 {booking.time}</span>
                        <span>💺 {booking.seats.join(', ')}</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-blue-600">
                      {booking.id}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pool Occupancy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Pool Occupancy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {poolOccupancy.map((section) => (
                  <div key={section.section} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{section.section}</span>
                      <span className="text-sm text-gray-600">
                        {section.occupied}/{section.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          section.percentage > 80 ? 'bg-red-500' :
                          section.percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${section.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {section.percentage}% occupied
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-5 h-5" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-200">
                <div className="text-yellow-600 mt-0.5">⚠️</div>
                <div className="flex-1">
                  <h4 className="font-medium text-yellow-800">High Occupancy Alert</h4>
                  <p className="text-sm text-yellow-700">Standard lounger section is at 80% capacity for the 2-4 PM slot.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-blue-600 mt-0.5">ℹ️</div>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-800">Maintenance Scheduled</h4>
                  <p className="text-sm text-blue-700">Pool area cleaning scheduled for 6:00 AM tomorrow.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
