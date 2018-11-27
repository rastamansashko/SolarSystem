var canvas, ctx, w,h,i;
var vf=0.4, rf=16, r1f=300; //Параметри першого супутника
var n=9; //Кількість супутників
var kv = -1.5; //Коефіцієнт зміни швидкостей супутників
var kr = 0.7; //Коефіцієнт зміни радіусів супутників
var kr1 = 0.6; //Коефіцієнт зміни радіусів орбіт

function init() {
    //Ініціалізуємо canvas
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    w = document.body.clientWidth/2;
    canvas.width = w;
    h = canvas.height;
    ctx.lineWidth = 2;
    ctx.strokeRect(0,0,w,h);
    
    //Створюємо зірочки
    var stars = new Array(1000);
    for (i=0; i<1000; i++)
    {
        stars[i]={
            x : Math.random()*w,
            y : Math.random()*h,
            r : Math.random()*1.5
        }
    }
    
    //Створюємо сонечко
    var sun = {
        x: w/2,
        y: h/2,
        r: 30,  //Велика вісь еліпса
        color: "#FFFF00"
    }
    
    //Створюємо супутники
    var sats = new Array(n);
    sats[0] = {x:0,y:0,v:vf,r:rf,r1:r1f,color: "RGB("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")"}
    for (i=1; i<n; i++)
    {
        sats[i]={
            x: 0,
            y: 0,
            v: kv*sats[i-1].v,
            r: kr*sats[i-1].r,
            r1: kr1*sats[i-1].r1,
            color: "RGB("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")"
        }
    }

    var i=0;
    var angle;
    //Таймер для приросовки
    var timer = setInterval(function(){
        //Очищаємо холст
        ctx.clearRect(0,0,w,h);
        //обчислюємо координати супутників
        for (j=0;j<n;j++)
        {
            var x0,y0;
            if (j==0) {x0=sun.x; y0=sun.y;} else {x0=sats[j-1].x; y0=sats[j-1].y;}
            angle = sats[j].v*i*Math.PI/180;
            sats[j].x=x0+sats[j].r1*Math.cos(angle);
            sats[j].y=y0+sats[j].r1*Math.sin(angle);
        }
        
        //Заливаємо космос
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,w,h);
        
        //Розкидуємо зірочки
        for (j=0; j<500; j++)
        {
            var a=Math.round(Math.random()*255);
            ctx.fillStyle = "rgba(255,255,255,"+a+")";
            ctx.beginPath();
            ctx.arc(stars[j].x, stars[j].y, stars[j].r, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
        }
        
        
        
        //Малюємо Сонечко
        ctx.fillStyle =sun.color;
        ctx.beginPath();
        ctx.arc(sun.x,sun.y,sun.r,0,Math.PI*2,true);
        ctx.fill();
        ctx.closePath();
        
        //Прорисовуємо супутники
        for (j=0;j<n;j++)
        {
            ctx.fillStyle = sats[j].color;
            ctx.beginPath();
            ctx.arc(sats[j].x,sats[j].y,sats[j].r,0,Math.PI*2,true);
            ctx.fill();
            ctx.closePath();
        }
        

        i++;
        
    },35);
};
init();