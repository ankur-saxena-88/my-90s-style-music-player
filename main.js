let audioPlayer = document.getElementById('audioPlayer');
    let fileInput = document.getElementById('fileInput');
    let playlist = document.getElementById('playlist');
    let nowPlaying = document.getElementById('nowPlaying');
    let files = [];
    let currentSongIndex = 0;
    let isPlaying = false;

// Load songs from file input
fileInput.addEventListener('change', function(e) {
    files = Array.from(e.target.files);
    createPlaylist();
    playSong(0);  // Automatically play the first song
});

// Create playlist in UI
function createPlaylist() {
    playlist.innerHTML = '';
    files.forEach((file, index) => {
    let songDiv = document.createElement('div');
    songDiv.textContent = file.name;
    songDiv.onclick = () => playSong(index);
    playlist.appendChild(songDiv);
  });
}

// Play selected song
function playSong(index) {
    if (index < 0 || index >= files.length) return;
    currentSongIndex = index;
    let file = files[index];
    let url = URL.createObjectURL(file);
    audioPlayer.src = url;
    audioPlayer.play();
    isPlaying = true;
    updateNowPlaying(file.name);
}

// Play/Pause button function
function togglePlay() {
    if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
    } else {
    audioPlayer.play();
    isPlaying = true;
    }
}

// Next song function
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % files.length;
    playSong(currentSongIndex);
}   

    // Previous song function
    function prevSong() {
      currentSongIndex = (currentSongIndex - 1 + files.length) % files.length;
      playSong(currentSongIndex);
    }

    // Volume up function
    function volumeUp() {
      if (audioPlayer.volume < 1) audioPlayer.volume += 0.1;
    }

    // Volume down function
    function volumeDown() {
      if (audioPlayer.volume > 0) audioPlayer.volume -= 0.1;
    }

    // Update the "Now Playing" section
    function updateNowPlaying(songName) {
      nowPlaying.textContent = `Now Playing: ${songName}`;
    }

    // Automatically go to the next song when one ends
    audioPlayer.addEventListener('ended', nextSong);

// Update music timeline as the song plays
    audioPlayer.addEventListener('timeupdate', () => {
      musicTimeline.max = audioPlayer.duration;
      musicTimeline.value = audioPlayer.currentTime;
    });
