var sounds = [];
var guessAmount = 1;
var songList = [];
var currentSong;

fetch('./song-list.txt')
	.then(response => response.text())
	.then(data => {
		console.log(data)
		songList = data.split("\n")
		newSong();
		songList.forEach(element => {
			var option = document.createElement("option");
			option.innerHTML = element;
			document.getElementById("song-list").appendChild(option);
		});
	})
	.catch(error => console.error(error));

function newSong() {
	currentSong = songList[Math.floor(Math.random() * songList.length)];

	sounds = [];
	
	var drums = document.createElement("audio");
	drums.src = "songs/" + currentSong + "/drums.ogg";
	sounds.push(drums);
	
	var guitar = document.createElement("audio");
	guitar.src = "songs/" + currentSong + "/guitar.ogg";
	sounds.push(guitar);
	
	var keys = document.createElement("audio");
	keys.src = "songs/" + currentSong + "/keys.ogg";
	sounds.push(keys);
	
	var rhythm = document.createElement("audio");
	rhythm.src = "songs/" + currentSong + "/rhythm.ogg";
	sounds.push(rhythm);
	
	var vocals = document.createElement("audio");
	vocals.src = "songs/" + currentSong + "/vocals.ogg";
	sounds.push(vocals);
	
	
	var audios = document.getElementById("audios");
	audios.innerHTML = "";

	sounds.forEach(element => {
		audios.appendChild(element);
		var visual = document.createElement("div");
		visual.innerHTML = element.src.split("/").pop();
		visual.id = element.src.split("/").pop();
		audios.appendChild(visual);
	});
	
	guessAmount = 1;
	document.getElementById("guess-amount").innerHTML = "Guesses left = " + (5 - guessAmount);
}

function play() {
	for (let i = 0; i < guessAmount; i++) {
		sounds[i].currentTime = 60;
		sounds[i].play();
		document.getElementById(sounds[i].src.split("/").pop()).classList.add("playing");
	}
}

function skip() {
	if(guessAmount > 4) {
		newSong();
		return;
	}
	guessAmount++;
	document.getElementById("guess-amount").innerHTML = "Guesses left = " + (5 - guessAmount);

	for (let i = 0; i < guessAmount; i++) {
		sounds[i].currentTime = 60;
		sounds[i].pause();
		document.getElementById(sounds[i].src.split("/").pop()).classList.remove("playing");
	}
	
}

function guess() {
	if(document.getElementById("song-input").value.trim() == currentSong.trim()) {
		console.log("success!")
		newSong();
	} else {
		skip();
	}
}



