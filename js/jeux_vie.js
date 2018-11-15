// var ctx = c.getContext("2d");
// ctx.beginPath();      // Début du chemin
// ctx.moveTo(50,50);    // Le tracé part du point 50,50
// ctx.lineTo(200,200);  // Un segment est ajouté vers 200,200
// ctx.moveTo(200,50);   // Puis on saute jusqu'à 200,50
// ctx.lineTo(50,200);   // Puis on trace jusqu'à 50,200
// ctx.closePath();      // Fermeture du chemin (facultative)

var Tableau=document.getElementById("Mon_Canvas");
var pinceau = Tableau.getContext("2d");

var ecart = 10; //largeur d'un côté des cases

//lignes
for(var ligne = ecart ; ligne < Tableau.height ; ligne += ecart) {
   pinceau.moveTo(0, ligne); //déplacer le pinceau à (x,y) sans tracer
   pinceau.lineTo(Tableau.width, ligne); //tracer jusqu'à (x,y)
}
//colonnes
for(var colonne = ecart ; colonne < Tableau.width ; colonne += ecart) {
   pinceau.moveTo(colonne, 0);
   pinceau.lineTo(colonne, Tableau.height);
}

pinceau.stroke();

Tableau.addEventListener("auxclick", () =>{
    //mettre les events au click et changer les couleurs
})
