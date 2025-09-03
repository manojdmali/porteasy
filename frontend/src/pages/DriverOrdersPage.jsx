import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, User, Phone, Check, X, Navigation, Star, Truck, Package, AlertCircle, Zap, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { Avatar, AvatarContent, AvatarFallback } from '../components/ui/avatar';

const DriverOrdersPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [orders, setOrders] = useState([]);
  const [driverStatus, setDriverStatus] = useState('online');
  const [acceptedOrder, setAcceptedOrder] = useState(null);

  // Mock incoming orders data
  const mockOrders = [
    {
      id: 'ORD001',
      customerName: 'Rajesh Kumar',
      customerPhone: '+91 98765 43210',
      customerRating: 4.8,
      pickupLocation: 'Connaught Place, New Delhi',
      pickupCoordinates: { lat: 28.6315, lng: 77.2167 },
      dropLocation: 'Gurgaon Sector 21, Haryana',
      dropCoordinates: { lat: 28.4595, lng: 77.0266 },
      service: 'Mini Truck',
      estimatedDistance: '18 km',
      estimatedTime: '35 mins',
      fare: 450,
      specialInstructions: 'Please call before arrival. Fragile items.',
      requestTime: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      priority: 'normal',
      goodsDescription: 'Household items - 2 boxes'
    },
    {
      id: 'ORD002',
      customerName: 'Priya Sharma',
      customerPhone: '+91 98765 43211',
      customerRating: 4.9,
      pickupLocation: 'Khan Market, New Delhi',
      pickupCoordinates: { lat: 28.5987, lng: 77.2319 },
      dropLocation: 'Vasant Kunj, New Delhi',
      dropCoordinates: { lat: 28.5244, lng: 77.1580 },
      service: 'Two Wheeler',
      estimatedDistance: '12 km',
      estimatedTime: '25 mins',
      fare: 80,
      specialInstructions: 'Documents delivery - handle with care.',
      requestTime: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      priority: 'urgent',
      goodsDescription: 'Important documents'
    },
    {
      id: 'ORD003',
      customerName: 'Amit Singh',
      customerPhone: '+91 98765 43212',
      customerRating: 4.6,
      pickupLocation: 'Lajpat Nagar, New Delhi',
      pickupCoordinates: { lat: 28.5677, lng: 77.2434 },
      dropLocation: 'Noida Sector 62',
      dropCoordinates: { lat: 28.6274, lng: 77.3731 },
      service: 'Pickup Truck',
      estimatedDistance: '22 km',
      estimatedTime: '45 mins',
      fare: 650,
      specialInstructions: 'Office furniture - need help with loading.',
      requestTime: new Date(Date.now() - 30 * 1000), // 30 seconds ago
      priority: 'normal',
      goodsDescription: 'Office furniture - 5 items'
    }
  ];

  useEffect(() => {
    // Simulate real-time order updates
    setOrders(mockOrders);
    
    // Simulate new orders coming in
    const interval = setInterval(() => {
      if (Math.random() > 0.8 && orders.length < 5) {
        const newOrder = {
          ...mockOrders[Math.floor(Math.random() * mockOrders.length)],
          id: `ORD${Date.now()}`,
          requestTime: new Date()
        };
        setOrders(prev => [newOrder, ...prev]);
        
        // Show notification for new order
        toast({
          title: "New Order Request!",
          description: `${newOrder.service} booking from ${newOrder.customerName}`,
        });
      }
    }, 15000); // New order every 15 seconds

    return () => clearInterval(interval);
  }, [orders.length, toast]);

  const handleAcceptOrder = (order) => {
    setAcceptedOrder(order);
    setOrders(prev => prev.filter(o => o.id !== order.id));
    
    toast({
      title: "Order Accepted!",
      description: `You've accepted the order from ${order.customerName}. Customer has been notified.`,
    });

    // Navigate to tracking page after 2 seconds
    setTimeout(() => {
      navigate('/track', { 
        state: { 
          bookingData: {
            id: order.id,
            customerName: order.customerName,
            from: order.pickupLocation,
            to: order.dropLocation,
            service: order.service,
            fare: order.fare,
            status: 'driver-assigned'
          }
        }
      });
    }, 2000);
  };

  const handleRejectOrder = (order) => {
    setOrders(prev => prev.filter(o => o.id !== order.id));
    
    toast({
      title: "Order Rejected",
      description: `Order from ${order.customerName} has been rejected. It will be offered to other drivers.`,
      variant: "destructive"
    });
  };

  const toggleDriverStatus = () => {
    const newStatus = driverStatus === 'online' ? 'offline' : 'online';
    setDriverStatus(newStatus);
    
    toast({
      title: newStatus === 'online' ? "You're Online!" : "You're Offline",
      description: newStatus === 'online' 
        ? "You will receive new order requests." 
        : "You won't receive new orders until you go online.",
    });
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getServiceIcon = (service) => {
    if (service.toLowerCase().includes('truck')) return Truck;
    if (service.toLowerCase().includes('two wheeler')) return Package;
    return Truck;
  };

  if (acceptedOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Accepted!</h2>
            <p className="text-gray-600 mb-6">
              You've accepted the order from <strong>{acceptedOrder.customerName}</strong>. 
              Customer will be notified and you'll be redirected to the tracking page.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Estimated Earning:</span>
                <span className="text-lg font-bold text-green-600">₹{acceptedOrder.fare}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Distance:</span>
                <span className="text-sm font-medium">{acceptedOrder.estimatedDistance}</span>
              </div>
            </div>
            <Button 
              onClick={() => setAcceptedOrder(null)}
              variant="outline" 
              className="w-full"
            >
              Back to Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Driver Dashboard</h1>
              <p className="text-gray-600">Manage your incoming order requests</p>
            </div>
            
            {/* Driver Status Toggle */}
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                driverStatus === 'online' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  driverStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                }`}></div>
                <span className="font-medium capitalize">{driverStatus}</span>
              </div>
              <Button
                onClick={toggleDriverStatus}
                variant={driverStatus === 'online' ? 'destructive' : 'default'}
                size="sm"
              >
                Go {driverStatus === 'online' ? 'Offline' : 'Online'}
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Pending</div>
                  <div className="text-xl font-bold">{orders.length}</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Today</div>
                  <div className="text-xl font-bold">12</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Earnings</div>
                  <div className="text-xl font-bold">₹2,450</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Rating</div>
                  <div className="text-xl font-bold">4.8</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {driverStatus === 'offline' ? (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">You're Offline</h3>
              <p className="text-gray-600 mb-4">Go online to start receiving order requests</p>
              <Button onClick={toggleDriverStatus} className="bg-green-600 hover:bg-green-700">
                Go Online
              </Button>
            </Card>
          ) : orders.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No New Orders</h3>
              <p className="text-gray-600">Stay online to receive new order requests</p>
            </Card>
          ) : (
            orders.map((order) => {
              const ServiceIcon = getServiceIcon(order.service);
              return (
                <Card key={order.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <ServiceIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{order.service}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(order.priority)}>
                              {order.priority}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {formatTimeAgo(order.requestTime)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">₹{order.fare}</div>
                        <div className="text-sm text-gray-500">{order.estimatedDistance}</div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {order.customerName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{order.customerName}</div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{order.customerRating}</span>
                            </div>
                          </div>
                        </div>
                        <a 
                          href={`tel:${order.customerPhone}`}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                        >
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">Call</span>
                        </a>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Goods:</strong> {order.goodsDescription}
                      </div>
                      
                      {order.specialInstructions && (
                        <div className="text-sm text-gray-600">
                          <strong>Special Instructions:</strong> {order.specialInstructions}
                        </div>
                      )}
                    </div>

                    {/* Route Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex flex-col items-center space-y-2 mt-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div className="w-0.5 h-8 bg-gray-300"></div>
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Pickup</div>
                            <div className="font-medium text-gray-900">{order.pickupLocation}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Drop</div>
                            <div className="font-medium text-gray-900">{order.dropLocation}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Est. Time</div>
                          <div className="font-medium">{order.estimatedTime}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => handleRejectOrder(order)}
                        variant="outline"
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => handleAcceptOrder(order)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Accept Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverOrdersPage;