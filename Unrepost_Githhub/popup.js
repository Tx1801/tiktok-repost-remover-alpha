
const contador = document.getElementById("contador");

// Iniciar automação
document.getElementById("start").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.tabs.sendMessage(tab.id, {
    action: "startRemoving"
  });
});

// Parar automação
document.getElementById("stop").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.tabs.sendMessage(tab.id, {
    action: "stopRemoving"
  });
});

// Receber atualização do contador
chrome.runtime.onMessage.addListener((request) => {
  if (request.removidos !== undefined) {
    contador.innerText =
      `Republicações removidas: ${request.removidos}`;
  }
});
