exports.home = (req, res) => {
    res.render('layout', {
        title: 'Contact',
        view: 'contact'
    });
};