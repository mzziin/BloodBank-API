import User from '../models/user.js'

export const getAllUsers = async (req, res) => {
    try {
        const { page, limit, bloodGroup } = req.query;

        // Set default values for pagination
        const currentPage = parseInt(page) || 1;
        const resultsPerPage = parseInt(limit) || 10;
        const skip = (currentPage - 1) * resultsPerPage;

        const filter = bloodGroup ? { bloodGroup: bloodGroup } : {};

        const users = await User.find(filter)
            .skip(skip)
            .limit(resultsPerPage);

        // Count total users for pagination metadata
        const totalUsers = await User.countDocuments(filter);

        res.status(200).json({
            currentPage,
            resultsPerPage,
            totalUsers,
            totalPages: Math.ceil(totalUsers / resultsPerPage),
            data: users,
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user)
            return res.status(404).json({ message: "User not found" })
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

export const createUser = async (req, res) => {
    try {
        const { email } = req.body

        const isUserExist = await User.findOne({ email })
        if (isUserExist)
            return res.status(400).json({ message: "User already exists" })

        const user = await User.create(req.body);

        res.status(201).json({ message: "User created successfully", user })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const updates = req.body;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No update fields provided" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedUser)
            return res.status(404).json({ message: "User not found" })

        res.status(200).json({ message: "User updated successfully", updatedUser })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user)
            return res.status(404).json({ message: "User not found" })

        res.status(200).json({ message: "user deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}