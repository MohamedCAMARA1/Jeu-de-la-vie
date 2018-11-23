// // let Le_Canvas = document.getElementById("mon_Canvas");
// // let pinceau= Le_Canvas.getContext("2d"); //on précise qu'on travail en 2D
// // pinceau.beginPath();      // Début du chemin
// // pinceau.moveTo(50,50);    // Le tracé part du point 50,50
// // pinceau.lineTo(200,200);  // Un segment est ajouté vers 200,200
// // pinceau.moveTo(200,50);   // Puis on saute jusqu'à 200,50
// // pinceau.lineTo(50,200);   // Puis on trace jusqu'à 50,200
// // pinceau.closePath();      // Fermeture du chemin (facultative)
// // pinceau.stroke();             //Traçage de la forme!
 //=============================================================================
 //=============================   VAR     =====================================
 //=============================================================================
  let ecart =5; //largeur d'un côté des cases
  let Le_Canvas = document.getElementById("mon_Canvas");
  let pinceau = Le_Canvas.getContext("2d");
  let imageData = pinceau.createImageData(ecart, ecart)
  let mapPixel = imageData.data; //recuperation du tableau de pixel
  let btn_Lancer = document.getElementById("Monbtn")
  let btn_Stoper = document.getElementById("btn_Stop")
  let alea;  
  let tab_Etat_Present = new Array(Le_Canvas.width)
  let tab_Futur =  new Array (Le_Canvas.width);
 //=============================================================================
//================================FONCTIONS=====================================
//=============================================================================
 //Fonction pour generer aléatoirement 0 ou 1
  function random_Alea(){ 
  let mon_nombre = Math.round(Math.random());;
  return mon_nombre;
 }
 
 //Fonction permettant le traçage ligne et colonne + trempage pinceau dans le rouge
 function Preparation_Canvas(){
  // Traçage des Lignes
  for(let ligne = ecart; ligne < Le_Canvas.height; ligne += ecart)
  {
    pinceau.moveTo(0, ligne); //déplacer le pinceau à (x,y) sans tracer
    pinceau.lineTo(Le_Canvas.width, ligne); //tracer jusqu'à (x,y)  
  } 
 
  //Traçage des colonnes
  for(let colonne=ecart; colonne < Le_Canvas.width; colonne += ecart )
  {
    pinceau.moveTo(colonne, 0);
    pinceau.lineTo(colonne, Le_Canvas.height); 
  } 
  pinceau.stroke()
 }

//fonction permettant de tremper le pinceau
//1 pour rougr
//0 pour blanc
 function couleur_Pinceau(couleur){
  if(couleur == 1){
    //On trempe le pinceau dans le rouge
    for(var i=0 ; i < mapPixel.length ;i+=4){
    mapPixel[i] = 200; // rouge
    mapPixel[i+3] = 200; // Alpha
    }
  }
  else{
      if(couleur == 0){
        for(var i=0 ; i < mapPixel.length ;i+=4){
        mapPixel[0] = 0; // blanc
        mapPixel[i+3] = 0; // Alpha
      }
    }
  }
}

//Fonction permettant de mettre une couleur dans la case (ligne,colonne)
function mettre_Couleur_Dans_La_Case(Ligne_Tab, Colonne_Tab){
  pinceau.putImageData( imageData , Ligne_Tab ,Colonne_Tab)
}

//Fonction permettant de remplir les tableaux et initaliser les placements
function Aujourdhui(){
  for(let ligne = 0; ligne < Le_Canvas.height; ligne += ecart){    
     tab_Etat_Present[ligne]= new Array(Le_Canvas.height);
     tab_Futur[ligne]= new Array(Le_Canvas.height);    
     for(let colonne=0; colonne < Le_Canvas.width; colonne += ecart ){
          //placement aléatoire des pions
          //Ce tableu ne contient que des 1 et 0         
          tab_Etat_Present[ligne][colonne]= random_Alea() ;         
          tab_Futur[ligne][colonne] = tab_Etat_Present[ligne][colonne];
          // tab_Futur[ligne][colonne] = random_Alea() ;          
        
     
         couleur_Pinceau(tab_Etat_Present[ligne][colonne])          
         mettre_Couleur_Dans_La_Case(ligne,colonne)      
      pinceau.stroke();  
    } 
  }
} 

