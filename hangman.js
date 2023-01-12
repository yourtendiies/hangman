// html elements
const keyboard = document.getElementById("keyboard");
const display = document.getElementById("display");
const retryDiv = document.querySelector(".gameLost");
const retryBtn = document.getElementById("retryBtn");
const hangContainer = document.querySelector(".container");
const actualWord = document.getElementById("wordDis");
const scoreDis = document.getElementById("score");
const logoutBtn = document.getElementById("logout_btn");
scoreDis.textContent += localStorage.getItem("score");
// hide the dive untill the game is lost
retryDiv.style.display = "none";

// global variables
let globalWord = "";
let hiddenWord = "";
let score = 0;

// page images
function hangmanImages() {
    let picArray = [];
    for(let i = 1; i<7; i++) {
        const pic = document.createElement("img");
        pic.src = `images/pic${i}.jpg`;
        picArray.push(pic);
    }
    return picArray;
}


// array countaining the pics
const picArray = hangmanImages();

// number of tries given
var numTries = 5;

// image index
var i = 0

//creating keyboard letters
let letters = "abcdefghijklmnopqrstuvwxyz";
function displayButtons() {
	for (let c = 0; c < letters.length; c++) {
	        const button = document.createElement("button");

            // leaving the value lower case 
	        button.value = letters[c];

            // displaying the letters as upper case
	        button.textContent = letters[c].toUpperCase();

            // on every click
	        button.addEventListener("click", (event)=>{
	            checkAnswer(event)
	        })

            // adding the created buttons
	        keyboard.appendChild(button);
	    
	};
}
//access to json file 
// local api
fetch("jsonFiles/words.json")
.then(
    function(response){
    return response.json();
}
).then(
    function(data){
    // we filtered the json file before using it to get rid of the words that have less than 3 characters

    //generate random word from the json file
    let pickWord =  data.words[Math.floor(Math.random() * data.words.length)];

    // making the generated word usable for the whole file
    globalWord = pickWord;
    console.log(pickWord);

    // get the hidden word / encrypted word
    hiddenWord = hangword(pickWord).split("");

    // display the encrypted the word
    display.textContent = hiddenWord.join(" ");

    // display the buttons
    displayButtons()
})

// generate the encrypted word
function hangword(word) {

    // working on the word as an array / converting it
	let wrd = word.split("");

    // generate a letter from the word
	let rcidx = Math.floor(Math.random() * wrd.length);

    // generate two letters from the word if it has more than 4 characters
    if(wrd.length >= 5){
        var rcidx2 = Math.floor(Math.random() * wrd.length);

            // the two characters have to be different
            while(rcidx == rcidx2){
                rcidx2 = Math.floor(Math.random() * wrd.length);
                break;
        };
    }

	for (let c = 0; c < wrd.length; c++) {

        // if the letters are different from the generated ones;
	    if (c != rcidx && c != rcidx2) {

            // replace them with an underscore
	        wrd[c] = "_";
	    }
	}

    // re-converting the new encrypted word to a string
	let newword = wrd.join("");
    return newword;
}

// process the player's answer/the button the player clicked on 
function checkAnswer(event) {

    // as long as the player still has tries
    if (numTries != 0) {

        // check if the letter(button value) is included in the generated word
        if (globalWord.includes(event.target.value)) {
            
            // for each occurrence / letter
            indexesOf(globalWord, event.target.value).forEach(occu=>{
                hiddenWord[occu] = event.target.value;

                // display the word after clicking the right word
            })
            display.textContent = hiddenWord.join(' ');
            
            // comparing the two tables to see if the player guessed the word right
            hiddenWord.join('') == globalWord ? gameWon() : null;

            // doesn't apply to words that have two or more similar letters
            // globalWord.indexOf(event.target.value) => index of the hidden letter
            // hiddenWord[globalWord.indexOf(event.target.value)] = event.target.value;
            
            // test
            // console.log("hidden word",hiddenWord);
            // console.log("global word",globalWord.split(""));
            
        } else {
            
    
            // get the document's image
            let docImg = document.getElementById('img')
            // console.log(docImg.src);
    
            // change the src attribut to the current one in the array
            docImg.src = picArray[i].src;

            // increase the index to match the following image
            i++;

            // decrease the number of tries given to the player
            numTries--;
        }
    } 

    // the player finished the given tries => numTries = 0
    else {
        gameLost();
    }
} 


function indexesOf(word, letter){

    // an array of indexes
    let indexes = [];
    word.split("").forEach((l, i)=>{
        l == letter ? indexes.push(i) : null;
    })

    return indexes;
}

// the user won the game 
function gameWon() {
    // increasing the score
    increaseScore();
    location.reload();
}

function gameLost() {
    hangContainer.style.display = "none";
    retryDiv.style.display = "block";
    actualWord.textContent = globalWord;
    retryBtn.addEventListener("click",function(){
        location.reload();
        localStorage.setItem("score",0)
            })
}
function increaseScore() {
    if(localStorage.getItem("score") === null ){
        localStorage.setItem("score",score);
    }
    else {
        score = parseInt(localStorage.getItem("score"));
        score = score + 10;
        scoreDelivery(score);
        scoreDis.textContent = "score:"+score;
        localStorage.setItem("score",score);
        console.log(score);   
    }
}

// logging out
logoutBtn.addEventListener("click", function(){
    localStorage.setItem("score",0);
})