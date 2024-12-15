import jwt from "jsonwebtoken";
const SECRET_KEY = 'my_secret_key';
import {loadUsers, saveUsers} from "../modules/userService.js";

const validateRequestBody = (body) => {
    const { email, password, confirmpass } = body;
    const errors = {}; // об'єкт для помилок

    if (!email) errors.email = "Email є обов’язковим!";
    if (!password) errors.password = "Пароль є обов’язковим!";
    if (!confirmpass) errors.confirmpass = "Підтвердження пароля є обов’язковим!";
    if (password && confirmpass && password !== confirmpass) errors.confirmpass = "Паролі не збігаються!";

    if (Object.keys(errors).length > 0) {
        return { valid: false, errors };
    }

    return { valid: true };
};

export const formCtrl = (req, res) => {
    const validation = validateRequestBody(req.body);

    if (!validation.valid) {
        return res.status(400).json({
            success: false,
            errors: validation.errors,
        });
    }

    const { email, password, confirmpass } = req.body;

    const users = loadUsers();
    if (users.some(user => user.email === email)) {
        return res.status(400).json({
            success: false,
            message: "Користувач з таким email вже зареєстрований!",
        });
    }

    const newUser = { email, password };
    users.push(newUser);
    saveUsers(users);

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
        success: true,
        message: "Дані отримано успішно!",
        data: { email },
        token
    });
};
