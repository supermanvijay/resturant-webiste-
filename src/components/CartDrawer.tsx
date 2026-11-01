import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
  // 20% discount applied as highlighted in the special offer banner
  const discount = Math.round(subtotal * 0.2);
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const total = subtotal > 0 ? Math.max(0, subtotal - discount + deliveryFee) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf8f3] text-gray-900 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 bg-[#051810] text-white flex items-center justify-between border-b border-[#0f3426]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#ebb340]" />
              <h3 className="font-serif font-bold text-lg">Your Order Basket</h3>
              <span className="bg-[#ebb340] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Special Offer Alert */}
          <div className="bg-[#ebb340]/20 border-b border-[#ebb340]/40 px-4 py-2 flex items-center justify-between text-xs text-[#0a3523] font-medium">
            <span>🎉 Special Offer Applied: 20% OFF on All Orders!</span>
            <span className="font-bold text-[#0d4f32]">-₹{discount}</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-base text-gray-700">Your cart is empty</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore our aromatic biryanis and authentic dishes to add items.
                </p>
              </div>
            ) : (
              cart.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-3 border border-[#ece4d6] shadow-xs flex items-center gap-3"
                >
                  {/* Dish Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-3 h-3 border flex items-center justify-center rounded-[2px] flex-shrink-0 ${
                          item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                        />
                      </div>
                      <h4 className="font-bold text-xs text-gray-900 truncate">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-xs font-semibold text-gray-700 mt-1">
                      ₹{item.price} each
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                          className="p-1 hover:bg-gray-200 text-gray-700 transition rounded-l-lg cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                          className="p-1 hover:bg-gray-200 text-gray-700 transition rounded-r-lg cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Total for item */}
                  <div className="text-right">
                    <span className="font-bold text-sm text-gray-900">
                      ₹{item.price * quantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#ebdcc4] space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>20% Promotional Discount</span>
                  <span>-₹{discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-[#0d4f32]">₹{total}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full bg-[#ebb340] hover:bg-[#dfa732] active:scale-95 text-black font-bold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
