namespace Abgabe_2 {

    // function createFullJSON(): string {
    //     let alleZutaten: AlleZutaten = { alleToppings: alleToppings, alleEiskugeln: alleEiskugeln, alleWaffeln: alleWaffeln };
    //     let jsonAlle: string = JSON.stringify(alleZutaten);
    //     return jsonAlle;
    // }

    function createPicsFromJSON(_jsonStr: string): void {
        alleWaffeln = [];
        alleEiskugeln = [];
        alleWaffeln = [];
        let json: AlleZutaten = JSON.parse(_jsonStr);
        Object.keys(json).forEach(key => {
            if (key == "alleWaffeln") {
                alleWaffeln = json[key];
            } else if (key == "alleEiskugeln") {
                alleEiskugeln = json[key];
            } else if (key == "alleToppings") {
                alleToppings = json[key];
            }
        });
    }

    export async function getJSONContent(_url: string): Promise<void> {
        let response: Response = await fetch(_url);
        let json: JSON = await response.json();
        createPicsFromJSON(JSON.stringify(json));
    }
}