//fonction permettant de voir l'etat des pions à n+1
function Ce_Soir(){  
  for(let ligne = 0; ligne < Le_Canvas.height ; ligne += ecart){   
      for(let colonne=0; colonne < Le_Canvas.width ; colonne += ecart ){         
      
        let nombre_un = 0; 
        //let tab_Etat_Present [ligne - ecart] [colonne-ecart]= nombre_un +   tab_Etat_Present [ligne - ecart] [colonne-ecart] //1
        //let tab_Etat_Present [ligne-ecart] [colonne]= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne]//2
        //let tab_Etat_Present [ligne-ecart] [colonne+ecart]= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne+ecart]//3
        //let tab_Etat_Present [ligne]   [colonne+ecart]= nombre_un +  tab_Etat_Present [ligne]   [colonne+ecart]//4
        // let tab_Etat_Present [ligne+ecart] [colonne+ecart]= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne+ecart]//5
        // let tab_Etat_Present [ligne+ecart] [colonne]= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne]//6
        // let tab_Etat_Present [ligne+ecart] [colonne-ecart]= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne-ecart]//7
        // let nombre_un +  tab_Etat_Present [ligne]   [colonne-ecart]= nombre_un +  tab_Etat_Present [ligne]   [colonne-ecart]//8 
        let ligne_0 = 0;
        let ligne_Max= tab_Etat_Present.length -ecart
        let colonne_0=0
        let colonne_Max = tab_Etat_Present.length-ecart   
      //parcours:
      // ______________
      //| 1  | 2 |  3  |
      //______________ |
      //| 8 |  X |  4  |
      //_______________| 
      //| 7 |  6 |  5  |
      //_______________   
      
      
        //Coin Haut-Gauche Tableau (0;0)
        if((ligne == 0) && ( colonne == 0)){        
          nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne + ecart]//4
          nombre_un= nombre_un +  tab_Etat_Present [ligne + ecart] [colonne+ecart]//5
          nombre_un= nombre_un +  tab_Etat_Present [ligne + ecart] [colonne]//6  
        }
else
{

       //Coin Bas-Gauche (ligne Max; 0)
        if((ligne == Le_Canvas.width - ecart) && ( colonne == 0)){
          nombre_un=  tab_Etat_Present [ligne-ecart] [colonne-ecart] //1
          nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne]//2
          nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne+ecart]//3
            
        }
else
{
        
        //Coin Haut-Droit (0 ; Colonne MAx)
        if((ligne == 0) && ( colonne == Le_Canvas.height- ecart)){
          nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne]//6
          nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne-ecart]//7
          nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne-ecart]//8
            
        }
else
{


        //Coin Bas-Droit (ligne max; colonne max)
        if ((ligne == Le_Canvas.width -ecart) && ( colonne == Le_Canvas.height - ecart)){
          
          nombre_un=  tab_Etat_Present [ligne-ecart] [colonne-ecart] //1
          nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne]//2
          nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne-ecart]//8
             
          }
else
{

        

       //
        if( (( colonne ==0) && (ligne !==0)) && (ligne !== tab_Etat_Present.length-ecart)){
        nombre_un= nombre_un +  tab_Etat_Present [ligne - ecart] [colonne]//2
        nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne + ecart]//3
        nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne + ecart]//4
        nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne + ecart]//5
        nombre_un= nombre_un +  tab_Etat_Present [ligne + ecart] [colonne]//6            
        }
else
{

        //
        if( ((ligne ==0) && (colonne !==0)) && (colonne !== tab_Etat_Present.length-ecart)) {
          nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne+ecart]//4
          nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne+ecart]//5
          nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne]//6
          nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne-ecart]//7
          nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne-ecart]//8            
        }

 
        if( (ligne == Le_Canvas.width - ecart) && (ligne !== 0))  {
          nombre_un=  tab_Etat_Present [ligne-ecart] [colonne-ecart] //1
          nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne]//2
          nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne+ecart]//3
          nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne+ecart]//4
          nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne-ecart]//8
            
        }
else
{

     
        if( ((colonne == Le_Canvas.height - ecart) && (ligne !== 0)) && (ligne !== tab_Etat_Present.length -ecart)  ) {
      
          nombre_un=  tab_Etat_Present [ligne-ecart] [colonne-ecart] //1
          nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne]//2
          nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne]//6
          nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne-ecart]//7
          nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne-ecart]//8
        }
