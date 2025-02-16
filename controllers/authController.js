import  User  from '../models/user.js';
import  bcrypt  from 'bcryptjs';
import  jwt  from 'jsonwebtoken';

export async function signup(req, res) {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export async function login(req, res) {
  try {
    const { username, password } = req.body;
    console.log('Request Body:', req.body);  // Log request body

    const user = await User.findOne({ where: { username } });
    console.log('Found User:', user);  // Log user object

    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password Valid:', validPassword);  // Log password check result

    if (!validPassword) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
