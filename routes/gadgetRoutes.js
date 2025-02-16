import { Router } from 'express';
const router = Router();
import { getAllGadgets, addGadget, updateGadget, deleteGadget, selfDestruct } from '../controllers/gadgetController.js';
import authenticateToken from '../middleware/authMiddleware.js';

router.get('/gadgets', authenticateToken, getAllGadgets);
router.post('/gadgets', authenticateToken, addGadget);
router.patch('/gadgets/:id', authenticateToken, updateGadget);
router.delete('/gadgets/:id', authenticateToken, deleteGadget);
router.post('/gadgets/:id/self-destruct', authenticateToken, selfDestruct);

export default router;
