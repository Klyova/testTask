import config from '../config/config.json' assert { type: 'json' };

export const userCtrl = function (req, res) {
    res.render('user', { data: config })
};