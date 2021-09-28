const startBtn = document.getElementById('start');

const screens = document.querySelectorAll('.screen');

const timeList = document.getElementById('time-list');

const board = document.getElementById('board');

const colors = ['red','blue','green','yellow','purple','#8dfa07','#05fff3','#f5ae07','#fff200','#9ddb00','#ff8936']

let time = 0;

let score = 0;

const timeEl = document.getElementById('time');


startBtn.addEventListener('click',(event) => {
	event.preventDefault();
	screens[0].classList.add('up');

});

timeList.addEventListener('click',(event) => {
	if(event.target.classList.contains('time-btn'))
	{
		time = parseInt(event.target.getAttribute('data-time'));
		screens[1].classList.add('up')
		startGame();
	}
});

board.addEventListener('click',event => {
	if(event.target.classList.contains('circle'))
	{
		score++;
		event.target.remove();
		createRandomCircle();
	}
});


function startGame()
{	
	setInterval(decreaseTime,1000);
	createRandomCircle();
	setTime(time);
}


function decreaseTime(){
	
	if(time === 0){
		finishGame();
	}
	else{
		let current = --time;
		if(current < 10)
		{
			current = `0${current}`;
		}
		setTime(current);
	}

}

function finishGame()
{	
	timeEl.parentNode.remove();
	board.innerHTML = `<h1>Cчет:  <span class="primary">${score}</span></h1>`;
}


function setTime(value)
{
	timeEl.innerHTML = `00:${value}`;
}


function createRandomCircle()
{
	const circle = document.createElement('div');

	const size = getRandomNumber(10,60);

	const {width,height} = board.getBoundingClientRect();
	const x = getRandomNumber(0,width - size);

	const y = getRandomNumber(0,height - size);

	circle.classList.add('circle');

	circle.style.width = `${size}px`;

	circle.style.height = `${size}px`;

	circle.style.top = `${y}px`;

	circle.style.left = `${x}px`;

	setColor(circle);

	board.append(circle);
}

function getRandomNumber(max,min)
{
	return Math.floor(Math.random() * (max - min) + min);
}

function setColor(element)
{	
	const color = getRandomColor();
	element.style.background = color;
	element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function getRandomColor(){
	const index = Math.floor(Math.random() * colors.length);

	return colors[index];
}


