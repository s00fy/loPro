document.addEventListener('DOMContentLoaded', () => {
    let installPrompt;
    const pwaInstallButton = document.getElementById("installPWA");
    
    const isAppInstalled = localStorage.getItem('PWAInstalled');
    if (isAppInstalled) {
        pwaInstallButton.setAttribute("hidden", "");
    }

    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        installPrompt = event;
        if (!isAppInstalled) {
            pwaInstallButton.removeAttribute("hidden");
        }
    });
  
    pwaInstallButton.addEventListener("click", async () => {
      if (!installPrompt) return;
      localStorage.setItem('PWAInstalled', true);  
      const result = await installPrompt.prompt();
      console.log("install prompt result", result);
  
      Notification.requestPermission().then((result => {
        if (result === "granted") {
          console.log("Notifications acceptées");
          // Update flag when the installation prompt is accepted
          localStorage.setItem('PWAInstalled', true);
        } else {
          console.log("Notifications refusées");
        }
      }));
  
      installPrompt = null;
      pwaInstallButton.setAttribute("hidden", "");
    });
  });
  