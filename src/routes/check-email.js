import {loadUsers} from "../modules/userService.js";

export const checkEmailCtrl = async (req, res) => {
    const { email } = req.body;

    const users = loadUsers();

    const userExists = users.some(user => user.email === email);

    if (userExists) {
        return res.status(400).json({ error: 'Користувач з таким email вже існує!' });
    } else {
        return res.status(200).json({ success: true });
    }
};