let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
/* Variable declarations and element selections to reference various elements in the HTML document */

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];
/* An array containing font names for the fontName select dropdown */

const intializer = () => {
    /* Function to initialize the text editor by adding options to select dropdowns */
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);
    /* Call to highlighter function to set initial button highlights */

    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });
    /* Loop through fontList array to populate fontName select dropdown with font options */

    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }
    /* Loop to populate fontSize select dropdown with options from 1 to 7 */

    fontSizeRef.value = 3;
    /* Set the default value of fontSize select dropdown to 3 */
};

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};
/* Function to modify the text in the contenteditable "writingArea" div based on the provided command and value */

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});
/* Add click event listeners to "optionsButtons" (buttons for formatting) to apply the respective formatting command */

advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});
/* Add change event listeners to "advancedOptionButton" (select dropdowns for advanced options) to apply the respective command with the selected value */

linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL?");
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});
/* Add click event listener to "linkButton" to prompt the user for a URL and insert a link into the "writingArea" */

const highlighter = (className, needsRemoval) => {
    /* Function to handle highlighting of buttons and removing highlights */
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = false;
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
};

const highlighterRemover = (className) => {
    /* Function to remove active class (highlight) from buttons */
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

window.onload = intializer();
/* Call intializer function when the window is loaded to set up the text editor */
