import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@nova.shop' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
    { icon: MapPin, label: 'Address', value: 'NOVA HQ, Bandra Kurla Complex, Mumbai 400051' },
    { icon: Clock, label: 'Hours', value: 'Mon – Sat, 10am – 7pm IST' },
  ];

  return (
    <div className="container-app py-12 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="label-xs mb-2">Get in Touch</p>
          <h1 className="font-display text-4xl font-medium sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-base text-ink-500">
            Questions, feedback, or just want to say hello? We would love to hear from you.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Info */}
          <div className="space-y-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-cream-200">
                    <Icon size={20} strokeWidth={1.5} className="text-ink-700" />
                  </div>
                  <div>
                    <p className="label-xs mb-1">{info.label}</p>
                    <p className="text-sm text-ink-700">{info.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="border border-ink-200 bg-cream-50 p-6">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-50">
                  <Check size={32} strokeWidth={2} className="text-success-600" />
                </div>
                <p className="font-display text-xl font-medium">Message Sent</p>
                <p className="mt-2 text-sm text-ink-400">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label-xs mb-1.5 block">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="label-xs mb-1.5 block">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="label-xs mb-1.5 block">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="label-xs mb-1.5 block">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
