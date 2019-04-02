document.addEventListener("DOMContentLoaded", function(){
    "use strict"
    // one-indexed array for each box
    var ticked = new Array(10).fill(0);;
    var result = document.getElementById("result");
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var play;
    var difficulty;
    var disabling = 0;
    if(typeof(Storage) != undefined){
        let val  = localStorage.getItem("difficulty");
        let val1 = localStorage.getItem("players");
        if(val != undefined){
            document.getElementById('d'+val).checked = true;
        }
        if(val1 != undefined){
            document.getElementById(val1).checked = true;
            console.log(val1);
        }
    }
    for(let i = 1; i <= 3; i++){
        document.getElementById('d'+i).addEventListener('change', function(){
            document.getElementById('d'+i).checked = true;
            localStorage.setItem("difficulty", i);
        })
    }
    function btn1Event(){
        players = 1;
        let pl = document.getElementById("players");
        pl.innerHTML = "1 Player (vs Computer)";
        if      (document.getElementById("d1").checked) difficulty = "1";
        else if (document.getElementById("d2").checked) difficulty = "2";
        else if (document.getElementById("d3").checked) difficulty = "3";
        localStorage.setItem("difficulty", difficulty);
        localStorage.setItem("players", "btn1");
        addListeners();
    }
    function btn2Event(){
        players = 2;
        let pl = document.getElementById("players");
        pl.innerHTML = "2 Players";
        if      (document.getElementById("d1").checked) difficulty = "1";
        else if (document.getElementById("d2").checked) difficulty = "2";
        else if (document.getElementById("d3").checked) difficulty = "3";
        localStorage.setItem("difficulty", difficulty);
        localStorage.setItem("players", "btn2");
        addListeners();
    }
    var players = 0;
    if      (btn1.checked == true) btn1Event();
    else if (btn2.checked == true) btn2Event();
    btn1.addEventListener('change', function(){
        btn1Event();
    });
    btn2.addEventListener('change', function(){
        btn2Event();
    });
    var won = 0;
    var str = "O";
    function disable(){
        document.getElementById("d1").disabled = true;
        document.getElementById("d2").disabled = true;
        document.getElementById("d3").disabled = true;
        btn1.disabled = true;
        btn2.disabled = true;
    }
    function addListeners(){
        console.log(localStorage.getItem("players"));
        for(let i = 1; i <= 9; i++){
            document.getElementById('div' + i).addEventListener('click', function(){
                if(ticked[i] == 0 && won == 0){
                    if(disabling == 0){
                        disable();
                        disabling = 1;
                    }
                
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

        // 1 2 3    1 4 7
        // 4 5 6    2 5 8
        // 7 8 9    3 6 9

        
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
            if(ticked[i] == 1)
                ones += 1;
        }
        if(difficulty == "1"){
            var emp = [];
            for(let i = 1; i < 10; i++) {
                if(ticked[i] == 0)
                    emp.push(i);
            }
            let min = 0, max = emp.length;
            let index = Math.floor(Math.random() * (+max - +0)) ;
            if(max > 0)
                toTick = emp[index];
        }
        else if(difficulty == "2" || difficulty == "3"){
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
        else if(difficulty == "3" && ticked[5] == 0){
            toTick = 5;
        }
        else if(difficulty == "3" && ones == 2){
            if(ticked[2] == 1 && ticked[4] == 1 && ticked[1] == 0) toTick = 1;
            else if(ticked[2] == 1 && ticked[6] == 1 && ticked[3] == 0) toTick = 3;
            else if(ticked[4] == 1 && ticked[8] == 1 && ticked[7] == 0) toTick = 7
            else if(ticked[8] == 1 && ticked[6] == 1 && ticked[9] == 0) toTick = 9;
            //----------------
            else if(ticked[5] == 1 && ticked[1] == 1 && ticked[3] == 0 && ticked[9] == 2) toTick = 3;
            else if(ticked[5] == 1 && ticked[1] == 1 && ticked[7] == 0 && ticked[9] == 2) toTick = 7;
            else if(ticked[5] == 1 && ticked[3] == 1 && ticked[1] == 0 && ticked[7] == 2) toTick = 1;
            else if(ticked[5] == 1 && ticked[3] == 1 && ticked[9] == 0 && ticked[7] == 2) toTick = 9;
            else if(ticked[7] == 1 && ticked[5] == 1 && ticked[1] == 0 && ticked[3] == 2) toTick = 1;
            else if(ticked[7] == 1 && ticked[5] == 1 && ticked[9] == 0 && ticked[3] == 2) toTick = 9;
            else if(ticked[5] == 1 && ticked[9] == 1 && ticked[3] == 0 && ticked[1] == 2) toTick = 3;
            else if(ticked[5] == 1 && ticked[9] == 1 && ticked[7] == 0 && ticked[1] == 2) toTick = 7;
        }
        else{
            let skip = 0;
            let mis = [];
            if(difficulty == "3"){
                if((ticked[1] == 1 && ticked[9] == 1) ||
                    (ticked[3] == 1 && ticked[7] == 1))
                    skip = 1;
                }
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
