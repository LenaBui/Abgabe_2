"use strict";
var Abgabe_2;
(function (Abgabe_2) {
    let keyWaffel = 0;
    let keyEiskugel = 1;
    let keyTopping = 2;
    Abgabe_2.alleWaffeln = [];
    Abgabe_2.alleEiskugeln = [];
    Abgabe_2.alleToppings = [];
    Abgabe_2.selected = { waffel: undefined, eiskugel: undefined, topping: undefined };
    let actSite = 0;
    let htmlImgs = [];
    window.addEventListener("load", windowLoaded);
    async function windowLoaded() {
        actSite = Number(sessionStorage.getItem("actSite"));
        getSelectedFromJSON(sessionStorage.getItem("selected"));
        await Abgabe_2.getJSONContent("data.json");
        console.log(actSite);
        if (actSite == keyWaffel) {
            createContent(Abgabe_2.alleWaffeln);
        }
        else if (actSite == keyEiskugel) {
            createContent(Abgabe_2.alleEiskugeln);
        }
        else if (actSite == keyTopping) {
            createContent(Abgabe_2.alleToppings);
        }
    }
    function getSelectedFromJSON(_jsonStr) {
        console.log(_jsonStr);
        if (_jsonStr != null) {
            let json = JSON.parse(_jsonStr);
            Object.keys(json).forEach(key => {
                if (key == "waffel") {
                    let pic = json[key];
                    Abgabe_2.selected.waffel = pic;
                }
                else if (key == "eiskugel") {
                    let pic = json[key];
                    Abgabe_2.selected.eiskugel = pic;
                }
                else if (key == "topping") {
                    let pic = json[key];
                    Abgabe_2.selected.topping = pic;
                }
            });
        }
        return Abgabe_2.selected;
    }
    Abgabe_2.getSelectedFromJSON = getSelectedFromJSON;
    function selectImage(_img, _bild) {
        if (_bild.typ == keyWaffel) {
            Abgabe_2.selected.waffel = _bild;
        }
        else if (_bild.typ == keyEiskugel) {
            Abgabe_2.selected.eiskugel = _bild;
        }
        else if (_bild.typ == keyTopping) {
            Abgabe_2.selected.topping = _bild;
        }
        _img.className = "selected";
        htmlImgs.forEach(pic => {
            if (pic != _img) {
                pic.classList.remove("selected");
            }
        });
        console.log(_bild.bild);
    }
    let btNext = document.getElementById("btWeiter");
    btNext.addEventListener("click", btNextClicked);
    let btBack = document.getElementById("btZurueck");
    btBack.addEventListener("click", btBackClicked);
    function btNextClicked() {
        console.log("Next");
        actSite = Number(sessionStorage.getItem("actSite"));
        sessionStorage.setItem("selected", JSON.stringify(Abgabe_2.selected));
        console.log("Saved: " + sessionStorage.getItem("selected"));
        if (actSite < keyTopping) {
            actSite++;
            if (actSite == keyWaffel) {
                createContent(Abgabe_2.alleWaffeln);
            }
            else if (actSite == keyEiskugel) {
                if (Abgabe_2.selected.waffel != undefined) {
                    createContent(Abgabe_2.alleEiskugeln);
                }
                else {
                    actSite--;
                }
            }
            else if (actSite == keyTopping) {
                if (Abgabe_2.selected.eiskugel != undefined) {
                    createContent(Abgabe_2.alleToppings);
                }
                else {
                    actSite--;
                }
            }
            sessionStorage.setItem("actSite", actSite.toString());
        }
        else if (actSite == keyTopping) {
            window.open("ergebnis.html", "_self");
        }
    }
    function btBackClicked() {
        if (actSite > 0)
            actSite--;
        if (actSite == keyWaffel) {
            Abgabe_2.selected.waffel = undefined;
            createContent(Abgabe_2.alleWaffeln);
        }
        else if (actSite == keyEiskugel) {
            Abgabe_2.selected.eiskugel = undefined;
            createContent(Abgabe_2.alleEiskugeln);
        }
        else if (actSite == keyTopping) {
            Abgabe_2.selected.topping = undefined;
            createContent(Abgabe_2.alleToppings);
        }
        sessionStorage.setItem("selected", JSON.stringify(Abgabe_2.selected));
        sessionStorage.setItem("actSite", actSite.toString());
        console.log("Back");
    }
    function createContent(_bilder) {
        console.log(_bilder);
        let imgContainer = document.getElementById("imgContainer");
        htmlImgs = [];
        while (imgContainer.firstChild) {
            imgContainer.firstChild.remove();
        }
        _bilder.forEach(bild => {
            let img = document.createElement("img");
            img.src = bild.bild;
            htmlImgs.push(img);
            imgContainer.appendChild(img);
            img.addEventListener("click", function () {
                selectImage(img, bild);
            });
        });
    }
})(Abgabe_2 || (Abgabe_2 = {}));

//# sourceMappingURL=script.js.map