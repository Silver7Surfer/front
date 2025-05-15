import PaymentForm from './components/PaymentForm';
import { BitcoinIcon, LightningIcon } from './components/Icons';

function App({ merchant = null }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <header className="py-6 bg-gray-900 shadow-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <BitcoinIcon size={28} className="text-orange-500 mr-2" />
          <h1 className="text-3xl font-bold text-white">
            <span className="text-orange-500">BTC</span>
            <span className="text-blue-400">Pay</span>
            {merchant && <span className="text-sm ml-2 text-gray-300">| {merchant.replace('_', ' ')}</span>}
          </h1>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PaymentForm merchant={merchant} />
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
}

export default App;