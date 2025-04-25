import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiPackage, FiCalendar, FiChevronDown, FiChevronUp, FiInfo, FiHash, FiMapPin, FiCheckCircle, 
  FiLoader, FiXCircle, FiTruck, FiTag, FiCreditCard, FiShoppingCart, FiEdit2, FiUser,
  FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrders } from '../context/OrderContext'; // Import useOrders
import { toast } from 'react-toastify';

// Random Indian names generator
const indianFirstNames = [
  'Rajesh', 'Amit', 'Rahul', 'Vikram', 'Arjun', 'Deepak', 'Suresh', 'Manoj',
  'Priya', 'Neha', 'Anjali', 'Kavita', 'Sunita', 'Rekha', 'Meena', 'Pooja'
];

const indianLastNames = [
  'Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Verma', 'Yadav', 'Jain',
  'Malhotra', 'Choudhary', 'Reddy', 'Mishra', 'Pandey', 'Joshi', 'Agarwal'
];

// Vehicle types and series
const vehicleTypes = ['Truck', 'Car', 'Bolero', 'Van'];
const vehicleSeries = ['DL', 'HR', 'PB', 'CH', 'KA', 'TN', 'MH', 'GJ'];

// Function to generate random Indian name
const generateIndianName = () => {
  const firstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
  const lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
  return `${firstName} ${lastName}`;
};

