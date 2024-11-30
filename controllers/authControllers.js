const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, profilePicture, bio, location, skills } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Utilisateur existant" });
        const user = new User({ name, email, password, role, profilePicture, bio, location, skills });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        await user.save();
        res.status(201).json({ message: "Utilisateur enregistré avec succès", token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

        // Générer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, user: { id: user._id, name: user.name, type: user.role } });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}
