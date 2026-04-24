import { useState } from 'react';
import { ShoppingCart, CheckCircle, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Domains = () => {
  const { addToCart, items } = useCart();
  const navigate = useNavigate();

  // Exemples statiques de domaines
  const exampleDomains = [
    { id: '1', name: 'exemple-startup.com', price: 14.99, tld: 'COM', isPremium: true },
    { id: '2', name: 'super-boutique.dz', price: 29.99, tld: 'DZ', isPremium: false },
    { id: '3', name: 'mon-portfolio.tech', price: 9.99, tld: 'TECH', isPremium: false },
  ];

  const handleAddToCart = (domainName: string, price: number) => {
    addToCart({ domain: domainName, price: price, years: 1 });
    navigate('/checkout');
  };

  const isDomainInCart = (domainName: string) => {
    return items.some(item => item.domain === domainName);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de la page */}
        <div className="text-center mb-16">
          <Globe className="mx-auto h-16 w-16 text-yellow-500 mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Nos Domaines en Évidence
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Découvrez nos exemples de domaines prêts à être enregistrés pour votre prochain projet.
          </p>
        </div>

        {/* Grille de domaines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exampleDomains.map((domain) => (
            <div key={domain.id} className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-yellow-400 transition-all duration-300 relative overflow-hidden">
              
              {domain.isPremium && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-xs uppercase tracking-wider py-1 px-4 rounded-bl-xl shadow-md">
                  Premium
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-yellow-600 transition-colors">
                    {domain.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-slate-100 text-slate-600 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200">
                      .{domain.tld}
                    </span>
                    <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                      <CheckCircle size={14} /> Disponible
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-end">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Prix annuel</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">{domain.price.toFixed(2)}</span>
                    <span className="text-lg font-bold text-slate-500">€</span>
                  </div>
                </div>

                {isDomainInCart(domain.name) ? (
                  <Link to="/checkout" className="bg-green-50 text-green-700 hover:bg-green-100 flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors">
                    <CheckCircle size={20} />
                    Au panier
                  </Link>
                ) : (
                  <button 
                    onClick={() => handleAddToCart(domain.name, domain.price)}
                    className="bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg shadow-slate-900/20 transition-transform active:scale-95"
                  >
                    <ShoppingCart size={20} className="text-yellow-500" />
                    Acheter
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Domains;
