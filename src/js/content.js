class contentLang extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        const template = document.getElementById("content-lang").content;
        this.shadowRoot.appendChild(template.cloneNode(true));

        //this.$details = this.shadowRoot.querySelector(".container");

        
    }

    disconnectedCallback() {
    document.removeEventListener(this.keyDownEventListener);
    }
    
}

customElements.define("content-lang", contentLang);