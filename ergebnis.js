"use strict";
var Abgabe_2;
(function (Abgabe_2) {
    window.addEventListener("load", showContent);
    function showContent() {
        sendURL("https://gis-communication.herokuapp.com");
        console.log("Show ergebnis");
        let t = sessionStorage.getItem("selected");
        Abgabe_2.getSelectedFromJSON(t);
        console.log("selected: " + Abgabe_2.selected);
        let ergebnis = document.getElementById("ergebnis");
        while (ergebnis.firstChild) {
            ergebnis.firstChild.remove();
        }
        let imgTopping = document.createElement("img");
        imgTopping.src = Abgabe_2.selected.topping.bild;
        ergebnis.appendChild(imgTopping);
        let imgEiskugel = document.createElement("img");
        imgEiskugel.src = Abgabe_2.selected.eiskugel.bild;
        ergebnis.appendChild(imgEiskugel);
        let imgWaffel = document.createElement("img");
        imgWaffel.src = Abgabe_2.selected.waffel.bild;
        ergebnis.appendChild(imgWaffel);
    }
    async function sendURL(_url) {
        let query = new URLSearchParams(Abgabe_2.selected);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let json = await response.json();
        let status = document.getElementById("status");
        if (json.message != undefined) {
            status.textContent = json.message;
            status.style.color = "green";
        }
        else if (json.error != undefined) {
            status.textContent = json.error;
            status.style.color = "red";
        }
    }

})(Abgabe_2 || (Abgabe_2 = {}));

//# sourceMappingURL=ergebnis.js.map