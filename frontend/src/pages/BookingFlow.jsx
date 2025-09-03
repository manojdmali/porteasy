import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Clock, Star, Truck, Bike, Package, Plane, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { services, mockDrivers } from '../data/mockData';

const BookingFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: location.state?.selectedService || null,
    city: location.state?.city || 'Delhi',
    pickupLocation: '',
    dropLocation: '',
    selectedVehicle: null,
    scheduledDate: '',
    scheduledTime: '',
    contactName: '',
    contactPhone: '',
    specialInstructions: ''
  });
  const [fareEstimate, setFareEstimate] = useState(null);
  const [availableDrivers, setAvailableDrivers] = useState([]);

  const steps = [
    { id: 1, title: 'Service & Locations', description: 'Choose service and locations' },
    { id: 2, title: 'Vehicle Selection', description: 'Select your preferred vehicle' },
    { id: 3, title: 'Schedule & Details', description: 'Schedule and contact details' },
    { id: 4, title: 'Confirmation', description: 'Review and confirm booking' }
  ];

  const serviceIcons = {
    truck: Truck,
    'two-wheeler': Bike,
    'packers-movers': Package,
    intercity: Plane
  };

  useEffect(() => {
    if (bookingData.service && bookingData.selectedVehicle) {
      calculateFare();
    }
  }, [bookingData.service, bookingData.selectedVehicle, bookingData.pickupLocation, bookingData.dropLocation]);

  const calculateFare = () => {
    const basePrice = bookingData.selectedVehicle.price;
    const distance = Math.floor(Math.random() * 15) + 5; // Mock distance 5-20 km
    const totalFare = basePrice + (distance * 8); // Base price + ₹8 per km
    
    setFareEstimate({
      basePrice,
      distance,
      distanceCharge: distance * 8,
      totalFare,
      gst: Math.round(totalFare * 0.18),
      finalAmount: Math.round(totalFare * 1.18)
    });
  };

  const handleServiceChange = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    setBookingData(prev => ({
      ...prev,
      service,
      selectedVehicle: null
    }));
  };

  const handleVehicleSelect = (vehicle) => {
    setBookingData(prev => ({
      ...prev,
      selectedVehicle: vehicle
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmBooking = () => {
    // Generate booking ID
    const bookingId = 'BK' + Math.random().toString(36).substr(2, 6).toUpperCase();
    
    // Mock booking confirmation
    toast({
      title: "Booking Confirmed!",
      description: `Your booking ${bookingId} has been confirmed. Driver will be assigned shortly.`,
    });

    // Navigate to tracking page
    setTimeout(() => {
      navigate('/track', { 
        state: { 
          bookingId,
          bookingData: {
            ...bookingData,
            id: bookingId,
            status: 'confirmed',
            driver: mockDrivers[0],
            fare: fareEstimate?.finalAmount
          }
        }
      });
    }, 2000);
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return bookingData.service && bookingData.pickupLocation && bookingData.dropLocation;
      case 2:
        return bookingData.selectedVehicle;
      case 3:
        return bookingData.contactName && bookingData.contactPhone;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-2 ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep > step.id 
                      ? 'bg-blue-600 text-white' 
                      : currentStep === step.id 
                        ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' 
                        : 'bg-gray-200 text-gray-400'
                  }`}>
                    {currentStep > step.id ? <Check size={16} /> : step.id}
                  </div>
                  <div className="hidden md:block">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-px w-8 md:w-16 mx-2 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Service & Locations */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Service
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => {
                      const Icon = serviceIcons[service.id] || Truck;
                      return (
                        <button
                          key={service.id}
                          onClick={() => handleServiceChange(service.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                            bookingData.service?.id === service.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{service.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Locations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Enter pickup location"
                        value={bookingData.pickupLocation}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          pickupLocation: e.target.value
                        }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Drop Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Enter drop location"
                        value={bookingData.dropLocation}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          dropLocation: e.target.value
                        }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Vehicle Selection */}
            {currentStep === 2 && bookingData.service && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Available Vehicles for {bookingData.service.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookingData.service.vehicles.map((vehicle) => (
                    <button
                      key={vehicle.id}
                      onClick={() => handleVehicleSelect(vehicle)}
                      className={`p-4 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                        bookingData.selectedVehicle?.id === vehicle.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{vehicle.name}</h4>
                          <p className="text-sm text-gray-600">Capacity: {vehicle.capacity}</p>
                          {vehicle.dimensions && (
                            <p className="text-sm text-gray-600">Size: {vehicle.dimensions}</p>
                          )}
                          {vehicle.deliveryTime && (
                            <p className="text-sm text-gray-600">Delivery: {vehicle.deliveryTime}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">₹{vehicle.price}</div>
                          <div className="text-xs text-gray-500">Base fare</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Schedule & Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name
                    </label>
                    <Input
                      placeholder="Enter your name"
                      value={bookingData.contactName}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        contactName: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <Input
                      placeholder="Enter phone number"
                      value={bookingData.contactPhone}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        contactPhone: e.target.value
                      }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date (Optional)
                    </label>
                    <Input
                      type="date"
                      value={bookingData.scheduledDate}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        scheduledDate: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time (Optional)
                    </label>
                    <Input
                      type="time"
                      value={bookingData.scheduledTime}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        scheduledTime: e.target.value
                      }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Any special instructions for the driver..."
                    value={bookingData.specialInstructions}
                    onChange={(e) => setBookingData(prev => ({
                      ...prev,
                      specialInstructions: e.target.value
                    }))}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{bookingData.service?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="font-medium">{bookingData.selectedVehicle?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">From:</span>
                      <span className="font-medium text-right max-w-xs">{bookingData.pickupLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To:</span>
                      <span className="font-medium text-right max-w-xs">{bookingData.dropLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contact:</span>
                      <span className="font-medium">{bookingData.contactName} - {bookingData.contactPhone}</span>
                    </div>
                  </div>
                </div>

                {fareEstimate && (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Fare Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Base Fare:</span>
                        <span>₹{fareEstimate.basePrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Distance ({fareEstimate.distance} km):</span>
                        <span>₹{fareEstimate.distanceCharge}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%):</span>
                        <span>₹{fareEstimate.gst}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                        <span>Total Amount:</span>
                        <span className="text-blue-600">₹{fareEstimate.finalAmount}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < 4 ? (
            <Button
              onClick={handleNextStep}
              disabled={!isStepValid(currentStep)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleConfirmBooking}
              className="bg-green-600 hover:bg-green-700"
            >
              Confirm Booking
              <Check className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;