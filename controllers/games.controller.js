const games = require('../data/games');
exports.list = (req, res) => {
        res.render('layout', {
        title: 'Liste des jeux',
        view: 'games/index',
        games
    });
};

exports.show = (req, res) => {
    const game = games.find(g => g.slug === req.params.slug);
    if (!game) {
        return res.status(404).render('layout', {
            title: 'Jeu non trouvé',
            view: 'index'
        });
    }
    const view = game.slug === 'morpion' ? 'games/morpion' : 'games/game';
    res.render('layout', {
        title: game.name,
        view,
        game
    });
};