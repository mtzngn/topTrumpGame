//30 cards colection of random pokemons with 5 statistics fetched from pokemon api
//2 players turn by turn chooses an attribute to compare and higher one wins the cards.
//who has the most cards at the end of game wins.
//if attributes turns out to be equal than they go to limbo and will be added to next rounds winner.


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
    }
    wonHand() {
        this.score++
        this.chooseCard = true
    }
    losthand() {
        this.chooseCard = false
    }
    //implement the limbo win after

}
const player1 = new Players("player1", 0, true)
const player2 = new Players("player2", 0, false)

//initialize the sattrting game conditions
function init  () {
    player1.score = 0;
    player2.score = 0;
    limbo = 0;
}
//create game loop
const pokemonGame = () => {
    init()
    
    for (let i = 0; i < 30; i ++) {
        gameCards[i] = pokemonArr[(Math.floor(Math.random() * 6 * i))]
    }
    let player1Cards = gameCards.slice(0, 15)
    let player2Cards = gameCards.slice(15, 30)
    console.log(player1Cards)
    console.log(player2Cards)
    let winner = false;
    while(winner == false) {
        for (let i = 0; i < player1Cards.length; i++) {
            console.log(player1Cards[i])
            console.log(player2Cards[i])
            //show cards first, let user choose the attribute
            let choosenAttribute = prompt("Which attribute would you like to choose?")
            if(player1Cards[i][choosenAttribute] > player2Cards[i][choosenAttribute] ) {
                player1.wonHand()
                player2.losthand()
                if (limbo != 0) {
                    player1.score += limbo;
                    limbo = 0;
                }
            } else if (player1Cards[i][choosenAttribute] < player2Cards[i][choosenAttribute] ) {
                player2.wonHand()
                player1.losthand()
                if (limbo != 0) {
                    player1.score += limbo;
                    limbo = 0;
                }
            } else {
                limbo++
            }
            console.log(choosenAttribute)
            //compare cards choosen attributes
        }

        if (player1.score > player2.score) {
            console.log(`The Winner is ${player1.name}`)
        } else if (player1.score < player2.score) {
            console.log(`The Winner is ${player2.name}`)
        } 

        winner = true
    }


}

// setTimeout(pokemonGame,1000)

// let pokemonImg = document.createElement("img")
// pokemonImg.src = data.sprites.front_default
// document.getElementById(`cardDiv${i}`).appendChild(pokemonImg)
// pokemonImg.style.transform = "scale(2)"
// pokemonImg.style.margin = "30px"