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
// let imageData_Blanco = pinceau.createImageData(ecart, ecart)

 let mapPixel = imageData.data; //recuperation du tableau de pixel
//  let mapPixel_Blanco = imageData_Blanco.data;

 let btn_Lancer = document.getElementById("Monbtn")
 let btn_Stoper = document.getElementById("btn_Stop")
 
 //On met la couleur rouge
 for(var i=0 ; i < mapPixel.length ;i+=4){
   mapPixel[i] = 200; // rouge
   mapPixel[i+3] = 200; // Alpha
 }
 
//  //On met la couleur blanche
//  for(var i=0 ; i < mapPixel.length ;i+=4){
//   mapPixel[i] = 0;
//   mapPixel[i+3] = 0;
// }
 
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
 let tab_Etat_Present = new Array() ;
 let tab_Futur = new Array();
//  = [Le_Canvas.height][Le_Canvas.width];



 for(let ligne = 0; ligne < Le_Canvas.height; ligne += ecart)
 {
   tab_Etat_Present[ligne]= new Array();
   tab_Futur[ligne]= new Array();

   for(let colonne=0; colonne < Le_Canvas.width; colonne += ecart )
   {
        //recopiage des etats dans un tableau qui representera après traitement l'etat suivant du canvas
        //Ce tableu ne contient que des 1 et 0
        //on pourrait peut etre essayer de faire un 2e canvas qui sera directement utilisé
        tab_Etat_Present[ligne][colonne]=alea;
        tab_Futur[ligne][colonne]=alea;


       if (random_Alea() == 1){         
       pinceau.putImageData( imageData , ligne ,colonne  ); //on remplit une case  de 10 sur 10    
       //console.log(pinceau.getImageData(Le_Canvas.width, 10, 10, Le_Canvas.height));

     }   
   } 
 }
 
 
 function Demain(){
  //5,5 pour se mettre au milieu de la case
    //pinceau.getImageData(5,5,1,1)

    //on recopie l'etat du tableau pour le changer au fur à mesure
    // let tab_Futur = tab_Etat_Present;
    //let valeur_Position_actuelle =0; 

    for(let ligne = 0; ligne < Le_Canvas.height; ligne += ecart)
    {
      for(let colonne=0; colonne < Le_Canvas.width; colonne += ecart )
      {    
        //position_actuelle =0 ==> case vide
        //position_actuelle =1 ==> case rouge
        //valeur_Position_actuelle =  tab_Etat_Present[ligne][colonne];
        
        let nombre_un = 0;        
        nombre_un=              tab_Etat_Present [ligne-1] [colonne-1]
        nombre_un= nombre_un +  tab_Etat_Present [ligne-1] [colonne]
        nombre_un= nombre_un +  tab_Etat_Present [ligne-1] [colonne+1]
        nombre_un= nombre_un +  tab_Etat_Present [ligne+1] [colonne-1]
        nombre_un= nombre_un +  tab_Etat_Present [ligne+1] [colonne]
        nombre_un= nombre_un +  tab_Etat_Present [ligne+1] [colonne+1]
        nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne-1]
        nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne+1]
         
        //nombre_un = 3 => Si une cellule a trois voisines , elle est vivante à l’étape suivante.    
        if(nombre_un == 3)
        {
          tab_Futur [ligne][colonne] = 1;
        }

        //nombre_un = 2 => Si une cellule a exactement deux voisines, elle reste dans son état actuel à l’étape suivante
        if(nombre_un == 2)
        {
          tab_Futur [ligne][colonne] = tab_Etat_Present[ligne] [colonne];
        }

        //nombre_un < 2 ou nombre_un > 3 => Si une cellule a moins de 2 ou plus de 3 voisines , elle est morte à l’étape suivante
        if( (nombre_un <2) || (nombre_un >3) )
        {
          tab_Futur [ligne][colonne] = 0;
        }  

      } 
    }
  }

  function Après_Demain(){
    for(let ligne = 0; ligne < Le_Canvas.height; ligne += ecart)
     {
      for(let colonne=0; colonne < Le_Canvas.width; colonne += ecart )
      {
            tab_Etat_Present[ligne][colonne] = tab_Futur[ligne][colonne]    
      }
     }
  }

  //Mise en couleur
 function Canvasation (){
  for(let ligne = 0; ligne < Le_Canvas.height; ligne += ecart)
  {
    tab_Futur[ligne] = new Array();
    for(let colonne=0; colonne < Le_Canvas.width; colonne += ecart )
    {  

      if(tab_Futur [ligne][colonne] == 1){
         //On met la couleur rouge
          for(var i=0 ; i < mapPixel.length ;i+=4){
            mapPixel[i] = 200; // rouge
            mapPixel[i+3] = 200; // Alpha
          }
        pinceau.putImageData(imageData , ligne ,colonne);
      }

      if(tab_Futur [ligne][colonne] == 0){
         for(var i=0 ; i < mapPixel.length ;i+=4){
             mapPixel[0] = 0; // blanc
             mapPixel[i+3] = 0; // Alpha
           }
           pinceau.putImageData( imageData , ligne ,colonne );
      }

    }
  }
 }


 //============================================================================
