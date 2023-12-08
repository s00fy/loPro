class displayPadding extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        const template = document.getElementById("display-padding").content;
        this.shadowRoot.appendChild(template.cloneNode(true));

        //this.$details = this.shadowRoot.querySelector(".container");
    }

    disconnectedCallback() {
    document.removeEventListener(this.keyDownEventListener);
    }
    
}

customElements.define("display-padding", displayPadding);