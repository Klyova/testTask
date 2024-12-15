import fs from 'fs';

const USERS_FILE = './users.json';

export const loadUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf-8');

        const users = JSON.parse(data);
        if (!Array.isArray(users)) {
            throw new Error('Невірний формат даних у файлі');
        }
        return users;
    } catch (err) {
        console.error("Помилка при завантаженні користувачів:", err);
        return [];
    }
};

export const saveUsers = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error("Помилка при збереженні користувачів:", err);
    }
};
