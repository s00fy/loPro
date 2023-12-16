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
          console.log("Notifications acceptées");
        }else{
          console.log("Notifications refusées");
        }
      }))

      installPrompt = null;
      pwaInstallButton.setAttribute("hidden", "");
    })
/* 
    async function registerServiceWorker() {
        if('serviceWorker' in navigator) {
            console.log(navigator);
            const registration = await navigator.serviceWorker.register('/sw.js');
            let subscription = await registration.pushManager.getSubscription();
            console.log(registration.pushManager);
            // console.log(JSON.stringify(subscription));
            if(subscription) return;
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: await getPublicKey(),
            })
        }
    }

    async function getPublicKey() {
        try {
            const response = await fetch("/key", {
                headers: {
                    Accept: "application/json",
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const { key } = await response.json();
                console.log(key);
                return key;
            } else {
                throw new Error('Invalid content type. Expected JSON.');
            }
        } catch (error) {
            console.error('Error fetching or parsing data:', error);
            // Handle the error or return a default value as needed
            return null;
        }
    }

    registerServiceWorker(); */
})