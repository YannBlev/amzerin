function nouvellePartie() {
	location.reload();
}

//fonction pour initialiser des joueurs
function activerJoueur(j) {
	if (joueur [j]!=true&&distribuer) {
		continu [j] = true;
		valeurCartesJoueur [j] = document.getElementById('valeur_cartes_joueur_'+j);
		cashJoueur [j] = document.getElementById('cash_joueur_'+j);
		miseJoueur [j] = document.getElementById('mise_joueur_'+j);
		annonceJoueur [j] = document.getElementById('annonce_joueur_'+j);
		cartesJoueur [j] = document.getElementById('cartes_joueur_'+j);
		hitJoueur [j] = document.getElementById('hit_joueur_'+j);
		doubleDownJoueur [j] = document.getElementById('doubleDown_joueur_'+j);
		
		cash [j] = cashDprt;
		montantMiseJoueur [j] = miseDepart;
		
		valeurCartesJoueur [j].innerHTML = "";
		cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
		miseJoueur [j].innerHTML = "<div style='display: flex;'><button type='button' onclick='dimMise("+j+");'>-</button>" + montantMiseJoueur [j] + "<button type='button' onclick='augmMise("+j+");'>+</button></div>";
		hitJoueur [j].innerHTML = "";
		doubleDownJoueur [j].innerHTML = "";
		annonceJoueur [j].innerHTML = "";
		joueur [j] = true;
		}
	}

function carteRandom() {
	i = Math.ceil(Math.random() * nbCarte);
	while (carteDeck [i]!==undefined) {
		i = Math.ceil(Math.random() * nbCarte);
		nbCarte--;
		if (nbCarte == 0) {
			alert("Il n'y a plus de carte !");
			location.reload();
			return false;
		}
	}
	carteDeck [i]='check';
	return i;
}

function dimMise (j) {
	if (montantMiseJoueur [j]> palierMise) {
		cash [j] += palierMise;
		cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
		montantMiseJoueur [j] -= palierMise;
		miseJoueur [j].innerHTML = "<div style='display: flex;'><button type='button' onclick='dimMise("+j+");'>-</button>" + montantMiseJoueur [j] + "<button type='button' onclick='augmMise("+j+");'>+</button></div>";
		}
}

function augmMise (j) {
	if (cash [j]>0) {
		cash [j] -= palierMise;
		cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
		montantMiseJoueur [j] += palierMise;
		miseJoueur [j].innerHTML = "<div style='display: flex;'><button type='button' onclick='dimMise("+j+");'>-</button>" + montantMiseJoueur [j] + "<button type='button' onclick='augmMise("+j+");'>+</button></div>";
	}
}

function valCarte (nameCarte) {
		valeurCarte = nameCarte%13;
		if (valeurCarte==11||valeurCarte==12||valeurCarte==0) {valeurCarte = 10;}
		return valeurCarte;
}

