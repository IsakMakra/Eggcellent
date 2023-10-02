"use strict";

function initiateMainPage(){
    // document.querySelector("#startTimer").addEventListener("click", startTimer);
    document.querySelector("#customizeEgg").addEventListener("click", renderCustomizeModal);
    document.getElementById("info_button").addEventListener("click", display_info);
}

function renderCustomizeModal(){

    const customizeModal = document.createElement("div");
    customizeModal.setAttribute("id", "overlay");
    customizeModal.innerHTML = `
        <div id="customizePage">

            <div id="eggsCount">
                <div>How many eggs?</div>
                <div class="options">
                    <div id="countMinus">-</div>
                    <div id="eggCounter">4</div>
                    <div id="countPlus">+</div>
                </div>
            </div>

            <div id="coldOrWarm">
                <div>Are they cold or warm?</div>
                <div class="options">
                    <div id="cold"></div>
                    <div id="warmContainer">
                        <div id="warm"></div>
                    </div>
                </div>
            </div>

            <div id="eggSize">
                <div>Egg size</div>
                <div class="options">
                    <div id="smallEgg">S</div>
                    <div id="mediumEgg">M</div>
                    <div id="largeEgg">L</div>
                    <div id="extraLargeEgg">XL</div>
                </div>
            </div>

            <div id="boilType">
                <div>Boil-type</div>
                <div class="options">
                    <div id="softBoiled">
                        Soft
                        <div id="soft"></div>
                    </div>
                    <div id="mediumBoiled">
                        Medium
                        <div id="medium"></div>
                    </div>
                    <div id="hardBoiled">
                        Hard
                        <div id="hard"></div>
                    </div>        
                </div>
            </div>

            <div id="averageTime">04:37</div>
            <button id="closeCustomize">Close</button>
        </div>
    `
    
    document.querySelector("#wrapper").appendChild(customizeModal);
    
}

function display_info () {
    document.querySelector("#wrapper").innerHTML += `
        <div id="overlay"> 
            <div id="info_background">
                <div id="close_button"></div>
                <p id="info_text"></p>
                <div id="next_message_button"></div>
            </div>
        </div>
    `;

    let nr_of_messages_displayed = 0;

    let messages = [
        `Click on "customize" button at the buttom of the screen to manage your options.`,
        `Before putting your eggs in the pot, make sure that the water is boiling.`,
        `Poke a hole in the bottom of the egg/eggs to minimize the risk of the egg cracking.`,
        `Gently lower the egg/eggs into the pot, then start the timer!`
    ];

    let info_text = document.getElementById("info_text");
    info_text.textContent = messages[0];

    let next_message_button = document.getElementById("next_message_button");
    next_message_button.addEventListener("click", display_next_message);

    document.getElementById("close_button").addEventListener("click", () => {
        document.getElementById("overlay").remove();
        document.querySelector("#info_button").addEventListener("click", display_info);
    })

    function display_next_message() {
        nr_of_messages_displayed += 1;

        info_text.textContent = messages[nr_of_messages_displayed];

        if(nr_of_messages_displayed === messages.length - 1) {
            next_message_button.remove();
        }
    }
}