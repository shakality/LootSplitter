import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, MessageSquare, User } from 'lucide-react';

export const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact Us | LootSplitter 2026";
  }, []);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative">
      <div className="atmosphere"></div>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-8 tracking-tight">Get in <span className="italic font-serif font-normal text-indigo-600">Touch</span></h1>
          <p className="text-slate-500 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Have a suggestion or found a bug? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-16 text-center"
            >
              <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-indigo-500/20">
                <Send className="w-10 h-10 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Message Sent!</h2>
              <p className="text-slate-500 text-lg font-light">
                Thank you for reaching out. We'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-10 text-indigo-600 hover:text-indigo-500 font-bold uppercase tracking-widest text-xs transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card p-10 md:p-16 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <User className="w-3 h-3" /> Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    className="input-modern"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    className="input-modern"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" /> Message
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="How can we help you?"
                  className="input-modern resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  Send Message <Send className="w-4 h-4" />
                </span>
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

