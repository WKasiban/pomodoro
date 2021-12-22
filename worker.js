function convertSec(s) {
    let min = Math.floor(s / 60);
    let sec = s % 60;
    return min.toString().padStart(2, "0") + ':' + sec.toString().padStart(2, "0");
}

self.addEventListener('message', (e) => {
    //console.log('web worker listenting', e.data);
    let counter = 0;
    let durationLeft = e.data;
    let interval = setInterval(() => {
        counter++;
        let countdown = convertSec(durationLeft - counter);
        self.postMessage(countdown);
        if (counter == durationLeft) {
            clearInterval(interval);
        } 
    }, 1000);
    
    
});