// Function to generate random vehicle number
const generateVehicleNumber = () => {
  const series = vehicleSeries[Math.floor(Math.random() * vehicleSeries.length)];
  const number = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const letters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                 String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${series} ${number} ${letters}`;
};

// Function to generate random phone number
const generatePhoneNumber = () => {
  const prefix = ['98', '99', '97', '96', '95', '94', '93', '92', '91', '90'];
  const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
  const randomNumber = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  return `+91 ${randomPrefix}${randomNumber}`;
};

// Function to generate delivery person details
const generateDeliveryPersonDetails = () => ({
  name: generateIndianName(),
  phone: generatePhoneNumber(),
  vehicleNumber: generateVehicleNumber(),
  vehicleType: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]
});

// Default delivery details
const defaultDeliveryDetails = {
  address: {
    name: "Sanjay Gupta",
    street: "Chandigarh",
    city: "Chandigarh",
    state: "Punjab",
    pincode: "160001",
    phone: "+91 9235054394",
    email: "sahausanjay99@gmail.com"
  }
};

// Mock data is no longer needed
// const mockOrders = [...];

// Helper to get status color and icon
const getStatusStyle = (status) => {
  switch (status) {
    case 'Delivered':
      return { 
        bgColor: 'bg-green-100', 
        textColor: 'text-green-700', 
        icon: <FiCheckCircle className="mr-1.5" /> 
      };
    case 'Processing':
      return { 
        bgColor: 'bg-blue-100', 
        textColor: 'text-blue-700', 
        icon: <FiLoader className="mr-1.5 animate-spin" /> 
      };
    case 'Cancelled':
      return { 
        bgColor: 'bg-red-100', 
        textColor: 'text-red-700', 
        icon: <FiXCircle className="mr-1.5" /> 
      };
    default:
      return { 
        bgColor: 'bg-gray-100', 
        textColor: 'text-gray-700', 
        icon: <FiInfo className="mr-1.5" /> 
      };
  }
};

const Orders = () => {
  const { orders, updateOrderStatus } = useOrders(); // Get orders from context
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [deliveryDetails] = useState(() => 
    orders.reduce((acc, order) => {
      acc[order.id] = generateDeliveryPersonDetails();
      return acc;
    }, {})
  );

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleOrderConfirmation = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'Delivered');
      toast.success('Order confirmed as received!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error('Failed to confirm order. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center flex flex-col items-center"
          >
            <FiPackage className="text-6xl text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">No Orders Yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Complete a checkout to see your order history here.
            </p>
            <Link
              to="/categories"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 transition duration-300"
            >
              Start Shopping
            </Link>
          </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;
            const statusStyle = getStatusStyle(order.status);

            return (
              <motion.div
                key={order.id}
                layout
                initial={{ borderRadius: 12 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              >
                {/* Order Summary Header */}
                <div 
                  className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-3 sm:mb-0">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm font-semibold text-gray-800 flex items-center">
                        <FiHash className="mr-1.5 text-gray-500" /> Order ID: {order.id}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                         <FiCalendar className="mr-1.5"/> {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                     <div 
                       className={`px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center ${statusStyle.bgColor} ${statusStyle.textColor}`}
                     >
                       {statusStyle.icon}
                       {order.status}
                     </div>
                  </div>
                  <div className="flex items-center w-full sm:w-auto justify-between">
                     <p className="text-lg font-semibold text-green-700 sm:mr-4">₹{order.total.toFixed(2)}</p>
                     {order.status === 'Processing' && (
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           handleOrderConfirmation(order.id);
                         }}
                         className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mr-2"
                       >
                         <FiCheck className="mr-1.5" />
                         Confirm Receipt
                       </button>
                     )}
                     <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                       <FiChevronDown className="text-xl text-gray-500" />
                     </motion.div>
                   </div>
                </div>

                {/* Expandable Order Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-6 pt-4 border-t border-gray-200 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Left Column: Items & Notes */}
                        <div className="space-y-4">
                          {/* Items List */}
                          <div>
                            <h5 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                              <FiShoppingCart className="mr-1.5"/> Items Purchased:
                            </h5>
                            <div className="space-y-2 pl-2 max-h-40 overflow-y-auto pr-2">
                              {order.items.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm bg-white p-2 rounded border border-gray-200">
                                  {item.type === 'bulk' ? (
                                    // Bulk Order Item Display
                                    <div className="flex items-center w-full">
                                      <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center mr-2">
                                        <FiPackage className="text-blue-500" />
                                      </div>
                                      <div className="flex-grow">
                                        <div className="text-gray-800">{item.product} (Bulk Order)</div>
                                        <div className="text-xs text-gray-500">
                                          {item.quantity} {item.unit} • Farmer: {item.farmerName}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          Delivery: {new Date(item.deliveryDate).toLocaleDateString()}
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    // Regular Product Item Display
                                    <>
                                      <div className="flex items-center">
                                        {item.image && (
                                          <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-8 h-8 object-cover rounded mr-2"
                                          />
                                        )}
                                        <span className="text-gray-800">{item.name} (x{item.quantity})</span>
                                      </div>
                                      <span className="text-gray-600 font-medium">
                                        ₹{(item.price * item.quantity).toFixed(2)}
                                      </span>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                           {/* Order Notes */}
                           {order.orderNotes && (
                             <div>
                               <h5 className="text-sm font-medium text-gray-600 mb-1 flex items-center"><FiEdit2 className="mr-1.5"/> Order Notes:</h5>
                               <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">{order.orderNotes}</p>
                             </div>
                           )}
                        </div>

                        {/* Right Column: Summary & Details */}
                        <div className="space-y-4">
                           {/* Summary */}
                           <div>
                             <h5 className="text-sm font-medium text-gray-600 mb-2">Summary:</h5>
                             <div className="text-sm space-y-1 bg-white p-3 rounded border border-gray-200">
                               <div className="flex justify-between">
                                 <span>Subtotal:</span>
                                 <span>₹{order.subtotal.toFixed(2)}</span>
                               </div>
                               {order.discountApplied && (
                                <div className="flex justify-between text-green-600">
                                  <span>Discount ({order.discountApplied.code}):</span>
                                  <span>- ₹{order.discountApplied.amount.toFixed(2)}</span>
                                </div>
                               )}
                               <div className="flex justify-between">
                                 <span>Shipping ({order.shippingMethod}):</span>
                                 <span>{order.shippingCost === 0 ? 'Free' : `₹${order.shippingCost.toFixed(2)}`}</span>
                               </div>
                               <div className="flex justify-between font-semibold border-t border-gray-100 mt-1 pt-1">
                                 <span>Total:</span>
                                 <span>₹{order.total.toFixed(2)}</span>
                               </div>
                             </div>
                           </div>
                           {/* Delivery Person Info */}
                           <div>
                             <h5 className="text-sm font-medium text-gray-600 mb-1 flex items-center">
                               <FiUser className="mr-1.5"/> Delivery Person:
                             </h5>
                             <div className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">
                               <p className="font-medium">{deliveryDetails[order.id].name}</p>
                               <p>Phone: {deliveryDetails[order.id].phone}</p>
                               <p>Vehicle: {deliveryDetails[order.id].vehicleType} ({deliveryDetails[order.id].vehicleNumber})</p>
                             </div>
                           </div>
                           {/* Shipping Address */}
                           <div>
                             <h5 className="text-sm font-medium text-gray-600 mb-1 flex items-center">
                               <FiMapPin className="mr-1.5"/> Shipping Address:
                             </h5>
                             <div className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">
                               <p className="font-medium">{defaultDeliveryDetails.address.name}</p>
                               <p>{defaultDeliveryDetails.address.street}</p>
                               <p>{defaultDeliveryDetails.address.city}, {defaultDeliveryDetails.address.state}</p>
                               <p>Pincode: {defaultDeliveryDetails.address.pincode}</p>
                               <p>Phone: {defaultDeliveryDetails.address.phone}</p>
                               <p>Email: {defaultDeliveryDetails.address.email}</p>
                             </div>
                           </div>
                           {/* Payment Info */}
                           <div>
                             <h5 className="text-sm font-medium text-gray-600 mb-1 flex items-center"><FiCreditCard className="mr-1.5"/> Payment Method:</h5>
                              <p className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200">{order.paymentMethod}</p>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders; 