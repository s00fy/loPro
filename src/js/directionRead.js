class directionRead extends HTMLElement {
    static instanceCount = 0;

    constructor() {
        super();
        directionRead.instanceCount++;
    }

    connectedCallback() {
        console.log(directionRead.instanceCount);
        this.innerHTML = `
            <p id="dirText"> &lt;p dir="ltr"&gt;</p>
            <div class="reading__output__exemple">
                <span class="reading__output__exempleItem"></span>
            </div>
        `;
        this.$dirText= this.querySelector('#dirText');
        this.$dirContainer= this.querySelector('.reading__output__exemple');

        this.secondComp();
    }

    secondComp(){
        if (directionRead.instanceCount === 2) {
            this.$dirContainer.setAttribute('dir', 'rtl');
        }
    }

    disconnectedCallback() {
        //nothing to clean :P
    }
    
}

customElements.define("direction-read", directionRead);