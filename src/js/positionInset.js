class positionInset extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
            <div class="positionnement__output container__ex">
                <button class="positionnement__button btn_inset_first">inset: 10px;</button>
                <button class="positionnement__button btn_inset_second">inset: 10px 5px 20px 15px;</button>
                <button class="positionnement__button btn_inset_block">inset-block-start: 15px;</button>
                <button class="positionnement__button btn_inset_inline">inset-inline-end: 20px;</button>
                <div class="positionnement__display">
                    <div class="positionnement__display__container">
                        <span class="focus__inset"></span>
                    </div>
                </div>
            </div>
        `;
        this.$inset = this.querySelector('.focus__inset');
        this.$buttonInsetFirst = this.querySelector('.btn_inset_first');
        this.$buttonInsetSecond = this.querySelector('.btn_inset_second');
        this.$buttonInsetBlock = this.querySelector('.btn_inset_block');
        this.$buttonInsetInline = this.querySelector('.btn_inset_inline');
        
        this.eventHandlers();
    }

    eventHandlers(){
        this.$buttonInsetFirst.addEventListener('click', ()=>{this.switchInsetFirst()});
        this.$buttonInsetSecond.addEventListener('click', ()=>{this.switchInsetSecond()});
        this.$buttonInsetBlock.addEventListener('click', ()=>{this.switchInsetBlock()});
        this.$buttonInsetInline.addEventListener('click', ()=>{this.switchInsetInline()}); 
    }

    switchInsetFirst(){
        this.$inset.classList.add('inset_first');
        this.$inset.innerHTML =``;
        this.$inset.classList.remove('inset_second', 'inset_block', 'inset_inline');
    }
    switchInsetSecond(){
        this.$inset.classList.add('inset_second');
        this.$inset.innerHTML =``;
        this.$inset.classList.remove('inset_first', 'inset_block', 'inset_inline');
    }
    switchInsetBlock(){
        this.$inset.classList.add('inset_block');
        this.$inset.innerHTML =`block start`;
        this.$inset.classList.remove('inset_first', 'inset_second', 'inset_inline');
    }
    switchInsetInline(){
        this.$inset.classList.add('inset_inline');
        this.$inset.innerHTML =`inline end`;
        this.$inset.classList.remove('inset_first', 'inset_second', 'inset_block');
    }

    disconnectedCallback() {
        doument.removeEventListener(this.clickEventListener);
    }
    
}

customElements.define("position-inset", positionInset);