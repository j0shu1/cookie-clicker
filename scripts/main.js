const cookies = document.getElementById("cookies");
const cookieImg = document.getElementById("cookieImg");
let increment = 1;
let cookieNum = 0;

// Helper functions
function getCookies() {
    let originalString = cookies.textContent
    return parseInt(originalString.substring(0, originalString.length - 7));
}

// Button functions
function upgradeClick() {
    cookieNum -= increment * 30;
    increment = increment * 2;
    updateCookiesPerClick();
    update();
}

function addCookie() {
    cookieNum = getCookies() + increment;
    update();
}

// Display functions

function setCookies() {
    cookies.textContent = cookieNum + " cookies";
}

function updateCookiesPerClick() {
    document.getElementById("cookiesPerClick").innerHTML = `Current cookies per click: ${increment}`
}

function updateUpgradeCost() {
    document.getElementById("upgradeClick").textContent = `Upgrade click! (cost: ${increment * 30})`
}

function makeUpgradesAvailable() {
    if (getCookies() >= increment * 30) {
        document.getElementById("upgradeClick").disabled=false;
    } else {
        document.getElementById("upgradeClick").disabled=true;
    }
}

function setCookieSize() {
    if ((cookieNum < 640) || (cookieNum >= 640 && cookieImg.getAttribute("width") < 640)) {
        cookieImg.setAttribute("width", cookieNum);
    }
}

function update() {
    setCookies();
    updateUpgradeCost();
    makeUpgradesAvailable();
    setCookieSize();
}

document.getElementById("cookieButton").addEventListener("click", addCookie);
document.getElementById("upgradeClick").addEventListener("click", upgradeClick);