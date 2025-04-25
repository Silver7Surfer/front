import { useState, useCallback } from 'react';
import * as btcpayService from '../../services/btcpayService';
import { BitcoinIcon, LightningIcon } from './Icons.jsx'; // Assuming you have this component

// Platform options
const PLATFORMS = ['Firekirin', 'Milkyway', 'Yolo'];

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    productId: '', // platform selection
    title: '',     // platform username
    customerEmail: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  
  // Handle form input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }, []);
  
  // Create new BTCPay invoice
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Prepare the invoice data
      const invoiceData = {
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        productId: formData.productId,
        title: formData.title,
        customerEmail: formData.customerEmail || undefined,
        description: formData.description || undefined
      };
      
      // Use the service to create the invoice
      const response = await btcpayService.createInvoice(invoiceData);
      setPaymentInfo(response);
    } catch (err) {
      console.error('Error creating invoice:', err);
      setError(err.response?.data?.error || 'Failed to create payment invoice');
    } finally {
      setLoading(false);
    }
  };
  
  // Open payment page in new tab
  const handlePay = useCallback(() => {
    if (paymentInfo?.paymentUrl) {
      window.open(paymentInfo.paymentUrl, '_blank');
    }
  }, [paymentInfo]);
  
  // Reset form to create new invoice
  const resetForm = useCallback(() => {
    setPaymentInfo(null);
    setError(null);
  }, []);
  
  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700">
      <div className="flex items-center justify-center mb-6 text-center">
        <BitcoinIcon size={24} className="text-orange-500 mr-2" />
        <h2 className="text-2xl font-bold text-orange-500 inline">Bitcoin</h2>
        <span className="mx-2 text-gray-400">|</span>
        <LightningIcon size={24} className="text-blue-400 mr-2" />
        <h2 className="text-2xl font-bold text-blue-400 inline">Payment</h2>
      </div>
      
      {!paymentInfo ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount field */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
              min="0.01"
              step="0.01"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          {/* Currency selector */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-300 mb-1">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="BTC">BTC</option>
            </select>
          </div>
          
          {/* Platform selector dropdown */}
          <div>
            <label htmlFor="productId" className="block text-sm font-medium text-gray-300 mb-1">
              Select Platform
            </label>
            <select
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">-- Select Platform --</option>
              {PLATFORMS.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
          
          {/* Platform Username field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Enter Platform Username
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Your username on the platform"
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          {/* Email field - Optional */}
          <div>
            <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-300 mb-1">
              Email (Optional)
            </label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="Your email address"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          {/* Description field - Optional */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional information"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[100px]"
            />
          </div>
          
          {/* Submit button with Bitcoin icon */}
          <button 
            type="submit" 
            className={`w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-md shadow-sm hover:from-orange-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''} flex items-center justify-center`}
            disabled={loading}
          >
            {loading ? 'Creating Invoice...' : (
              <>
                <BitcoinIcon size={20} className="mr-2" />
                Create Bitcoin Invoice
              </>
            )}
          </button>
        </form>
      ) : (
        /* Payment information section */
        <div className="space-y-6">
          <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
            <h3 className="text-lg font-medium text-orange-500 mb-2">Invoice Created</h3>
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-gray-200">Invoice ID:</span> {paymentInfo.invoiceId}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-gray-200">Status:</span> {paymentInfo.status}
            </p>
            {paymentInfo.paymentReceived && (
              <p className="text-sm font-medium text-green-400 mt-2">
                Payment Received!
              </p>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col space-y-3">
            <button 
              onClick={handlePay} 
              className="px-4 py-3 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 text-white font-medium rounded-md shadow-sm hover:from-orange-600 hover:via-yellow-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500 transition-colors flex items-center justify-center"
              >
              <div className="flex items-center">
                <BitcoinIcon size={20} className="mr-1" />
                <LightningIcon size={20} className="mr-2" />
                Pay Now with BTC/Lightning
              </div>
            </button>
            
            <button 
              onClick={resetForm} 
              className="px-4 py-3 bg-gray-700 text-gray-100 font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transition-colors"
            >
              Create New Invoice
            </button>
          </div>
        </div>
      )}
      
      {/* Error display */}
      {error && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default PaymentForm;