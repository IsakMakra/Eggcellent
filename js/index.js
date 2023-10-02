"use strict";

document.getElementById("info_button").addEventListener("click", display_info);

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

