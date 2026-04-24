import { Globe2, ShoppingCart, CheckCircle, Shield, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const exampleDomains = [
  { id: '1', name: 'startup-algerie.dz', price: 25.00, tld: 'DZ', isPremium: true, desc: 'Idéal pour une nouvelle entreprise en Algérie' },
  { id: '2', name: 'boutique-pro.com', price: 12.99, tld: 'COM', isPremium: false, desc: 'L\'extension internationale indispensable' },
  { id: '3', name: 'mon-portfolio.tech', price: 5.99, tld: 'TECH', isPremium: false, desc: 'Parfait pour les profils techniques et innovants' },
  { id: '4', name: 'tech-alger.dz', price: 30.00, tld: 'DZ', isPremium: true, desc: 'Très recherché pour le secteur technologique' },
  { id: '5', name: 'agence-digitale.net', price: 15.00, tld: 'NET', isPremium: false, desc: 'Classique et professionnel' },
  { id: '6', name: 'mon-asso.org', price: 10.50, tld: 'ORG', isPremium: false, desc: 'Le choix privilégié des organisations' },
];

const Home = () => {
  const { addToCart, items } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (domainName: string, price: number) => {
    addToCart({ domain: domainName, price: price, years: 1 });
    navigate('/checkout');
  };

  const isDomainInCart = (domainName: string) => {
    return items.some(item => item.domain === domainName);
  };

  return (
    <div className="w-full flex-grow flex flex-col">
      {/* Hero Section */}
      <section className="bg-slate-900 border-b border-yellow-500/20 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
          <Globe2 className="h-20 w-20 text-yellow-500 mb-6 drop-shadow-md" />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Trouvez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Nom de Domaine</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Découvrez nos exemples de domaines disponibles. Commandez facilement par email, réponse rapide garantie !
          </p>
        </div>
      </section>

      {/* Liste des domaines d'exemple */}
      <section className="py-20 bg-slate-50 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Domaines Disponibles</h2>
            <p className="mt-4 text-slate-600">Explorez nos offres exclusives et trouvez celle qui vous correspond.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exampleDomains.map((domain) => (
              <div key={domain.id} className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-yellow-400 transition-all duration-300 relative overflow-hidden flex flex-col">
                
                {domain.isPremium && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-white font-bold text-xs uppercase tracking-wider py-1 px-4 rounded-bl-xl shadow-md">
                    Premium
                  </div>
                )}

                <div className="flex-grow mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-yellow-600 transition-colors mb-2">
                    {domain.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-1 rounded border border-slate-200">
                      .{domain.tld}
                    </span>
                    <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                      <CheckCircle size={14} /> Dispo
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm">{domain.desc}</p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-between items-end mt-auto">
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">Prix annuel</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">{domain.price.toFixed(2)}</span>
                      <span className="text-lg font-bold text-slate-500">€</span>
                    </div>
                  </div>

                  {isDomainInCart(domain.name) ? (
                    <Link to="/checkout" className="bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-colors">
                      <CheckCircle size={18} className="text-green-600" /> Panier
                    </Link>
                  ) : (
                    <button 
                      onClick={() => handleAddToCart(domain.name, domain.price)}
                      className="bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 px-5 py-3 rounded-xl font-bold shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
                    >
                      <ShoppingCart size={18} className="text-yellow-500" /> Ajouter
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Footer section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-4xl mx-auto">
            <div className="p-6">
              <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Processus Rapide</h3>
              <p className="text-slate-600">Choisissez votre domaine et commandez instantanément par simple email.</p>
            </div>
            <div className="p-6">
              <Shield className="h-12 w-12 text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Paiement Manuel Sécurisé</h3>
              <p className="text-slate-600">Nous vous contactons directement pour les modalités de paiement qui vous conviennent le mieux.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
