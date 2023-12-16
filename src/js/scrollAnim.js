document.addEventListener('DOMContentLoaded', ()=>{
    if(!window.navigator.userAgent.includes("Chrome")){
        document.querySelector('.hero__title').style = "margin-top:15px";
    }
})