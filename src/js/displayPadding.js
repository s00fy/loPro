class DisplayPadding extends HTMLElement {
    static get observedAttributes() {
      return ["dir"];
    }
    
    attributeChangedCallback(name, oldVal, newVal) {
        if(name === "dir" && newVal === null){
            this.setAttribute("dir", oldVal); 
            console.log(" new Val");
        }
        if (this.$title) {
          this.render();
        }
    }

    connectedCallback() {
      this.innerHTML = `
        <div class="exemple__container">
            <span class="exemple__img"></span>
            <span class="exemple__margin"></span>
            <p class="exemple__userContent"></p>
        </div>
      `;
      this.$container = this.querySelector(".exemple__container");
      this.$title = this.querySelector(".exemple__userContent");
  
      this.render();
    }

    render() {
      this.$title.innerHTML =
        this.dir === "ltr" ? "Infos de l'utilisateur" : "إسم المستخدم";
    }
  }
  
  customElements.define("display-padding", DisplayPadding);