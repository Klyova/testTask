import express from 'express';
const router = express.Router();
import { userCtrl } from './user.js';
import { homeCtrl } from './home.js';
import { contactCtrl } from "./contact.js";
import { formCtrl } from "./form.js";
import { checkEmailCtrl} from "./check-email.js";

router.get('/', homeCtrl);
router.get('/user', userCtrl);
router.get('/contact', contactCtrl);
router.post('/form', formCtrl);
router.post('/check-email', checkEmailCtrl);

export default router;