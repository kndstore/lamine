import express from 'express';
import Domain from '../models/Domain.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Recherche vide' });
    
    // Vérifier si le domaine existe déjà dans la base
    const existing = await Domain.findOne({ name: q.toLowerCase() });
    
    if (existing) {
      res.json({ domain: q.toLowerCase(), available: false, price: existing.price });
    } else {
      res.json({ domain: q.toLowerCase(), available: true, price: 9.99 });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche', error });
  }
});

// GET all domains
router.get('/', async (req, res) => {
  try {
    const domains = await Domain.find().sort({ createdAt: -1 });
    res.json(domains);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// POST add a domain
router.post('/', async (req, res) => {
  try {
    const { name, status, price } = req.body;
    if (!name) return res.status(400).json({ message: 'Le nom du domaine est requis' });

    const existing = await Domain.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Ce domaine existe déjà dans votre base' });

    const domain = new Domain({
      name,
      status: status || 'Actif',
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // expire dans 1 an
      price: price || 9.99
    });

    await domain.save();
    res.status(201).json(domain);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du domaine', error });
  }
});

// DELETE a domain
router.delete('/:id', async (req, res) => {
  try {
    await Domain.findByIdAndDelete(req.params.id);
    res.json({ message: 'Domaine supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error });
  }
});

// RENEW a domain (adds 1 year)
router.put('/:id/renew', async (req, res) => {
  try {
    const domain = await Domain.findById(req.params.id);
    if (!domain) return res.status(404).json({ message: 'Domaine non trouvé' });

    // Ajoute 1 an à la date d'expiration actuelle
    const currentExpiry = new Date(domain.expiryDate);
    domain.expiryDate = new Date(currentExpiry.setFullYear(currentExpiry.getFullYear() + 1));
    domain.status = 'Actif'; // En cas d'expiration, il redevient actif
    
    await domain.save();
    res.json(domain);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du renouvellement', error });
  }
});

export default router;
