
import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Package, CheckCircle, Clock, Truck } from 'lucide-react';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const mockOrders = [
    {
      id: 'ORD001',
      reservationId: 'RES001',
      guestName: 'John Smith',
      roomNumber: '205',
      items: [
        { name: 'Cold Coke', quantity: 2, price: 5 },
        { name: 'Premium Parasol', quantity: 1, price: 15 }
      ],
      total: 25,
      status: 'pending',
      orderTime: '2024-06-25 10:15',
      deliveryTime: null,
      loungerLocation: 'V1 - VIP Area'
    },
    {
      id: 'ORD002',
      reservationId: 'RES002',
      guestName: 'Sarah Johnson',
      roomNumber: '312',
      items: [
        { name: 'Beach Towel', quantity: 1, price: 10 },
        { name: 'Pool Cocktail', quantity: 1, price: 12 }
      ],
      total: 22,
      status: 'delivered',
      orderTime: '2024-06-25 14:30',
      deliveryTime: '2024-06-25 14:45',
      loungerLocation: 'S3 - Standard Area'
    },
    {
      id: 'ORD003',
      reservationId: 'RES004',
      guestName: 'Emma Wilson',
      roomNumber: '420',
      items: [
        { name: 'Pool Snacks', quantity: 1, price: 8 },
        { name: 'Premium Water', quantity: 3, price: 3 }
      ],
      total: 17,
      status: 'preparing',
      orderTime: '2024-06-25 11:20',
      deliveryTime: null,
      loungerLocation: 'D2 - Premium Area'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-blue-100 text-blue-800',
      delivering: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    const statusIcons = {
      pending: <Clock className="w-3 h-3 mr-1" />,
      preparing: <Package className="w-3 h-3 mr-1" />,
      delivering: <Truck className="w-3 h-3 mr-1" />,
      delivered: <CheckCircle className="w-3 h-3 mr-1" />,
      cancelled: <CheckCircle className="w-3 h-3 mr-1" />
    };

    return (
      <Badge className={`${statusStyles[status as keyof typeof statusStyles]} flex items-center`}>
        {statusIcons[status as keyof typeof statusIcons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    // In real app, this would update the database
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.roomNumber.includes(searchTerm) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = mockOrders.filter(order => order.status === 'pending').length;
  const completedOrders = mockOrders.filter(order => order.status === 'delivered').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Orders Management</h1>
          <Button className="bg-green-600 hover:bg-green-700">
            <Package className="w-4 h-4 mr-2" />
            Export Orders
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{mockOrders.length}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-blue-600">${totalRevenue}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="delivering">Delivering</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-lg">{order.guestName}</div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-sm text-gray-600">Room {order.roomNumber}</div>
                      <div className="text-sm text-gray-600">Order ID: {order.id}</div>
                      <div className="text-sm text-gray-600">Location: {order.loungerLocation}</div>
                    </div>
                    
                    <div>
                      <div className="font-medium mb-2">Items Ordered:</div>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span>${item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="font-semibold text-lg mt-2">Total: ${order.total}</div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="text-sm text-gray-600">
                        Ordered: {order.orderTime}
                      </div>
                      {order.deliveryTime && (
                        <div className="text-sm text-gray-600">
                          Delivered: {order.deliveryTime}
                        </div>
                      )}
                      
                      <div className="flex gap-2 mt-2">
                        {order.status === 'pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Start Preparing
                          </Button>
                        )}
                        {order.status === 'preparing' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateOrderStatus(order.id, 'delivering')}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            Out for Delivery
                          </Button>
                        )}
                        {order.status === 'delivering' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Mark Delivered
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Orders;
