import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { storageService } from '../services/storageService';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill in required fields: Name, Email and Message.');
      return;
    }

    storageService.addMessage({
      name,
      email,
      phone: phone || undefined,
      subject: subject || 'General Dining Inquiry',
      message,
    });

    setSent(true);
    onShowToast('✨ Your message has been sent to Royal Bites Hospitality team!');
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2500);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Hello Royal Bites! I would like to make an inquiry.');
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#faf8f3] text-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#ebdcc4] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#051810] text-white p-5 flex items-center justify-between border-b border-[#0f3627]">
          <div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-white">
              Contact Royal Bites Restaurant
            </h2>
            <p className="text-xs text-[#b7c7be] mt-0.5">
              We are delighted to assist with dining inquiries, catering, and private banquets.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Info & Map (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0d4f32]/10 text-[#0d4f32] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Our Location</h4>
                  <p className="text-gray-600 mt-0.5">123 Food Street, Jubilee Hills, Hyderabad, TS 500033</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0d4f32]/10 text-[#0d4f32] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Phone Line</h4>
                  <a href="tel:+919876543210" className="text-gray-600 hover:text-[#0d4f32]">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0d4f32]/10 text-[#0d4f32] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Direct Email</h4>
                  <a href="mailto:info@royalbites.in" className="text-gray-600 hover:text-[#0d4f32]">
                    info@royalbites.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0d4f32]/10 text-[#0d4f32] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Opening Hours</h4>
                  <p className="text-gray-600">Monday - Sunday: 11:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Connect */}
            <div className="pt-1">
              <button
                onClick={openWhatsApp}
                className="w-full bg-[#25d366] hover:bg-[#20ba5a] active:scale-95 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp Directly</span>
              </button>
            </div>

            {/* Google Maps Visual Preview */}
            <div className="rounded-xl overflow-hidden border border-[#ebdcc4] shadow-xs relative">
              <iframe
                title="Royal Bites Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60907.57560867018!2d78.3846!3d17.4334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="140"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Message Form (7 cols) */}
          <div className="md:col-span-7 bg-white p-5 rounded-xl border border-[#ebdcc4] shadow-xs">
            {sent ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-lg text-gray-900">Message Received!</h4>
                <p className="text-xs text-gray-600">
                  Our front desk executive will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="font-serif font-bold text-base text-gray-900">
                  Send Us a Note
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Roy"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ananya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Banquet booking / Feedback"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us how we can make your dining experience memorable..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-[#ebb340] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0d4f32] hover:bg-[#083823] active:scale-95 text-white font-bold text-xs py-2.5 rounded-lg transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
