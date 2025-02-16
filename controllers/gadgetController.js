import Gadget from '../models/Gadget.js';
import { v4 as uuidv4 } from 'uuid';

// Utility function for generating random mission success probability
const generateSuccessProbability = () => `${Math.floor(Math.random() * 100) + 1}% success probability`;

// Utility for random codename
const generateCodename = () => {
  const codenames = ['Nightingale', 'Kraken', 'Phantom', 'Specter', 'Viper'];
  return codenames[Math.floor(Math.random() * codenames.length)];
};

// GET all gadgets with mission success probability
export async function getAllGadgets(req, res) {
  try {
    const { status } = req.query;
    const gadgets = status
      ? await Gadget.findAll({ where: { status } })
      : await Gadget.findAll();

    const gadgetsWithProbability = gadgets.map(gadget => ({
      ...gadget.toJSON(),
      missionSuccessProbability: `${Math.floor(Math.random() * 100) + 1}% success probability`
    }));

    res.status(200).json(gadgetsWithProbability);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// POST new gadget
export async function addGadget(req, res) {
  try {
    const { status } = req.body;
    const newGadget = await Gadget.create({ id: uuidv4(), name: generateCodename(), status });
    res.status(201).json(newGadget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// PATCH update gadget
export async function updateGadget(req, res) {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ message: 'Gadget not found' });

    gadget.name = name || gadget.name;
    gadget.status = status || gadget.status;
    await gadget.save();

    res.status(200).json(gadget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// DELETE gadget (decommission)
export async function deleteGadget(req, res) {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ message: 'Gadget not found' });

    gadget.status = 'Decommissioned';
    gadget.decommissionedAt = new Date();
    await gadget.save();

    res.status(200).json({ message: 'Gadget decommissioned', gadget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// POST self-destruct
export async function selfDestruct(req, res) {
  try {
    const { id } = req.params;
    const confirmationCode = uuidv4();
    res.status(200).json({ message: `Self-destruct sequence initiated. Confirmation code: ${confirmationCode}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
