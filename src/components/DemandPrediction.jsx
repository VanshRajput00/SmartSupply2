import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTrendingUp, FiBarChart2, FiMapPin, FiPackage, FiCalendar,
  FiChevronDown, FiChevronUp, FiInfo, FiDroplet, FiSun, FiWind,
  FiThermometer, FiTruck, FiDollarSign, FiUsers, FiCrop, FiActivity, FiPieChart
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, AreaChart, Area
} from 'recharts';

const DemandPrediction = () => {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    location: '',
    season: '',
    qualityGrade: 'A',
    storageType: 'cold',
    harvestDate: '',
    expectedQuantity: '',
    targetMarket: 'local'
  });

  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePredict = async () => {
    if (!formData.productName || !formData.category || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const prompt = `Generate a detailed agricultural supply chain demand prediction analysis for the following product:
      Product Name: ${formData.productName}
      Category: ${formData.category}
      Location: ${formData.location}
      Season: ${formData.season}
      Quality Grade: ${formData.qualityGrade}
      Storage Type: ${formData.storageType}
      Harvest Date: ${formData.harvestDate}
      Expected Quantity: ${formData.expectedQuantity}
      Target Market: ${formData.targetMarket}

      Please provide a comprehensive analysis in JSON format with the following structure:
      {
        "summary": {
          "product_name": string,
          "category": string,
          "location": string,
          "current_demand": string,
          "predicted_demand": string,
          "growth_rate": string,
          "market_share": string,
          "seasonality": string,
          "quality_impact": string,
          "storage_requirements": string,
          "price_trend": string
        },
        "market_analysis": {
          "local_market": {
            "demand": string,
            "price_range": string,
            "competition": string
          },
          "regional_market": {
            "demand": string,
            "price_range": string,
            "competition": string
          },
          "export_potential": {
            "demand": string,
            "price_range": string,
            "requirements": string[]
          }
        },
        "environmental_factors": {
          "weather_impact": string,
          "soil_conditions": string,
          "water_availability": string,
          "temperature_impact": string
        },
        "historical_data": [
          {
            "month": string,
            "demand": number,
            "price": number,
            "yield": number,
            "weather_conditions": string
          }
        ],
        "future_prediction": [
          {
            "month": string,
            "predicted_demand": number,
            "predicted_price": number,
            "confidence_interval": {
              "lower": number,
              "upper": number
            }
          }
        ],
        "supply_chain_factors": {
          "transportation": {
            "cost": string,
            "availability": string,
            "challenges": string[]
          },
          "storage": {
            "requirements": string,
            "cost": string,
            "capacity": string
          },
          "processing": {
            "requirements": string,
            "cost": string,
            "facilities": string[]
          }
        },
        "risk_factors": {
          "weather_risks": string[],
          "market_risks": string[],
          "supply_chain_risks": string[],
          "quality_risks": string[]
        },
        "recommendations": {
          "harvesting": string[],
          "storage": string[],
          "transportation": string[],
          "marketing": string[],
          "pricing": string[]
        }
      }`;

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
        setPredictionData(parsed);
        toast.success('Demand prediction generated successfully!');
      } catch (error) {
        console.error('Error parsing AI response:', error);
        toast.error('Failed to parse AI response');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FiTrendingUp className="text-green-600" />
        Agricultural Demand Prediction
      </h2>

      {/* Input Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FiPackage className="text-green-600" />
          Supply Chain Input Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <FiPackage className="text-green-500" />
              Product Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="e.g., Tomatoes, Rice, Wheat"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white"
                >
                  <option value="">Select Category</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains</option>
                  <option value="dairy">Dairy</option>
                  <option value="poultry">Poultry</option>
                  <option value="fisheries">Fisheries</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quality Grade
                </label>
                <select
                  value={formData.qualityGrade}
                  onChange={(e) => handleInputChange('qualityGrade', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white"
                >
                  <option value="A">Grade A (Premium)</option>
                  <option value="B">Grade B (Standard)</option>
                  <option value="C">Grade C (Basic)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location & Season */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <FiMapPin className="text-blue-500" />
              Location & Season
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Season
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={formData.season}
                  onChange={(e) => handleInputChange('season', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white"
                >
                  <option value="">Select Season</option>
                  <option value="summer">Summer</option>
                  <option value="monsoon">Monsoon</option>
                  <option value="winter">Winter</option>
                  <option value="spring">Spring</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harvest Date
                </label>
                <input
                  type="date"
                  value={formData.harvestDate}
                  onChange={(e) => handleInputChange('harvestDate', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Storage & Market */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <FiPackage className="text-purple-500" />
              Storage & Market
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Storage Type
                </label>
                <select
                  value={formData.storageType}
                  onChange={(e) => handleInputChange('storageType', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white"
                >
                  <option value="cold">Cold Storage</option>
                  <option value="ambient">Ambient Storage</option>
                  <option value="controlled">Controlled Atmosphere</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Quantity
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.expectedQuantity}
                    onChange={(e) => handleInputChange('expectedQuantity', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition pr-20"
                    placeholder="Enter quantity"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    kg/tonnes
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Market
                </label>
                <select
                  value={formData.targetMarket}
                  onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white"
                >
                  <option value="local">Local Market</option>
                  <option value="regional">Regional Market</option>
                  <option value="export">Export Market</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePredict}
            disabled={loading || !formData.productName || !formData.category || !formData.location || !formData.season || !formData.expectedQuantity}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Data...
              </>
            ) : (
              <>
                <FiTrendingUp className="text-xl" />
                Generate Prediction
              </>
            )}
          </motion.button>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p className="flex items-center gap-2">
            <FiInfo className="text-blue-500" />
            Fields marked with <span className="text-red-500">*</span> are required
          </p>
        </div>
      </div>

      {/* Results Section */}
      {predictionData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 mb-8 border border-green-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-green-800 flex items-center gap-2">
                <FiTrendingUp className="text-green-600" />
                Agricultural Prediction Summary
              </h3>
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                {showDetails ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-medium text-gray-500">Current Demand</div>
                  <FiBarChart2 className="text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600">{predictionData.summary.current_demand}</div>
                <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-medium text-gray-500">Predicted Demand</div>
                  <FiTrendingUp className="text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{predictionData.summary.predicted_demand}</div>
                <div className="text-xs text-gray-500 mt-1">Next 30 days</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-medium text-gray-500">Growth Rate</div>
                  <FiActivity className="text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-purple-600">{predictionData.summary.growth_rate}</div>
                <div className="text-xs text-gray-500 mt-1">Year over Year</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-medium text-gray-500">Market Share</div>
                  <FiPieChart className="text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-orange-600">{predictionData.summary.market_share}</div>
                <div className="text-xs text-gray-500 mt-1">Current Quarter</div>
              </motion.div>
            </div>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FiCrop className="text-green-500" />
                        <div className="text-sm font-medium text-gray-700">Quality Impact</div>
                      </div>
                      <div className="text-sm text-gray-600">{predictionData.summary.quality_impact}</div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FiPackage className="text-blue-500" />
                        <div className="text-sm font-medium text-gray-700">Storage Requirements</div>
                      </div>
                      <div className="text-sm text-gray-600">{predictionData.summary.storage_requirements}</div>
                    </motion.div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FiThermometer className="text-red-500" />
                        <div className="text-sm font-medium text-gray-700">Temperature Impact</div>
                      </div>
                      <div className="text-sm text-gray-600">{predictionData.summary.temperature_impact}</div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FiDroplet className="text-blue-500" />
                        <div className="text-sm font-medium text-gray-700">Water Requirements</div>
                      </div>
                      <div className="text-sm text-gray-600">{predictionData.summary.water_requirements}</div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Market Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiMapPin className="text-blue-600" />
                Local Market
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-gray-500">Demand</div>
                  <div className="text-sm font-medium">{predictionData.market_analysis.local_market.demand}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Price Range</div>
                  <div className="text-sm font-medium">{predictionData.market_analysis.local_market.price_range}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Competition</div>
                  <div className="text-sm font-medium">{predictionData.market_analysis.local_market.competition}</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiTruck className="text-green-600" />
                Regional Market
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-gray-500">Demand</div>
                  <div className="text-sm font-medium">{predictionData.market_analysis.regional_market.demand}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Price Range</div>
                  <div className="text-sm font-medium">{predictionData.market_analysis.regional_market.price_range}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Competition</div>
                  <div className="text-sm font-medium">{predictionData.market_analysis.regional_market.competition}</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiDollarSign className="text-purple-600" />
                Export Potential
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-gray-500">Demand</div>
                  <div className="text-sm font-medium">{predictionData.market_analysis.export_potential.demand}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Price Range</div>
                  <div className="text-sm font-medium">{predictionData.market_analysis.export_potential.price_range}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Requirements</div>
                  <ul className="text-xs space-y-1">
                    {predictionData.market_analysis.export_potential.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <FiInfo className="text-purple-500 mt-1 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Factors */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Environmental Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FiSun className="text-yellow-500" />
                  <div className="text-sm font-medium">Weather Impact</div>
                </div>
                <div className="text-sm text-gray-600">{predictionData.environmental_factors.weather_impact}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FiCrop className="text-green-500" />
                  <div className="text-sm font-medium">Soil Conditions</div>
                </div>
                <div className="text-sm text-gray-600">{predictionData.environmental_factors.soil_conditions}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FiDroplet className="text-blue-500" />
                  <div className="text-sm font-medium">Water Availability</div>
                </div>
                <div className="text-sm text-gray-600">{predictionData.environmental_factors.water_availability}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FiThermometer className="text-red-500" />
                  <div className="text-sm font-medium">Temperature Impact</div>
                </div>
                <div className="text-sm text-gray-600">{predictionData.environmental_factors.temperature_impact}</div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Historical Data Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Historical Agricultural Data</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={predictionData.historical_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="demand" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="price" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="yield" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Future Prediction Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Future Agricultural Demand</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={predictionData.future_prediction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="predicted_demand" fill="#10B981" />
                    <Bar dataKey="predicted_price" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Supply Chain Analysis */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Supply Chain Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-3">Transportation</h4>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-500">Cost</div>
                    <div className="text-sm font-medium">{predictionData.supply_chain_factors.transportation.cost}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Availability</div>
                    <div className="text-sm font-medium">{predictionData.supply_chain_factors.transportation.availability}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Challenges</div>
                    <ul className="text-xs space-y-1">
                      {predictionData.supply_chain_factors.transportation.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <FiInfo className="text-blue-500 mt-1 shrink-0" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-600 mb-3">Storage</h4>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-500">Requirements</div>
                    <div className="text-sm font-medium">{predictionData.supply_chain_factors.storage.requirements}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Cost</div>
                    <div className="text-sm font-medium">{predictionData.supply_chain_factors.storage.cost}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Capacity</div>
                    <div className="text-sm font-medium">{predictionData.supply_chain_factors.storage.capacity}</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-600 mb-3">Processing</h4>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-500">Requirements</div>
                    <div className="text-sm font-medium">{predictionData.supply_chain_factors.processing.requirements}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Cost</div>
                    <div className="text-sm font-medium">{predictionData.supply_chain_factors.processing.cost}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Facilities</div>
                    <ul className="text-xs space-y-1">
                      {predictionData.supply_chain_factors.processing.facilities.map((facility, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <FiInfo className="text-purple-500 mt-1 shrink-0" />
                          <span>{facility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-600 mb-2">Weather Risks</h4>
                <ul className="text-sm space-y-1">
                  {predictionData.risk_factors.weather_risks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <FiInfo className="text-red-500 mt-1 shrink-0" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-600 mb-2">Market Risks</h4>
                <ul className="text-sm space-y-1">
                  {predictionData.risk_factors.market_risks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <FiInfo className="text-yellow-500 mt-1 shrink-0" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">Supply Chain Risks</h4>
                <ul className="text-sm space-y-1">
                  {predictionData.risk_factors.supply_chain_risks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <FiInfo className="text-blue-500 mt-1 shrink-0" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-600 mb-2">Quality Risks</h4>
                <ul className="text-sm space-y-1">
                  {predictionData.risk_factors.quality_risks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <FiInfo className="text-purple-500 mt-1 shrink-0" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-600 mb-2">Harvesting</h4>
                <ul className="text-sm space-y-1">
                  {predictionData.recommendations.harvesting.map((rec, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <FiInfo className="text-green-500 mt-1 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">Storage</h4>
                <ul className="text-sm space-y-1">
                  {predictionData.recommendations.storage.map((rec, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <FiInfo className="text-blue-500 mt-1 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-600 mb-2">Transportation</h4>
                <ul className="text-sm space-y-1">
                  {predictionData.recommendations.transportation.map((rec, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <FiInfo className="text-purple-500 mt-1 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-600 mb-2">Marketing</h4>
                <ul className="text-sm space-y-1">
                  {predictionData.recommendations.marketing.map((rec, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <FiInfo className="text-yellow-500 mt-1 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-600 mb-2">Pricing</h4>
                <ul className="text-sm space-y-1">
                  {predictionData.recommendations.pricing.map((rec, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <FiInfo className="text-red-500 mt-1 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DemandPrediction; 