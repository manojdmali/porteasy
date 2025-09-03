import React, { useState } from 'react';
import { Search, Phone, Mail, MessageCircle, Clock, ChevronDown, ChevronRight, HelpCircle, Book, Users, Headphones } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useToast } from '../hooks/use-toast';
import { mockFAQs } from '../data/mockData';

const SupportPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: '',
    bookingId: ''
  });

  const supportOptions = [
    {
      title: '24/7 Phone Support',
      description: 'Call us anytime for immediate assistance',
      icon: Phone,
      action: 'Call Now',
      contact: '+91 1800-XXX-XXXX',
      available: '24/7',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: MessageCircle,
      action: 'Start Chat',
      contact: 'Average response: 2 mins',
      available: '24/7',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 4 hours',
      icon: Mail,
      action: 'Send Email',
      contact: 'support@porter.in',
      available: 'Response in 4 hours',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const categories = [
    'Booking Issues',
    'Payment Problems',
    'Driver Concerns',
    'Technical Support',
    'Refund Request',
    'General Inquiry'
  ];

  const filteredFAQs = mockFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Support Request Submitted",
      description: "We've received your request and will respond within 4 hours.",
    });
    setSupportForm({
      name: '',
      email: '',
      phone: '',
      category: '',
      message: '',
      bookingId: ''
    });
  };

  const handleInputChange = (field, value) => {
    setSupportForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactAction = (option) => {
    switch (option.action) {
      case 'Call Now':
        window.open(`tel:${option.contact}`);
        break;
      case 'Start Chat':
        toast({
          title: "Starting Live Chat",
          description: "Connecting you with our support team...",
        });
        break;
      case 'Send Email':
        window.open(`mailto:${option.contact}`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 mb-8">
            Get instant support for all your Porter-related queries
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for help..."
              className="pl-10 pr-4 py-3 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="contact" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="help">Help Center</TabsTrigger>
          </TabsList>

          {/* Contact Support Tab */}
          <TabsContent value="contact" className="space-y-8">
            {/* Support Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${option.color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium text-gray-900">{option.contact}</p>
                        <Badge variant="outline" className="text-xs">
                          {option.available}
                        </Badge>
                      </div>
                      <Button 
                        onClick={() => handleContactAction(option)}
                        className="w-full"
                      >
                        {option.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Support Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        placeholder="Enter your name"
                        value={supportForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="Enter your email"
                        value={supportForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        placeholder="Enter your phone"
                        value={supportForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={supportForm.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booking ID (Optional)
                    </label>
                    <Input
                      placeholder="Enter booking ID if related to a specific booking"
                      value={supportForm.bookingId}
                      onChange={(e) => handleInputChange('bookingId', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="5"
                      placeholder="Describe your issue or question in detail..."
                      value={supportForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                  </div>
                  
                  <div className="text-center">
                    <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                {searchQuery && (
                  <p className="text-sm text-gray-600">
                    {filteredFAQs.length} results found for "{searchQuery}"
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
                    <p className="text-gray-600">Try searching with different keywords or contact our support team.</p>
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="space-y-4">
                    {filteredFAQs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="font-medium text-gray-900">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Help Center Tab */}
          <TabsContent value="help" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Getting Started',
                  description: 'Learn how to book your first delivery',
                  icon: Book,
                  articles: ['How to create account', 'Booking your first trip', 'Payment methods'],
                  color: 'bg-blue-100 text-blue-600'
                },
                {
                  title: 'Booking & Tracking',
                  description: 'Manage your bookings and track deliveries',
                  icon: Clock,
                  articles: ['Track your delivery', 'Modify booking', 'Cancel booking'],
                  color: 'bg-green-100 text-green-600'
                },
                {
                  title: 'Account & Billing',
                  description: 'Manage your account and payments',
                  icon: Users,
                  articles: ['Update profile', 'Payment issues', 'Download invoice'],
                  color: 'bg-purple-100 text-purple-600'
                },
                {
                  title: 'Driver Partners',
                  description: 'Information for driver partners',
                  icon: Headphones,
                  articles: ['Partner registration', 'Earnings & payouts', 'Partner support'],
                  color: 'bg-yellow-100 text-yellow-600'
                },
                {
                  title: 'Safety & Policies',
                  description: 'Learn about our safety measures',
                  icon: Users,
                  articles: ['Safety guidelines', 'Terms & conditions', 'Privacy policy'],
                  color: 'bg-red-100 text-red-600'
                },
                {
                  title: 'Technical Support',
                  description: 'Resolve technical issues',
                  icon: Phone,
                  articles: ['App not working', 'Login issues', 'Contact support'],
                  color: 'bg-indigo-100 text-indigo-600'
                }
              ].map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${category.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{category.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                      <div className="space-y-2">
                        {category.articles.map((article, articleIndex) => (
                          <div key={articleIndex} className="flex items-center space-x-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
                            <ChevronRight className="w-4 h-4" />
                            <span>{article}</span>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        View All Articles
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Emergency Contact */}
        <Card className="mt-12 border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold text-red-900 mb-2">Emergency Contact</h3>
            <p className="text-red-700 mb-4">
              For urgent safety concerns or emergencies, call us immediately
            </p>
            <Button 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => window.open('tel:+911234567890')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Emergency: +91 123 456 7890
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportPage;