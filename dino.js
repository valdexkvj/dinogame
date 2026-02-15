const canvas = document.getElementById("moncanvas");
const ctx = canvas.getContext("2d");


let x0=35;
let y0=350;

let dino = {

    x:x0,//15
    y:y0,//
    width:50,
    height:50,
    


    dessiner: function(){
    ctx.fillStyle = "black";

    // corps
    ctx.fillRect(this.x + 15, this.y + 20, 30, 25);

    // tête
    ctx.fillRect(this.x + 30, this.y, 20, 20);

    // pieds
    ctx.fillRect(this.x + 32, this.y + 45, 8, 10);
    ctx.fillRect(this.x + 20, this.y + 45, 8, 10);

    // queue
    ctx.fillRect(this.x + 5, this.y + 25, 10, 15);
    ctx.fillRect(this.x, this.y + 28, 5, 8);

    // oeil
    ctx.beginPath();
    ctx.arc(this.x + 40, this.y + 10, 5, 0, 2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    
},

    g:0.6,
    v:0,
    sol:true,
    sauter: function(){
        if(this.sol){
            this.v = -12;
            this.sol = false;
        }
    
    }
    
};

class ob  {
    v= -5;
    constructor(t){
        this.x =  800;
        this.y =  370;
        this.width =  15;
        this.height =  30;
        
    }
    avancer(t){
        this.x += this.v*t/1000*60;
    }
    dessiner(){
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
let obstacles = [];
let score = 0;
let acum = 0;
let gameover = false;
let t0 = 0;

let t_ob = 1000 + Math.random() * 1000;

document.addEventListener("keydown", function(event){
    if(event.code === "Space" && !gameover){
        dino.sauter();
    }else if(event.code === "Enter" && gameover){
        gameover = false;
        dino.y = y0;
        dino.v = 0;
        dino.sol = true;
        obstacles = [];
        acum = 0;
    }
})

function play(time){
    if(!gameover){
        let deltime = 0;
        deltime = (time - t0);

        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        dino.dessiner();
        obstacles.forEach(x=>x.avancer(deltime));
        obstacles.forEach(x=>x.dessiner());
        obstacles = obstacles.filter(x=> x.x + x.width > 0);
        if(obstacles.some(x=>x.x<dino.x+dino.width && dino.x < x.x+x.width && x.y<dino.y+dino.height && dino.y < x.y+x.height)){
            gameover = true;
        }



        acum += deltime;
        score += deltime ;
        let s = Math.floor(score/100);
        document.getElementById("score").innerText =  s;
        if(acum >= t_ob){
        obstacles.push(new ob());
            acum = 0;
            t_ob = 1000 + Math.random() * 1000;
        }
        t0 = time;
        if(!dino.sol){
            dino.v += dino.g * deltime/1000*60;
            let v = dino.v * deltime/1000*60;
            dino.y += v;
           
            
        }

        
        if(dino.y >= y0 && !dino.sol){
            dino.y = y0;
            dino.sol = true;
        }
    }else{
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", 300, 200); 
        
        ctx.fillStyle = "green";
        ctx.fillRect(200,50, 100, 100);
        ctx.fillStyle = "red";
        ctx.fillRect(300, 50, 100, 100);
        ctx.fillStyle = "yellow";
        ctx.fillRect(400, 50, 100, 100);
        ctx.fillStyle = "black";
        ctx.fillRect(200, 150, 10, 150);
        ctx.fillStyle = "yellow";
        ctx.fillRect(150, 300, 110, 30);
        ctx.fillStyle = "red";
        ctx.fillRect(130, 330, 150, 35);
        ctx.fillStyle = "green";
        ctx.fillRect(110, 365, 190, 30);
        
        ctx.beginPath();
        ctx.moveTo(350, 70);
        ctx.lineTo(367.63 , 124.27);
        ctx.lineTo(321.47 , 90.73);
        ctx.lineTo(378.53, 90.73);
        ctx.lineTo(332.37 , 124.27);
        ctx.closePath();
        ctx.fillStyle = "yellow";
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(205,365);
        ctx.lineTo(193.24 , 328.82);
        ctx.lineTo(224.02 , 351.18);
        ctx.lineTo(185.98 , 351.18);
        ctx.lineTo(216.76 , 328.82);
        ctx.closePath();
        ctx.fillStyle = "yellow";
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(205, 40, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(246, 226, 7, 0.91)';
        ctx.fill();
        
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    requestAnimationFrame(play);
}

requestAnimationFrame(play);



/*

//tirex
*/
