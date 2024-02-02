//Declaring variables
const boxElement=document.querySelectorAll(".box");
var winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
var xAttempts = [];
var oAttempts = [];
var click=0;
var wonTheGame = 0;
const message= document.getElementById("message");
const gameResult=document.getElementById("result");
const restart=document.getElementById("button");

//Onclick function
boxElement.forEach(box=>{
    console.log(box);
    box.onclick  = handleClick;
})
function handleClick(e){
    console.log(e.target);
    //getAttribute will get the id from the e.target
    console.log(e.target.getAttribute('id'));
    
    //stores the id
    const i=e.target.getAttribute('id');

    //create element p for storing text
    const text = document.createElement('p');

    //set the attribute id and value for text variable
    text.setAttribute('id','text');

    //append the newly created element text to the boxElement
    boxElement[i-1].appendChild(text);
    console.log(boxElement[i-1]);

    //the value for click initially is 0
    if(click%2 == 0){
        //push the value in the xAttempts array which is intially empty.
        xAttempts.push(parseInt(i-1));
        console.log(xAttempts);

        //set "X" for "text" element
        text.innerHTML="X";

        //apply style i.e the color to the text element
        text.style.color = '#FAB201';

        //function result is invoked and three parameters are passed.
        result(winningCombinations,xAttempts,"X");
    }
    else{
        oAttempts.push(parseInt(i-1));
        console.log(oAttempts)
        text.innerHTML="O";
        text.style.color = '#FAB201';
        result(winningCombinations,oAttempts,"O");
    }
    // the value gets incremented by 1
    click++;

    //if the condition is fullfilled the following code will run and the message is printed
    if(click == 9 && wonTheGame == 0){
            gameResult.style.visibility="visible";
            message.innerHTML = "It's a tie 🤝 ";
    }
}

//Result function
function result(winningCombinations, attempts, player){
    let flag = 0;
    let checker = [];
    for (var i = 0; i < winningCombinations.length; i++) {
        console.log(winningCombinations[i]);

        //it will check whether the winningCombinations is array or not if it is array
        if (Array.isArray(winningCombinations[i])){

            //it will set the parameters for result.
            result(winningCombinations[i],attempts,player);
        }else{
            //if the attempts includes the array the desired combination
            if(attempts.includes(winningCombinations[i])){

                //checker will have the boolean value as true
                checker.push(true);

                //flag gets increament by 1
                flag++;
            } else {
                //when the condition fails the checker will have the boolean value as false
                checker.push(false);
            }
        }
    }
    //the condition is true the message is printed
    if (checker.every(check => check === true)&&flag>2){
            gameResult.style.visibility="visible";
            message.innerHTML ="'"+ player +"'" + " Won the game!";
            wonTheGame=1;
    }
}

//Restart function
//restarts the game when the user clicks on the button restart i.e play again
restart.onclick=()=>{
    history.go(0);
}