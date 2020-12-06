"use strict";
var Abgabe_2;
(function (Abgabe_2) {

    // function createFullJSON(): string {
    //     let alleZutaten: AlleZutaten = { alleToppings: alleToppings, alleEiskugeln: alleEiskugeln, alleWaffeln: alleWaffeln };
    //     let jsonAlle: string = JSON.stringify(alleZutaten);
    //     return jsonAlle;
    // }

    function createPicsFromJSON(_jsonStr) {
        Abgabe_2.alleWaffeln = [];
        Abgabe_2.alleEiskugeln = [];
        Abgabe_2.alleToppings = [];
        let json = JSON.parse(_jsonStr);
        Object.keys(json).forEach(key => {
            if (key == "alleWaffeln") {
                Abgabe_2.alleWaffeln = json[key];
            }
            else if (key == "alleEiskugeln") {
                Abgabe_2.alleEiskugeln = json[key];
            }
            else if (key == "alleToppings") {
                Abgabe_2.alleToppings = json[key];
            }
        });
    }
    async function getJSONContent(_url) {
        let response = await fetch(_url);
        let json = await response.json();
        createPicsFromJSON(JSON.stringify(json));
    }
    Abgabe_2.getJSONContent = getJSONContent;
})(Abgabe_2 || (Abgabe_2 = {}));

//# sourceMappingURL=data.js.map