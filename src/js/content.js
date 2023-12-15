class contentLang extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
        <div class="situation__output">
                <div class="situation__output__buttons">
                    <button class="situation__output__btn" id="en"> english </button>
                    <button class="situation__output__btn" id="ar"> arabic <!-- عربي --></button>
                    <button class="situation__output__btn" id="ja"> japanese <!-- 日本語 --></button>
                    <button class="situation__output__btn" id="ch"> chinese <!-- 中国人 --></button>
                </div>
        
                <div lang="en" class="background">
                    <p class="content"></p>
                    <div class="delimitation">
                      <p class="footer"></p>
                    </div>
                  </div>
            </div>
        `;
        this.$buttons = this.querySelector('.situation__output__buttons');
        this.$content = this.querySelector('.content');
        this.$footer = this.querySelector('.footer');
        this.$background = this.querySelector('.background');

        this.$en = this.querySelector('#en');
        this.$ar = this.querySelector('#ar');
        this.$ja = this.querySelector('#ja');
        this.$ch = this.querySelector('#ch');

        this.switchEn();
        this.btnsEvent();
    }

    btnsEvent() {
        this.$buttons.addEventListener("click", (e)=>{
            console.log(e.target);
            switch (e.target) {
                case this.$en:
                    this.switchEn();
                    break;   
                case this.$ar:
                    this.switchAr();
                    break;
            
                case this.$ja:
                    this.switchJa();
                    break;
            
                case this.$ch:
                    this.switchCh();
                    break;
            
                default:
                    break;
            }
        });
    }

    switchEn() {
            
        this.$content.innerHTML = `
        some content to fill in the void in my life
        `;
        this.$footer.innerHTML = `
            footer for besties
        `
        this.$background.style.fontFamily = `var(--font)`;
        this.$background.setAttribute("dir", "ltr");
        this.$background.setAttribute("lang", "en");
        this.$background.classList.remove('vertical__ja', 'vertical__ch');
        this.$background.classList.add('vertical__reset');
    }

    switchAr() {
        this.$content.innerHTML = `
        اقتباس في العربية اقتباس في العربية
        `;
        this.$footer.innerHTML = `
        اقتباس في العربية
        `;
        this.$background.style.fontFamily = `'Droid Arabic Kufi', serif`;
        this.$background.setAttribute("dir", "rtl");
        this.$background.setAttribute("lang", "ar");
        this.$background.classList.remove('vertical__ja', 'vertical__ch');
        this.$background.classList.add('vertical__reset');
    }

    switchJa() {
        this.$content.innerHTML = `
        我在日我们的周年纪念日
        `;
        this.$footer.innerHTML = `
        我在日历
        `;
        this.$background.style.fontFamily = `'"ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",Osaka, "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif`;
        this.$background.removeAttribute("dir");
        this.$background.setAttribute("lang", "ja");
        this.$background.classList.remove('vertical__ch', 'vertical__reset');
        this.$background.classList.add('vertical__ja');
    }
    
    switchCh() {
        this.$content.innerHTML = `
        我在日我们的周年纪念日
        `;
        this.$footer.innerHTML = `
        我在日历
        `;
        this.$background.style.fontFamily = `Microsoft JhengHei,微軟正黑體,Heiti TC,黑體-繁,sans-serif`;
        this.$background.removeAttribute("dir");
        this.$background.setAttribute("lang", "zh-Hans");
        this.$background.classList.remove('vertical__ja', 'vertical__reset');
        this.$background.classList.add('vertical__ch');
    }

    disconnectedCallback() {
    document.removeEventListener(this.clickEventListener);
    }
    
}

customElements.define("content-lang", contentLang);