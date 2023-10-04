"use strict";

function initiateMainPage(){
    // document.querySelector("#startTimer").addEventListener("click", startTimer);
    document.querySelector("#customizeEgg").addEventListener("click", renderCustomizeModal);

    document.getElementById("info_button").addEventListener("click", display_info);

    toggleStartTimerButton();
}

function renderCustomizeModal(){
    
    document.getElementById("loadingBar").style.height = "0%"
    const customizeModal = document.createElement("div");

    if(window.localStorage.getItem("customizeEggState")){
        customizeModal.innerHTML = window.localStorage.getItem("customizeEggState");
    }else{
        customizeModal.innerHTML = `
            <div id="customizePage">

                <div id="eggsCount">
                    <div>How many eggs?</div>
                    <div class="options eggAmount">
                        <div class="button" id="countMinus">-</div>
                        <div id="eggCounter">1</div>
                        <div class="button" id="countPlus">+</div>
                    </div>
                </div>

                <div id="coldOrWarm">
                    <div>Are they cold or warm?</div>
                    <div class="options">
                        <div id="cold" class="selected">
                            <div id="coldImage"></div>
                        </div>
                        <div id="warm">
                            <div id="warmImage"></div>
                        </div>
                    </div>
                </div>

                <div id="eggSize">
                    <div>Egg size</div>
                    <div class="options">
                        <div id="small" class="selected">S</div>
                        <div id="medium">M</div>
                        <div id="large">L</div>
                        <div id="extralarge">XL</div>
                    </div>
                </div>

                <div id="boilType">
                    <div>Boil-type</div>
                    <div class="options">
                        <div id="soft" class="selected">
                            Soft
                            <div id="softImg"></div>
                        </div>
                        <div id="medium"">
                            Medium
                            <div id="mediumImg"></div>
                        </div>
                        <div id="hard">
                            Hard
                            <div id="hardImg"></div>
                        </div>        
                    </div>
                </div>

                <div id="averageTime"></div>
                <div id="closeCustomizeContainer">
                    <button class="button" id="closeCustomize">Close</button>
                </div>
            </div>
        `
    }

    customizeModal.setAttribute("id", "overlay");
    document.querySelector("#wrapper").appendChild(customizeModal);

    const customizeEggOptions = document.querySelectorAll(".options");
    customizeEggOptions.forEach(prepareOptions);

    calcAndPrintTime();

    customizeModal.querySelector("#closeCustomize").addEventListener("click", event => {
        window.localStorage.setItem("customizeEggState", customizeModal.innerHTML);
        customizeModal.remove()
    });

}

function prepareOptions(eggOptionList){

    if(!eggOptionList.classList.contains("eggAmount")){
        const eggOptions = eggOptionList.querySelectorAll(":scope > div");
        console.log(eggOptionList);
        
        eggOptions.forEach(eggOption => {
            eggOption.classList.add("option");
            eggOption.classList.add("button");

            eggOption.addEventListener("click", event => {
                eggOptions.forEach(eggOption2 => eggOption2.classList.remove("selected"))
                eggOption.classList.add("selected");
                calcAndPrintTime();
            })
        })
        return;
    }

    const eggCountDiv = eggOptionList.querySelector("#eggCounter");
    const countMinus = eggOptionList.querySelector("#countMinus");
    const countPlus = eggOptionList.querySelector("#countPlus");

    countMinus.addEventListener("click", event => {
        let eggCount = parseInt(eggCountDiv.textContent);
        if(eggCount > 1){
            eggCountDiv.textContent = --eggCount;
            calcAndPrintTime();
        }
    })
    countPlus.addEventListener("click", event => {
        let eggCount = parseInt(eggCountDiv.textContent);
        if(eggCount < 5){
            eggCountDiv.textContent = ++eggCount;
            calcAndPrintTime();
        }
    })

}

function calcAndPrintTime(){

    const eggOptions = {
        temperature: {
            cold: 45,
            warm: 0
        },
        size: {
            small: {soft: 210, medium: 360, hard: 570},
            medium: {soft: 270, medium: 420, hard: 630},
            large: {soft: 330, medium: 480, hard: 690},
            extralarge: {soft: 390, medium: 570, hard: 810}
        }
    }

    const eggAmount = parseInt(document.querySelector("#eggCounter").textContent);
    const eggSize = document.querySelector("#eggSize .selected").id;
    const eggTemperature = document.querySelector("#coldOrWarm .selected").id;
    const eggBoilType = document.querySelector("#boilType .selected").id;

    const eggAmountTime = 18 * eggAmount;
    const eggTempTime = eggOptions.temperature[eggTemperature];
    const eggSizeAndBoilTime = eggOptions.size[eggSize][eggBoilType];

    const totalSeconds = eggAmountTime + eggTempTime + eggSizeAndBoilTime;

    console.log(totalSeconds);

    let totalMinutes = (totalSeconds - totalSeconds % 60) / 60;
    let restSeconds = totalSeconds % 60;

    let timeStr = "";

    const customizeTimer = document.querySelector("#averageTime");
    const eggTimer = document.querySelector("#timer");

    totalMinutes > 9 ? timeStr = `${totalMinutes}:` : timeStr = `0${totalMinutes}:`
    restSeconds > 9 ? timeStr += `${restSeconds}` : timeStr += `0${restSeconds}`

    customizeTimer.textContent = timeStr;
    eggTimer.textContent = timeStr;

    const startButton = document.querySelector("#startTimer");
    startButton.removeAttribute("disabled");
    startButton.style.opacity = 1;
}

