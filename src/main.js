const table = document.querySelector('#table');
const resetButton = document.querySelector('#reset');
resetButton.onclick = () => reset();
const newGameButton = document.querySelector('#new-game');
newGameButton.onclick = () => newGame();
const playerTurn = document.querySelector('#player-turn');

const roundsTable = document.querySelector('#rounds');

let player1;
let player2;

let win = false;

let sort = true;

const tiles = [];
const markTiles = [];

const allMatches = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const matches = (player, s) => {
	//Test
	console.log('-------------------');
	//---

	allMatches.map((match) => {
		if (
			tiles[match[0]].innerText === s &&
			tiles[match[1]].innerText === s &&
			tiles[match[2]].innerText === s
		) {
			alert('¡MATCH!: ' + player + ' Wins!');
			tiles.map(
				(tile) => (tile.onclick = () => alert('¡' + player + ' Wins!'))
			);

			const round = document.createElement('h3');
			round.innerText = `${player} wins the round.`;
			roundsTable.append(round);

			win = true;
		}

		//Test
		console.log(
			'MATCH',
			'mark:',
			tiles[match[0]].innerText,
			'tile:',
			tiles[match[0]].dataset.mark,
			'mark:',
			tiles[match[1]].innerText,
			'tile:',
			tiles[match[1]].dataset.mark,
			'mark:',
			tiles[match[2]].innerText,
			'tile:',
			tiles[match[2]].dataset.mark
		);
		//---
	});
};

const mark = (element, index) => {
	if (!markTiles.includes(index)) {
		if (sort) {
			element.innerHTML = 'X';
			matches(player1, 'X');
		} else {
			element.innerHTML = 'O';
			matches(player2, 'O');
		}
		sort = !sort;
	} else {
		alert("you can't rewrite the tile");
	}

	sort
		? (playerTurn.innerHTML = `It's the turn of <b>${player1}</b>`)
		: (playerTurn.innerHTML = `It's the turn of <b>${player2}</b>`);

	markTiles.push(index);

	if (win) {
		reset();
	} else if (markTiles.length === 9 && win === false) {
		alert('¡Tables!');

		const round = document.createElement('h3');
		round.innerText = `Tables`;
		roundsTable.append(round);

		reset();
	}
};

const addTiles = () => {
	for (i = 0; i < 9; i++) {
		const tile = document.createElement('div');
		tile.dataset.mark = i;
		tile.className = 'tile';
		tiles.push(tile);
	}

	tiles.map((elm, index) => {
		elm.onclick = () => mark(elm, index);
		table.append(elm);
	});
};

const reset = () => {
	tiles.map((elm, index) => {
		elm.innerText = '';
		elm.onclick = () => mark(elm, index);
		table.append(elm);
	});

	markTiles.splice(0, markTiles.length);
	console.log(markTiles);

	sort = !sort;
	sort
		? (playerTurn.innerHTML = `It's the turn of <b>${player1}</b>`)
		: (playerTurn.innerHTML = `It's the turn of <b>${player2}</b>`);

	win = false;
};

const newGame = () => {
	tiles.map((elm, index) => {
		elm.innerText = '';
		elm.onclick = () => mark(elm, index);
		table.append(elm);

		markTiles.splice(0, markTiles.length);
	});

	roundsTable.innerHTML = '';

	sort = true;
	playerTurn.innerHTML = `It's the turn of <b>${player1}</b>`;

	win = false;
};

const setNames = (event) => {
	event.preventDefault();
	const modal = document.querySelector('#setNames');
	const p1 = document.querySelector('#p1');
	const p2 = document.querySelector('#p2');

	player1 = p1.value || 'Player 1';
	player2 = p2.value || 'Player 2';

	sort
		? (playerTurn.innerHTML = `It's the turn of <b>${player1}</b>`)
		: (playerTurn.innerHTML = `It's the turn of <b>${player2}</b>`);

	const names = document.querySelector('#names');
	const np1 = document.createElement('h3');
	np1.innerText = `P1's name: ${player1}`;
	const np2 = document.createElement('h3');
	np2.innerText = `P2's name: ${player2}`;

	names.append(np1, np2);

	modal.style.display = 'none';
};

const cancelNames = () => {
	const modal = document.querySelector('#setNames');

	player1 = 'Player 1';
	player2 = 'Player 2';

	modal.style.display = 'none';
};

addTiles();
