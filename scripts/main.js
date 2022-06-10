/*
    Author: Joshua Johnson
    Title: Cookie Clicker
    Purpose: A web-based application game in which the user clicks on a cookie and is rewarded with more and more cookies! Complete with upgrades to keep things interesting

*/

/* TO-DO:
        Ensure everything is adequately commented
*/

// Initialize variables

// How many times click has been upgraded
let clickUpNum = 1;
// How many times auto-clicker has been upgraded
let clickerUpNum = 2;
// How much cookies increase per click
let increment = 1;
// Total number of cookies
let cookieNum = 0;
// How many times the user has "rebirthed"
let rebirths = 0;

// Initialize variables to hold element addresses. Self explanatory
const cookies = document.getElementById("cookies");
const upgradeClickButton = document.getElementById("upgradeClick");
const buyClickerButton = document.getElementById("buyClicker");
const upgradeClickerButton = document.getElementById("upgradeClicker");
const cookiesPerClick = document.getElementById("cookiesPerClick");
const clickerPerSecond = document.getElementById("clickerPerSecond");
const rebirthButton = document.getElementById("rebirthButton");

// Update functions

// Increases the number of cookies by the increment, then updates the screen
function addCookie() {
    cookieNum += increment;
    update();
}
// Updates the number of cookies to the screen
function showCookies() {
    cookies.textContent = cookieNum + " cookies";
}

// Updates the number of cookies per click displayed to the user
function updateCookiesPerClick() {
    cookiesPerClick.innerHTML = `Current cookies per click: ${increment}`
}

// Updates what each button costs to use
function updateUpgradeCost() {
    upgradeClickButton.textContent = `Upgrade click! (cost: ${10 * 10 * clickUpNum * clickUpNum} cookies)`
    buyClickerButton.textContent = `Add auto-clicker! (cost: ${150} cookies)`
    upgradeClickerButton.textContent = `Upgrade clicker! (cost: ${10 * 10 * clickerUpNum * clickerUpNum} cookies)`
}

// Based upon if there are enough cookies to purchase, enable or disable each button individually
function makeUpgradesAvailable() {
    if (cookieNum >= 10 * 10 * clickUpNum * clickUpNum) {
        upgradeClickButton.disabled=false;
    } else {
        upgradeClickButton.disabled=true;
    }
    if (cookieNum >= 150){
        buyClickerButton.disabled=false;
    } else {
        buyClickerButton.disabled=true;
    }
    if (cookieNum >= 10 * 10 * clickerUpNum * clickerUpNum) {
        upgradeClickerButton.disabled=false;
    } else {
        upgradeClickerButton.disabled=true;
    }
}

// Main update function. Calls all update functions to draw changes to the screen
function update() {
    showCookies();
    updateUpgradeCost();
    makeUpgradesAvailable();
    checkRebirthEligibility();
}

// Button functions

// Upgrades number of cookies per click
function upgradeClick() {
    // Decrements number of cookies by this upgrade's cost
    cookieNum -= 10 * 10 * clickUpNum * clickUpNum;
    // Increases the number of cookies per click by a logarithmic growth
    increment += Math.ceil(5 * Math.log(clickUpNum)) + 10 + rebirths;
    // Increases the number of upgrades that have been applied to click
    clickUpNum ++;
    // Update the number of cookies per click as shown to the user
    updateCookiesPerClick();
    // Update the screen (showing that cookies were spent on this purchase)
    update();
}

let autoClicking = false;
function startClicker() {
    // The auto-clicker can only be purchased once, so subtract a flat 150 from the total cookies
    cookieNum -= 150;
    // Make the button to purchase the auto-clicker disappear
    buyClickerButton.style.display = "none";
    // Make the button to upgrade the auto-clicker visible
    upgradeClickerButton.style.display = "inline";
    // Begin the bar graph increment
    autoClicking = true
    move("autoClicker");
    // Update the screen (applying the purchase decrement to total cookies as seen by the user)
    update();
}

// Moves a bar graph across the screen, "clicking" the cookie when it reaches the end and resetting it's position at that point
function move(element) {
    // If the user has upgraded the auto-clicker so many times that it now moves further than there is space to hold it, disable the option for the user to buy more upgrades 
    if (clickerUpNum > 500 - 4) {
        upgradeClickerButton.style.display = "none";
        clickerUpNum = 500 - 4;
    }
    // Get element to modify based on the function parameter of element
    var elem = document.getElementById(element);
    // Initialize width at 1
    var width = 1;
    // Set an interval to run frame() every 10 milliseconds
    var id = setInterval(frame, 10);
    // Nested function to change the width
    function frame() {
        // If the width is at or beyond the maximum width:
        if (width >= 500) {
            // Stop executing frame()
            clearInterval(id);
            // Reset the width to zero
            width = 0;
            // Begin the function again (starting the bar's motion back at a width of zero)
            move(element);
            // "Click" the cookie
            addCookie();
        } else if (!autoClicking){
            clearInterval(id);
            width = 0;
            elem.style.width = "0px";
        } else {
            // If the width has not yet reached the maximum width:
            //   Increment the width by 4 + the upgrade number px
            width += 4 + clickerUpNum * 2;
            //   Update the style of the bar's width to equal the new width
            elem.style.width = width + 'px';
        }
    }
}

// Upgrades the auto-clicker
function upgradeClicker() {
    // Decrement total cookies by the cost of the upgrade
    cookieNum -= 10 * 10 * clickerUpNum * clickerUpNum;
    // Increase the number of upgrades purchased
    clickerUpNum ++;
    // Update the screen (applying the purchase decrement to total cookies as seen by the user)
    update();
}

function resetAutoClicker() {
    autoClicking = false;
}

function checkRebirthEligibility() {
    if (clickUpNum + clickerUpNum >= (50 + (20*rebirths))) {
        rebirthButton.style.display = "block";
    }
}

// Reset cookies, upgrade numbers, and increment
function rebirth() {
    if (rebirthButton.style.display == "block") {
        rebirthButton.style.display = "none";

        clickUpNum = 1;
        clickerUpNum = 2;
        increment = 1;
        cookieNum = 0;

        rebirths ++;

        rebirthText = document.getElementById("rebirths");
        rebirthText.innerHTML = `Rebirths: ${rebirths}`;
        rebirthText.style.display = "block";

        resetAutoClicker();
        updateCookiesPerClick();
        update();
    }
}

// Assign button functions to buttons
document.getElementById("cookieImg").addEventListener("click", addCookie);
upgradeClickButton.addEventListener("click", upgradeClick);
buyClickerButton.addEventListener("click", startClicker);
upgradeClickerButton.addEventListener("click", upgradeClicker); 
rebirthButton.addEventListener("click", rebirth);