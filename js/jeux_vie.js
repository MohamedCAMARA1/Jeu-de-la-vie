// // let Le_Canvas = document.getElementById("mon_Canvas");
// // let pinceau= Le_Canvas.getContext("2d"); //on précise qu'on travail en 2D
// // pinceau.beginPath();      // Début du chemin
// // pinceau.moveTo(50,50);    // Le tracé part du point 50,50
// // pinceau.lineTo(200,200);  // Un segment est ajouté vers 200,200
// // pinceau.moveTo(200,50);   // Puis on saute jusqu'à 200,50
// // pinceau.lineTo(50,200);   // Puis on trace jusqu'à 50,200
// // pinceau.closePath();      // Fermeture du chemin (facultative)
// // pinceau.stroke();             //Traçage de la forme!

function random_Alea(){
   //Pour generer soit 0 soit 1
   let mon_nombre = Math.round(Math.random());;
  return mon_nombre;
 }
 
 let ecart =10; //largeur d'un côté des cases
 let Le_Canvas = document.getElementById("mon_Canvas");
 let pinceau = Le_Canvas.getContext("2d");
 let imageData = pinceau.createImageData(ecart, ecart)
 let mapPixel = imageData.data; //recuperation du tableau de pixel
 
 let btn_Lancer = document.getElementById("Monbtn")
 
 //On met la couleur rouge
 for(var i=0 ; i < mapPixel.length ;i+=4){
   mapPixel[i] = 200; // rouge
   mapPixel[i+3] = 200; // Alpha
 }
 
 
 //Lignes
 for(let ligne = ecart; ligne < Le_Canvas.height; ligne += ecart)
 {
    pinceau.moveTo(0, ligne); //déplacer le pinceau à (x,y) sans tracer
    pinceau.lineTo(Le_Canvas.width, ligne); //tracer jusqu'à (x,y)
   // pinceau.stroke();
 }
 
 //colonnes
 for(let colonne=ecart; colonne < Le_Canvas.width; colonne += ecart )
 {
     pinceau.moveTo(colonne, 0);
     pinceau.lineTo(colonne, Le_Canvas.height);    
 }
 
 pinceau.closePath(); 
 pinceau.stroke();   
 let alea;  
 
 for(let ligne = 0; ligne < Le_Canvas.height; ligne += ecart)
 {
   for(let colonne=0; colonne < Le_Canvas.width; colonne += ecart )
   {
       if (random_Alea() == 1){         
       pinceau.putImageData( imageData , ligne ,colonne  ); //on remplit une case  de 10 sur 10    
       //console.log(pinceau.getImageData(Le_Canvas.width, 10, 10, Le_Canvas.height));
     }   
   } 
 }
 
 
 
 
 function anneeSuivante(){
 //5,5 pour se mettre au milieu de la case
   //pinceau.getImageData(5,5,1,1)
   let Me_Color ;
   for(let ligne = 0; ligne < Le_Canvas.height; ligne += ecart)
   {
     for(let colonne=0; colonne < Le_Canvas.width; colonne += ecart )
     {    
       Me_Color = pinceau.getImageData(ligne+(ecart/2), colonne + (ecart/2),1,1);
       
       let nb_un =0
 
       nb_un = pinceau.getImageData(ligne-1+(ecart/2), colonne-1 + (ecart/2),1,1).imageData.data[0];  
       nb_un = nb_un + pinceau.getImageData(ligne-1+(ecart/2), colonne + (ecart/2),1,1).data[0];
       nb_un = nb_un + pinceau.getImageData(ligne-1+(ecart/2), colonne + 1 + (ecart/2),1,1).data[0];
       nb_un =nb_un + pinceau.getImageData(ligne+1+(ecart/2), colonne-1 + (ecart/2),1,1).data[0];
       nb_un =nb_un + pinceau.getImageData(ligne+1+(ecart/2), colonne + (ecart/2),1,1).data[0];
       nb_un =nb_un + pinceau.getImageData(ligne+1+(ecart/2), colonne + 1 + (ecart/2),1,1).data[0];
       nb_un =nb_un + pinceau.getImageData(ligne+(ecart/2), colonne-1 + (ecart/2),1,1).data[0];
       nb_un =nb_un + pinceau.getImageData(ligne+(ecart/2), colonne+1 + (ecart/2),1,1).data[0];
      
  
       if((Me_Color.getImageData.data[0] == 0)&&(nb_un==1800)){
         // elle nait
         pinceau.putImageData( imageData , ligne ,colonne  );
       }
       else if((Me_Color.getImageData.data[0] == 200)&&((nb_un==600)||(nb_un==400))){
         // elle continue à vivre
         
       }
       else{
        // elle meurt
         
          //On met la couleur blanche
           for(var i=0 ; i < mapPixel.length ;i+=4){
             mapPixel[i] = 0; // blanc
             mapPixel[i+3] = 0; // Alpha
           }
           pinceau.putImageData( imageData , ligne ,colonne  );
         }
 
     } 
   }
 }
 
 btn_Lancer.addEventListener("click", () =>{
   anneeSuivante();
 })