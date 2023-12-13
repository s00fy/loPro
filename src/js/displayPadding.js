class DisplayPadding extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        const template = document.getElementById("display-padding").content;
        this.shadowRoot.appendChild(template.cloneNode(true));
        if (template) {

            this.containers = document.querySelectorAll(".exemple__container");
            let count = 0;
            this.containers.forEach(el => {
                if (count % 2 === 1) {
                    el.setAttribute('dir', 'rtl');
                }
                count++;
            });
        } else {
            console.error("Template inexistant");
        }
    }
}

customElements.define("display-padding", DisplayPadding);
