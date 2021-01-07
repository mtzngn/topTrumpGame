//The game is played taking turns between one players’ hand of 15
// cards and the other player’s hand. The cards have statistics on
// them which will allow the user to pick an attribute and compare
// that attribute with the other players’ top card; whoever has the
// strongest chosen attribute, wins both cards. If the values are the
// same, both cards go into limbo and whoever wins the next hand,
// wins the limbo cards and the ones just battled. The winning
// player of the hand continues to choose until they lose.


//30 cards and several attributes for each card
//2 players turn by turn chooses an attribute to compare and higher one wins the cards.
//who has the most cards at the end of game wins.
//if attributes turns out to be equal than they go to limbo and will be added to next rounds winner.

//cards will have 5 statistics fetched from pokemon api.

//create players
//create game loop
//implement score adding
//implement limbo 
//impelment game ending

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
let pokemonStats = [];

fetch("https://pokeapi.co/api/v2/pokemon?limit=200offset=200")
.then((response)=> response.json())
.then((data) => {
	data.results.forEach((data, i) => {
        pokemonArr.push(new Cards(`${data.name}`))

        // console.log(data)
		fetch(`https://pokeapi.co/api/v2/pokemon/${data.name}`)
		.then((response1)=> response1.json())
		.then((data) => {
            pokemonStats.push(data.stats)
            pokemonArr[i].hp = data.stats[0].base_stat
            pokemonArr[i].attack = data.stats[1].base_stat
            pokemonArr[i].defense = data.stats[2].base_stat
            pokemonArr[i].specialAttack =data.stats[3].base_stat
            pokemonArr[i].specialDefense = data.stats[4].base_stat
            pokemonArr[i].speed = data.stats[5].base_stat



			// console.log(data.stats)

		})
    })})






			// let pokemonImg = document.createElement("img")
			// pokemonImg.src = data.sprites.front_default
			// document.getElementById(`cardDiv${i}`).appendChild(pokemonImg)
			// pokemonImg.style.transform = "scale(2)"
			// pokemonImg.style.margin = "30px"