// services/btcpayService.js
import axios from 'axios';

// API configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create a new invoice
export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${API_URL}/api/create-invoice`, invoiceData);
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};

// Get invoice status
export const getInvoiceStatus = async (invoiceId) => {
  try {
    const response = await axios.get(`${API_URL}/api/invoices/${invoiceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching invoice status:', error);
    throw error;
  }
};