function display_info () {

    const overlayDiv = document.createElement("div");
    overlayDiv.id = "overlay";
    overlayDiv.innerHTML = `
            <div id="info_background">
                <div class="round_button" id="close_button"></div>
                <p id="info_text"></p>
                <div id="arrow_button_container">
                    <div class="round_button" id="next_message_button"></div>
                </div>
            </div>
    `
    document.querySelector("#wrapper").appendChild(overlayDiv);

    let nr_of_messages_displayed = 0;

    let messages = [
        `Click on the "customize" button at the bottom of the screen to manage your options.`,
        `Before putting your eggs in the pot, make sure that the water is boiling.`,
        `Poke a hole in the bottom of the eggs to minimize the risk of the egg cracking.`,
        `Gently lower the eggs into the pot, then start the timer!`
    ];

    let info_text = document.getElementById("info_text");
    info_text.textContent = messages[0];

    let next_message_button = document.getElementById("next_message_button");
    next_message_button.addEventListener("click", display_next_message);

    document.getElementById("close_button").addEventListener("click", () => {
        document.getElementById("overlay").remove();
        document.querySelector("#info_button").addEventListener("click", display_info);
    })

    let next_exist = true;
    let previous_exist = false;

    function display_next_message() {
        nr_of_messages_displayed += 1;

        info_text.textContent = messages[nr_of_messages_displayed];
    
        if(nr_of_messages_displayed > 0 && !previous_exist) {
            previous_exist = true;
            
            let previous_message_button = document.createElement("div");
            previous_message_button.classList.add("round_button");
            previous_message_button.id = "previous_message_button";
            document.getElementById("arrow_button_container").prepend(previous_message_button)

            previous_message_button.addEventListener("click", () => {
                if(!next_exist) {
                    next_message_button = document.createElement("div");
                    next_message_button.id = "next_message_button";
                    next_message_button.classList.add("round_button");
                    document.getElementById("arrow_button_container").append(next_message_button);
                    next_message_button.addEventListener("click", display_next_message);
                }
                
                nr_of_messages_displayed -= 1;
                next_exist = true;

                document.getElementById("info_text").textContent = messages[nr_of_messages_displayed];
    
                if(nr_of_messages_displayed === 0) {
                    previous_message_button.remove();
                    previous_exist = false;
                }
            })
        }

        if(nr_of_messages_displayed === messages.length - 1) {
            next_message_button.remove();
            next_exist = false;
        }
    }
}

function toggleStartTimerButton(){

    const startButton = document.querySelector("#startTimer")

    if(!startButton.hasAttribute("disabled")){
        startButton.setAttribute("disabled", "true");
        startButton.style.opacity = 0.5;
    }else{
        startButton.removeAttribute("disabled");
        startButton.style.opacity = 1;
    }
}

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
        
        const overlayDiv = document.createElement("div");
        overlayDiv.id = "overlay";
        overlayDiv.innerHTML = `
                <div id="stop_background">
                    <p id="info_text">Are you sure you want to reset the timer?</p>
                    <div id="choice_container">
                        <div class="button choice_button" id="yes">Yes</div>
                        <div class="button choice_button" id="no">No</div>
                    </div>
                </div>
        `
        document.querySelector("#wrapper").appendChild(overlayDiv);
        
        document.getElementById("no").addEventListener("click", () => {
            overlayDiv.remove();
        })
        
        document.getElementById("yes").addEventListener("click", () => {
            overlayDiv.remove();

            let timeoutID = time.dataset.timeoutID;
            clearTimeout(timeoutID);

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
        })
    }

    let start_time = time.innerText.split(":");
    let minutes = parseInt(start_time[0]);
    let seconds = parseInt(start_time[1]);

    let start_time_seconds = minutes * 60 + seconds;

    time_handler();

    function time_handler(){
        if(seconds === 0) {
            minutes--;
            seconds = 59;
        }
        else {
            seconds--;
        }

        let time_left_seconds = (minutes * 60) + seconds;
        let percentage = 100 - time_left_seconds / start_time_seconds * 100;
        loading_bar.style.height = `${percentage}%`;

        time.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if(minutes === 0 && seconds === 0) {
            let alarm = new Audio("media/alarm.wav");
            alarm.play();
            
            timer_text.textContent = "START";
            time.innerText = "00:00";

            timerButtonIcon.classList.remove("stopIcon");
            timerButtonIcon.classList.add("startIcon");

            customizeEggButton.style.opacity = 1;
            customizeEggButton.addEventListener("click", renderCustomizeModal);

            toggleStartTimerButton();
            timer_button.removeEventListener("click", stop_timer);
            timer_button.addEventListener("click", start_timer);

            return;
        }

        let timeoutID = setTimeout(time_handler, 1000);
        time.dataset.timeoutID = timeoutID;
    }
}