

function toggleDisplay(statID, b) {
    //statID is the id of the div, used to toggle between graph and table
    document.getElementById(statID+b).classList.add("buttonActive");
    document.getElementById(statID+((b=='t')?'g':'t')).classList.remove("buttonActive");

    if (b=='t') {
        document.getElementById(statID+"graph").style.display="none";
        document.getElementById(statID+"table").style.display="block";
    } else {
        document.getElementById(statID+"table").style.display="none";
        document.getElementById(statID+"graph").style.display="block";
    }
}