function nvCarte () {


	
	if (distribuer&&(joueur[1]||joueur[2]||joueur[3]||joueur[4])) {
		premiere_carteRandomBanque = carteRandom();
		valeur_premiereCarteBanque = valCarte (premiere_carteRandomBanque);
		
		if (valeur_premiereCarteBanque==1) {
			valeur_premiereCarteBanque = 11;
			asBanque++;
			}

		deuxieme_carteRandomBanque = carteRandom();
		valeur_deuxiemeCarteBanque = valCarte (deuxieme_carteRandomBanque);

		if (valeur_premiereCarteBanque<11&&valeur_deuxiemeCarteBanque==1) {
			valeur_deuxiemeCarteBanque = 11;
			asBanque++;
			}

		valeurCarteBanque = valeur_premiereCarteBanque + valeur_deuxiemeCarteBanque;
		cartesBanque.innerHTML = "<img class='cardBJ' src='../img/"+premiere_carteRandomBanque+".png' alt='carte de la banque' /><div style='width: 10px;' ></div><img class='verso_2 cardBJ' onClick='reste();'src='../img/verso.png' alt='carte du joueur' />";
		scoreBanque.innerHTML = valeur_premiereCarteBanque;
		if (valeurCarteBanque==21) {blackjackBanque=true;}

		for (j=1;j<=nbJoueur;j++) {
			if (joueur[j]) {
				gagne [j] = true;
				blackjack [j] = false;
				push [j] = false;
				asJoueur [j]=0;
				premiere_carteRandomJoueur [j] = carteRandom();
				valeur_premiereCarteJoueur [j] = valCarte(premiere_carteRandomJoueur [j]);
				if (valeur_premiereCarteJoueur [j]==1) {
					valeur_premiereCarteJoueur [j] = 11;
					asJoueur [j]++;
				}

				deuxieme_carteRandomJoueur [j] = carteRandom();
				valeur_deuxiemeCarteJoueur [j] = valCarte(deuxieme_carteRandomJoueur [j]);

				if (valeur_deuxiemeCarteJoueur [j]==1) {
					asJoueur [j]++;
					if (valeur_premiereCarteJoueur [j]<11) {
						valeur_deuxiemeCarteJoueur [j] = 11;
					}
					else  {
						valeur_deuxiemeCarteJoueur [j] = 1;
						asJoueur [j]--;
					}
				}
				miseJoueur [j].innerHTML = montantMiseJoueur [j];
				hitJoueur [j].innerHTML = "<button type='button' onClick='hit("+j+");'>Hit</button>";
				doubleDownJoueur [j].innerHTML = "<button type='button' onClick='doubleDown("+j+");'>Double Down</button>";
				cartesJoueur [j].innerHTML = "<div style='position:relative;width:25px;'><img class='recto cardBJ' src='../img/"+premiere_carteRandomJoueur [j]+".png'></div><div style='position:relative;width:25px;'><img class='recto_2 cardBJ' src='../img/"+deuxieme_carteRandomJoueur [j]+".png'></div>";
				scoreJoueur [j] = valeur_premiereCarteJoueur [j] + valeur_deuxiemeCarteJoueur [j];
				valeurCartesJoueur [j].innerHTML = scoreJoueur [j];
				if (scoreJoueur [j]==21) {
					blackjack [j] = true;
					hitJoueur [j].innerHTML = "";
					doubleDownJoueur [j].innerHTML = "";
					annonceJoueur [j].innerHTML = "<b>blackjack</b>";
				}
			}
		}
	distribuer=false;
	}
	
	if (ramasser) {
		scoreBanque.innerHTML = "";
		for (j=1;j<=nbJoueur;j++) {
			if (joueur[j]) {
				if (cash [j]>0) {
					cash [j] -= miseDepart;
					cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
					miseJoueur [j].innerHTML = "<div style='display: flex;'><button type='button' onclick='dimMise("+j+");'>-</button>" + montantMiseJoueur [j] + "<button type='button' onclick='augmMise("+j+");'>+</button></div>";
					hitJoueur [j].innerHTML = "";
					doubleDownJoueur [j].innerHTML = "";
					annonceJoueur [j].innerHTML = "";
					cartesBanque.innerHTML = "";
					cartesJoueur [j].innerHTML = "";
					valeurCartesJoueur [j].innerHTML = "";
				}
				else {
					miseJoueur [j].innerHTML = "";
					hitJoueur [j].innerHTML = "";
					doubleDownJoueur [j].innerHTML = "";
					annonceJoueur [j].innerHTML = "";
					cartesBanque.innerHTML = "";
					cartesJoueur [j].innerHTML = "";
					valeurCartesJoueur [j].innerHTML = "<a class='underBlink' id='valeur_cartes_joueur_" + j + "' onClick='activerJoueur(" + j + ");'>New player</a>";
					cashJoueur [j].innerHTML = "";
					joueur [j] = false;
				}
			}
		}
	ramasser=false;
	distribuer=true;
	}
	
}

