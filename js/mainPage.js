"use strict";

function renderCustomizeModal(){

    const customizeModal = document.createElement("div");
    customizeModal.classList.add("modal");
    customizeModal.innerHTML = `
        <div class="modalContainer">
            <div id="eggsCount">
                <div id="countMinus">-</div>
                <div id="eggCounter"></div>
                <div id="countPlus">+</div>
            </div>
            <div id="coldOrWarm">
                <div id="cold"></div>
                <div id="warm"></div>
            </div>
            <div id="eggSize">
                <div id="smallEgg"></div>
                <div id="mediumEgg"></div>
                <div id="largeEgg"></div>
                <div id="extraLargeEgg"></div>
            </div>
            <div id="boilType">
                <div id="softBoiled"></div>
                <div id="mediumBoiled"></div>
                <div id="hardBoiled"></div>
            </div>
            <div id="averageTime"></div>
            <button id="closeCustomize"></button>
        </div>
    `
    
    document.querySelector("#wrapper").appendChild(customizeModal);
    
}