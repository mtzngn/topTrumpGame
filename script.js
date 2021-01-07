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
//first we fetch the pokemon names and from their names we fetch their character information

fetch("https://pokeapi.co/api/v2/pokemon?limit=200offset=200")
.then((response)=> response.json())
.then((data) => {
	data.results.forEach((data, i) => {
        pokemonArr.push(new Cards(`${data.name}`))

		fetch(`https://pokeapi.co/api/v2/pokemon/${data.name}`)
		.then((response1)=> response1.json())
		.then((data) => {
            pokemonArr[i].hp = data.stats[0].base_stat
            pokemonArr[i].attack = data.stats[1].base_stat
            pokemonArr[i].defense = data.stats[2].base_stat
            pokemonArr[i].specialAttack =data.stats[3].base_stat
            pokemonArr[i].specialDefense = data.stats[4].base_stat
            pokemonArr[i].speed = data.stats[5].base_stat
        })})
})
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


//implement score adding
//implement limbo 
//impelment game ending



















// let pokemonImg = document.createElement("img")
// pokemonImg.src = data.sprites.front_default
// document.getElementById(`cardDiv${i}`).appendChild(pokemonImg)
// pokemonImg.style.transform = "scale(2)"
// pokemonImg.style.margin = "30px"