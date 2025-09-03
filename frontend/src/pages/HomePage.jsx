import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronDown, Truck, Bike, Package, Plane, ArrowRight, Star, Zap, Shield, Clock } from 'lucide-react';
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
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      id: 'two-wheeler',
      name: 'Two Wheeler',
      icon: Bike,
      description: 'Reliable goods transportation services for up to 20 kg',
      gradient: 'from-purple-500 to-purple-600',
      hoverGradient: 'hover:from-purple-600 hover:to-purple-700'
    },
    {
      id: 'packers-movers',
      name: 'Packers & Movers',
      icon: Package,
      description: 'House shifting hai? Ho jayega',
      gradient: 'from-red-500 to-red-600',
      hoverGradient: 'hover:from-red-600 hover:to-red-700'
    },
    {
      id: 'intercity',
      name: 'Intercity Courier Service',
      icon: Plane,
      description: 'Reliable intercity courier service - Surface & Air',
      gradient: 'from-teal-500 to-teal-600',
      hoverGradient: 'hover:from-teal-600 hover:to-teal-700'
    }
  ];

  const enterpriseServices = [
    {
      title: 'Porter Enterprise',
      subtitle: 'Streamlining operations to drive business growth',
      description: 'Automate your logistics with our enterprise solutions',
      gradient: 'from-purple-600 via-purple-500 to-pink-500',
      hoverGradient: 'hover:from-purple-700 hover:via-purple-600 hover:to-pink-600',
      category: 'Enterprise'
    },
    {
      title: 'API Integration',
      subtitle: 'Automate the transportation of your goods by integrating our APIs',
      description: 'Seamless integration for your business needs',
      gradient: 'from-teal-600 via-teal-500 to-green-500',
      hoverGradient: 'hover:from-teal-700 hover:via-teal-600 hover:to-green-600',
      category: 'Integration'
    }
  ];

  const stats = [
    { number: '4', label: 'Countries', icon: '🌍' },
    { number: '15 Lakh+', label: 'Driver Partners', icon: '👨‍💼' },
    { number: '1 Crore+', label: 'Customers', icon: '👥' },
    { number: '10 Crore+', label: 'Trips', icon: '🚚' }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book in under 2 minutes',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Your goods are insured',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round the clock assistance',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Star,
      title: 'Rated Drivers',
      description: 'Verified & rated partners',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleGetEstimate = () => {
    // Create a plain object to avoid cloning issues
    const navigationState = {
      selectedService: selectedService ? {
        id: selectedService.id,
        name: selectedService.name,
        description: selectedService.description
      } : null,
      city: selectedCity
    };
    navigate('/book', { state: navigationState });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 md:py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Delivery hai?
                </h1>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  #HoJayega!
                </h2>
              </div>

              {/* Features Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex flex-col items-center p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${feature.color} mb-2`}>
                        <Icon className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div className="text-xs md:text-sm font-medium text-gray-900 text-center leading-tight">
                        {feature.title}
                      </div>
                      <div className="text-xs text-gray-600 text-center">
                        {feature.description}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* City Selector */}
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-medium">City:</span>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-32 border-none bg-transparent font-medium text-blue-600 hover:bg-blue-50 transition-colors">
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

              {/* Service Selection Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/20 max-w-md mx-auto lg:mx-0 transform hover:scale-[1.02] transition-all duration-300">
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <button
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        className={`group p-3 md:p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
                          selectedService?.id === service.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <span className="text-xs md:text-sm font-medium text-gray-900">{service.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <Button 
                  onClick={handleGetEstimate}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 md:py-4 rounded-2xl font-medium text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Get an Estimate
                  <span className="text-xs ml-2 opacity-75">(takes ~2 mins)</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative order-first lg:order-last">
              <div className="relative z-10 transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=400&fit=crop&crop=center" 
                  alt="Porter delivery truck" 
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-3xl"></div>
                
                {/* Floating elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Zap className="w-6 h-6 text-yellow-800" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Shield className="w-6 h-6 text-green-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Services */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose from our wide range of logistics solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {/* Main Services */}
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => {
                  const serviceData = {
                    id: service.id,
                    name: service.name,
                    description: service.description
                  };
                  navigate('/book', { 
                    state: { 
                      selectedService: serviceData, 
                      city: selectedCity 
                    } 
                  });
                }}
                className={`group relative p-6 md:p-8 rounded-3xl text-white cursor-pointer transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${service.gradient} ${service.hoverGradient} shadow-xl hover:shadow-2xl`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <service.icon className="w-8 h-8 md:w-10 md:h-10" />
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}

            {/* Enterprise Services */}
            {enterpriseServices.map((service, index) => (
              <div
                key={index}
                className={`group relative p-6 md:p-8 rounded-3xl text-white cursor-pointer transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${service.gradient} ${service.hoverGradient} shadow-xl hover:shadow-2xl xl:col-span-1 ${services.length % 3 === 1 && index === 0 ? 'md:col-span-2 xl:col-span-1' : ''}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium opacity-75 bg-white/20 px-2 py-1 rounded-full">{service.category}</div>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">{service.subtitle}</p>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-12">
            And thanks to you, we are growing each & every day!
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-3xl md:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm md:text-lg text-gray-300 mb-2">
                  {stat.label}
                </div>
                <div className="text-2xl md:text-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-100">
            Book your first delivery in just 2 minutes
          </p>
          <Button 
            onClick={handleGetEstimate}
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 md:px-12 py-3 md:py-4 rounded-2xl font-medium text-base md:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Zap className="w-5 h-5 mr-2" />
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;