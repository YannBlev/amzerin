$(function() {

    let srcImgCross = "/img/croix.png";
    let srcImgRound = "/img/rond.png";

    let btnRelaod = $( "<button/>",
        {
            html: 'Replay',
            id: 'btnReload'
        }
    );

    
    let round = 0;
    let trs = $('tr');
    let baliseJoueur = $('joueur');
    let imgs = $('img');
    let players = [
        ["1", srcImgCross, false, 'croix'],
        ["2", srcImgRound, false, 'rond']
    ];
    
    // players[ ][0]
    //         ^  0 => number for the player one
    //            1 => number for the player two

    // players[0][ ]
    //            ^  0 => number       of the player one
    //               1 => src image   for the player one
    //               2 => win or not  for the player one
    //               3 => alt image   for the player one

    $(imgs).on("click", play)

    function play() {
        if ($(this).attr('src') === undefined) {
            setImg(this);
            checkWin();
            if (!players[round%2][2]) {
                setRoundPlayer();
                checkDraw();
            }
            console.log(players[round%2][2]);
        }
    }

    function setImg(img){
        $(img).attr('src',players[round%2][1]);
        $(img).attr('alt',players[round%2][3]);
    }

    function setRoundPlayer() {
        round++;
        baliseJoueur.text(players[round%2][0]);
    }

    /* ****************************
    * FUNCTIONS FOR VERIFICATIONS *
    * *****************************/

    function checkDraw() {
        if (round === 9 ) {
            $('h3').text('Draw');
            $(imgs).off("click");
            $('h3').after(btnRelaod);
            $('#btnReload').on('click', function() {
                location.reload();
            });
        }
    }

    function checkWin() {
        checkRow();
        checkColumn();
        checkDiagonals();
        if (players[round%2][2]) {
            $('h3').text('Player ' + players[round%2][0] + ' wins !');
            $(imgs).off("click");
            $('h3').after(btnRelaod);
            $('#btnReload').on('click', function() {
                location.reload();
            });
        }
    }

    function checkRow() {
        $(trs).each(function() {
            let srcValues = [];
            
            $(this).find('img').each(function() {
                srcValues.push($(this).attr('src'));
            });
            if (srcValues.every(checkImg)) players[round%2][2] = true;
        });
    }

    function checkColumn() {
        for (let index = 0; index < 3; index++) {
            let srcValues = [];

            $(trs).each(function() {
                srcValues.push($(this).find('td').eq(index).find('img').attr('src'));
            });
            if (srcValues.every(checkImg)) players[round%2][2] = true
        }
    }

    function checkDiagonals() {
        // Diagonal \
        let diagonal1 = [];
        $(trs).each(function(index) {
            diagonal1.push($(this).find('td').eq(index).find('img').attr('src'));
        });
        if (diagonal1.every(checkImg)) players[round%2][2] = true;

        // Diagonal /
        let diagonal2 = [];
        $(trs).each(function(index) {
            diagonal2.push($(this).find('td').eq(2 - index).find('img').attr('src'));
        });
        if (diagonal2.every(checkImg)) players[round%2][2] = true;
    }

    function checkImg(img){
        return img === players[round%2][1];
    }

});