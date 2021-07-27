// Select buttons
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const stop = document.querySelector('.stop');
const now = document.querySelector('.now');
const progress = document.querySelector('progress');
const volume = document.querySelector('.volume');
const selector = document.querySelector('#selector');

// Vars Init
let interval;
let song = 'Alex Productions - Legend.mp3'; // Default song
// Create new Audio
let myAudio = new Audio(`./audio/${song}`);

// Add Play event listener
play.onclick = ()=> playFn();
// Play Fn
const playFn = () => {    
    // Disable Play btn
    play.disabled = true;
    let audioSrc = myAudio.src; 
    // console.log(audioSrc.replaceAll('%20', ' '))
    let name = audioSrc.replaceAll('%20', ' ').split('audio/')[1];
    // Set Title
    now.innerHTML = `${name}`
    // Play audio
    myAudio.play();
   // Set progress
    interval = setInterval(()=>{
        console.log('playing song')
        let min = myAudio.currentTime;
        let max = myAudio.duration;
        progress.value = min ;
        progress.max = max ;
        // console.log(min, max);
        if(min >= max ){
            reload();
        };
    },100);
}
// Reload
const reload = ()=>{
    // Set Title
    now.innerHTML = `Play Your Audio`;
    myAudio.load();
    clearInterval(interval);
     // Enable Play btn
    play.disabled = false;
    // Reset Progress
    progress.value = 0;
};
stop.onclick = ()=> reload();

// Pause
const pauseFn = () => {
 // Enable Play btn
 play.disabled = false;
 clearInterval(interval);
 // Set Title
 now.innerHTML = `Play Your Audio`
 myAudio.pause();
};
pause.onclick = ()=> pauseFn();

// Volume listener
volume.addEventListener('change', e =>{
    let val = e.currentTarget.value;
    // console.log(val/100);
    myAudio.volume = val / 100;
});
// Select audio file listener
selector.addEventListener('change', e =>{
    // console.log(e.target.files[0].name);
    song = e.target.files[0].name;
    // Reload
    reload();
    // New Audio
    myAudio = new Audio(`./audio/${song}`);
    // Play new song selected
    playFn();
})