else
{
      
        if(( (ligne > 0 ) && (colonne > 0) ) && ((ligne < tab_Etat_Present.length - ecart) && (colonne < tab_Etat_Present.length - ecart))){
            // if(&& (ligne < tab_Etat_Present.length - ecart) && (colonne < tab_Etat_Present.length - ecart)) 
            // {   
              nombre_un=  tab_Etat_Present [ligne - ecart] [colonne-ecart] //1
              nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne]//2
              nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne+ecart]//3
              nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne+ecart]//4
              nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne+ecart]//5
              nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne]//6
              nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne-ecart]//7
              nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne-ecart]//8
            // }
        }
    }

    }
    }
    }
    }
    }
}

      
      //   //Les coins et lignes liés            
      // if((ligne == ligne_0)&&(colonne == colonne_0)){
      //     nombre_un= tab_Etat_Present [ligne+ecart] [colonne]
      //       //coin_haut_gauche(0,0)              
           
      //         nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne+ecart]
      //         nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne+ecart]
      //       }else{
      //       //coin_Haut_droit(0,max)
      //       //Ymax
      //       if((ligne == ligne_0)&&(colonne == colonne_Max)){
      //         nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne-ecart]
      //         nombre_un= nombre_un +  nombre_un +  tab_Etat_Present [ligne]   [colonne-ecart] 
      //       }
      //         if((colonne>colonne_0)|| (colonne<colonne_Max)){//ligne excepté les coins hauts 
      //             nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne+ecart]           
      //             nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne+ecart]                
      //             nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne-ecart]
      //             nombre_un= nombre_un +  nombre_un +  tab_Etat_Present [ligne]   [colonne-ecart] 
      //         }           
      //     }
      //   } 
        
      //       if(ligne == ligne_Max){                      
      //       nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne]
      //       //coin_bas_gauche(max,0)            
      //       if(colonne == colonne_0){
      //       nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne+ecart]
      //       nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne+ecart]
      //      }
      //     //coin_bas_droit(max;max)            
      //        if(colonne == colonne_Max){
      //       nombre_un= nombre_un +  tab_Etat_Present [ligne - ecart] [colonne-ecart]
      //       nombre_un= nombre_un +  nombre_un +  tab_Etat_Present [ligne]   [colonne-ecart] 
      //       }

      //         if((colonne>colonne_0)|| (colonne<colonne_Max)){
      //       nombre_un= nombre_un +  tab_Etat_Present [ligne - ecart] [colonne-ecart]
      //       nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne+ecart]
      //       nombre_un= nombre_un +  tab_Etat_Present [ligne]   [colonne+ecart]
      //       nombre_un= nombre_un +  nombre_un +  tab_Etat_Present [ligne]   [colonne-ecart] 
      //       }             
             
      //   }          
         
      //       if((ligne>ligne_0)&&(ligne<ligne_Max)){
      //           if(colonne == colonne_0){
      //             nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne]
      //             nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne+ecart]
      //             nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne+ecart]
      //             nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne] 
      //           }

      //           if(colonne == colonne_Max){
      //             nombre_un= nombre_un +  tab_Etat_Present [ligne - ecart] [colonne-ecart]
      //             nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne]
      //             nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne]
      //             nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne-ecart] 
      //           } else{
      //           nombre_un= nombre_un +  tab_Etat_Present [ligne - ecart] [colonne-ecart]
      //           nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne]
      //           nombre_un= nombre_un +  tab_Etat_Present [ligne-ecart] [colonne+ecart]
      //           nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne+ecart]
      //           nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne] 
      //           nombre_un= nombre_un +  tab_Etat_Present [ligne+ecart] [colonne-ecart]
      //           nombre_un= nombre_un +  nombre_un +  tab_Etat_Present [ligne]   [colonne-ecart]
      //          }        
               
              
              
          
    

        //nombre_un = 3 => Si une cellule a trois voisines aujourd'hui , elle est vivante à l’étape ce soir.    
        if (nombre_un == 3) {
          tab_Futur [ligne][colonne] = 1;
        }
        else{
        //nombre_un = 2 => Si une cellule a exactement deux voisines aujourd'hui, elle restera dans son état ce soir
        if(nombre_un == 2){
          tab_Futur [ligne][colonne] = tab_Etat_Present[ligne] [colonne];          
        }
        else{//sinon elle mourra demain  
          tab_Futur [ligne][colonne] = 0;       
        }
      }      
    }
  }

  Demain()
}

function Demain(){
  //ce soir devient demain 
  for(let ligne = 0; ligne < Le_Canvas.height; ligne += ecart){    
    for(let colonne=0; colonne < Le_Canvas.width; colonne += ecart ){
          tab_Etat_Present[ligne][colonne] = tab_Futur[ligne][colonne]    
    }  
  }
  Canvasation()
}


//Fonction permettant de transformer le tableau de 0 et 1
//en un tableau de pions rouges et blancs
function Canvasation (){
  for(let ligne = 0; ligne < Le_Canvas.height; ligne += ecart){    
    for(let colonne=0; colonne < Le_Canvas.width; colonne += ecart ){  
    
      //trempage du pinceau dans la bonne couleur sachant que le tablea ne contient que des 0 et 1
      //0 pour blanc et 1 pour rouge
      couleur_Pinceau(tab_Futur [ligne][colonne])
      mettre_Couleur_Dans_La_Case(ligne ,colonne);
    }
  }
  pinceau.stroke();
}

btn_Stoper.addEventListener("click", () =>{ 
  self.location.reload() 
})
let myVar
function tempo() {
  myVar = setInterval(Ce_Soir, 5);
}

 btn_Lancer.addEventListener("click", () =>{     
  // setInterval(function(){ alert("Hello"); }, 3000);

  tempo()

   
 })

 
//traçage ligne et colonne
Preparation_Canvas()
//trempage du pinceau dans le rouge (1) afin de mettre des pions rouges
couleur_Pinceau(1)
Aujourdhui();

