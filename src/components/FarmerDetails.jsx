import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiTruck, FiPackage, FiBarChart, FiCalendar, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const FarmerDetails = () => {
  const { id } = useParams();

  const farmerDetails = {
    1: {
      name: "Ramesh Kumar",
      title: "Ramesh's Organic Farm",
      fullStory: `Starting with just 2 acres of land, Ramesh Kumar faced numerous challenges in selling his organic produce. Local markets were dominated by middlemen who offered very low prices, making it difficult to sustain his farming practice.

      After joining SmartSupply in 2023, everything changed. The platform connected him directly with businesses and bulk buyers, eliminating middlemen completely. Within months, his weekly sales grew from 50kg to 500kg.

      Today, Ramesh supplies to over 30 regular business customers, including premium restaurants and organic stores. He has expanded his farm to 5 acres and employs 8 local farmers.`,
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3",
      contactInfo: {
        phone: "+91 98765 43210",
        email: "ramesh.kumar@farmer.smartsupply.com",
        location: "Village Mehta, District Amritsar, Punjab"
      },
      products: [
        {
          name: "Organic Vegetables Pack",
          minOrder: "100kg",
          price: "₹40/kg",
          description: "Mix of seasonal vegetables"
        },
        {
          name: "Premium Leafy Greens",
          minOrder: "50kg",
          price: "₹60/kg",
          description: "Spinach, Lettuce, Methi"
        }
      ],
      businessPlan: {
        current: {
          production: "500kg weekly",
          customers: "30+ regular businesses",
          revenue: "₹20,000 weekly average",
          employees: "8 local farmers"
        },
        future: {
          goals: [
            "Expand to 10 acres by 2025",
            "Start organic certification process",
            "Add greenhouse for year-round production",
            "Launch premium vegetable box subscription"
          ]
        }
      }
    },
    2: {
      name: "Green Valley Dairy Team",
      title: "Green Valley Dairy",
      fullStory: `Green Valley Dairy started as a small family operation with just 10 cows. The biggest challenge was finding consistent buyers for their premium quality milk and dairy products. Local markets were unreliable and payments were often delayed.

      Joining SmartSupply in 2023 transformed their business model. The platform's subscription system brought regular orders from hotels, cafes, and retail chains. Their customer base grew from 5 to 50+ business clients.

      Now, they process 1000+ liters of milk daily and have expanded their product line to include organic paneer, ghee, and curd. The dairy employs 15 local workers and supports 10 small dairy farmers in the region.`,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
      contactInfo: {
        phone: "+91 98765 43211",
        email: "info@greenvalleydairy.smartsupply.com",
        location: "Karnal, Haryana"
      },
      products: [
        {
          name: "Fresh Milk Subscription",
          minOrder: "50L daily",
          price: "₹60/L",
          description: "Pure cow milk, delivered daily"
        },
        {
          name: "Premium Dairy Pack",
          minOrder: "Weekly subscription",
          price: "Custom pricing",
          description: "Milk, curd, paneer, ghee"
        }
      ],
      businessPlan: {
        current: {
          production: "1000L daily",
          customers: "50+ business clients",
          revenue: "₹60,000 daily average",
          employees: "15 staff members"
        },
        future: {
          goals: [
            "Expand to 2000L daily capacity",
            "Launch organic dairy product line",
            "Set up modern processing unit",
            "Start cheese production"
          ]
        }
      }
    },
    3: {
      name: "Singh Family",
      title: "Sunrise Fruits",
      fullStory: `The Singh family has been growing fruits in their orchards for three generations. Despite having premium quality produce, they struggled with market access and price fluctuations. During peak seasons, they often had to sell at very low prices due to lack of storage facilities.

      SmartSupply provided them with a platform to reach premium buyers directly. Their fruits now reach high-end hotels, juice bars, and fruit vendors across northern India. The platform's bulk ordering system helps them plan their harvests better.

      Currently, they manage 300+ orders monthly and have invested in cold storage facilities. Their success has inspired many local farmers to adopt modern farming techniques.`,
      image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e",
      contactInfo: {
        phone: "+91 98765 43212",
        email: "sunrise.fruits@smartsupply.com",
        location: "Shimla, Himachal Pradesh"
      },
      products: [
        {
          name: "Premium Apple Box",
          minOrder: "100kg",
          price: "₹120/kg",
          description: "Royal Delicious Apples"
        },
        {
          name: "Seasonal Fruits Mix",
          minOrder: "200kg",
          price: "Market price",
          description: "Selection of seasonal fruits"
        }
      ],
      businessPlan: {
        current: {
          production: "2000kg monthly",
          customers: "100+ regular clients",
          revenue: "₹2,40,000 monthly average",
          employees: "12 permanent staff"
        },
        future: {
          goals: [
            "Expand orchard area by 5 acres",
            "Install advanced grading system",
            "Start fruit processing unit",
            "Export to international markets"
          ]
        }
      }
    }
  };

  const farmer = farmerDetails[id];

  if (!farmer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Farmer not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/offers"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back to Offers
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
          <div className="relative h-96">
            <img
              src={farmer.image}
              alt={farmer.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{farmer.title}</h1>
              <p className="text-yellow-400 text-xl">{farmer.name}</p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Story Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 whitespace-pre-line">{farmer.fullStory}</p>
            </motion.div>

            {/* Products Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {farmer.products.map((product, index) => (
                  <div key={index} className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Minimum Order</p>
                        <p className="font-medium">{product.minOrder}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium">{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Business Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Plan</h2>
              
              {/* Current Status */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-500">Production</p>
                  <p className="font-medium">{farmer.businessPlan.current.production}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customers</p>
                  <p className="font-medium">{farmer.businessPlan.current.customers}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="font-medium">{farmer.businessPlan.current.revenue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Team Size</p>
                  <p className="font-medium">{farmer.businessPlan.current.employees}</p>
                </div>
              </div>

              {/* Future Goals */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Future Goals</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {farmer.businessPlan.future.goals.map((goal, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <FiBarChart className="w-5 h-5 text-yellow-400 mt-1" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FiPhone className="w-5 h-5 text-yellow-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href={`tel:${farmer.contactInfo.phone}`} className="font-medium hover:text-green-600">
                      {farmer.contactInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiMail className="w-5 h-5 text-yellow-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${farmer.contactInfo.email}`} className="font-medium hover:text-green-600">
                      {farmer.contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiMapPin className="w-5 h-5 text-yellow-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{farmer.contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <Link
                  to={`/bulk-orders/${id}`}
                  className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                >
                  Place Bulk Order
                </Link>
                <button className="block w-full bg-yellow-400 text-gray-900 text-center py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200">
                  Schedule Meeting
                </button>
                <button className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-200">
                  Download Catalog
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDetails; 