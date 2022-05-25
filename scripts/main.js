const cookies = document.getElementById("cookies");
let clickUpNum = 1;
let clickerUpNum = 2;
let increment = 1;
let cookieNum = 0;

let upgradeClickButton = document.getElementById("upgradeClick");
let buyClickerButton = document.getElementById("buyClicker");
let upgradeClickerButton = document.getElementById("upgradeClicker");
let cookiesPerClick = document.getElementById("cookiesPerClick");

// Update functions
function addCookie() {
    cookieNum += increment;
    update();
}

function showCookies() {
    cookies.textContent = cookieNum + " cookies";
}

function updateCookiesPerClick() {
    cookiesPerClick.innerHTML = `Current cookies per click: ${increment}`
}

function updateUpgradeCost() {
    upgradeClickButton.textContent = `Upgrade click! (cost: ${10 * 10 * clickUpNum * clickUpNum})`
    buyClickerButton.textContent = `Add auto-clicker! (cost: ${150})`
    upgradeClickerButton.textContent = `Upgrade clicker! (cost:${10 * 10 * clickerUpNum * clickerUpNum})`
}

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

function update() {
    showCookies();
    updateUpgradeCost();
    makeUpgradesAvailable();
}

// Button functions
function upgradeClick() {
    cookieNum -= 10 * 10 * clickUpNum * clickUpNum;
    increment += Math.ceil(((5 * Math.log(clickUpNum)))) + 10;
    clickUpNum ++;
    updateCookiesPerClick();
    update();
}

function startClicker() {
    cookieNum -= 150;
    buyClickerButton.style.display = "none";
    upgradeClickerButton.style.display = "inline";
    move("autoClicker", 10);
    update();
}

function move(element) {
    if (clickerUpNum > 500 - 4) {
        upgradeClickerButton.style.display = "none";
        clickerUpNum = 500;
    }
    var elem = document.getElementById(element);
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 500) {
            clearInterval(id);
            width = 0;
            move(element);
            addCookie();
        } else {
            width += 4 + clickerUpNum;
            elem.style.width = width + 'px';
        }
    }
}

function upgradeClicker() {
    cookieNum -= 10 * 10 * clickerUpNum * clickerUpNum;
    clickerUpNum += 2;
}

// Assign button functions to buttons
document.getElementById("cookieImg").addEventListener("click", addCookie);
document.getElementById("upgradeClick").addEventListener("click", upgradeClick);
document.getElementById("buyClicker").addEventListener("click", startClicker);
upgradeClickerButton.addEventListener("click", upgradeClicker);