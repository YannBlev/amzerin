exports.home = (req, res) => {
    res.render('layout', {
        title: 'About',
        view: 'about'
    });
};