function hit(j) {
	doubleDownJoueur [j].innerHTML = "";
	if (gagne [j]) {
		carteHit = carteRandom();
		valeurCarteHit = valCarte (carteHit);
		if ((valeurCarteHit==1)&&(scoreJoueur [j]<11)) {
			valeurCarteHit = 11;
			asJoueur [j]++;
			}
		scoreJoueur [j]+= valeurCarteHit;
		if (scoreJoueur [j]>21&&asJoueur [j]>0){
			scoreJoueur [j] = scoreJoueur [j] - 10;
			asJoueur  [j]--;
		}
		if (scoreJoueur [j]>21) {
			hitJoueur [j].innerHTML = "";
			annonceJoueur [j].innerHTML ="burn";
			gagne [j] = false;
		}
		cartesJoueur [j].innerHTML += divCarteJoueurPart1 + carteHit + divCarteJoueurPart2;
		valeurCartesJoueur [j].innerHTML = scoreJoueur [j];
	}
	else {
	hitJoueur [j].innerHTML = "";
	annonceJoueur [j].innerHTML = "burn";
	}
}

function doubleDown(j) {
	if (montantMiseJoueur [j]<=cash [j]) {
		hitJoueur [j].innerHTML = "";
		doubleDownJoueur [j].innerHTML = "";
		cash [j] -= montantMiseJoueur [j];
		cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
		montantMiseJoueur [j]*=2;
		miseJoueur [j].innerHTML = montantMiseJoueur [j];
		hitDoubledown [j] = carteRandom();
		valeurCarteHit = valCarte (hitDoubledown [j]);
		if ((valeurCarteHit==1)&&(scoreJoueur [j]<11)) {
			valeurCarteHit = 11;
			asJoueur [j]++;
			}
		scoreJoueur [j]+= valeurCarteHit;
		if (scoreJoueur [j]>21&&asJoueur [j]>0){
			scoreJoueur [j] = scoreJoueur [j] - 10;
			asJoueur  [j]--;
		}
		cartesJoueur [j].innerHTML += divCarteJoueurDoubleDown;
		doubledown [j] = true;
		if (scoreJoueur [j]>21) {
			gagne [j] = false;
		}
	}
}

