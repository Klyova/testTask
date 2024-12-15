import config from '../config/config.json' assert { type: 'json' };

export const homeCtrl = function (req, res) {

    res.render('index', { data: config })
};
