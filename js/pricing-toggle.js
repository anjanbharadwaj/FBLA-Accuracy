

function toggleActiveClass(num) {
    for (var i = 1; i <= 4; i++) {
        document.getElementById("divP" + i).classList.remove("activePricing");
    }
    document.getElementById("divP" + num).classList.add("activePricing");

}