
import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar,
  User,
  MapPin,
  CreditCard,
  Star,
  Zap,
  TrendingUp
} from 'lucide-react';

const Reservations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  const mockReservations = [
    {
      id: 'RES001',
      guestName: 'John Smith',
      roomNumber: '205',
      lounger: 'V1 - VIP Poolside',
      date: '2024-06-27',
      time: '10:00 - 12:00',
      status: 'confirmed',
      totalAmount: 85,
      extras: ['Premium Parasol', 'Cold Coke', 'Beach Towel'],
      bookedAt: '2024-06-26 15:30',
      paymentMethod: 'stripe',
      guestType: 'premium'
    },
    {
      id: 'RES002',
      guestName: 'Sarah Johnson',
      roomNumber: '312',
      lounger: 'S3 - Sun Area',
      date: '2024-06-27',
      time: '14:00 - 16:00',
      status: 'arrived',
      totalAmount: 35,
      extras: ['Beach Towel'],
      bookedAt: '2024-06-26 09:15',
      paymentMethod: 'reception',
      guestType: 'standard'
    },
    {
      id: 'RES003',
      guestName: 'Mike Davis',
      roomNumber: '158',
      lounger: 'C1 - Cabana Premium',
      date: '2024-06-27',
      time: '12:00 - 14:00',
      status: 'no-show',
      totalAmount: 125,
      extras: ['Premium Water', 'Pool Snacks', 'Fruit Platter'],
      bookedAt: '2024-06-25 20:45',
      paymentMethod: 'stripe',
      guestType: 'vip'
    },
    {
      id: 'RES004',
      guestName: 'Emma Wilson',
      roomNumber: '420',
      lounger: 'P2 - Pool Side Premium',
      date: '2024-06-28',
      time: '10:00 - 12:00',
      status: 'confirmed',
      totalAmount: 52,
      extras: ['Tropical Cocktail'],
      bookedAt: '2024-06-26 18:20',
      paymentMethod: 'stripe',
      guestType: 'standard'
    },
    {
      id: 'RES005',
      guestName: 'Robert Brown',
      roomNumber: '101',
      lounger: 'V5 - VIP Poolside',
      date: '2024-06-27',
      time: '16:00 - 18:00',
      status: 'arrived',
      totalAmount: 95,
      extras: ['Premium Parasol', 'Champagne', 'Luxury Towel Set'],
      bookedAt: '2024-06-26 12:00',
      paymentMethod: 'stripe',
      guestType: 'vip'
    },
    {
      id: 'RES006',
      guestName: 'Lisa Anderson',
      roomNumber: '234',
      lounger: 'F2 - Family Area',
      date: '2024-06-27',
      time: '11:00 - 13:00',
      status: 'confirmed',
      totalAmount: 42,
      extras: ['Kids Pool Access', 'Family Snack Pack'],
      bookedAt: '2024-06-26 14:45',
      paymentMethod: 'reception',
      guestType: 'family'
    },
    {
      id: 'RES007',
      guestName: 'David Miller',
      roomNumber: '567',
      lounger: 'S8 - Sun Area',
      date: '2024-06-28',
      time: '09:00 - 11:00',
      status: 'cancelled',
      totalAmount: 28,
      extras: [],
      bookedAt: '2024-06-25 16:30',
      paymentMethod: 'stripe',
      guestType: 'standard'
    },
    {
      id: 'RES008',
      guestName: 'Jennifer Taylor',
      roomNumber: '890',
      lounger: 'C3 - Cabana Premium',
      date: '2024-06-27',
      time: '13:00 - 15:00',
      status: 'arrived',
      totalAmount: 138,
      extras: ['Premium Water', 'Gourmet Lunch', 'Spa Treatment'],
      bookedAt: '2024-06-24 19:15',
      paymentMethod: 'stripe',
      guestType: 'vip'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      confirmed: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30',
      arrived: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30',
      'no-show': 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30',
      cancelled: 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border-gray-500/30'
    };
    
    const statusIcons = {
      confirmed: <Clock className="w-3 h-3 mr-1" />,
      arrived: <CheckCircle className="w-3 h-3 mr-1" />,
      'no-show': <XCircle className="w-3 h-3 mr-1" />,
      cancelled: <XCircle className="w-3 h-3 mr-1" />
    };

    return (
      <Badge className={`${statusStyles[status as keyof typeof statusStyles]} flex items-center border`}>
        {statusIcons[status as keyof typeof statusIcons]}
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </Badge>
    );
  };

  const getGuestTypeBadge = (type: string) => {
    const typeStyles = {
      vip: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30',
      premium: 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-300 border-orange-500/30',
      family: 'bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-300 border-green-500/30',
      standard: 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-500/30'
    };

    return (
      <Badge className={`${typeStyles[type as keyof typeof typeStyles]} border text-xs`}>
        {type.toUpperCase()}
      </Badge>
    );
  };

  const updateReservationStatus = (id: string, newStatus: string) => {
    console.log(`Updating reservation ${id} to status: ${newStatus}`);
    // In real app, this would update the database
  };

  const filteredReservations = mockReservations.filter(reservation => {
    const matchesSearch = reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.roomNumber.includes(searchTerm) ||
                         reservation.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = reservation.date === today;
    } else if (dateFilter === 'tomorrow') {
      matchesDate = reservation.date === tomorrow;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalRevenue = filteredReservations.reduce((sum, res) => sum + res.totalAmount, 0);
  const confirmedCount = filteredReservations.filter(res => res.status === 'confirmed').length;
  const arrivedCount = filteredReservations.filter(res => res.status === 'arrived').length;

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
        {/* Premium background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
        
        <div className="relative p-6 space-y-8">
          {/* Premium Header */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-lg">
                    <Calendar className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                      Reservations Management
                    </h1>
                    <p className="text-purple-100 text-lg">Track and manage all pool reservations</p>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{filteredReservations.length}</div>
                  <div className="text-purple-200 text-sm">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-300">${totalRevenue}</div>
                  <div className="text-purple-200 text-sm">Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300">{arrivedCount}</div>
                  <div className="text-purple-200 text-sm">Arrived</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-3xl p-6">
              <CardTitle className="flex items-center gap-3">
                <Filter className="w-6 h-6" />
                Search & Filter Reservations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                  <Input
                    placeholder="Search by guest name, room, or reservation ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-48 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="arrived">Arrived</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full lg:w-48 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reservations List */}
          <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-3xl p-6">
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                Active Reservations ({filteredReservations.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {filteredReservations.map((reservation) => (
                  <div key={reservation.id} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Guest Info */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-lg text-white">{reservation.guestName}</div>
                            <div className="text-blue-300 text-sm flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              Room {reservation.roomNumber}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-white/10 text-blue-300 border-white/20 text-xs">
                            {reservation.id}
                          </Badge>
                          {getGuestTypeBadge(reservation.guestType)}
                        </div>
                      </div>
                      
                      {/* Booking Details */}
                      <div className="space-y-3">
                        <div className="text-white font-semibold text-lg">{reservation.lounger}</div>
                        <div className="space-y-1">
                          <div className="text-blue-200 text-sm flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {reservation.date}
                          </div>
                          <div className="text-blue-200 text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {reservation.time}
                          </div>
                        </div>
                      </div>
                      
                      {/* Payment & Extras */}
                      <div className="space-y-3">
                        <div className="text-2xl font-bold text-green-400">${reservation.totalAmount}</div>
                        <div className="flex items-center gap-2 text-sm text-blue-200">
                          <CreditCard className="w-3 h-3" />
                          {reservation.paymentMethod}
                        </div>
                        {reservation.extras.length > 0 && (
                          <div className="space-y-1">
                            <div className="text-xs text-blue-300 font-medium">
                              +{reservation.extras.length} extras
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {reservation.extras.slice(0, 2).map((extra, index) => (
                                <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                                  {extra}
                                </Badge>
                              ))}
                              {reservation.extras.length > 2 && (
                                <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30 text-xs">
                                  +{reservation.extras.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Status & Actions */}
                      <div className="space-y-4">
                        {getStatusBadge(reservation.status)}
                        
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </Button>
                          {reservation.status === 'confirmed' && (
                            <Button 
                              size="sm" 
                              onClick={() => updateReservationStatus(reservation.id, 'arrived')}
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-xs"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Mark Arrived
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredReservations.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-white text-lg font-semibold mb-2">No reservations found</div>
                  <div className="text-blue-300">Try adjusting your search filters</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reservations;
