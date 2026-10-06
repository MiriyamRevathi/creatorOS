import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white">
      <Navbar />
      <div className="py-16 md:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="text-center mb-12">
          <Badge variant="purple" className="mb-3">Get in Touch</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight">Contact CreatorOS Team</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base">
            Have questions about CreatorOS or need support with your account? Reach out to us.
          </p>
        </div>

        <Card className="p-8">
          {submitted ? (
            <div className="text-center py-8">
              <Badge variant="success" className="mb-4">Message Sent!</Badge>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Thank you for reaching out.</h3>
              <p className="text-xs text-slate-500 mt-2">Our team will get back to you within 24 hours.</p>
              <Button variant="outline" size="sm" className="mt-6" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full Name"
                placeholder="Jane Doe"
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="jane@creator.com"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <Input
                label="Subject"
                placeholder="Question about CreatorOS"
                required
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
              />
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Message</label>
                <textarea
                  rows="4"
                  required
                  className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-brand-purple"
                  placeholder="How can we help your creator journey?"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <Button type="submit" variant="primary" className="w-full">
                Send Message
              </Button>
            </form>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
};
