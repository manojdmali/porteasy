import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronDown, Truck, Bike, Package, Plane, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [selectedService, setSelectedService] = useState(null);

  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'];

  const services = [
    {
      id: 'truck',
      name: 'Truck',
      icon: Truck,
      description: 'Hassle-free goods transportation up to 2500 kg',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'two-wheeler',
      name: 'Two Wheeler',
      icon: Bike,
      description: 'Reliable goods transportation services for up to 20 kg',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'packers-movers',
      name: 'Packers & Movers',
      icon: Package,
      description: 'House shifting hai? Ho jayega',
      gradient: 'from-red-500 to-red-600'
    },
    {
      id: 'intercity',
      name: 'Intercity Courier Service',
      icon: Plane,
      description: 'Reliable intercity courier service - Surface & Air',
      gradient: 'from-teal-500 to-teal-600'
    }
  ];

  const enterpriseServices = [
    {
      title: 'Porter Enterprise',
      subtitle: 'Streamlining operations to drive business growth',
      description: 'Automate your logistics with our enterprise solutions',
      gradient: 'from-purple-600 via-purple-500 to-pink-500',
      category: 'Enterprise'
    },
    {
      title: 'API Integration',
      subtitle: 'Automate the transportation of your goods by integrating our APIs',
      description: 'Seamless integration for your business needs',
      gradient: 'from-teal-600 via-teal-500 to-green-500',
      category: 'Integration'
    }
  ];

  const stats = [
    { number: '4', label: 'Countries' },
    { number: '15 Lakh+', label: 'Driver Partners' },
    { number: '1 Crore+', label: 'Customers' },
    { number: '10 Crore+', label: 'Trips' }
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    navigate('/book', { state: { selectedService: service, city: selectedCity } });
  };

  const handleGetEstimate = () => {
    if (selectedService) {
      navigate('/book', { state: { selectedService, city: selectedCity } });
    } else {
      navigate('/book', { state: { city: selectedCity } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                  Delivery hai?
                </h1>
                <h2 className="text-4xl lg:text-6xl font-bold text-blue-600">
                  #HoJayega!
                </h2>
              </div>
              
              {/* City Selector */}
              <div className="flex items-center space-x-2 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-medium">City:</span>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-40 border-none bg-transparent font-medium text-blue-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Service Selection */}
              <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                          selectedService?.id === service.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{service.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <Button 
                  onClick={handleGetEstimate}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium"
                >
                  Get an Estimate
                  <span className="text-xs ml-1">(takes ~2 mins)</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=400&fit=crop&crop=center" 
                  alt="Porter delivery truck" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Main Services */}
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className={`relative p-6 rounded-2xl text-white cursor-pointer transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${service.gradient}`}
              >
                <div className="space-y-4">
                  <service.icon className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-white/90 text-sm">{service.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 absolute bottom-6 right-6" />
                </div>
              </div>
            ))}

            {/* Enterprise Services */}
            {enterpriseServices.map((service, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-2xl text-white cursor-pointer transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${service.gradient}`}
              >
                <div className="space-y-4">
                  <div className="text-xs font-medium opacity-75">{service.category}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-white/90 text-sm">{service.subtitle}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 absolute bottom-6 right-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">
            And thanks to you, we are growing each & every day!
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Book your first delivery in just 2 minutes
          </p>
          <Button 
            onClick={handleGetEstimate}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-medium text-lg"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;