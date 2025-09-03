import React, { useState } from 'react';
import { Truck, Star, Users, DollarSign, Shield, Clock, Phone, Mail, ArrowRight, CheckCircle, Award, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';

const DriverPartnerPage = () => {
  const { toast } = useToast();
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    vehicleType: '',
    experience: '',
    licenseNumber: ''
  });

  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn ₹25,000 - ₹40,000/month',
      description: 'High earning opportunities with weekly payouts',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Clock,
      title: 'Flexible Working Hours',
      description: 'Work according to your convenience, no fixed shifts',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Shield,
      title: 'Insurance Coverage',
      description: 'Complete insurance for you and your vehicle',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Award,
      title: 'Performance Incentives',
      description: 'Extra rewards for top performers and consistent service',
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  const requirements = [
    { id: 1, title: 'Valid Driving License', description: 'Must have a valid commercial driving license' },
    { id: 2, title: 'Vehicle Documents', description: 'RC, Insurance, PUC certificate required' },
    { id: 3, title: 'Age Requirement', description: 'Must be between 21-55 years old' },
    { id: 4, title: 'Basic Smartphone', description: 'Android/iOS phone with internet connection' }
  ];

  const stats = [
    { label: '15 Lakh+', sublabel: 'Driver Partners', icon: Users },
    { label: '₹35,000', sublabel: 'Avg Monthly Earning', icon: DollarSign },
    { label: '4.8/5', sublabel: 'Partner Satisfaction', icon: Star },
    { label: '24/7', sublabel: 'Support Available', icon: Phone }
  ];

  const vehicleTypes = [
    { id: 'bike', name: 'Two Wheeler', description: 'Bike/Scooter for small deliveries' },
    { id: 'mini-truck', name: 'Mini Truck', description: 'Tata Ace, Mahindra Bolero Pickup' },
    { id: 'pickup', name: 'Pickup Truck', description: '8ft/10ft pickup trucks' },
    { id: 'truck', name: 'Commercial Truck', description: 'Large commercial vehicles' }
  ];

  const handleInputChange = (field, value) => {
    setRegistrationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Registration Submitted!",
      description: "Thank you for your interest. Our team will contact you within 24 hours.",
    });
    setRegistrationForm({
      name: '',
      phone: '',
      email: '',
      city: '',
      vehicleType: '',
      experience: '',
      licenseNumber: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  Partner with Porter
                </h1>
                <p className="text-xl text-blue-100 mb-6">
                  Join India's largest logistics network and start earning with your vehicle today!
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Become a Partner
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: 1800-XXX-XXXX
                </Button>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&h=400&fit=crop&crop=center" 
                alt="Happy Porter driver partner" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.sublabel}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Partner with Porter?</h2>
            <p className="text-xl text-gray-600">Join thousands of successful driver partners across India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${benefit.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Requirements</h2>
            <p className="text-xl text-gray-600">Everything you need to get started as a Porter partner</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.map((req) => (
              <div key={req.id} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{req.title}</h3>
                  <p className="text-sm text-gray-600">{req.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Join Porter Partner Network
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Fill out the form below and our team will contact you within 24 hours
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      required
                      placeholder="Enter your full name"
                      value={registrationForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      required
                      placeholder="Enter your phone number"
                      value={registrationForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={registrationForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <Select value={registrationForm.city} onValueChange={(value) => handleInputChange('city', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="kolkata">Kolkata</SelectItem>
                        <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Type *
                    </label>
                    <Select value={registrationForm.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Driving Experience *
                    </label>
                    <Select value={registrationForm.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Driving License Number *
                  </label>
                  <Input
                    required
                    placeholder="Enter your license number"
                    value={registrationForm.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  />
                </div>

                <div className="text-center">
                  <Button 
                    type="submit"
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 px-12"
                  >
                    Submit Application
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <p className="text-sm text-gray-600 mt-4">
                    By submitting, you agree to our Terms & Conditions and Privacy Policy
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Hear from our successful driver partners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Raj Kumar',
                city: 'Delhi',
                earning: '₹42,000/month',
                story: 'Started 2 years ago with one truck, now I have my own small fleet of 3 vehicles.',
                rating: 4.9
              },
              {
                name: 'Suresh Patel',
                city: 'Mumbai',
                earning: '₹38,000/month',
                story: 'Porter helped me grow my business. Flexible timings allow me to manage other work too.',
                rating: 4.8
              },
              {
                name: 'Amit Singh',
                city: 'Bangalore',
                earning: '₹35,000/month',
                story: 'Best decision I made was joining Porter. Regular income and great support from the team.',
                rating: 4.7
              }
            ].map((story, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-blue-600">
                        {story.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800 border-0">
                      {story.earning}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{story.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm">{story.story}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of driver partners and start earning with Porter today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Truck className="w-5 h-5 mr-2" />
              Register Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Phone className="w-5 h-5 mr-2" />
              Call: 1800-XXX-XXXX
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Mail className="w-5 h-5 mr-2" />
              partners@porter.in
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriverPartnerPage;