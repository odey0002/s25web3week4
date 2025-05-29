

//create global variables
let colourPool = ["red", "red", "orange", "orange", "yellow", "yellow", "green", "green", "blue", "blue", "purple", "purple"];
//when the user clicks on a card for the first time, we'll pick a random colour from this array and assign it to that card

//clickedCards will store the cards the user is currently clicking on, by ID - when two cards are in the array, we'll check if there is a matching ID, and if there is, then there is a match.  However, if the IDs do not match, then we'll flip the two cards back over
let clickedCards = [];

//these two globals are to keep track of the user's progress - one for their score, and one for the number of moves
let score=0, moves=0;
//you can declare multiple variables with one 'let' keyword, by separating them with commas

/********************************
 * 	Scripts added in class
********************************/

//Use a loop to add multiple cards, the most common word is "for"... i stands for integer but you can use any letter... as long as i is less than 12 we want it to keep looping
//a for loop has four parts
//set the counter variable (let i=0) and start it at a number
//give the loop a condition to keep counting (i.e keep going as long as i is less than 12)
//tell the counter to increment each time the loop runs (i++ = add 1 to this, i+=2 reduces the number by 2)
for(let i=0; i<12; i++){


//create the new card (a div element)
const card = document.createElement("div");

//add the class "card" to the element
card.classList.add("card");

//create the paragraph element
const para = document.createElement("p")

//add the question mark inside the paragraph
para.textContent = "?";

//add the new paragraph to the card
card.appendChild(para);

//add an event listener to the card, when the user clicks
//this actually says:
//when the user clicks on a card, run the function "flipCard"
card.addEventListener("click", flipCard);

//add the card to the page
document.querySelector("main").appendChild(card); //appendChild is a method for adding an element inside another element e.g child inside a parent


}  //because of the curly braces bracket we can re-use the variables card and para because they seize to exist when used within that space

//when the user clicks on the card.... remember we are adding this function outside the curly braces bracket because we wont be able to use it again if it was inside
function flipCard(){
    if(this.className != "cardFlipped"){

    //to check if its going to work... console.log("clicked!");remember to  remove console.log afterwards

    //change the card's class.... because the word "click" is attached to the function (("click", flipCard);  and   function flipCard()) we can use the keyword "this"
    this.className = "cardFlipped";

    //get a random number between 0 and 11 (because the first position of an array is 0)
    //Math.random() gets you a random decimal btw 0 and 1 (like 0.45, 0.87)
    //multiply the random number by 12, then subtract a small amount so it never actually hits 12
    //Math.floor() rounds a number down

    let ran = Math.floor(Math.random()*12 - 0.001);
    
    //based on the random number, assign the card an ID (from the color pool array up)
    this.id = colourPool[ran];

    //since the card has been clicked, add it to the array that holds which cards are clicked
    //.push adds something to the end of an array
    clickedCards.push(this);
    //console.log(clickedCards);

    //check to see if there are two cards in the array
    //then check to see if theres a match.... == means check if theyre same type while === check to see if theyre the same value
    if(clickedCards.length == 2){
        //check to see if the two cards have the same id
        if(clickedCards[0].id == clickedCards[1].id){
            //console.log("match");
            //call the function to create an overlay message
            createOverlay("match");
        }else{
            //call the function to create an overlay message
            createOverlay("nomatch");

            //if it's not a match, flip the cards back over (change the class)...
            //the forEach loop looks at an array and does something to each thing in that array
            //you have to pass it a temporary variable (we're using thisCard) to store each item in the array
            clickedCards.forEach(function(thisCard){
                thisCard.className = "card";
            });
        }

        //make the array an empty array, regardless of whether there's a match or not
        clickedCards = [];
    }
    }

}


//this function creates an overlay to display a message to the user
//messageType is a variable to store the information sent to the function (when we called it)
function createOverlay(messageType){
    //console.log("overlay");
    //create a div for the overlay background, give it an id
    //add it to the body element (outside of the rest of your HTML)
    const overlay = document.createElement("div");
    overlay.id = "overlay"; //we want to add the overlay to the body of an id
    //add an event listener to remove the overlay when clicked
    overlay.addEventListener("click", totalExistenceFailure);

    //add a message to the overlay by creating a paragraph, add the message, then put the overlay on the paragraph
    const para = document.createElement("p");
    //check which type of overlay this is
    //use the switch statement for multiple options
    switch(messageType){
        case "nomatch" :
            para.textContent = "No Match!";
            break; //stops the switch statement from running
        case "match":
            para.textContent = "Match!";
            break; //stops the switch statement from running 
    }

    overlay.appendChild(para);
    document.querySelector("body").appendChild(overlay);
}

function totalExistenceFailure(){
    //we have to get the elements parent to remove the element
    this.parentNode.removeChild(this);
}
