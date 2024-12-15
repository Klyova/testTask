import config from '../config/config.json' assert { type: 'json' };

export const contactCtrl = function (req, res) {

    res.render('contact', { data: config })
};
