document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os elementos dentro do main, EXCETO vídeos
  const items = document.querySelectorAll("main *:not(video):not(source)");

  items.forEach(el => {
    // Se o elemento contém um <video>, não aplica animação nele
    if (!el.querySelector("video")) {
      el.classList.add("reveal-init");
    }
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".reveal-init").forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("baleia52");
    const playPauseBtn = document.querySelector(".play-pause");
    const progressBar = document.querySelector(".progress-bar");
    const time = document.querySelector(".time");

    // Play/Pause
    playPauseBtn.addEventListener("click", () => {
        if(audio.paused){
            audio.play();
            playPauseBtn.querySelector("img").src = "midia/logoSom.png";
        } else {
            audio.pause();
            playPauseBtn.querySelector("img").src = "midia/logoSom.png";
        }
    });

    // Atualiza barra e tempo
    audio.addEventListener("timeupdate", () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progressPercent + "%";

        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        time.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });

    // Clicar na barra para pular
    const progressContainer = document.querySelector(".progress-container");
    progressContainer.addEventListener("click", (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (clickX / width) * audio.duration;
        audio.currentTime = newTime;
    });
});

const backToTopBtn = document.getElementById("back-to-top");

// Mostra o botão quando estiver perto do final
window.addEventListener("scroll", () => {
    if (window.scrollY > document.body.scrollHeight - window.innerHeight - 200) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

// Scroll suave ao clicar
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const goToBottomBtn = document.getElementById("go-to-bottom");

// Mostrar botão quando não está no fim ainda
window.addEventListener("scroll", () => {
    const nearTop = window.scrollY < 200;
    if (nearTop) {
        goToBottomBtn.classList.add("show");
    } else {
        goToBottomBtn.classList.remove("show");
    }
});

// Scroll suave até o final da página
goToBottomBtn.addEventListener("click", () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
});

const main = document.querySelector('main.sobre');

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // tamanho aleatório (8px a 30px)
  const size = Math.random() * 22 + 8;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // posição horizontal aleatória (0% a 100%)
  bubble.style.left = `${Math.random() * 100}%`;

  // posição vertical inicial aleatória dentro da viewport
  const startTop = window.scrollY + Math.random() * window.innerHeight;
  bubble.style.top = `${startTop}px`;

  // escala leve para dar sensação de profundidade
  const scale = Math.random() * 0.3 + 1; // 1 a 1.3
  bubble.style.setProperty('--scale', scale);

  // opacidade baseada na posição horizontal (mais transparente no centro)
  const offsetFromCenter = Math.abs(parseFloat(bubble.style.left) - 50);
  const opacity = Math.max(0.05, 0.3 - offsetFromCenter * 0.0035);
  bubble.style.setProperty('--opacity', opacity);

  // duração aleatória da animação (4s a 10s)
  const duration = Math.random() * 6 + 4;
  bubble.style.animationDuration = `${duration}s`;

  main.appendChild(bubble);

  // remove após animação
  bubble.addEventListener('animationend', () => bubble.remove());
}

// bolhas iniciais distribuídas
for (let i = 0; i < 35; i++) {
  createBubble();
}

// novas bolhas enquanto rola a página
window.addEventListener('scroll', () => {
  // chance de criar 1 ou 2 bolhas por scroll
  const count = Math.random() < 0.6 ? 1 : 2;
  for (let i = 0; i < count; i++) {
    createBubble();
  }
});
