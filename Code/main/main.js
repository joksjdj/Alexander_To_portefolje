function sidebar() {
    var side = document.getElementById("sidebar");
    side.classList.toggle("sidebarExtend");
}

const pageSRC = document.getElementById("pageSRC");

const enableLightmode = () => {
    localStorage.setItem('lightmode', 'active');
    document.body.classList.remove('darkmode');
    document.body.classList.add('light');

    try {
        pageSRC.contentDocument.body.classList.remove('darkmode');
        pageSRC.contentDocument.body.classList.add('light');
    } catch {console.error("Problems with theme");}
}

const disableLightmode = () => {
    localStorage.setItem('lightmode', 'null');
    document.body.classList.remove('light');
    document.body.classList.add('darkmode');

    try {
        pageSRC.contentDocument.body.classList.remove('light');
        pageSRC.contentDocument.body.classList.add('darkmode');
    } catch {console.error("Problems with theme");}
}

document.addEventListener("DOMContentLoaded", () => {
    const themeswitch = document.getElementById("themeswitch");

    if (!themeswitch) {
        console.error("themeswitch not found in DOM at time of script execution");
        return;
    }

    console.log("themeswitch:", themeswitch);
    themeswitch.addEventListener("click", (event) => {
        console.log("Clicked on themeswitch or its children:", event.target);
        localStorage.getItem('lightmode') != "active" ? enableLightmode() : disableLightmode();
    });
});

pageSRC.addEventListener('load', () => {
    if (localStorage.getItem('lightmode') === "active") {
        enableLightmode()
    } else {
        disableLightmode()
    }

    if (device === "computor") {
        computor()
    } 
    if (device === "phone") {
        phone()
    }
});

let device = localStorage.getItem('device')

const computor = () => {
    localStorage.setItem('device', 'computor');
    document.body.classList.remove('phonemode');
    document.body.classList.add('pcmode');

    try {
        pageSRC.contentDocument.body.classList.remove('phonemode');
        pageSRC.contentDocument.body.classList.add('pcmode');
    } catch {}

    console.log("Computor")
}

const phone = () => {
    localStorage.setItem('device', 'phone');
    document.body.classList.remove('pcmode');
    document.body.classList.add('phonemode');

    try {
        pageSRC.contentDocument.body.classList.remove('pcmode');
        pageSRC.contentDocument.body.classList.add('phonemode');
    } catch {}

    console.log("Phone")
}

function pcbutton() {
    localStorage.setItem('device', 'computor');
    window.parent.location.reload();
}

function phonebutton() {
    localStorage.setItem('device', 'phone');
    window.parent.location.reload();
}

if (device != "computor" && device != "phone" && device != "waiting") {
    localStorage.setItem('device', 'waiting');
    pageSRC.src = "devicePage.html";
}

function pageSwitchButton() {
    let page = document.querySelectorAll(".pageSwitchButton")

    page.forEach(page => {
        page.addEventListener("click", () => {
            pageSRC.src = "/Code/"+page.id+"/"+page.id+".html"
        });
    });
}

pageSwitchButton();

async function animateSVG() {
    const svgs = document.querySelectorAll(".backgroundSVG");

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    const svgPos = [];
    svgs.forEach(svg => {

        let maxWidth = windowWidth - svg.clientWidth;
        let maxHeight = windowHeight - svg.clientHeight;
        let xhitbox = svg.clientWidth;
        let yhitbox = svg.clientHeight;

        let x, y;
        x = Math.floor(Math.random() * (maxWidth - 0 + 1)) + 0;
        y = Math.floor(Math.random() * (maxHeight - 0 + 1)) + 0;

        svg.style.left = `${x}px`;
        svg.style.top = `${y}px`;

        xDir = Math.random() < 0.5 ? -1 : 1;
        yDir = Math.random() < 0.5 ? -1 : 1;

        svgPos.push({x: x, y: y, xDir: xDir, yDir: yDir, xhitbox: xhitbox, yhitbox: yhitbox});

    });

    setInterval(() => {
        let svgArrIndex = 0;
        svgs.forEach(svg => {

            maxWidth = windowWidth - svg.clientWidth;
            maxHeight = windowHeight - svg.clientHeight;

            let x = svgPos[svgArrIndex].x;
            let y = svgPos[svgArrIndex].y;
            let xDir = svgPos[svgArrIndex].xDir;
            let yDir = svgPos[svgArrIndex].yDir;

            x += + xDir;
            y += + yDir;

            if (x >= maxWidth || x <= 0) {
                xDir *= -1;
            }
            if (y >= maxHeight || y <= 0) {
                yDir *= -1;
            }

            svg.style.left = `${x}px`;
            svg.style.top = `${y}px`;

            svgPos[svgArrIndex].x = x;
            svgPos[svgArrIndex].y = y;
            svgPos[svgArrIndex].xDir = xDir;
            svgPos[svgArrIndex].yDir = yDir;
            
            svgArrIndex++;

        });
    }, 16);
}
animateSVG();