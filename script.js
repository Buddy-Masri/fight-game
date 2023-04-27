
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

class Player {
  constructor(name) {
    this.name = name;
    this.health = 100;
  }

  create1() {
    this.name = prompt(`Enter Player 1 Name Please`).toUpperCase()
  }

  create2() {
    this.name = prompt(`Enter Player 2 Name Please`).toUpperCase()
  }

  attack(enemy) {
    let attackDmg = Math.ceil(Math.random() * 10)
    enemy.health -= attackDmg
  }

  heal(player1, player2) {
    if (player1.health < 100) {
      let healPrcntg = 2
      player1.health += healPrcntg
      document.getElementById('p1heal').play()
    } else if (player2.health < 100) {
      let healPrcntg = 2
      player2.health += healPrcntg
      document.getElementById('p2heal').play()
    }
  }
}

class Game {
  constructor() {
    this.isOver = false;
  }

  gameState(player, enemy) {
    if (player.health <= 0 || enemy.health <= 0) {
      this.isOver = true
      console.log(this.isOver)

    } else return
  }

  declareWinner(player1, player2) {
    setTimeout(() => {
      if (this.isOver == true && (player1.health <= 0)) {
        document.getElementById('victory').play()
        alert(`Game is over ${player2.name} wins`)
        document.getElementById('start-container').innerHTML=
        '<button id="start" onclick="fx2()">Retry</button>'
      }
      else if (this.isOver == true && (player2.health <= 0)) {
        document.getElementById('victory').play()
        alert(`Game is over ${player1.name} wins`)
        document.getElementById('start-container').innerHTML=
        '<button id="start" onclick="fx2()">Retry</button>'
      }
      else return

    }, 10);
  }

  reset(player1, player2) {
    this.isOver = false
    player1.name = null
    player2.name = null
    p1NameDiv.innerText = 'Player 1'
    p2NameDiv.innerText = 'Player 2'
    p1HealthDiv.innerHTML = player1.health = 100
    p2HealthDiv.innerHTML = player2.health = 100
    document.getElementById('start-container').innerHTML =
      '<button id="start" onclick="fx()">Start Game</button>'
  }

  simulate(player1, player2) {
    document.getElementById('start-container').innerHTML =
      '<button id="start" onclick="fx2()">Start Game</button>'
    let simulation1 = Math.ceil(Math.random() * 10)
    let simulation2 = Math.ceil(Math.random() * 10)
    player1.health = simulation1
    player2.health = simulation2
    p1HealthDiv.innerHTML = player1.health
    p2HealthDiv.innerHTML = player2.health
    document.getElementById('victory').play()
    setTimeout(() => {
      if (player1.health > player2.health) {
        if (player1.name == null) { alert('Player 1 wins') }
        else { { alert(`${player1.name} Wins`) } }
      }
      else if (player2.health > player1.health) {
        if (player2.name == null) { alert('Player 2 wins') }
        else { alert(`${player2.name} Wins`) }
      }
      else { alert("it's a draw") }
    }, 100)
    this.isOver = true
  }
}

let player1 = new Player();
let player2 = new Player();
let nGame = new Game()


const simulation = () => {
  nGame.simulate(player1, player2)
}

const fx = () => {
  player1.create1()
  player2.create2()
  player1.health = 100
  player2.health = 100
  update()
  document.getElementById('start-container').innerHTML = null
}

const fx2 = () => {
  player1.health = 100
  player2.health = 100
  update()
  document.getElementById('start-container').innerHTML = null
  nGame.isOver=false
}

function update() {
  p1NameDiv.innerText = player1.name
  p2NameDiv.innerText = player2.name
  p1HealthDiv.innerHTML = player1.health
  p2HealthDiv.innerHTML = player2.health
}

document.addEventListener('keypress', function (e) {
  if (player1.name && player2.name != null && nGame.isOver == false) {
    if (e.key == 'q') {
      player1.attack(player2)
      document.getElementById('p1attack').play()
    }
    else if (e.key == 'a') {
      player1.heal(player1)

    }
    else if (e.key == 'p') {
      player2.attack(player1)
      document.getElementById('p2attack').play()
    }
    else if (e.key == 'l') {
      player2.heal(player2)
      document.getElementById('p2heal').play()
    }
    update()
    nGame.gameState(player1, player2)
    nGame.declareWinner(player1, player2)
  }
})








