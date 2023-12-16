document.addEventListener('DOMContentLoaded', () => {
    let installPrompt;
    const pwaInstallButton = document.getElementById("installPWA");
  
    // Check if PWA is already installed using localStorage
    const isAppInstalled = localStorage.getItem('PWAInstalled');
    if (isAppInstalled) {
      pwaInstallButton.setAttribute("hidden", "");
    }
  
    window.addEventListener("beforeinstallprompt", (event) => {
      installPrompt = event;
      pwaInstallButton.removeAttribute("hidden");
    });
  
    pwaInstallButton.addEventListener("click", async () => {
      if (!installPrompt) return;
  
      const result = await installPrompt.prompt();
      console.log("install prompt result", result);
  
      Notification.requestPermission().then((result => {
        if (result === "granted") {
          console.log("Notifications acceptées");
        } else {
          console.log("Notifications refusées");
        }
      }));
  
      // Set flag indicating PWA has been installed in localStorage
      localStorage.setItem('PWAInstalled', true);
  
      installPrompt = null;
      pwaInstallButton.setAttribute("hidden", "");
    });
  });
  