import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUpload, FiDownload, FiAlertCircle, FiCheckCircle, FiClock, FiTrendingUp, FiPlus, FiTrash2, 
  FiHelpCircle, FiInfo, FiMapPin, FiCalendar, FiPackage, FiTruck, FiShield, FiBarChart2,
  FiChevronDown, FiChevronUp, FiArrowRight, FiShare, FiDollarSign, FiUsers, FiBox, FiActivity,
  FiCloud, FiCheck, FiAlertTriangle, FiStar
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import DemandPrediction from '../components/DemandPrediction';

const SectionHeader = ({ title, icon, isOpen, toggleOpen }) => (
  <div 
    className="flex items-center justify-between cursor-pointer mb-4" 
    onClick={toggleOpen}
  >
    <div className="flex items-center gap-3">
      {icon}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    {isOpen ? <FiChevronUp className="text-xl text-gray-600" /> : <FiChevronDown className="text-xl text-gray-600" />}
  </div>
);

const Dashboard = () => {
  const [location, setLocation] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [products, setProducts] = useState([{ name: '', quantity: '', unit: 'kg', priority: 'medium' }]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [urgency, setUrgency] = useState('medium');
  const [activeStep, setActiveStep] = useState(1);
  const [showHelp, setShowHelp] = useState(false);
  const [loadingText, setLoadingText] = useState('Generating Plan...');

  // State for collapsible sections
  const [openSections, setOpenSections] = useState({
    inventory: true,
    distribution: true,
    risk: true,
    timeline: true
  });

  const steps = [
    { id: 1, title: 'Location & Date', icon: <FiMapPin /> },
    { id: 2, title: 'Products', icon: <FiPackage /> },
    { id: 3, title: 'Requirements', icon: <FiInfo /> },
    { id: 4, title: 'Urgency', icon: <FiClock /> }
  ];

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: '', quantity: '', unit: 'kg', priority: 'medium' }]);
  };

  const handleRemoveProduct = (index) => {
    if (products.length > 1) {
      const newProducts = products.filter((_, i) => i !== index);
      setProducts(newProducts);
    }
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleNextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleGeneratePlan = async () => {
    // Validate inputs
    if (!location.trim()) {
      toast.error('Please enter location details');
      return;
    }
    if (!deliveryDate) {
      toast.error('Please select delivery date');
      return;
    }
    if (products.some(p => !p.name.trim() || !p.quantity)) {
      toast.error('Please fill in all product details');
      return;
    }

    setLoading(true);
    setResponse(null);
    const loadingMessages = [
      "Analyzing demand data...",
      "Allocating inventory...",
      "Optimizing distribution route...",
      "Assessing risks...",
      "Finalizing plan..."
    ];
    let messageIndex = 0;
    setLoadingText(loadingMessages[messageIndex]);
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[messageIndex]);
    }, 1000);

    try {
      // Prepare the prompt for Gemini API
      const prompt = `Generate a detailed supply chain plan for the following order:
      Location: ${location}
      Delivery Date: ${deliveryDate}
      Products: ${JSON.stringify(products)}
      Special Requirements: ${specialRequirements}
      Urgency Level: ${urgency}

      Please provide a comprehensive plan in JSON format with the following structure:
      {
        "summary": {
          "total_products": number,
          "total_quantity": number,
          "delivery_location": string,
          "delivery_date": string,
          "urgency_level": string,
          "estimated_cost": string,
          "carbon_footprint": string,
          "estimated_profit_margin": string
        },
        "inventory_management": {
          "allocation": [
            {
              "product": string,
              "quantity": string,
              "priority": string,
              "warehouse": string,
              "storage_requirements": string,
              "shelf_life": string,
              "quality_checks": string[],
              "handling_instructions": string
            }
          ],
          "quality_assurance": {
            "pre_delivery_checks": string[],
            "documentation": string[]
          }
        },
        "distribution_strategy": {
          "route_plan": {
            "from": string,
            "to": string,
            "distance": string,
            "estimated_time": string,
            "route_optimization": string,
            "checkpoints": string[]
          },
          "vehicle_details": {
            "type": string,
            "capacity": string,
            "fuel_efficiency": string,
            "maintenance_status": string,
            "driver_assigned": string
          },
          "schedule": {
            "loading_time": string,
            "departure_time": string,
            "estimated_arrival": string,
            "buffer_time": string,
            "rest_stops": [
              {
                "location": string,
                "duration": string
              }
            ]
          }
        },
        "risk_assessment": {
          "weather_conditions": string,
          "road_conditions": string,
          "temperature_monitoring": string,
          "risk_mitigation": {
            "weather_risks": string,
            "traffic_risks": string,
            "quality_risks": string,
            "delivery_risks": string
          },
          "backup_plan": string[]
        },
        "sustainability_metrics": {
          "carbon_emissions": string,
          "fuel_consumption": string,
          "packaging_material": string,
          "waste_reduction": string
        },
        "cost_breakdown": {
          "transportation": string,
          "handling": string,
          "storage": string,
          "quality_control": string,
          "contingency": string,
          "total": string
        },
        "timeline": [
          {
            "day": string,
            "tasks": string[],
            "milestones": string[]
          }
        ]
      }`;

      // Call Gemini API
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBiluCVjwoljilIcxKafJ2cGMAEeHInb6U', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      });

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No output received';
      const cleanedText = text.trim().replace(/^```(?:json)?/, '').replace(/```$/, '');
      
      try {
        const parsed = JSON.parse(cleanedText);
        setResponse(parsed);
        toast.success('Plan generated successfully!');
      } catch (error) {
        console.error('Error parsing AI response:', error);
        toast.error('Failed to parse AI response');
        // Fallback to mock response if AI fails
        setResponse(mockResponse);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate plan. Using fallback plan.');
      // Fallback to mock response if API fails
      setResponse(mockResponse);
    } finally {
      clearInterval(interval);
      setLoading(false);
      setLoadingText('Generating Plan...');
    }
  };

  const handleExport = () => {
    // Simulate export action
    toast.info('Exporting plan... (Simulation)');
    // In a real app, you would generate a file (CSV, PDF, JSON) here
  };

  // Mock data for charts
  const salesData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ];

  const inventoryData = [
    { name: 'Vegetables', value: 40 },
    { name: 'Fruits', value: 30 },
    { name: 'Dairy', value: 20 },
    { name: 'Others', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#8884D8'];

  // Add new mock data for recent activity and weather
  const recentActivity = [
    { id: 1, type: 'order', message: 'New bulk order received from Farmer Co-op', time: '2 hours ago', status: 'pending' },
    { id: 2, type: 'delivery', message: 'Delivery completed to Village Market', time: '5 hours ago', status: 'completed' },
    { id: 3, type: 'inventory', message: 'Low stock alert: Tomatoes', time: '1 day ago', status: 'warning' },
    { id: 4, type: 'system', message: 'System maintenance completed', time: '2 days ago', status: 'info' }
  ];

  const weatherForecast = [
    { day: 'Today', temp: '28°C', condition: 'Sunny', icon: '☀️' },
    { day: 'Tomorrow', temp: '26°C', condition: 'Partly Cloudy', icon: '⛅' },
    { day: 'Day 3', temp: '24°C', condition: 'Light Rain', icon: '🌦️' }
  ];

  const upcomingDeliveries = [
    { id: 1, date: '2024-03-15', location: 'Village Market', priority: 'high', status: 'scheduled' },
    { id: 2, date: '2024-03-16', location: 'City Center', priority: 'medium', status: 'confirmed' },
    { id: 3, date: '2024-03-17', location: 'Rural Co-op', priority: 'low', status: 'pending' }
  ];

  const performanceMetrics = {
    deliverySuccessRate: 98.5,
    averageDeliveryTime: '4.2 hours',
    customerSatisfaction: 4.8,
    onTimeDeliveries: 95
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-4">Smart Supply Chain Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Optimize your supply chain with AI-powered demand forecasting and inventory management
          </p>
        </motion.div>

        {/* Demand Prediction Section */}
        <DemandPrediction />

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 cursor-pointer shrink-0 ${
                    activeStep === step.id ? 'text-green-600' : 'text-gray-400'
                  }`}
                  onClick={() => !loading && setActiveStep(step.id)} // Disable step change while loading
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    activeStep >= step.id ? 'bg-green-600 text-white' : 'bg-gray-200'
                  }`}>
                    {step.icon}
                  </div>
                  <span className="font-medium">{step.title}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="text-gray-600 hover:text-gray-800 shrink-0 ml-4"
            >
              <FiHelpCircle className="text-xl" />
            </button>
          </div>
          <div className="h-1 bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-green-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((activeStep -1) / (steps.length-1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Help Panel */}
        <AnimatePresence>
          {showHelp && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-200"
            >
              <div className="flex items-start space-x-3">
                <FiInfo className="text-blue-600 mt-1 text-xl shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">How to Enter Data</h3>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li><strong className="font-medium">Location & Date:</strong> Enter the exact delivery location and select a future date.</li>
                    <li><strong className="font-medium">Products:</strong> Add each product, specifying quantity, unit, and priority.</li>
                    <li><strong className="font-medium">Requirements:</strong> Note any special handling needs (e.g., cold storage).</li>
                    <li><strong className="font-medium">Urgency:</strong> Select how quickly the delivery is needed.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center gap-2 hover:bg-gray-50 transition"
          >
            <FiPackage className="text-2xl text-green-600" />
            <span className="font-medium">New Order</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center gap-2 hover:bg-gray-50 transition"
          >
            <FiBox className="text-2xl text-blue-600" />
            <span className="font-medium">Inventory</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center gap-2 hover:bg-gray-50 transition"
          >
            <FiTruck className="text-2xl text-orange-600" />
            <span className="font-medium">Deliveries</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center gap-2 hover:bg-gray-50 transition"
          >
            <FiUsers className="text-2xl text-purple-600" />
            <span className="font-medium">Customers</span>
          </motion.button>
        </div>

        {/* New Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Sales Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FiDollarSign className="text-2xl text-green-600" />
              </div>
              <span className="text-sm text-gray-500">This Month</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">₹45,678</h3>
            <p className="text-sm text-gray-500">Total Sales</p>
            <div className="mt-4 flex items-center text-green-600">
              <FiTrendingUp className="mr-1" />
              <span className="text-sm">+12.5% from last month</span>
            </div>
          </motion.div>

          {/* Customers Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiUsers className="text-2xl text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Active</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">1,234</h3>
            <p className="text-sm text-gray-500">Total Customers</p>
            <div className="mt-4 flex items-center text-blue-600">
              <FiTrendingUp className="mr-1" />
              <span className="text-sm">+8.2% from last month</span>
            </div>
          </motion.div>

          {/* Inventory Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FiBox className="text-2xl text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">In Stock</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">856</h3>
            <p className="text-sm text-gray-500">Total Products</p>
            <div className="mt-4 flex items-center text-purple-600">
              <FiActivity className="mr-1" />
              <span className="text-sm">+15 new products</span>
            </div>
          </motion.div>

          {/* Orders Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <FiPackage className="text-2xl text-orange-600" />
              </div>
              <span className="text-sm text-gray-500">This Week</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">234</h3>
            <p className="text-sm text-gray-500">Total Orders</p>
            <div className="mt-4 flex items-center text-orange-600">
              <FiTrendingUp className="mr-1" />
              <span className="text-sm">+5.7% from last week</span>
            </div>
          </motion.div>
        </div>

        {/* Weather and Performance Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Weather Forecast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiCloud className="text-blue-600" />
              Weather Forecast
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {weatherForecast.map((day, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">{day.icon}</div>
                  <div className="font-medium">{day.day}</div>
                  <div className="text-gray-600">{day.temp}</div>
                  <div className="text-sm text-gray-500">{day.condition}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiStar className="text-yellow-500" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{performanceMetrics.deliverySuccessRate}%</div>
                <div className="text-sm text-gray-600">Delivery Success</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{performanceMetrics.averageDeliveryTime}</div>
                <div className="text-sm text-gray-600">Avg. Delivery Time</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{performanceMetrics.customerSatisfaction}/5</div>
                <div className="text-sm text-gray-600">Customer Rating</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{performanceMetrics.onTimeDeliveries}%</div>
                <div className="text-sm text-gray-600">On-Time Deliveries</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity and Upcoming Deliveries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiActivity className="text-green-600" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                    activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    activity.status === 'pending' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {activity.status === 'completed' ? <FiCheck /> :
                     activity.status === 'warning' ? <FiAlertTriangle /> :
                     activity.status === 'pending' ? <FiClock /> :
                     <FiInfo />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Deliveries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiCalendar className="text-blue-600" />
              Upcoming Deliveries
            </h3>
            <div className="space-y-4">
              {upcomingDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{delivery.location}</p>
                    <p className="text-sm text-gray-500">{new Date(delivery.date).toLocaleDateString()}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    delivery.priority === 'high' ? 'bg-red-100 text-red-600' :
                    delivery.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {delivery.priority}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Inventory Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <FiTruck className="text-green-600" />
              Supply Chain Plan Generator
            </h2>
            <p className="text-gray-600">
              Generate a comprehensive supply chain plan including delivery routes, cost analysis, and risk assessment
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Location and Date */}            
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-semibold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Location & Delivery Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <FiMapPin className="inline mr-2 text-green-500" />
                        Delivery Location
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                        placeholder="Enter village/town name"
                      />
                      <p className="text-xs text-gray-500">Enter the exact delivery location name (e.g., 'Village Name, District, State')</p>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <FiCalendar className="inline mr-2 text-green-500" />
                        Delivery Date
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <p className="text-xs text-gray-500">Select a future date for delivery (at least 2 days from today)</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Products */}            
              {activeStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-semibold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Product Details</h3>
                  </div>

                  <div className="space-y-4">
                    {products.map((product, index) => (
                      <motion.div
                        key={index}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl items-end"
                      >
                        <div className="space-y-2">
                          <label className="block text-xs font-medium text-gray-600">Product Name</label>
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                            placeholder="e.g., Tomatoes, Potatoes, Milk"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-medium text-gray-600">Quantity</label>
                          <input
                            type="number"
                            value={product.quantity}
                            onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                            placeholder="e.g., 100"
                            min="1"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-medium text-gray-600">Unit</label>
                          <select
                            value={product.unit}
                            onChange={(e) => handleProductChange(index, 'unit', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm bg-white"
                          >
                            <option value="kg">Kilograms (kg)</option>
                            <option value="g">Grams (g)</option>
                            <option value="pieces">Pieces</option>
                            <option value="liters">Liters (L)</option>
                            <option value="boxes">Boxes</option>
                          </select>
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex-1 space-y-2">
                            <label className="block text-xs font-medium text-gray-600">Priority</label>
                            <select
                              value={product.priority}
                              onChange={(e) => handleProductChange(index, 'priority', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm bg-white"
                            >
                              <option value="high">High (Urgent delivery needed)</option>
                              <option value="medium">Medium (Standard delivery)</option>
                              <option value="low">Low (Flexible delivery time)</option>
                            </select>
                          </div>
                          {products.length > 1 && (
                            <button
                              onClick={() => handleRemoveProduct(index)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-md transition-colors"
                            >
                              <FiTrash2 />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <button
                    onClick={handleAddProduct}
                    className="mt-4 px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium flex items-center gap-2 hover:bg-green-100 transition"
                  >
                    <FiPlus className="text-lg" />
                    Add Another Product
                  </button>
                </div>
              )}
              
              {/* Step 3: Special Requirements */}            
              {activeStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-semibold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Special Requirements</h3>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <FiInfo className="inline mr-2 text-green-500" />
                      Additional Requirements
                    </label>
                    <textarea
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      placeholder="e.g., Needs cold storage, Fragile items, Specific delivery window..."
                    />
                    <p className="text-xs text-gray-500">Specify any special handling, storage, or delivery needs. For example: 'Need cold storage for dairy products', 'Fragile items - handle with care', 'Delivery preferred between 9 AM to 5 PM'</p>
                  </div>
                </div>
              )}
              
              {/* Step 4: Urgency */}            
              {activeStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-semibold">4</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Delivery Urgency</h3>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <FiClock className="inline mr-2 text-green-500" />
                      Urgency Level
                    </label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white"
                    >
                      <option value="low">Low (Standard delivery: 5-7 days)</option>
                      <option value="medium">Medium (Priority delivery: 3-4 days)</option>
                      <option value="high">High (Express delivery: 1-2 days)</option>
                    </select>
                    <p className="text-xs text-gray-500">Choose how quickly the delivery is needed. High urgency may incur additional charges.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}            
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevStep}
              disabled={activeStep === 1 || loading}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </motion.button>
            
            {activeStep < steps.length ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextStep}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGeneratePlan}
                disabled={loading}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="w-48 text-left transition-all duration-300">{loadingText}</span>
                  </>
                ) : (
                  <>
                    <FiTrendingUp className="text-xl" />
                    Generate Supply Plan
                  </>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Results Section */}        
        <AnimatePresence>
          {response && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Generated Supply Chain Plan</h2>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExport}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition"
                >
                  <FiShare />
                  Export Plan
                </motion.button>
              </div>
              
              {/* Summary Card */}
              <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Plan Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <div className="text-xs text-gray-500 mb-1">Total Products</div>
                    <div className="text-xl font-bold text-green-600">{response.summary.total_products}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <div className="text-xs text-gray-500 mb-1">Total Quantity</div>
                    <div className="text-xl font-bold text-green-600">{response.summary.total_quantity}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <div className="text-xs text-gray-500 mb-1">Location</div>
                    <div className="text-lg font-semibold text-green-600 truncate">{response.summary.delivery_location}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <div className="text-xs text-gray-500 mb-1">Delivery Date</div>
                    <div className="text-lg font-semibold text-green-600">{response.summary.delivery_date}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <div className="text-xs text-gray-500 mb-1">Estimated Cost</div>
                    <div className="text-lg font-semibold text-green-600">{response.summary.estimated_cost}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <div className="text-xs text-gray-500 mb-1">Carbon Footprint</div>
                    <div className="text-lg font-semibold text-green-600">{response.summary.carbon_footprint}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <div className="text-xs text-gray-500 mb-1">Profit Margin</div>
                    <div className="text-lg font-semibold text-green-600">{response.summary.estimated_profit_margin}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inventory Management */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <SectionHeader 
                    title="Inventory Management" 
                    icon={<FiDownload className="text-2xl text-green-600" />} 
                    isOpen={openSections.inventory} 
                    toggleOpen={() => toggleSection('inventory')}
                  />
                  <AnimatePresence>
                    {openSections.inventory && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 pt-2">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-gray-700 mb-2 text-sm">Product Allocation</h4>
                            <div className="space-y-2">
                              {response.inventory_management.allocation.map((item, index) => (
                                <div key={index} className="flex items-start gap-3 text-sm">
                                  <FiCheckCircle className="text-green-500 mt-1 shrink-0" />
                                  <div>
                                    <p className="text-gray-800 font-medium">{item.product} - {item.quantity}</p>
                                    <p className="text-xs text-gray-500">Priority: {item.priority} | Warehouse: {item.warehouse}</p>
                                    <p className="text-xs text-gray-500">Storage: {item.storage_requirements} | Shelf Life: {item.shelf_life}</p>
                                    <div className="mt-1">
                                      <p className="text-xs font-medium text-gray-600">Quality Checks:</p>
                                      <ul className="text-xs text-gray-500 list-disc list-inside">
                                        {item.quality_checks.map((check, i) => (
                                          <li key={i}>{check}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-gray-700 mb-2 text-sm">Quality Assurance</h4>
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs font-medium text-gray-600">Pre-delivery Checks:</p>
                                <ul className="text-xs text-gray-500 list-disc list-inside">
                                  {response.inventory_management.quality_assurance.pre_delivery_checks.map((check, i) => (
                                    <li key={i}>{check}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-600">Required Documentation:</p>
                                <ul className="text-xs text-gray-500 list-disc list-inside">
                                  {response.inventory_management.quality_assurance.documentation.map((doc, i) => (
                                    <li key={i}>{doc}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Distribution Strategy */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <SectionHeader 
                    title="Distribution Strategy" 
                    icon={<FiTruck className="text-2xl text-blue-600" />} 
                    isOpen={openSections.distribution} 
                    toggleOpen={() => toggleSection('distribution')}
                  />
                  <AnimatePresence>
                    {openSections.distribution && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 pt-2">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-gray-700 mb-2 text-sm">Route Plan</h4>
                            <div className="flex items-center justify-between text-center text-xs font-medium my-3 px-2">
                              <div className="flex flex-col items-center">
                                <FiMapPin className="text-red-500 text-lg mb-1" />
                                <span>{response.distribution_strategy.route_plan.from}</span>
                              </div>
                              <div className="flex-1 border-t-2 border-dashed border-gray-400 mx-2 relative top-[-8px]"></div>
                              <FiArrowRight className="text-gray-500 mx-1"/>
                              <div className="flex-1 border-t-2 border-dashed border-gray-400 mx-2 relative top-[-8px]"></div>
                              <div className="flex flex-col items-center">
                                <FiMapPin className="text-green-500 text-lg mb-1" />
                                <span>{response.distribution_strategy.route_plan.to}</span>
                              </div>
                            </div>
                            <p className="text-center text-xs text-gray-500 mb-3">
                              Distance: {response.distribution_strategy.route_plan.distance} | 
                              Est. Time: {response.distribution_strategy.route_plan.estimated_time}
                            </p>
                            <div className="text-sm">
                              <p className="text-gray-700"><strong className="font-medium">Optimization:</strong> {response.distribution_strategy.route_plan.route_optimization}</p>
                              <p className="text-gray-700"><strong className="font-medium">Checkpoints:</strong></p>
                              <ul className="text-xs text-gray-500 list-disc list-inside">
                                {response.distribution_strategy.route_plan.checkpoints.map((checkpoint, i) => (
                                  <li key={i}>{checkpoint}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-gray-700 mb-2 text-sm">Vehicle Details</h4>
                            <div className="text-sm space-y-1">
                              <p className="text-gray-700"><strong className="font-medium">Type:</strong> {response.distribution_strategy.vehicle_details.type}</p>
                              <p className="text-gray-700"><strong className="font-medium">Capacity:</strong> {response.distribution_strategy.vehicle_details.capacity}</p>
                              <p className="text-gray-700"><strong className="font-medium">Fuel Efficiency:</strong> {response.distribution_strategy.vehicle_details.fuel_efficiency}</p>
                              <p className="text-gray-700"><strong className="font-medium">Maintenance:</strong> {response.distribution_strategy.vehicle_details.maintenance_status}</p>
                              <p className="text-gray-700"><strong className="font-medium">Driver:</strong> {response.distribution_strategy.vehicle_details.driver_assigned}</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-gray-700 mb-2 text-sm">Schedule</h4>
                            <div className="space-y-1 text-sm">
                              <p className="text-gray-700"><FiClock className="inline mr-2 text-blue-500"/>Loading: {response.distribution_strategy.schedule.loading_time}</p>
                              <p className="text-gray-700"><FiUpload className="inline mr-2 text-blue-500"/>Departure: {response.distribution_strategy.schedule.departure_time}</p>
                              <p className="text-gray-700"><FiDownload className="inline mr-2 text-green-500"/>Est. Arrival: {response.distribution_strategy.schedule.estimated_arrival}</p>
                              <p className="text-gray-700"><FiInfo className="inline mr-2 text-gray-500"/>Buffer Time: {response.distribution_strategy.schedule.buffer_time}</p>
                              <div className="mt-2">
                                <p className="text-xs font-medium text-gray-600">Rest Stops:</p>
                                <ul className="text-xs text-gray-500">
                                  {response.distribution_strategy.schedule.rest_stops.map((stop, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                      <FiMapPin className="text-gray-400" />
                                      {stop.location} ({stop.duration})
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Risk Assessment */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <SectionHeader 
                    title="Risk Assessment" 
                    icon={<FiShield className="text-2xl text-orange-600" />} 
                    isOpen={openSections.risk} 
                    toggleOpen={() => toggleSection('risk')}
                  />
                  <AnimatePresence>
                    {openSections.risk && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 pt-2">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-gray-700 mb-2 text-sm">Conditions & Monitoring</h4>
                            <div className="space-y-1 text-sm">
                              <p className="text-gray-700"><FiAlertCircle className="inline mr-2 text-orange-500"/>Weather: {response.risk_assessment.weather_conditions}</p>
                              <p className="text-gray-700"><FiAlertCircle className="inline mr-2 text-orange-500"/>Road: {response.risk_assessment.road_conditions}</p>
                              <p className="text-gray-700"><FiAlertCircle className="inline mr-2 text-orange-500"/>Temp. Monitoring: {response.risk_assessment.temperature_monitoring}</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-gray-700 mb-2 text-sm">Risk Mitigation</h4>
                            <div className="space-y-2 text-sm">
                              <p className="text-gray-700"><strong className="font-medium">Weather Risks:</strong> {response.risk_assessment.risk_mitigation.weather_risks}</p>
                              <p className="text-gray-700"><strong className="font-medium">Traffic Risks:</strong> {response.risk_assessment.risk_mitigation.traffic_risks}</p>
                              <p className="text-gray-700"><strong className="font-medium">Quality Risks:</strong> {response.risk_assessment.risk_mitigation.quality_risks}</p>
                              <p className="text-gray-700"><strong className="font-medium">Delivery Risks:</strong> {response.risk_assessment.risk_mitigation.delivery_risks}</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-gray-700 mb-2 text-sm">Backup Plan</h4>
                            <div className="space-y-2">
                              {response.risk_assessment.backup_plan.map((item, index) => (
                                <div key={index} className="flex items-start gap-3 text-sm">
                                  <FiCheckCircle className="text-green-500 mt-1 shrink-0" />
                                  <p className="text-gray-700">{item}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sustainability & Cost */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <SectionHeader 
                    title="Sustainability & Cost" 
                    icon={<FiBarChart2 className="text-2xl text-purple-600" />} 
                    isOpen={openSections.timeline} 
                    toggleOpen={() => toggleSection('timeline')}
                  />
                  <AnimatePresence>
                    {openSections.timeline && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 pt-2">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-gray-700 mb-2 text-sm">Sustainability Metrics</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-gray-500">Carbon Emissions</p>
                                <p className="text-sm font-medium text-gray-800">{response.sustainability_metrics.carbon_emissions}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Fuel Consumption</p>
                                <p className="text-sm font-medium text-gray-800">{response.sustainability_metrics.fuel_consumption}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Packaging Material</p>
                                <p className="text-sm font-medium text-gray-800">{response.sustainability_metrics.packaging_material}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Waste Reduction</p>
                                <p className="text-sm font-medium text-gray-800">{response.sustainability_metrics.waste_reduction}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-gray-700 mb-2 text-sm">Cost Breakdown</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Transportation</span>
                                <span className="font-medium">{response.cost_breakdown.transportation}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Handling</span>
                                <span className="font-medium">{response.cost_breakdown.handling}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Storage</span>
                                <span className="font-medium">{response.cost_breakdown.storage}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Quality Control</span>
                                <span className="font-medium">{response.cost_breakdown.quality_control}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Contingency</span>
                                <span className="font-medium">{response.cost_breakdown.contingency}</span>
                              </div>
                              <div className="border-t border-gray-200 pt-2 mt-2">
                                <div className="flex justify-between text-sm font-semibold">
                                  <span>Total Cost</span>
                                  <span>{response.cost_breakdown.total}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Delivery Timeline</h3>
                <div className="relative pl-6 pt-2 after:content-[''] after:absolute after:left-[10px] after:top-0 after:bottom-0 after:w-0.5 after:bg-gray-300">
                  {response.timeline.map((day, index) => (
                    <div key={index} className="mb-6 relative">
                      <div className="absolute left-[-16px] top-1 w-5 h-5 bg-purple-600 rounded-full border-4 border-white"></div>
                      <h4 className="font-semibold text-purple-700 mb-1 text-sm">{day.day}</h4>
                      <div className="space-y-2">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="font-medium text-gray-700 mb-2 text-sm">Tasks</h5>
                          <ul className="space-y-1 text-sm">
                            {day.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-start gap-2">
                                <FiCheckCircle className="text-purple-500 mt-1 shrink-0" />
                                <span className="text-gray-700">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <h5 className="font-medium text-gray-700 mb-2 text-sm">Milestones</h5>
                          <ul className="space-y-1 text-sm">
                            {day.milestones.map((milestone, milestoneIndex) => (
                              <li key={milestoneIndex} className="flex items-start gap-2">
                                <FiCheckCircle className="text-green-500 mt-1 shrink-0" />
                                <span className="text-gray-700">{milestone}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;