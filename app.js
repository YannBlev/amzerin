const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

/* -----------------------
1) Configuration EJS
----------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* -----------------------
2) Fichiers statiques
(CSS / JS / images)
----------------------- */
app.use(express.static(path.join(__dirname, 'public')));

/* -----------------------
3) Routes
----------------------- */
const indexRoutes = require('./routes/index.routes');
const gamesRoutes = require('./routes/games.routes');
app.use('/', indexRoutes);
app.use('/games', gamesRoutes);

/* -----------------------
4) 404 (page non trouvée)
----------------------- */
app.use((req, res) => {
    res.status(404).render('layout', {
        title: 'Page non trouvée',
        view: 'index'
    });
});

/* -----------------------
5) Démarrer le serveur
----------------------- */
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});