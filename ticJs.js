document.addEventListener("DOMContentLoaded", function(){
    var ticked = new Array(10);
    var result = document.getElementById("result");
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var players = 0;
    btn1.addEventListener('click', function(){
        players = 1;
        btn1.disabled = true;
        btn2.disabled = true;
        let pl = document.getElementById("players");
        pl.innerHTML = "1 Player (vs Computer)";
        addListeners();
    })
    btn2.addEventListener('click', function(){
        players = 2;
        btn1.disabled = true;
        btn2.disabled = true;
        let pl = document.getElementById("players");
        pl.innerHTML = "2 Players";
        addListeners();
    });
    var won = 0;
    for(let i = 0; i < 10; i++)
    ticked[i] = 0;
    var str = "O";
    function addListeners(){
    for(let i = 1; i < 10; i++){
        document.getElementById('div' + i).addEventListener('click', function(){   
            if(ticked[i] == 0 && won == 0){
                    document.getElementById("div"+i).innerHTML = str;
                    if(str == "O"){
                        ticked[i] = 1;
                        str = "X";
                    }
                    else if(str == "X"){
                        ticked[i] = 2;
                        str = "O";
                    }
                    checkWin();
                        if(won == 0 && players == 1){
                            autoPlay();
                            checkWin();
                        }
                            
                }
        });
    }
}
    var flag = 0;
    function checkWin(){
        console.log('won:' + won);
        if ((ticked[1] == 1 && ticked[2] == 1 && ticked[3] == 1) || 
            (ticked[1] == 1 && ticked[5] == 1 && ticked[9] == 1) || 
            (ticked[1] == 1 && ticked[4] == 1 && ticked[7] == 1) ||
            (ticked[2] == 1 && ticked[5] == 1 && ticked[8] == 1) || 
            (ticked[3] == 1 && ticked[6] == 1 && ticked[9] == 1) ||
            (ticked[3] == 1 && ticked[5] == 1 && ticked[7] == 1) ||
            (ticked[7] == 1 && ticked[8] == 1 && ticked[9] == 1) ||
            (ticked[4] == 1 && ticked[5] == 1 && ticked[6] == 1)) 
            flag = 1;
        else if ((ticked[1] == 2 && ticked[2] == 2 && ticked[3] == 2) || 
            (ticked[1] == 2 && ticked[5] == 2 && ticked[9] == 2) || 
            (ticked[1] == 2 && ticked[4] == 2 && ticked[7] == 2) ||
            (ticked[2] == 2 && ticked[5] == 2 && ticked[8] == 2) || 
            (ticked[3] == 2 && ticked[6] == 2 && ticked[9] == 2) ||
            (ticked[3] == 2 && ticked[5] == 2 && ticked[7] == 2) ||
            (ticked[7] == 2 && ticked[8] == 2 && ticked[9] == 2) ||
            (ticked[4] == 2 && ticked[5] == 2 && ticked[6] == 2)) 
            flag = 2;
            // console.log(flag);
            if(won == 0 && flag == 1){
                // console.log("Player 1 won")
                result.innerHTML = "Player 1 Won";
                won = 1;
            }
            else if( won == 0 && flag == 2){
                console.log("Player 2 won")// alert("Player 2 won");
                result.innerHTML = "Player 2 won";
                won = 1;
            }
            console.log(ticked, flag)

        var s = 0;    
        for(let i = 1; i < 10; i++){
            s += (ticked[i]>0)? 1 : 0;
        }
        if(flag == 0 && s == 9){
        // alert('Draw');
        result.innerHTML = "Match drawn";
        }
        if(s == 9 || flag == 1 || flag == 2){
            won = 1;
            str = "";
            console.log("Finished");
            result.style.color = "blue";
            result.style.border = "2px dashed black";
            result.style.textAlign = "center";
    }  
}
    function autoPlay(){
        var toTick = 0;
        var ones = 0;
        for(let i = 1; i < 10; i++) {
            if(ticked[i] == 1) ones += 1;
        }
        
        //----------------
         if(ticked[1] == 2 && ticked[2] == 2 && ticked[3] == 0) toTick = 3;
        else if(ticked[2] == 2 && ticked[3] == 2 && ticked[1] == 0) toTick = 1;
        else if(ticked[1] == 2 && ticked[3] == 2 && ticked[2] == 0) toTick = 2;
        else if(ticked[4] == 2 && ticked[5] == 2 && ticked[6] == 0) toTick = 6;
        else if(ticked[5] == 2 && ticked[6] == 2 && ticked[4] == 0) toTick = 4;
        else if(ticked[4] == 2 && ticked[6] == 2 && ticked[5] == 0) toTick = 5;
        else if(ticked[7] == 2 && ticked[8] == 2 && ticked[9] == 0) toTick = 9;
        else if(ticked[7] == 2 && ticked[9] == 2 && ticked[8] == 0) toTick = 8;
        else if(ticked[8] == 2 && ticked[9] == 2 && ticked[7] == 0) toTick = 7;
        else if(ticked[1] == 2 && ticked[4] == 2 && ticked[7] == 0) toTick = 7;
        else if(ticked[4] == 2 && ticked[7] == 2 && ticked[1] == 0) toTick = 1;
        else if(ticked[1] == 2 && ticked[7] == 2 && ticked[4] == 0) toTick = 4;
        else if(ticked[2] == 2 && ticked[5] == 2 && ticked[8] == 0) toTick = 8;
        else if(ticked[2] == 2 && ticked[8] == 2 && ticked[5] == 0) toTick = 5;
        else if(ticked[5] == 2 && ticked[8] == 2 && ticked[2] == 0) toTick = 2;
        else if(ticked[3] == 2 && ticked[6] == 2 && ticked[9] == 0) toTick = 9;
        else if(ticked[3] == 2 && ticked[9] == 2 && ticked[6] == 0) toTick = 6;
        else if(ticked[6] == 2 && ticked[9] == 2 && ticked[3] == 0) toTick = 3;
        else if(ticked[1] == 2 && ticked[5] == 2 && ticked[9] == 0) toTick = 9;
        else if(ticked[1] == 2 && ticked[9] == 2 && ticked[5] == 0) toTick = 5;
        else if(ticked[5] == 2 && ticked[9] == 2 && ticked[1] == 0) toTick = 1;
        else if(ticked[3] == 2 && ticked[5] == 2 && ticked[7] == 0) toTick = 7;
        else if(ticked[3] == 2 && ticked[7] == 2 && ticked[5] == 0) toTick = 5;
        else if(ticked[7] == 2 && ticked[5] == 2 && ticked[3] == 0) toTick = 3;
        //--------------------------
        else if(ticked[1] == 1 && ticked[2] == 1 && ticked[3] == 0) toTick = 3;
        else if(ticked[2] == 1 && ticked[3] == 1 && ticked[1] == 0) toTick = 1;
        else if(ticked[1] == 1 && ticked[3] == 1 && ticked[2] == 0) toTick = 2;
        else if(ticked[4] == 1 && ticked[5] == 1 && ticked[6] == 0) toTick = 6;
        else if(ticked[5] == 1 && ticked[6] == 1 && ticked[4] == 0) toTick = 4;
        else if(ticked[4] == 1 && ticked[6] == 1 && ticked[5] == 0) toTick = 5;
        else if(ticked[7] == 1 && ticked[8] == 1 && ticked[9] == 0) toTick = 9;
        else if(ticked[7] == 1 && ticked[9] == 1 && ticked[8] == 0) toTick = 8;
        else if(ticked[8] == 1 && ticked[9] == 1 && ticked[7] == 0) toTick = 7;
        else if(ticked[1] == 1 && ticked[4] == 1 && ticked[7] == 0) toTick = 7;
        else if(ticked[4] == 1 && ticked[7] == 1 && ticked[1] == 0) toTick = 1;
        else if(ticked[1] == 1 && ticked[7] == 1 && ticked[4] == 0) toTick = 4;
        else if(ticked[2] == 1 && ticked[5] == 1 && ticked[8] == 0) toTick = 8;
        else if(ticked[2] == 1 && ticked[8] == 1 && ticked[5] == 0) toTick = 5;
        else if(ticked[5] == 1 && ticked[8] == 1 && ticked[2] == 0) toTick = 2;
        else if(ticked[3] == 1 && ticked[6] == 1 && ticked[9] == 0) toTick = 9;
        else if(ticked[3] == 1 && ticked[9] == 1 && ticked[6] == 0) toTick = 6;
        else if(ticked[6] == 1 && ticked[9] == 1 && ticked[3] == 0) toTick = 3;
        else if(ticked[1] == 1 && ticked[5] == 1 && ticked[9] == 0) toTick = 9;
        else if(ticked[1] == 1 && ticked[9] == 1 && ticked[5] == 0) toTick = 5;
        else if(ticked[5] == 1 && ticked[9] == 1 && ticked[1] == 0) toTick = 1;
        else if(ticked[3] == 1 && ticked[5] == 1 && ticked[7] == 0) toTick = 7;
        else if(ticked[3] == 1 && ticked[7] == 1 && ticked[5] == 0) toTick = 5;
        else if(ticked[7] == 1 && ticked[5] == 1 && ticked[3] == 0) toTick = 3;
        else if(ticked[5] == 0){
            toTick = 5;
        }
        else if(ones == 2){
            if(ticked[2] == 1 && ticked[4] == 1 && ticked[1] == 0) toTick = 1;
            else if(ticked[2] == 1 && ticked[6] == 1 && ticked[3] == 0) toTick = 3;
            else if(ticked[4] == 1 && ticked[8] == 1 && ticked[7] == 0) toTick = 7
            else if(ticked[8] == 1 && ticked[6] == 1 && ticked[9] == 0) toTick = 9;
        }
        else{
            let skip = 0;
            let mis = [];
            if((ticked[1] == 1 && ticked[9] == 1) ||
                (ticked[3] == 1 && ticked[7] == 1))
                skip = 1;
            if(ticked[1] == 0) mis.push(1);
            if(ticked[3] == 0) mis.push(3);
            if(ticked[5] == 0) mis.push(5);
            if(ticked[7] == 0) mis.push(7);
            if(ticked[9] == 0) mis.push(9);
            let min = 0, max = mis.length;
                let index = Math.floor(Math.random() * (+max - +0)) ;
                console.log("index:" + index);
                    if(mis.length != 0 && skip == 0)
                    toTick = mis[index];
        }
        if(toTick == 0){
            let mis = [];
            if(ticked[2] == 0) mis.push(2);
            if(ticked[4] == 0) mis.push(4);
            if(ticked[6] == 0) mis.push(6);
            if(ticked[8] == 0) mis.push(8);
            let min = 0, max = mis.length;
                let index = Math.floor(Math.random() * (+max - +0)) ;
                console.log("index:" + index);
                if(mis.length != 0)
                    toTick = mis[index];
        }
        if(toTick == 0)
        for(let i = 1; i < 10; i++){
            if(ticked[i] == 0)
            {
                toTick = 1;
                break;
            }
        }
        

        ticked[toTick] = 2;
        console.log(toTick)
        console.log("won:autoplay " + won)
        if(toTick && won == 0)
        document.getElementById("div"+toTick).innerHTML = str;
        str = "O";
        console.log(ticked)
    }
});
