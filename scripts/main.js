const cookies = document.getElementById("cookies");
let increment = 1;
let cookieNum = 0;

// Update functions
function showCookies() {
    cookies.textContent = cookieNum + " cookies";
}

function updateCookiesPerClick() {
    document.getElementById("cookiesPerClick").innerHTML = `Current cookies per click: ${increment}`
}

function updateUpgradeCost() {
    document.getElementById("upgradeClick").textContent = `Upgrade click! (cost: ${increment * 30})`
}

function makeUpgradesAvailable() {
    if (cookieNum >= increment * 30) {
        document.getElementById("upgradeClick").disabled=false;
    } else {
        document.getElementById("upgradeClick").disabled=true;
    }
}

function update() {
    showCookies();
    updateUpgradeCost();
    makeUpgradesAvailable();
    setCookieSize();
}

// Button functions
function upgradeClick() {
    cookieNum -= increment * 30;
    increment = increment + 1;
    updateCookiesPerClick();
    update();
}

function addCookie() {
    cookieNum += increment;
    update();
}

document.getElementById("cookieImg").addEventListener("click", addCookie);
document.getElementById("upgradeClick").addEventListener("click", upgradeClick);

function move() {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 500) {
            clearInterval(id);
            width = 0;
            move();
            addCookie();
        } else {
        width += 5;
        elem.style.width = width + 'px';
        }
    }
}
move();