//« la banque tire à 16, reste à 17 »
function reste() {
	for (j=1;j<=nbJoueur;j++) {
			if (joueur [j]) {
			annonceJoueur [j].innerHTML = "";
			hitJoueur [j].innerHTML = "";
			doubleDownJoueur [j].innerHTML = "";
			}
	}
	if (ramasser==false&&distribuer==false) {
		cartesBanque.innerHTML = "<img class='cardBJ' src='../img/"+premiere_carteRandomBanque+".png' alt='carte de la banque' /><div style='width: 1Opx;' ></div><img class='cardBJ' src='../img/"+deuxieme_carteRandomBanque+".png' alt='carte de la banque' />";
		scoreBanque.innerHTML = valeurCarteBanque;
		while (valeurCarteBanque < 17) {
			carteRandBanque = carteRandom() ;
			valeur_carteRandBanque = valCarte (carteRandBanque);
			cartesBanque.innerHTML += "<div style='width: 1%;' ></div><img class='cardBJ' src='../img/" + carteRandBanque + ".png' alt='carte de la banque' />";
			valeurCarteBanque += valeur_carteRandBanque ;
			scoreBanque.innerHTML = valeurCarteBanque;
		}
		if (valeurCarteBanque>21) {gagneBanque=false;}
		for (j=1;j<=nbJoueur;j++) {
			if (joueur [j]) {
				if (blackjack [j]) {
					if (blackjackBanque) {
						gagne[j]=false;
						push[j]=true;
						blackjack [j]=false;
						cash [j] += montantMiseJoueur [j];
						cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
						annonceJoueur [j].innerHTML ="push";
					}
					else {
						gagne[j]=false;
						push[j]=false;
						blackjack [j]=true;
						cash [j] += 2.5*montantMiseJoueur [j];
						cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
						annonceJoueur [j].innerHTML = "<b>+"+ 2.5*montantMiseJoueur [j] +"</b>";
					}
				}
				else {
					if (doubledown [j]) {
						cartesJoueur [j].innerHTML = "<div style='position:relative;width:25px;'><img class='recto cardBJ' src='../img/"+ premiere_carteRandomJoueur [j]+".png'></div><div style='position:relative;width:25px;'><img class='recto_2 cardBJ' src='../img/"+deuxieme_carteRandomJoueur [j]+".png'></div>"+ divCarteJoueurPart1 + hitDoubledown [j] + divCarteJoueurPart2;
						valeurCartesJoueur [j].innerHTML = scoreJoueur [j];
						}
					miseJoueur [j].innerHTML = "";
					if ((scoreJoueur [j]>21)||((scoreJoueur [j]<valeurCarteBanque)&&(valeurCarteBanque<22))) {
						gagne[j]=false;
						cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
					}
					if ((scoreJoueur [j]>valeurCarteBanque)&&(scoreJoueur [j]<22)) {
						gagne[j]=true;
						push[j]=false;
						blackjack [j]=false;
						cash [j] += 2*montantMiseJoueur [j];
						cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
						annonceJoueur [j].innerHTML = "+ " + montantMiseJoueur [j] + " $" ;
					}
					if (gagne[j]&&gagneBanque==false) {
						gagne[j]=true;
						push[j]=false;
						blackjack [j]=false;
						cash [j] += 2*montantMiseJoueur [j];
						cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
						annonceJoueur [j].innerHTML = "+ " + montantMiseJoueur [j] + " $";
					}
					if ((scoreJoueur [j]==valeurCarteBanque)&&(scoreJoueur [j]<22)) {
						gagne[j]=false;
						push[j]=true;
						blackjack [j]=false;
						cash [j] += montantMiseJoueur [j];
						cashJoueur [j].innerHTML = "<div class='cash'>$ "+ cash [j] +"</div>";
						annonceJoueur [j].innerHTML = "push";
					}
				}
				
			}
		montantMiseJoueur [j] = miseDepart;
		gagne [j] = true;
		doubledown [j] = false;
		}
	}
	ramasser = true;
}

let deck = 1;
let nbCarte = deck * 52;
let carteDeck = new Array();
let valeurCarte;
let i;
let carteHit;
let valeurCarteHit;
let ramasser = false;
let distribuer = true;

let nbJoueur = 4;
let joueur = new Array();
let valeurCartesJoueur = new Array ();
let cashJoueur = new Array();
let miseJoueur = new Array();
let annonceJoueur = new Array();
let cartesJoueur = new Array();
let asJoueur = new Array();
let hitJoueur = new Array();
let doubleDownJoueur = new Array();
let montantMiseJoueur = new Array();
let cash = new Array();
let scoreJoueur = new Array();
let continu = new Array();
let blackjack = new Array();
let doubledown = new Array();
let hitDoubledown = new Array();
let gagne = new Array();
let push = new Array ();
let blackjackBanque = false;
let gagneBanque = true;

let divCarteJoueurPart1 = "<div style='position:relative;width:25px;'><img class='recto_2 cardBJ' src='../img/";
let divCarteJoueurPart2 = ".png'></div>";
let divCarteJoueurDoubleDown = "<div style='position:relative;width:25px;'><img class='recto_2 cardBJ' onClick='reste();'src='../img/verso.png' alt='carte du joueur' /></div>";

let cashDprt = 1000;
let miseDepart = 100;
cashDprt -= miseDepart;
let palierMise = 100;

let asBanque = 0;
let scoreBanque = document.getElementById('scoreBanque');
let premiere_carteRandomBanque;
let valeur_premiereCarteBanque;
let deuxieme_carteRandomBanque;
let valeur_deuxiemeCarteBanque;
let cartesBanque = document.getElementById('cartes_banque');
let valeurCarteBanque;
let carteRandBanque;
let valeur_carteRandBanque;

let premiere_carteRandomJoueur = new Array();
let valeur_premiereCarteJoueur = new Array();
let deuxieme_carteRandomJoueur = new Array();
let valeur_deuxiemeCarteJoueur = new Array();