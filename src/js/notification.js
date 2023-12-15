document.addEventListener('DOMContentLoaded', ()=>{
    let installPrompt;
    const pwaInstallButton = document.getElementById("installPWA");
    window.addEventListener("beforeinstallprompt", (event) => {
      installPrompt = event;
      pwaInstallButton.removeAttribute("hidden");
    })

    pwaInstallButton.addEventListener("click", async()=>{
      if(!installPrompt) return;

      const result = await installPrompt.prompt();
      console.log("install prompt result", result);

      Notification.requestPermission().then((result => {
        if(result === "granted") {
          console.log("Notifications granted");
        }else{
          console.log("Notifications refusées");
        }
      }))

      installPrompt = null;
      pwaInstallButton.setAttribute("hidden", "");
    })

    async function registerServiceWorker() {
        if('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log(registration);
            let subscription = await registration.pushManager.getSubscription();
            console.log(JSON.stringify(subscription));
            if(subscription) return;

            console.log('subscribe');
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: ''
            })
        }
    }
    registerServiceWorker();
})