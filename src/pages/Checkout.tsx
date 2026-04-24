import { useCart } from '../context/CartContext';
import { Mail, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { items, removeFromCart, total } = useCart();

  const email = "knd.ecom@gmail.com";
  
  // Formatage du corps de l'email pour la commande
  const orderDetailsText = items.map(item => `- ${item.domain} : ${item.price.toFixed(2)} €`).join('\n');
  const mailSubject = "Nouvelle Commande de Domaines";
  const mailBody = `Bonjour,\n\nJe souhaite procéder à la commande des domaines suivants :\n\n${orderDetailsText}\n\nTotal estimé : ${total.toFixed(2)} €\n\nMerci de m'indiquer comment procéder pour le paiement.\n\nCordialement,`;

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="text-yellow-600 h-8 w-8" />
          <h1 className="text-3xl font-extrabold text-slate-900">Votre Panier</h1>
        </div>
        
        {items.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 shadow-sm">
            <ShoppingCart className="mx-auto h-16 w-16 text-slate-300 mb-4" />
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Votre panier est vide</h2>
            <p className="text-slate-500 mb-8">Vous n'avez pas encore sélectionné de domaine.</p>
            <Link to="/" className="inline-flex bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
              Retour à l'accueil
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Liste des articles */}
            <div className="lg:col-span-3 space-y-4">
              {items.map((item) => (
                <div key={item.domain} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center group">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{item.domain}</h3>
                    <p className="text-sm text-slate-500 mt-1">Enregistrement pour {item.years} an(s)</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xl font-black text-slate-900">{item.price.toFixed(2)} €</span>
                    <button 
                      onClick={() => removeFromCart(item.domain)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                      title="Retirer du panier"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Résumé de commande & Email action */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-24">
                <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Résumé</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Sous-total</span>
                    <span className="font-semibold text-slate-900">{total.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Taxes</span>
                    <span className="font-semibold text-slate-900">0.00 €</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xl font-black text-slate-900">
                    <span>Total</span>
                    <span className="text-yellow-600">{total.toFixed(2)} €</span>
                  </div>
                </div>

                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl mb-6 text-sm flex items-start gap-3">
                  <Mail className="shrink-0 mt-0.5 text-blue-600" size={18} />
                  <p>
                    Pour valider votre commande, veuillez nous envoyer un email à l'adresse <strong>{email}</strong> avec les détails de votre panier.
                  </p>
                </div>

                <a 
                  href={mailtoLink}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 text-lg font-bold py-4 px-4 rounded-xl shadow-lg shadow-yellow-500/30 transition-transform active:scale-95"
                >
                  <Mail size={20} />
                  Commander par Email
                </a>

                <p className="mt-4 text-center text-xs text-slate-500">
                  En cliquant, votre application de messagerie s'ouvrira avec un email pré-rempli.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
