
import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

const Reservations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  const mockReservations = [
    {
      id: 'RES001',
      guestName: 'John Smith',
      roomNumber: '205',
      lounger: 'V1 - VIP',
      date: '2024-06-25',
      time: '10:00 - 12:00',
      status: 'confirmed',
      totalAmount: 85,
      extras: ['Parasol', 'Cold Coke'],
      bookedAt: '2024-06-24 15:30',
      paymentMethod: 'stripe'
    },
    {
      id: 'RES002',
      guestName: 'Sarah Johnson',
      roomNumber: '312',
      lounger: 'S3 - Standard',
      date: '2024-06-25',
      time: '14:00 - 16:00',
      status: 'arrived',
      totalAmount: 35,
      extras: ['Beach Towel'],
      bookedAt: '2024-06-24 09:15',
      paymentMethod: 'reception'
    },
    {
      id: 'RES003',
      guestName: 'Mike Davis',
      roomNumber: '158',
      lounger: 'C1 - Cabana',
      date: '2024-06-25',
      time: '12:00 - 14:00',
      status: 'no-show',
      totalAmount: 125,
      extras: ['Premium Water', 'Pool Snacks'],
      bookedAt: '2024-06-23 20:45',
      paymentMethod: 'stripe'
    },
    {
      id: 'RES004',
      guestName: 'Emma Wilson',
      roomNumber: '420',
      lounger: 'D2 - Premium',
      date: '2024-06-26',
      time: '10:00 - 12:00',
      status: 'confirmed',
      totalAmount: 52,
      extras: ['Cocktail'],
      bookedAt: '2024-06-24 18:20',
      paymentMethod: 'stripe'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      confirmed: 'bg-blue-100 text-blue-800',
      arrived: 'bg-green-100 text-green-800',
      'no-show': 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    
    const statusIcons = {
      confirmed: <Clock className="w-3 h-3 mr-1" />,
      arrived: <CheckCircle className="w-3 h-3 mr-1" />,
      'no-show': <XCircle className="w-3 h-3 mr-1" />,
      cancelled: <XCircle className="w-3 h-3 mr-1" />
    };

    return (
      <Badge className={`${statusStyles[status as keyof typeof statusStyles]} flex items-center`}>
        {statusIcons[status as keyof typeof statusIcons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reservations</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search reservations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32">
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
              <SelectTrigger className="w-full sm:w-32">
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
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Reservation Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="space-y-4">
                {filteredReservations.map((reservation) => (
                  <div key={reservation.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <div className="font-semibold text-lg">{reservation.guestName}</div>
                        <div className="text-sm text-gray-600">Room {reservation.roomNumber}</div>
                        <div className="text-sm text-gray-600">ID: {reservation.id}</div>
                      </div>
                      
                      <div>
                        <div className="font-medium">{reservation.lounger}</div>
                        <div className="text-sm text-gray-600">{reservation.date}</div>
                        <div className="text-sm text-gray-600">{reservation.time}</div>
                      </div>
                      
                      <div>
                        <div className="font-semibold text-lg">${reservation.totalAmount}</div>
                        <div className="text-sm text-gray-600">{reservation.paymentMethod}</div>
                        {reservation.extras.length > 0 && (
                          <div className="text-xs text-blue-600">
                            +{reservation.extras.length} extras
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {getStatusBadge(reservation.status)}
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          {reservation.status === 'confirmed' && (
                            <Button 
                              size="sm" 
                              onClick={() => updateReservationStatus(reservation.id, 'arrived')}
                              className="text-xs bg-green-600 hover:bg-green-700"
                            >
                              Mark Arrived
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {reservation.extras.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="text-sm font-medium text-gray-700 mb-1">Extras:</div>
                        <div className="flex flex-wrap gap-1">
                          {reservation.extras.map((extra, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {extra}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Reservations;
