// Mock data for Porter app

export const cities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'
];

export const services = [
  {
    id: 'truck',
    name: 'Truck',
    description: 'Hassle-free goods transportation up to 2500 kg',
    icon: 'truck',
    vehicles: [
      { id: 'mini-truck', name: 'Mini Truck', capacity: '750 kg', dimensions: '6 x 4 x 4 ft', price: 299 },
      { id: 'pickup-8ft', name: 'Pickup 8ft', capacity: '1500 kg', dimensions: '8 x 5 x 5 ft', price: 599 },
      { id: 'pickup-10ft', name: 'Pickup 10ft', capacity: '2500 kg', dimensions: '10 x 6 x 6 ft', price: 899 }
    ]
  },
  {
    id: 'two-wheeler',
    name: 'Two Wheeler',
    description: 'Reliable goods transportation services for up to 20 kg',
    icon: 'bike',
    vehicles: [
      { id: 'bike', name: 'Bike Delivery', capacity: '20 kg', dimensions: '2 x 1 x 1 ft', price: 49 },
      { id: 'scooter', name: 'Scooter Delivery', capacity: '15 kg', dimensions: '1.5 x 1 x 0.5 ft', price: 39 }
    ]
  },
  {
    id: 'packers-movers',
    name: 'Packers & Movers',
    description: 'House shifting hai? Ho jayega',
    icon: 'package',
    vehicles: [
      { id: '1bhk', name: '1 BHK Moving', capacity: '2000 kg', price: 4999 },
      { id: '2bhk', name: '2 BHK Moving', capacity: '4000 kg', price: 8999 },
      { id: '3bhk', name: '3 BHK Moving', capacity: '6000 kg', price: 14999 }
    ]
  },
  {
    id: 'intercity',
    name: 'Intercity Courier Service',
    description: 'Reliable intercity courier service - Surface & Air',
    icon: 'plane',
    vehicles: [
      { id: 'surface', name: 'Surface Delivery', capacity: '50 kg', deliveryTime: '3-5 days', price: 199 },
      { id: 'air', name: 'Air Delivery', capacity: '25 kg', deliveryTime: '1-2 days', price: 499 }
    ]
  }
];

export const mockBookings = [
  {
    id: 'BK001',
    service: 'Truck',
    vehicle: 'Mini Truck',
    from: 'Connaught Place, Delhi',
    to: 'Gurgaon Sector 21',
    date: '2025-01-15',
    time: '10:30 AM',
    status: 'completed',
    fare: 299,
    driver: {
      name: 'Raj Kumar',
      phone: '+91 98765 43210',
      rating: 4.8,
      vehicle: 'DL 3C AB 1234'
    }
  },
  {
    id: 'BK002',
    service: 'Two Wheeler',
    vehicle: 'Bike Delivery',
    from: 'Khan Market, Delhi',
    to: 'Vasant Kunj',
    date: '2025-01-16',
    time: '02:15 PM',
    status: 'in-progress',
    fare: 49,
    driver: {
      name: 'Suresh Sharma',
      phone: '+91 98765 43211',
      rating: 4.6,
      vehicle: 'DL 5S CD 5678'
    }
  },
  {
    id: 'BK003',
    service: 'Packers & Movers',
    vehicle: '2 BHK Moving',
    from: 'Lajpat Nagar, Delhi',
    to: 'Noida Sector 62',
    date: '2025-01-18',
    time: '09:00 AM',
    status: 'scheduled',
    fare: 8999,
    driver: {
      name: 'Team Leader: Amit Singh',
      phone: '+91 98765 43212',
      rating: 4.9,
      vehicle: 'HR 26 EF 9012'
    }
  }
];

export const mockDrivers = [
  {
    id: 'D001',
    name: 'Raj Kumar',
    phone: '+91 98765 43210',
    rating: 4.8,
    totalTrips: 1250,
    vehicle: 'DL 3C AB 1234',
    vehicleType: 'Mini Truck',
    location: { lat: 28.6139, lng: 77.2090 },
    status: 'available'
  },
  {
    id: 'D002',
    name: 'Suresh Sharma',
    phone: '+91 98765 43211',
    rating: 4.6,
    totalTrips: 850,
    vehicle: 'DL 5S CD 5678',
    vehicleType: 'Bike',
    location: { lat: 28.5355, lng: 77.3910 },
    status: 'busy'
  }
];

// New mock data for driver orders
export const mockDriverOrders = [
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
    goodsDescription: 'Household items - 2 boxes',
    status: 'pending'
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
    goodsDescription: 'Important documents',
    status: 'pending'
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
    goodsDescription: 'Office furniture - 5 items',
    status: 'pending'
  }
];

export const mockUser = {
  id: 'U001',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 00000',
  addresses: [
    {
      id: 'A001',
      type: 'home',
      address: 'House No. 123, Sector 15, Gurgaon, Haryana - 122001',
      coordinates: { lat: 28.4595, lng: 77.0266 }
    },
    {
      id: 'A002',
      type: 'office',
      address: 'Office Tower, Cyber City, Gurgaon, Haryana - 122002',
      coordinates: { lat: 28.4949, lng: 77.0787 }
    }
  ],
  totalBookings: 15,
  totalSpent: 4580,
  memberSince: '2023-06-15'
};

export const mockNotifications = [
  {
    id: 'N001',
    title: 'Booking Confirmed',
    message: 'Your booking BK002 has been confirmed. Driver will arrive in 15 minutes.',
    type: 'success',
    timestamp: '2025-01-16T14:00:00Z',
    read: false
  },
  {
    id: 'N002',
    title: 'Driver Assigned',
    message: 'Suresh Sharma has been assigned to your booking. Contact: +91 98765 43211',
    type: 'info',
    timestamp: '2025-01-16T13:45:00Z',
    read: false
  },
  {
    id: 'N003',
    title: 'Trip Completed',
    message: 'Your booking BK001 has been completed successfully. Please rate your experience.',
    type: 'success',
    timestamp: '2025-01-15T11:30:00Z',
    read: true
  }
];

export const mockFAQs = [
  {
    id: 'F001',
    question: 'How do I book a Porter service?',
    answer: 'You can book a Porter service through our app or website. Simply select your service type, enter pickup and drop locations, choose your preferred vehicle, and confirm your booking.'
  },
  {
    id: 'F002',
    question: 'What are the payment options available?',
    answer: 'We accept various payment methods including UPI, credit/debit cards, net banking, and cash on delivery (for select services).'
  },
  {
    id: 'F003',
    question: 'Can I track my booking in real-time?',
    answer: 'Yes, you can track your booking in real-time through our app. You will receive live updates about your driver\'s location and estimated arrival time.'
  },
  {
    id: 'F004',
    question: 'What if I need to cancel my booking?',
    answer: 'You can cancel your booking through the app. Cancellation charges may apply based on the timing of cancellation and service type.'
  },
  {
    id: 'F005',
    question: 'How are the fares calculated?',
    answer: 'Fares are calculated based on distance, vehicle type, time of booking, and additional services required. You will see a transparent fare breakdown before confirming your booking.'
  }
];

export const getServiceById = (id) => {
  return services.find(service => service.id === id);
};

export const getBookingById = (id) => {
  return mockBookings.find(booking => booking.id === id);
};

export const getDriverById = (id) => {
  return mockDrivers.find(driver => driver.id === id);
};

export const getDriverOrderById = (id) => {
  return mockDriverOrders.find(order => order.id === id);
};