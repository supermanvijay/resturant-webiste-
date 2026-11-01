import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, Phone, Mail, User, Sparkles } from 'lucide-react';
import { Reservation } from '../types';
import { storageService } from '../services/storageService';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (res: Reservation) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:30');
  const [requests, setRequests] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !date || !time) {
      alert('Please fill all required reservation fields.');
      return;
    }

    const newRes = storageService.createReservation({
      customerName: name,
      phone,
      email,
      guests,
      date,
      time,
      specialRequests: requests || undefined,
    });

    setConfirmedReservation(newRes);
    onSuccess(newRes);
  };

  const handleDone = () => {
    setConfirmedReservation(null);
    onClose();
  };

  const timeSlots = [
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fcfbf9] text-gray-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#ebdcc4] my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#051810] text-white p-5 flex items-center justify-between border-b border-[#0f3627]">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ebb340]" />
              <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                {confirmedReservation ? 'Table Reserved!' : 'Book a Table at Royal Bites'}
              </h3>
            </div>
            <p className="text-xs text-[#b7c7be] mt-0.5">
              {confirmedReservation
                ? 'We look forward to hosting you in royal grandeur'
                : 'Experience fine dining, enchanting ambiance and memorable moments'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedReservation ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#ebb340] uppercase tracking-wider">
                Booking Confirmed
              </span>
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Reservation #{confirmedReservation.id}
              </h2>
              <p className="text-xs text-gray-600">
                A confirmation has also been recorded on our guest table registry.
              </p>
            </div>

            {/* Reservation Details Card */}
            <div className="bg-white rounded-xl p-4 border border-[#e5decb] text-left text-xs space-y-2.5">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Guest Name:</span>
                <span className="font-bold text-gray-900">{confirmedReservation.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Party Size:</span>
                <span className="font-bold text-gray-900">{confirmedReservation.guests} Guests</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Date & Time:</span>
                <span className="font-bold text-[#0d4f32]">
                  {confirmedReservation.date} at {confirmedReservation.time}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Phone:</span>
                <span className="font-semibold text-gray-900">{confirmedReservation.phone}</span>
              </div>
              {confirmedReservation.specialRequests && (
                <div className="pt-1 text-gray-600 italic">
                  Note: "{confirmedReservation.specialRequests}"
                </div>
              )}
            </div>

            <button
              onClick={handleDone}
              className="w-full bg-[#0d4f32] hover:bg-[#083823] text-white font-bold text-sm py-3 rounded-xl transition shadow-md cursor-pointer"
            >
              Great, See You Soon!
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Guest Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Email & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Number of Guests
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Reservation Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Preferred Time Slot *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Special Requests or Occasion (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Birthday anniversary celebration, quiet booth, high chair..."
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#ebb340] hover:bg-[#dfa732] active:scale-95 text-black font-bold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Table Reservation</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
