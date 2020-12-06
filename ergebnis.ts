namespace Abgabe_2 {
    window.addEventListener("load", showContent);

    function showContent(): void {
        sendURL("https://gis-communication.herokuapp.com");
        console.log("Show ergebnis");
        let t: string = sessionStorage.getItem("selected");
        getSelectedFromJSON(t);
        console.log("selected: " + selected);
        let ergebnis: HTMLDivElement = <HTMLDivElement>document.getElementById("ergebnis");
        while (ergebnis.firstChild) {
            ergebnis.firstChild.remove();
        }

        let imgTopping: HTMLImageElement = document.createElement("img");
        imgTopping.src = selected.topping.bild;
        ergebnis.appendChild(imgTopping);
        let imgEiskugel: HTMLImageElement = document.createElement("img");
        imgEiskugel.src = selected.eiskugel.bild;
        ergebnis.appendChild(imgEiskugel);
        let imgWaffel: HTMLImageElement = document.createElement("img");
        imgWaffel.src = selected.waffel.bild;
        ergebnis.appendChild(imgWaffel);

    }

    interface ServerAntwort {
        message: string;
        error: string;
    }

    async function sendURL(_url: RequestInfo): Promise<void> {
        let query: URLSearchParams = new URLSearchParams(<any>selected);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
        let json: ServerAntwort = await response.json();
        let status: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("status");
        if (json.message != undefined) {
            status.textContent = json.message;
            status.style.color = "green";
        } else if (json.error != undefined) {
            status.textContent = json.error;
            status.style.color = "red";
        }
    }

}