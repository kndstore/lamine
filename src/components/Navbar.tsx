import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, User, ShoppingCart, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-slate-900 tracking-tight">DomainLamine</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Recherche</Link>
            <Link to="/domains" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Domaines</Link>
            <Link to="/contact" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Contact</Link>
            
            {/* Le lien Dashboard est masqué si l'utilisateur n'est pas connecté */}
            {isAuthenticated && (
              <Link to="/dashboard" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Tableau de bord</Link>
            )}

            {!isAuthenticated ? (
              <Link to="/login" className="text-slate-600 hover:text-primary-600 font-medium transition-colors flex items-center gap-1">
                <User size={18} /> Connexion
              </Link>
            ) : (
              <button 
                onClick={handleLogout} 
                className="text-slate-600 hover:text-red-600 font-medium transition-colors flex items-center gap-1"
              >
                <LogOut size={18} /> Déconnexion
              </button>
            )}

            <Link to="/checkout" className="text-slate-600 hover:text-primary-600 font-medium transition-colors flex items-center gap-1 relative">
              <ShoppingCart size={18} /> Panier
              {items.length > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-lg">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <Link to="/checkout" className="text-slate-600 hover:text-primary-600 relative">
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-md">
                  {items.length}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-slate-600 hover:text-primary-600 p-1"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-bold text-slate-700 hover:text-yellow-600 hover:bg-slate-50 transition-colors">Recherche</Link>
            <Link to="/domains" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-bold text-slate-700 hover:text-yellow-600 hover:bg-slate-50 transition-colors">Domaines</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-bold text-slate-700 hover:text-yellow-600 hover:bg-slate-50 transition-colors">Contact</Link>
            
            {isAuthenticated && (
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-bold text-slate-700 hover:text-yellow-600 hover:bg-slate-50 transition-colors">Tableau de bord</Link>
            )}

            {!isAuthenticated ? (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-bold text-slate-700 hover:text-yellow-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
                <User size={18} /> Connexion
              </Link>
            ) : (
              <button 
                onClick={handleLogout} 
                className="w-full text-left px-3 py-2 rounded-lg text-base font-bold text-slate-700 hover:text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <LogOut size={18} /> Déconnexion
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
