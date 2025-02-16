class CustomPrint extends HTMLElement {
    constructor() {
        super();
        console.log("Print from custom element");
    }
}

customElements.define("custom-print", CustomPrint);
