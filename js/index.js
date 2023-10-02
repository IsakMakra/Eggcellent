"use strict";

function display_info () {
    document.querySelector("wrapper").innerHTML += `
        <div id="overlay"> 
            <div id="info_background">
                <p id="number"></p>
                <p id="info_text"><p>
                <p id="next_message_button">Next<p>
                <p id="close_button">Close<p>
            <div>
        <div>
    `;

    let nr_of_messages_displayed = 0;
    let current_number = 1;

    let messages = [
        `Click on "customize" button at the buttom of the screen to manage your options.`,
        `Before putting your eggs in the pot, make sure that the water is boiling.`,
        `Poke a hole in the bottom of the egg/eggs to minimize the risk of the egg cracking.`,
        `Gently lower the egg/eggs into the pot, then start the timer!`
    ];

    let number = document.getElementById("number");
    number.textContent = `${current_number}.`
    let info_text = document.getElementById("info_text");
    info_text.textContent = messages[0];

    let next_message_button = document.getElementById("next_message_button");
    next_message_button.addEventListener("click", display_next_message);

    document.getElementById("close_button").addEventListener("click", () => {
        document.getElementById("overlay").remove();
        document.querySelector("button").addEventListener("click", display_info);
    })

    function display_next_message() {
        nr_of_messages_displayed += 1;
        current_number += 1;

        info_text.textContent = messages[nr_of_messages_displayed];
        number.textContent = `${current_number}.`

        if(nr_of_messages_displayed === messages.length - 1) {
            next_message_button.remove();
        }
    }
}

