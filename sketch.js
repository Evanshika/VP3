//Create variables here
var dog,happydog,dogimage
var database,foodS,foodStock
var foodS
function preload(){
    dogimage=loadImage("images/dogImg.png")
    happydog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database()
  foodStock=database.ref('food');
foodStock.on("value",readStock);

  dog = createSprite (200,200)
  dog.addImage(dogimage);
  dog.scale = 0.2
}


function draw() {  
  stroke("black");
  text("Food remaining : "+foodS,170,200);

if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    if(foodS >0){
      dog.addImage(happydog);
    }
    
}

  drawSprites();
  

}

function readStock(data){
  foodS=data.val();
  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed= data.val();
  })
}

function writeStock(x){
  if(x>0){
      x = x-1
  }
  else{
      x =0 
  }
database.ref('/').update({
  food:x
})

display(){
  var x=80,y=100;

  imageMode(CENTER);
  image(this.image,720,220,70,70)

  if(this.foodStock!=0){
    for(var i=0;i<this.foodStock;i++){
      if(i%10==0){
        x=80;
        y=y+50;
      }
      image(this.image,x,y,50,50);
      x=x+30;
    }

  }


}






}



