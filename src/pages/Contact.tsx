import { useState } from 'react';
import { Mail, Send, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi d'email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-10 w-10 text-yellow-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Une question sur une commande ? Besoin d'aide pour choisir un domaine ? 
            <br/>Envoyez-nous un email directement à : <strong>knd.ecom@gmail.com</strong>
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
          {/* Décoration de fond */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          
          {isSuccess ? (
            <div className="text-center py-16 animate-in fade-in zoom-in duration-300">
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={40} className="ml-2" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Message envoyé !</h2>
              <p className="text-lg text-slate-600">Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <User size={16} className="text-slate-400" /> Votre nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all font-medium text-slate-900"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Mail size={16} className="text-slate-400" /> Votre email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all font-medium text-slate-900"
                    placeholder="jean@exemple.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  Sujet de votre demande
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all font-medium text-slate-900"
                >
                  <option value="" disabled>Sélectionnez un sujet</option>
                  <option value="commande">Question sur une commande</option>
                  <option value="support">Support technique</option>
                  <option value="facturation">Facturation</option>
                  <option value="autre">Autre demande</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <MessageSquare size={16} className="text-slate-400" /> Votre message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all font-medium text-slate-900 resize-none"
                  placeholder="Comment pouvons-nous vous aider ?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 font-extrabold text-lg py-4 rounded-xl shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  <>
                    Envoyer le message <Send size={20} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
