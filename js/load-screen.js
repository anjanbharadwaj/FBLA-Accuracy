
function load() {
    var elem = document.getElementById("bar");
    var width = 1;
    var id = setInterval(frame, 90);
    var counter = 0;
    function frame() {
        if (width >= 100) {
            loadHome();
            clearInterval(id);
        } else {
            if (width>=78 && width<=81 && counter < 1000) {
                if (counter % 10 == 0) {
                    width++;
                }
                counter++;
            } else width++;
            elem.style.width = width + '%';
            elem.innerText=width+"%";
        }
    }
}

function loadHome() {
    window.location.href = "home.html";
}