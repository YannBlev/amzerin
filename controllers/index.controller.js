exports.home = (req, res) => {
    res.render('layout', {
        title: 'Accueil',
        view: 'index'
    });
};