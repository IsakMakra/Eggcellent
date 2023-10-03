"use strict";

document.getElementById("startTimer").addEventListener("click", start_timer);

function start_timer() {
    let time = document.getElementById("timer");
    let timer_button = document.getElementById("startTimer");
    timer_button.removeEventListener("click", start_timer);

    const timerButtonIcon = timer_button.querySelector(".startIcon");
    timerButtonIcon.classList.add("stopIcon");
    timerButtonIcon.classList.remove("startIcon");

    let timer_text = document.getElementById("startText");
    timer_text.textContent = "STOP";  
    let loading_bar = document.getElementById("loadingBar");

    const customizeEggButton = document.querySelector("#customizeEgg");
    customizeEggButton.style.opacity = 0.5;
    customizeEggButton.removeEventListener("click", renderCustomizeModal);

    timer_button.addEventListener("click", stop_timer);

    function stop_timer(){
        clearInterval(count_down);
        timer_text.textContent = "START";
        time.innerText = "00:00";
        loading_bar.style.height = "0%"

        timerButtonIcon.classList.remove("stopIcon");
        timerButtonIcon.classList.add("startIcon");

        customizeEggButton.style.opacity = 1;
        customizeEggButton.addEventListener("click", renderCustomizeModal);

        toggleStartTimerButton();
        timer_button.removeEventListener("click", stop_timer);
        timer_button.addEventListener("click", start_timer);
    }

    let start_time = time.innerText.split(":");
    let minutes = parseInt(start_time[0]);
    let seconds = parseInt(start_time[1]);

    let start_time_seconds = minutes * 60 + seconds;

    let count_down = setInterval( () => {
        time.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if(minutes === 0 && seconds === 0) {
            clearInterval(count_down);
        }
        else {
            if(seconds === 0) {
                minutes--;
                seconds = 59;
            }
            else {
                seconds--;
            }
        }

        let time_left_seconds = (minutes * 60) + seconds;
        let percentage = 100 - time_left_seconds / start_time_seconds * 100;
        loading_bar.style.height = `${percentage}%`;

    }, 1000);
}