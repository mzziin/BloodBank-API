import User from "../models/user"

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user)
            return res.status(404).json({ message: "User not found" })
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

const createUser = async (req, res) => {
    try {
        const { email } = req.body

        const isUserExist = await User.findOne({ email })
        if (isUserExist)
            return res.status(400).json({ message: "User already exists" })

        const user = await User.create(req.body)

        res.status(201).json({ message: "User created successfully", user })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

const updateUser = async (req, res) => {
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

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user)
            return res.status(404).json({ message: "User not found" })

        res.status(200).json({ message: "user deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}