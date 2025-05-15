import { Link } from 'react-router-dom';
import { BitcoinIcon } from './Icons';

const MerchantNotFoundPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <header className="py-6 bg-gray-900 shadow-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <BitcoinIcon size={28} className="text-orange-500 mr-2" />
          <h1 className="text-3xl font-bold text-white">
            <span className="text-orange-500">BTC</span>
            <span className="text-blue-400">Pay</span>
          </h1>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Merchant Not Found</h2>
          <p className="text-gray-300 mb-8">Sorry, the merchant you are looking for does not exist or is not available.</p>
          <Link 
            to="/" 
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-md shadow-sm hover:from-orange-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </main>
      
      <footer className="py-6 bg-gray-900 border-t border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm">
            Secure Bitcoin payments powered by BTCPay Server
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MerchantNotFoundPage;