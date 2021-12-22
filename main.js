let output = document.getElementById('duration');
let activity = document.getElementById('activity');
let worker;
const ding = new Audio('ding.mp3')
const pomodoroBtn = document.getElementById('btn');
const work = 1500;
const breakShort = 300;
const breakLong = 1800;

document.addEventListener('DOMContentLoaded', init);


function init() {
    worker = new Worker('worker.js');
    worker.addEventListener('message', workerMessaged);
    worker.addEventListener('error', workerError);
    let timeoutHandle;

    pomodoroBtn.addEventListener('click', (e) => {
        pomodoroBtn.innerHTML = 'Stop';
        activity.innerHTML = 'Work1';
        worker.postMessage(work);
        timeoutHandle = setTimeout(() => {
            ding.play();
            activity.innerHTML = 'Break1';
            worker.postMessage(breakShort);
            setTimeout(() => {
                ding.play();
                activity.innerHTML = 'Work2';
                worker.postMessage(work); 
                setTimeout(() => {
                    ding.play();
                    activity.innerHTML = 'Break2';
                    worker.postMessage(breakShort);
                    setTimeout(() => {
                        ding.play();
                        activity.innerHTML = 'Work3';
                        worker.postMessage(work);
                        setTimeout(() => {
                            ding.play();
                            activity.innerHTML = 'Break3';
                            worker.postMessage(breakShort);
                            setTimeout(() => {
                                ding.play();
                                activity.innerHTML = 'Work4';
                                worker.postMessage(work);
                                setTimeout(() => {
                                    ding.play();
                                    activity.innerHTML = 'Big Break';
                                    worker.postMessage(breakLong);
                                    setTimeout(() => {
                                        ding.play();
                                        pomodoroBtn.innerHTML = 'Start';
                                        location.reload();
                                        activity.innerHTML = 'Work';
                                    }, breakLong * 1000);
                                }, work * 1000);
                            }, breakShort * 1000);
                        }, work * 1000);
                    }, breakShort * 1000);
                }, work * 1000);
            }, breakShort * 1000);
        }, work * 1000); 

        pomodoroBtn.addEventListener('click', (e) => {
            worker.terminate();
            clearTimeout(timeoutHandle);
            location.reload();
            return false;
        })
    })
}

function workerMessaged(e) {
    let data = e.data;
    //console.log(data);
    output.innerHTML = JSON.parse(JSON.stringify(data));
}

function workerError(err) {
    console.log(err.message);
}