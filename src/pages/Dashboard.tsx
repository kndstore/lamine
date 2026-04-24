import { useState, useEffect } from 'react';
import { Settings, Globe, CreditCard, Plus, Loader, X, Server, Shield, Trash2, CalendarClock } from 'lucide-react';
import axios from 'axios';

interface Domain {
  _id: string;
  name: string;
  status: string;
  expiryDate: string;
  price: number;
}

const Dashboard = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDomain, setNewDomain] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  // Gérer la modale
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/domains');
      setDomains(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des domaines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain.trim()) return;
    
    setIsAdding(true);
    try {
      await axios.post('http://localhost:5000/api/domains', {
        name: newDomain.toLowerCase()
      });
      setNewDomain('');
      fetchDomains();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erreur lors de l\'ajout du domaine');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRenew = async (id: string, name: string) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir renouveler ${name} pour 1 an supplémentaire (9.99€) ?`)) return;
    
    setIsActionLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/domains/${id}/renew`);
      alert(`🎉 Félicitations ! Le domaine ${name} a bien été renouvelé pour 1 an.`);
      fetchDomains(); // Recharger la liste pour voir la nouvelle date
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erreur lors du renouvellement');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir désactiver/supprimer ce domaine définitivement ? Cette action est irréversible.")) return;
    
    setIsActionLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/domains/${id}`);
      setSelectedDomain(null);
      fetchDomains();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erreur lors de la suppression');
    } finally {
      setIsActionLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Tableau de Bord</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
              <Globe size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Domaines actifs</p>
              <h3 className="text-2xl font-bold text-slate-900">{domains.filter(d => d.status === 'Actif').length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Factures à payer</p>
              <h3 className="text-2xl font-bold text-slate-900">0</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center">
              <Settings size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Paramètres</p>
              <h3 className="text-2xl font-bold text-slate-900">À jour</h3>
            </div>
          </div>
        </div>

        {/* Section ajout rapide */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="text-primary-600" size={20} /> Nouveau Domaine
          </h3>
          <form onSubmit={handleAddDomain} className="flex gap-4 items-end max-w-xl">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="ex: mondomaine.com"
                className="input-field shadow-sm bg-slate-50 border-slate-200"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isAdding}
              className="btn-primary flex items-center gap-2 h-[42px] whitespace-nowrap disabled:opacity-50"
            >
              {isAdding ? <Loader className="animate-spin" size={18} /> : <span>Valider</span>}
            </button>
          </form>
        </div>

        {/* Liste des domaines */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900">Mes Domaines</h3>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-slate-500 flex justify-center items-center gap-2">
                <Loader className="animate-spin" /> Chargement...
              </div>
            ) : domains.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                Vous ne possédez aucun domaine pour le moment.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-white">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Nom de domaine
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Date d'expiration
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {domains.map((domain) => (
                    <tr key={domain._id} className="hover:bg-primary-50/30 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <Globe className="text-slate-400 group-hover:text-primary-500 transition-colors" size={18} />
                          {domain.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-md border ${
                          domain.status === 'Actif' ? 'bg-green-50 text-green-700 border-green-200' : 
                          domain.status === 'En attente' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                          'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {domain.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                        {formatDate(domain.expiryDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => setSelectedDomain(domain)}
                          className="text-slate-600 hover:text-primary-600 bg-slate-100 hover:bg-primary-50 px-3 py-1.5 rounded-lg mr-3 transition-colors"
                        >
                          Gérer
                        </button>
                        <button 
                          onClick={() => handleRenew(domain._id, domain.name)}
                          disabled={isActionLoading}
                          className="text-white bg-slate-900 hover:bg-slate-800 px-4 py-1.5 rounded-lg shadow-sm transition-all disabled:opacity-50"
                        >
                          Renouveler
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal / Panel "Gérer" */}
      {selectedDomain && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Settings className="text-primary-600" /> Gestion DNS : {selectedDomain.name}
              </h3>
              <button onClick={() => setSelectedDomain(null)} className="text-slate-400 hover:text-slate-700 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                <Shield className="text-blue-600 mt-0.5" size={20} />
                <p className="text-sm text-blue-800 font-medium">Votre domaine est protégé par la sécurité Whois Privacy. Les DNS actuels pointent vers nos serveurs par défaut.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4 cursor-pointer hover:border-primary-400 hover:shadow-md transition-all">
                  <Server className="text-slate-400 mb-2" size={24} />
                  <h4 className="font-bold text-slate-900 text-sm">Zone DNS</h4>
                  <p className="text-xs text-slate-500 mt-1">Configurer les entrées A, CNAME, TXT...</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 cursor-pointer hover:border-primary-400 hover:shadow-md transition-all">
                  <CalendarClock className="text-slate-400 mb-2" size={24} />
                  <h4 className="font-bold text-slate-900 text-sm">Transfert Sortant</h4>
                  <p className="text-xs text-slate-500 mt-1">Obtenir le code Auth/EPP</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button 
                  onClick={() => handleDelete(selectedDomain._id)}
                  disabled={isActionLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-red-600 font-bold hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={18} />
                  Désactiver et Supprimer le domaine
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