//  function anneeSuivante(){
//  //5,5 pour se mettre au milieu de la case
//    //pinceau.getImageData(5,5,1,1)
//    let Me_Color ;
//    for(let ligne = 0; ligne < Le_Canvas.height; ligne += ecart)
//    {
//      for(let colonne=0; colonne < Le_Canvas.width; colonne += ecart )
//      {    
//        Me_Color = pinceau.getImageData(ligne+(ecart/2), colonne + (ecart/2),1,1);
       
//        let nb_un =0;
 
//        nb_un =         pinceau.getImageData(ligne-1+(ecart/2), colonne-1 +  (ecart/2),1,1).data[0];  
//        nb_un = nb_un + pinceau.getImageData(ligne-1 +(ecart/2), colonne +   (ecart/2),1,1).data[0];
//        nb_un = nb_un + pinceau.getImageData(ligne-1 +(ecart/2), colonne+1 + (ecart/2),1,1).data[0];
//        nb_un =nb_un  + pinceau.getImageData(ligne+1 +(ecart/2), colonne-1 + (ecart/2),1,1).data[0];
//        nb_un =nb_un  + pinceau.getImageData(ligne+1 +(ecart/2), colonne +   (ecart/2),1,1).data[0];
//        nb_un =nb_un  + pinceau.getImageData(ligne+1 +(ecart/2), colonne+1 + (ecart/2),1,1).data[0];
//        nb_un =nb_un  + pinceau.getImageData(ligne   +(ecart/2), colonne-1 + (ecart/2),1,1).data[0];
//        nb_un =nb_un  + pinceau.getImageData(ligne   +(ecart/2), colonne+1 + (ecart/2),1,1).data[0];
      
  
//        if( (Me_Color.data[0] == 0) && (nb_un == 600)  ){
//          // elle nait
//          pinceau.putImageData( imageData , ligne ,colonne  );
//        }
//        else if(  (Me_Color.data[0] == 200) && ( (nb_un==600) ||( nb_un==400) )  ){
//          // elle continue à vivre
         
//        }
//        else{
//         // elle meurt
         
//           // //On met la couleur blanche
//            for(var i=0 ; i < mapPixel.length ;i+=4){
//              mapPixel[0] = 0; // blanc
//              mapPixel[i+3] = 0; // Alpha
//            }
//            pinceau.putImageData( imageData , ligne ,colonne  );
//          }
 
//      } 
//    }
//  }
 
 //=====================================================================================
 var Mon_Booolee = true;
btn_Stoper.addEventListener("click", () =>{ 
  Mon_Booolee= false;
})

 btn_Lancer.addEventListener("click", () =>{  


  while(Mon_Booolee == true)
  {
    Canvasation();
    Demain();
    Après_Demain();  

  }
   
  
 })