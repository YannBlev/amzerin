const games = require('../data/games');

/**
 * Liste des jeux
 */
exports.list = (req, res) => {
    res.render('layout', {
        title: 'Liste des jeux',
        view: 'games/index',
        games
    });
};

/**
 * Affichage d'un jeu
 */
exports.show = (req, res) => {
    const { slug } = req.params;

    // Recherche du jeu
    const game = games.find(g => g.slug === slug);

    // Jeu introuvable
    if (!game) {
        return res.status(404).render('layout', {
            title: 'Jeu non trouvé',
            view: 'index'
        });
    }

    // 🔽 ICI : mapping slug → vue
    const viewsBySlug = {
        morpion: 'games/morpion',
        blackjack: 'games/blackjack'
    };

    // Vue à utiliser
    const view = viewsBySlug[slug] || 'games/game';

    // Rendu final
    res.render('layout', {
        title: game.name,
        view,
        game
    });
};
