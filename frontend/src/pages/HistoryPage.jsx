import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Filter, Search, Star, MapPin, Clock, Truck, Eye, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockBookings } from '../data/mockData';

const HistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      'in-progress': { color: 'bg-blue-100 text-blue-800', label: 'In Progress' },
      scheduled: { color: 'bg-yellow-100 text-yellow-800', label: 'Scheduled' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
    };
    
    const config = statusConfig[status] || statusConfig.completed;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getServiceIcon = (service) => {
    switch (service.toLowerCase()) {
      case 'truck': return <Truck className="w-4 h-4" />;
      default: return <Truck className="w-4 h-4" />;
    }
  };

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesService = serviceFilter === 'all' || booking.service.toLowerCase() === serviceFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'fare':
        return b.fare - a.fare;
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const totalSpent = mockBookings.reduce((sum, booking) => sum + booking.fare, 0);
  const completedBookings = mockBookings.filter(b => b.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking History</h1>
          <p className="text-gray-600">Track and manage all your bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{mockBookings.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Trips</p>
                  <p className="text-2xl font-bold text-gray-900">{completedBookings}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalSpent.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">₹</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              {/* Service Filter */}
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="two-wheeler">Two Wheeler</SelectItem>
                  <SelectItem value="packers-movers">Packers & Movers</SelectItem>
                  <SelectItem value="intercity">Intercity</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="fare">Sort by Fare</SelectItem>
                  <SelectItem value="status">Sort by Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          {sortedBookings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || statusFilter !== 'all' || serviceFilter !== 'all'
                    ? 'Try adjusting your filters to see more results.'
                    : 'You haven\'t made any bookings yet. Start by booking your first delivery!'}
                </p>
                <Link to="/book">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            sortedBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Left Section */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between lg:justify-start lg:space-x-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            {getServiceIcon(booking.service)}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {booking.id} - {booking.service}
                            </h3>
                            <p className="text-sm text-gray-600">{booking.vehicle}</p>
                          </div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      {/* Route */}
                      <div className="flex items-start space-x-4">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div className="w-0.5 h-8 bg-gray-300"></div>
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div>
                            <p className="text-sm text-gray-900 font-medium">From</p>
                            <p className="text-sm text-gray-600">{booking.from}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-900 font-medium">To</p>
                            <p className="text-sm text-gray-600">{booking.to}</p>
                          </div>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col lg:items-end space-y-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">₹{booking.fare}</p>
                        {booking.driver && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{booking.driver.rating}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        {booking.status === 'in-progress' && (
                          <Link to="/track" state={{ bookingData: booking }}>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Eye className="w-4 h-4 mr-1" />
                              Track
                            </Button>
                          </Link>
                        )}
                        <Button size="sm" variant="outline">
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Rebook
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {sortedBookings.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="px-8">
              Load More Bookings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;