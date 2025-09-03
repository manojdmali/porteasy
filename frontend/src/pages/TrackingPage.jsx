import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapPin, Phone, Star, Clock, Navigation, CheckCircle, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockBookings, mockDrivers } from '../data/mockData';

const TrackingPage = () => {
  const location = useLocation();
  const [trackingData, setTrackingData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 28.6139, lng: 77.2090 });
  const [eta, setEta] = useState('15 mins');

  useEffect(() => {
    // Get tracking data from navigation state or mock data
    if (location.state?.bookingData) {
      setTrackingData(location.state.bookingData);
    } else {
      // Use mock data for demonstration
      setTrackingData({
        ...mockBookings[1], // In-progress booking
        driver: mockDrivers[1]
      });
    }

    // Simulate real-time location updates
    const interval = setInterval(() => {
      setCurrentLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
      
      // Update ETA randomly
      const etas = ['12 mins', '10 mins', '8 mins', '15 mins', '5 mins'];
      setEta(etas[Math.floor(Math.random() * etas.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, [location.state]);

  const trackingSteps = [
    { id: 1, title: 'Booking Confirmed', status: 'completed', time: '2:15 PM' },
    { id: 2, title: 'Driver Assigned', status: 'completed', time: '2:18 PM' },
    { id: 3, title: 'Driver En Route', status: 'active', time: 'Now' },
    { id: 4, title: 'Pickup Completed', status: 'pending', time: '' },
    { id: 5, title: 'In Transit', status: 'pending', time: '' },
    { id: 6, title: 'Delivered', status: 'pending', time: '' }
  ];

  if (!trackingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tracking information...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'pending': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Track Your Booking</h1>
              <p className="text-gray-600">Booking ID: {trackingData.id}</p>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {trackingData.status === 'in-progress' ? 'In Progress' : trackingData.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Tracking Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <Card>
              <CardContent className="p-0">
                <div className="relative h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Navigation className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                      <p className="text-blue-800 font-medium">Live Tracking Map</p>
                      <p className="text-blue-600 text-sm">Driver location updates every 30 seconds</p>
                    </div>
                  </div>
                  
                  {/* Mock location indicators */}
                  <div className="absolute top-4 left-4 bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-8 right-8 bg-blue-500 w-3 h-3 rounded-full animate-pulse"></div>
                  
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">ETA: {eta}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trip Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Trip Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(step.status)} flex-shrink-0`}>
                        {step.status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`h-px flex-1 ${index === trackingSteps.length - 1 ? 'invisible' : 'bg-gray-200'}`}></div>
                      <div className="flex-1">
                        <div className={`font-medium ${step.status === 'active' ? 'text-blue-600' : 'text-gray-900'}`}>
                          {step.title}
                        </div>
                        {step.time && (
                          <div className="text-sm text-gray-500">{step.time}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trip Details */}
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-900">Pickup</p>
                        <p className="text-sm text-gray-600">{trackingData.from}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-900">Drop</p>
                        <p className="text-sm text-gray-600">{trackingData.to}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Service Type</p>
                    <p className="font-medium">{trackingData.service}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Vehicle</p>
                    <p className="font-medium">{trackingData.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking Time</p>
                    <p className="font-medium">{trackingData.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fare</p>
                    <p className="font-medium text-blue-600">₹{trackingData.fare}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Driver Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>Driver Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600">
                      {trackingData.driver?.name?.charAt(0) || 'D'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{trackingData.driver?.name}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{trackingData.driver?.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Vehicle Number</p>
                    <p className="font-medium">{trackingData.driver?.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{trackingData.driver?.phone}</p>
                  </div>
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open(`tel:${trackingData.driver?.phone}`)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Driver
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Share Live Location
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Customer Support
                </Button>
                <Link to="/history">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="w-4 h-4 mr-2" />
                    View All Bookings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Emergency */}
            <Card className="border-red-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">Emergency Contact</p>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => window.open('tel:+911234567890')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency: +91 123 456 7890
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;