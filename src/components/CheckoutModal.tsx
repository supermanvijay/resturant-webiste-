import React, { useState } from 'react';
import { X, CheckCircle, MapPin, Phone, User, CreditCard, Banknote, ShieldCheck } from 'lucide-react';
import { CartItem, Order } from '../types';
import { storageService } from '../services/storageService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'UPI / Online' | 'Credit/Debit Card'>('UPI / Online');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.2);
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Please fill in your name, contact phone, and delivery address.');
      return;
    }

    const orderData = {
      customerName: name,
      phone,
      email: email || undefined,
      deliveryAddress: address,
      items: cart.map((i) => ({
        id: i.item.id,
        name: i.item.name,
        price: i.item.price,
        quantity: i.quantity,
      })),
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentMethod,
    };

    const newOrder = storageService.createOrder(orderData);
    setConfirmedOrder(newOrder);
    onOrderSuccess(newOrder);
  };

  const handleDone = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fcfbf9] text-gray-900 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#ebdcc4] my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#051810] text-white p-5 flex items-center justify-between border-b border-[#0f3627]">
          <div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
              {confirmedOrder ? 'Order Confirmed!' : 'Complete Your Order'}
            </h3>
            <p className="text-xs text-[#b7c7be] mt-0.5">
              {confirmedOrder
                ? 'Your meal is being prepared with royal hygiene'
                : 'Direct from Royal Bites Kitchen to your doorstep'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation State View */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#ebb340] uppercase tracking-wider">
                Order Placed Successfully
              </span>
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Order ID: #{confirmedOrder.id}
              </h2>
              <p className="text-xs text-gray-600">
                Estimated Delivery: <strong className="text-gray-900">30 - 45 Minutes</strong>
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-white rounded-xl p-4 border border-[#e5decb] text-left text-xs space-y-3">
              <div className="border-b border-gray-100 pb-2 flex justify-between">
                <span className="font-semibold text-gray-700">Delivering to:</span>
                <span className="font-medium text-gray-900 text-right max-w-xs truncate">
                  {confirmedOrder.customerName} ({confirmedOrder.phone})
                </span>
              </div>
              <div className="border-b border-gray-100 pb-2">
                <p className="text-gray-500 mb-1">Items Ordered:</p>
                {confirmedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between py-0.5 font-medium">
                    <span>
                      {it.quantity}x {it.name}
                    </span>
                    <span>₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-sm text-gray-900 pt-1">
                <span>Total Paid / Payable:</span>
                <span className="text-[#0d4f32]">₹{confirmedOrder.total} ({confirmedOrder.paymentMethod})</span>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="w-full bg-[#0d4f32] hover:bg-[#083823] text-white font-bold text-sm py-3 rounded-xl transition shadow-md cursor-pointer"
            >
              Back to Royal Bites
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Delivery Details */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#0d4f32] flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>Delivery Details</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Varma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number (for delivery) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Complete Delivery Address *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House/Flat number, Street name, Landmark, Pin code"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#0d4f32] flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                <span>Payment Method</span>
              </h4>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'UPI / Online', label: 'UPI / QR', icon: CreditCard },
                  { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote },
                  { id: 'Credit/Debit Card', label: 'Cards / NetBanking', icon: ShieldCheck },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPaymentMethod(opt.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      paymentMethod === opt.id
                        ? 'border-[#0d4f32] bg-[#0d4f32]/10 text-[#0d4f32] font-bold'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <opt.icon className="w-4 h-4" />
                    <span className="text-[11px] leading-tight">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Special 20% Discount</span>
                <span>-₹{discount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charge</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-gray-900 pt-1.5 border-t border-gray-100">
                <span>Total Payable</span>
                <span className="text-[#0d4f32]">₹{total}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#ebb340] hover:bg-[#dfa732] active:scale-95 text-black font-bold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm & Place Order (₹{total})</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
