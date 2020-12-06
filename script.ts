namespace Abgabe_2 {

    //Top: 0; Mitte: 1; Bottom: 2
    
    export interface Bild {
        bild: string;
        typ: number; 
    }
    export interface Selected {
        waffel: Bild;
        eiskugel: Bild;
        topping: Bild;
    }
    export interface AlleZutaten {
        alleWaffeln: Bild[];
        alleEiskugeln: Bild[];
        alleToppings: Bild[];
    }
    let keyWaffel: number = 0;
    let keyEiskugel: number = 1;
    let keyTopping: number = 2;
    export let alleWaffeln: Bild[] = [];
    export let alleEiskugeln: Bild[] = [];
    export let alleToppings: Bild[] = [];
    export let selected: Selected = { waffel: undefined, eiskugel: undefined, topping: undefined };
    let actSite: number = 0;

    let htmlImgs: HTMLImageElement[] = [];

    window.addEventListener("load", windowLoaded);


    async function windowLoaded(): Promise<void> {
        actSite = Number(sessionStorage.getItem("actSite"));
        getSelectedFromJSON(sessionStorage.getItem("selected"));
        await getJSONContent("data.json");

        console.log(actSite);
        if (actSite == keyWaffel) {
            createContent(alleWaffeln);
        } else if (actSite == keyEiskugel) {
            createContent(alleEiskugeln);
        } else if (actSite == keyTopping) {
            createContent(alleToppings);
        }
    }

    export function getSelectedFromJSON(_jsonStr: string): Selected {
        console.log(_jsonStr);
        if (_jsonStr != null) {
            let json: Selected = JSON.parse(_jsonStr);
            Object.keys(json).forEach(key => {
                if (key == "waffel") {
                    let pic: Bild = json[key];
                    selected.waffel = pic;
                } else if (key == "eiskugel") {
                    let pic: Bild = json[key];
                    selected.eiskugel = pic;
                } else if (key == "topping") {
                    let pic: Bild = json[key];
                    selected.topping = pic;
                }
            });
        }
        return selected;
    }

    function selectImage(_img: HTMLImageElement, _bild: Bild): void {
        if (_bild.typ == keyWaffel) {
            selected.waffel = _bild;
        } else if (_bild.typ == keyEiskugel) {
            selected.eiskugel = _bild;
        } else if (_bild.typ == keyTopping) {
            selected.topping = _bild;
        }
        _img.className = "selected";
        htmlImgs.forEach(pic => {
            if (pic != _img) {
                pic.classList.remove("selected");
            }
        });
        console.log(_bild.bild);
    }

    let btNext: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btWeiter");
    btNext.addEventListener("click", btNextClicked);
    let btBack: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btZurueck");
    btBack.addEventListener("click", btBackClicked);



    function btNextClicked(): void {
        console.log("Next");
        actSite = Number(sessionStorage.getItem("actSite"));
        sessionStorage.setItem("selected", JSON.stringify(selected));
        console.log("Saved: " + sessionStorage.getItem("selected"));
        if (actSite < keyTopping) {
            actSite++;
            if (actSite == keyWaffel) {
                createContent(alleWaffeln);
            } else if (actSite == keyEiskugel) {
                if (selected.waffel != undefined) {
                    createContent(alleEiskugeln);
                } else {
                    actSite--;
                }
            } else if (actSite == keyTopping) {
                if (selected.eiskugel != undefined) {
                    createContent(alleToppings);
                } else {
                    actSite--;
                }
            }
            sessionStorage.setItem("actSite", actSite.toString());
        } else if (actSite == keyTopping) {
            window.open("ergebnis.html", "_self");
        }
    }

    function btBackClicked(): void {
        if (actSite > 0)
            actSite--;
        if (actSite == keyWaffel) {
            selected.waffel = undefined;
            createContent(alleWaffeln);
        } else if (actSite == keyEiskugel) {
            selected.eiskugel = undefined;
            createContent(alleEiskugeln);
        } else if (actSite == keyTopping) {
            selected.topping = undefined;
            createContent(alleToppings);
        }
        sessionStorage.setItem("selected", JSON.stringify(selected));
        sessionStorage.setItem("actSite", actSite.toString());
        console.log("Back");
    }

    function createContent(_bilder: Bild[]): void {
        console.log(_bilder);
        let imgContainer: HTMLDivElement = <HTMLDivElement>document.getElementById("imgContainer");
        htmlImgs = [];
        while (imgContainer.firstChild) {
            imgContainer.firstChild.remove();
        }
        _bilder.forEach(bild => {
            let img: HTMLImageElement = document.createElement("img");
            img.src = bild.bild;
            htmlImgs.push(img);
            imgContainer.appendChild(img);
            img.addEventListener("click", function (): void {
                selectImage(img, bild);
            });
        });
    }
}