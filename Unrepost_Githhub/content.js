
console.log("TikTok Repost Remover carregado!");

let running = false;

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Mensagem recebida:", request.action);

  if (request.action === "startRemoving") {
    if (!running) {
      running = true;
      automatizar();
      sendResponse({ message: "Automação iniciada!" });
    } else {
      sendResponse({ message: "A automação já está em execução." });
    }
  }

  if (request.action === "stopRemoving") {
    running = false;
    sendResponse({ message: "Automação parada!" });
  }

  return true;
});





async function automatizar() {
  console.log("AUTOMAÇÃO INICIADA!");
  let removidos = 0;

  while (running) {
    try {
      // Procurar o botão de remover republicação
      const botao = document.querySelector(
        'a[data-e2e="video-share-repost"][aria-label="Remover republicação"]'
      );

      if (botao && botao.getClientRects().length > 0) {
        console.log("BOTÃO DE REMOVER REPUBLICAÇÃO ENCONTRADO!");

       botao.click();

  console.log("Republicação removida!");

  // Atualizar contador
  removidos++;

  chrome.runtime.sendMessage({
  removidos: removidos
});

console.log("Total de republicações removidas:", removidos);

// Esperar 1 segundo
await esperar(1000);
      } else {
        console.log("Botão de remover republicação não encontrado.");
      }

      if (!running) break;

      // Procurar botão de próximo vídeo
      const proximoVideo = document.querySelector(
        'button[data-e2e="arrow-right"][aria-label="Ir para o próximo vídeo"]'
      );

      if (proximoVideo && proximoVideo.getClientRects().length > 0) {
        console.log("Avançando para o próximo vídeo...");

        proximoVideo.click();

        await esperar(4000);
      } else {
        console.log("Botão de próximo vídeo não encontrado.");
        await esperar(1500);
      }

    } catch (erro) {
      console.error("ERRO NA AUTOMAÇÃO:", erro);
      await esperar(3000);
    }
  }

  console.log("AUTOMAÇÃO FINALIZADA");
}


