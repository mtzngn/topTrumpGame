//30 cards colection of random pokemons with 5 statistics fetched from pokemon api
//2 players turn by turn chooses an attribute to compare and higher one wins the cards.
//who has the most cards at the end of game wins.
//if attributes turns out to be equal than they go to limbo and will be added to next rounds winner.

//creating the variables for DOM manipulation
let pokemonName1 = document.getElementById("pokemonName1")
let pokemonImg1 = document.getElementById("pokemonImg1")
let player1Hp = document.getElementById("player1Hp")
let player1Attack = document.getElementById("player1Attack")
let player1Defense = document.getElementById("player1Defense")
let player1SpecialA = document.getElementById("player1SpecialA")
let player1Speed = document.getElementById("player1Speed")
let player1Score = document.getElementById("player1Score")


let pokemonImg2 = document.getElementById("pokemonImg2")
let player2Hp = document.getElementById("player2Hp")
let player2Attack = document.getElementById("player2Attack")
let player2Defense = document.getElementById("player2Defense")
let player2SpecialA = document.getElementById("player2SpecialA")
let player2Speed = document.getElementById("player2Speed")
let player2Score = document.getElementById("player2Score")


let pokemonAttributes = document.getElementsByClassName("pokemonAttributes")
let startB = document.getElementById("startB")
startB.addEventListener("click", ()=>{init()})

//create the cards class
class Cards {
    constructor(name){
        this.name = name
        this.hp = null
        this.attack = null
        this.defense = null
        this.specialAttack = null
        this.specialDefense = null
        this.speed = null
    }
}
//fetch the data from pokemon api adn create cards
let pokemonArr = [];
let gameCards = [];
let limbo = 0;
let roundNum = 0;

//first we fetch the pokemon names and from their names we fetch their character information

fetch("https://pokeapi.co/api/v2/pokemon?limit=200offset=200")
.then((response)=> response.json())
.then((data) => {
	data.results.forEach((data, i) => {
        pokemonArr.push(new Cards(`${data.name}`))

		fetch(`https://pokeapi.co/api/v2/pokemon/${data.name}`)
		.then((response1)=> response1.json())
		.then((data1) => {
            pokemonArr[i].hp = data1.stats[0].base_stat
            pokemonArr[i].attack = data1.stats[1].base_stat
            pokemonArr[i].defense = data1.stats[2].base_stat
            pokemonArr[i].specialAttack =data1.stats[3].base_stat
            pokemonArr[i].specialDefense = data1.stats[4].base_stat
            pokemonArr[i].speed = data1.stats[5].base_stat
            pokemonArr[i].img = data1.sprites.front_default
        })
    })
    }
)
//create players
class Players {
    constructor(name, score, chooseCard ) {
        this.name = name
        this.score = score
        this.chooseCard = chooseCard
        this.choosenAttribute = null
    }
    wonHand() {
        this.score++
        this.chooseCard = true
        console.log(`it is now true for ${this.name}`)
    }
    losthand() {
        this.chooseCard = false
        console.log(`it is now false for ${this.name}`)
    }
}
const player1 = new Players("player1", 0, true)
const player2 = new Players("player2", 0, false)


pokemonAttributes[0].childNodes.forEach((attr, i)=>{
    if (i % 2 != 0) {
        pokemonAttributes[0].childNodes[i].addEventListener("click", ()=>{
            if (player1.chooseCard == true) {
                player1.choosenAttributeValue = parseInt(`${pokemonAttributes[0].childNodes[i].childNodes[1].textContent}`)
                player2.choosenAttributeValue = `${pokemonAttributes[1].childNodes[i].childNodes[1].textContent}`
                console.log(player1.choosenAttributeValue)
                console.log(player2.choosenAttributeValue)
                setTimeout(pokemonGame,1000)
                
            }
        })
    }
})
 
pokemonAttributes[1].childNodes.forEach((attr, i)=>{
    if (i % 2 != 0) {
        pokemonAttributes[1].childNodes[i].addEventListener("click", ()=>{
            if(player2.chooseCard == true) {
                player1.choosenAttributeValue = parseInt(`${pokemonAttributes[0].childNodes[i].childNodes[1].textContent}`)
                player2.choosenAttributeValue = parseInt(`${pokemonAttributes[1].childNodes[i].childNodes[1].textContent}`)
                console.log(player1.choosenAttributeValue)
                console.log(player2.choosenAttributeValue)
                setTimeout(pokemonGame,1000)
            }
        })
    }
})

//initialize the sattrting game conditions
function init  () {
    player1.score = 0;
    player2.score = 0;
    limbo = 0;
    updateDom()
}
let player1Cards = []
let player2Cards = []

setTimeout(() => {
    for (let i = 0; i < 30; i ++) {
        gameCards[i] = pokemonArr[(Math.floor(Math.random() * 6 * i))]
    }
    player1Cards = gameCards.slice(0, 15)
    player2Cards = gameCards.slice(15, 30)
    console.log(player1Cards)
}, 100);
    // show cards first, let user choose the attribute
const updateDom = () => {
    pokemonName1.innerText = player1Cards[roundNum].name
    pokemonImg1.style.background =` url(${player1Cards[roundNum].img})`
    player1Hp.innerText = player1Cards[roundNum].hp
    player1Attack.innerText = player1Cards[roundNum].attack
    player1Defense.innerText = player1Cards[roundNum].defense
    player1SpecialA.innerText = player1Cards[roundNum].specialAttack
    player1Speed.innerText = player1Cards[roundNum].speed
    
    pokemonName2.innerText = player2Cards[roundNum].name
    pokemonImg2.style.background =` url(${player2Cards[roundNum].img})`
    player2Hp.innerText = player2Cards[roundNum].hp
    player2Attack.innerText = player2Cards[roundNum].attack
    player2Defense.innerText = player2Cards[roundNum].defense
    player2SpecialA.innerText = player2Cards[roundNum].specialAttack
    player2Speed.innerText = player2Cards[roundNum].speed
}


//create game loop
const pokemonGame = () => {
    //compare cards choosen attributes
    console.log(`this round player1 is ${player1.choosenAttributeValue} and player2 has ${player2.choosenAttributeValue}`)
    if(player1.choosenAttributeValue > player2.choosenAttributeValue ) {
        player1.wonHand()
        player2.losthand()
        if (limbo != 0) {
            player1.score += limbo;
            limbo = 0;
        }
    } else if (player1.choosenAttributeValue < player2.choosenAttributeValue ) {
        console.log("heree")
        player2.wonHand()
        player1.losthand()
        if (limbo != 0) {
            player2.score += limbo;
            limbo = 0;
        }
    } else {
        limbo++
    }
    player1Score.innerText = player1.score
    player2Score.innerText = player2.score


    roundNum++
    updateDom()

    if((player1.score + player2.score) == 15) {
        console.log("game finished")
        if (player1.score > player1.score) {
            console.log(`winner is ${player1.name}`)
        } else {
            console.log(`winner is ${player2.name}`)
        }
        init()
    }
    console.log(player1.score)
    console.log(player2.score)

}
// setTimeout(pokemonGame,1000)

// let pokemonImg = document.createElement("img")
// pokemonImg.src = data.sprites.front_default
// document.getElementById(`cardDiv${i}`).appendChild(pokemonImg)
// pokemonImg.style.transform = "scale(2)"
// pokemonImg.style.margin = "30px"