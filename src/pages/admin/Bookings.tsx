
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, X, CheckCircle } from 'lucide-react';

const Bookings = () => {
  const bookings = [
    { id: 354, date: 'Jun 25, 2025', spots: 'S104, S123', status: 'Confirmed', room: '354' },
    { id: 120, date: 'Jun 25, 2025', spots: 'S108, V105', status: 'Confirmed', room: '120' },
    { id: 437, date: 'Jun 25, 2025', spots: 'V105, V106', status: 'Pay at reception', room: '437' },
    { id: 211, date: 'Jun 25, 2025', spots: 'S110, V101', status: 'Pay at reception', room: '211' },
    { id: 109, date: 'Jun 25, 2025', spots: 'V101, V102', status: 'Pending', room: '109' },
    { id: 238, date: 'Jun 25, 2025', spots: 'F204, F205', status: 'Confirmed', room: '238' },
    { id: 315, date: 'Jun 25, 2025', spots: 'V111, V112', status: 'Pending', room: '315' },
    { id: 354, date: 'Jun 25, 2025', spots: 'A125, A126', status: 'Pending', room: '354' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pay at reception':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Bookings</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Create Booking
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium">Today's Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white mb-2">24</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium">Occupancy by Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Total Occupancy rate</span>
                <span className="text-white font-semibold">78%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/80 text-xs">Sun Area</span>
                  <div className="w-24 bg-white/20 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80 text-xs">VIP Poolside</span>
                  <div className="w-24 bg-white/20 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80 text-xs">Family Area</span>
                  <div className="w-24 bg-white/20 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80 text-xs">Pool Side</span>
                  <div className="w-24 bg-white/20 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium">Live Occupancy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Current Status</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search Room no"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 max-w-xs"
          />
          <Select defaultValue="jun-25-2025">
            <SelectTrigger className="bg-white/10 border-white/20 text-white w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jun-25-2025">Jun 25, 2025</SelectItem>
              <SelectItem value="jun-26-2025">Jun 26, 2025</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-statuses">
            <SelectTrigger className="bg-white/10 border-white/20 text-white w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-statuses">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="pay-at-reception">Pay at reception</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings Table */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-white font-semibold">Room no</TableHead>
                <TableHead className="text-white font-semibold">Date</TableHead>
                <TableHead className="text-white font-semibold">Spots</TableHead>
                <TableHead className="text-white font-semibold">Status</TableHead>
                <TableHead className="text-white font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking, index) => (
                <TableRow key={index} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-white font-medium">{booking.room}</TableCell>
                  <TableCell className="text-white">{booking.date}</TableCell>
                  <TableCell className="text-white">{booking.spots}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(booking.status)} border-0`}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                      {booking.status === 'Pay at reception' && (
                        <Button size="sm" variant="outline" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Confirm
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Bookings;
