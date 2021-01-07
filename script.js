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
let gameCards = []

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

//create game loop
const pokemonGame = () => {
    for (let i = 0; i < 30; i ++) {
        gameCards[i] = pokemonArr[(Math.floor(Math.random() * 6 * i))]
    }
    let player1Cards = gameCards.slice(0, 15)
    let player2Cards = gameCards.slice(15, 30)
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
                console.log("player 1 gets the point")
            } else if (player1Cards[i][choosenAttribute] < player2Cards[i][choosenAttribute] ) {
                player2.wonHand()
                player1.losthand()
                console.log("player2 gets the points")
            } else {
                console.log("it is a draw add the cards to limbo")
            }
            console.log(choosenAttribute)
            //compare cards choosen attributes
        }
        console.log(player1)
        console.log(player2)
        winner = true
    }


}

setTimeout(pokemonGame,1000)


//implement score adding
//implement limbo 
//impelment game ending