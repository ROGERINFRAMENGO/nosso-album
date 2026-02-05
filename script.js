
// ===== DADOS DO ÁLBUM =====
const album = [
  {
    foto: "fotos/foto1.jpg",
    data: "05/07/2024",
    texto: "Uma das primeiras fotos que a gente tirou juntos foi quando a gente foi pro Trimais depois da aula. Eu ainda nem acreditava que tinha conseguido a mulher dos meus sonhos. Pra mim, aquilo nem parecia real, meu amor. Eu nem conseguia entender como uma mulher tão incrível tinha me escolhido. Você sempre foi tudo o que eu sempre quis, amor."
  },
  {
    foto: "fotos/foto2.jpg",
    data: "13/08/2024",
    texto: "Essa é um pouco depois da outra foto. Eu ainda continuava sem acreditar que eu tinha você comigo, amor. Nesse dia, eu fui te buscar depois do seu curso pra gente poder ficar juntos antes da aula. Eram as horas mais felizes do meu dia inteiro, só por poder ficar com você, meu amor. Acho que você nunca vai ter noção do quão feliz você me faz, amor."
  },
  {
    foto: "fotos/foto3.jpg",
    data: "12/03/2025",
    texto: "Essa foi bem depois das outras fotos. Foi quando seu pai deixou a gente ficar juntos na sua casa. A gente nem imaginava tanta coisa que ia passar juntos, meu amor. Eu tava vivendo um sonho de poder ver a mulher da minha vida todos os dias. Nunca vou esquecer esses momentos incríveis com você, minha vida."
  },
  {
    foto: "fotos/foto4.png",
    data: "Para sempre",
    texto: "Essa é uma das últimas fotos nossas juntos, meu amor, da nossa viagem pra praia. As duas viagens que a gente fez juntos são os dois melhores dias da minha vida, amor. Poder passar dois dias completos do seu lado foi maravilhoso, e a gente ainda pôde dormir pela primeira vez juntos. Eu nunca dormi tão bem, meu amor kkkk. Você me faz um bem enorme, é inexplicável, amor. As coisas são incríveis só por ter você por perto. Minha vida, os meus momentos preferidos são sempre do seu lado, meu amor."
  }
];

// ===== VARIÁVEIS GLOBAIS =====
let indice = 0;
let startX = 0;
let intervalCoracoes;

// ===== ELEMENTOS DO DOM =====
const elementos = {
  foto: document.getElementById("foto"),
  data: document.getElementById("data"),
  texto: document.getElementById("texto"),
  contador: document.getElementById("contador"),
  inicio: document.getElementById("inicio"),
  albumDiv: document.getElementById("album"),
  final: document.getElementById("final"),
  textoInicio: document.getElementById("textoInicio"),
  botaoAlbum: document.getElementById("botao-album"),
  textoFinal: document.getElementById("textoFinal")
};

// ===== FUNÇÕES DO ÁLBUM =====
function mostrarFoto() {
  const { foto, data, texto, contador } = elementos;

  // Animação de saída
  foto.style.opacity = 0;
  foto.style.transform = "scale(0.95)";

  setTimeout(() => {
    // Atualiza conteúdo
    foto.src = album[indice].foto;
    data.textContent = album[indice].data;
    texto.textContent = album[indice].texto;
    contador.textContent = `${indice + 1} / ${album.length}`;

    // Animação de entrada
    foto.style.opacity = 1;
    foto.style.transform = "scale(1)";

    criarCoracoes();
  }, 300);
}

function proxima() {
  if (indice < album.length - 1) {
    indice++;
    mostrarFoto();
  } else {
    mostrarFinal();
  }
}

function anterior() {
  if (indice > 0) {
    indice--;
    mostrarFoto();
  }
}

// ===== SWIPE/DRAG =====
const albumElement = document.querySelector(".album");

// Touch (mobile)
albumElement.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });

albumElement.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  handleSwipe(endX);
});

// Mouse (desktop)
albumElement.addEventListener("mousedown", (e) => {
  startX = e.clientX;
});

albumElement.addEventListener("mouseup", (e) => {
  const endX = e.clientX;
  handleSwipe(endX);
});

function handleSwipe(endX) {
  const diff = endX - startX;
  const threshold = 50;

  if (diff > threshold) {
    anterior();
  } else if (diff < -threshold) {
    proxima();
  }
}

// ===== CORAÇÕES ANIMADOS =====
function criarCoracoes() {
  const container = document.body;
  const quantidade = 12;
  const emojis = ['💗', '💕', '💖'];

  for (let i = 0; i < quantidade; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // Posição aleatória
    heart.style.left = Math.random() * 100 + "%";
    heart.style.bottom = "-50px";
    
    // Tamanho aleatório
    heart.style.fontSize = (20 + Math.random() * 16) + "px";
    
    // Duração aleatória
    heart.style.animationDuration = (3 + Math.random() * 2) + "s";
    
    // Atraso aleatório
    heart.style.animationDelay = Math.random() * 0.5 + "s";

    container.appendChild(heart);

    // Remove após animação
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }
}

// ===== NAVEGAÇÃO =====
function abrirAlbum() {
  elementos.inicio.style.display = "none";
  elementos.albumDiv.classList.remove("escondido");
  mostrarFoto();
  
  // Inicia intervalo de corações
  if (intervalCoracoes) clearInterval(intervalCoracoes);
  intervalCoracoes = setInterval(criarCoracoes, 4000);
}

function mostrarFinal() {
  elementos.albumDiv.style.display = "none";
  elementos.final.classList.remove("escondido");
  
  escreverFinal();
  
  // Continua corações na tela final
  setTimeout(criarCoracoes, 500);
}

// ===== EFEITO DE DIGITAÇÃO =====
const textoCompleto = elementos.textoInicio.innerHTML;
elementos.textoInicio.innerHTML = "";

// Cria cursor
const cursor = document.createElement("span");
cursor.className = "cursor";
elementos.textoInicio.appendChild(cursor);

let indexDigitacao = 0;

function escrever() {
  if (indexDigitacao < textoCompleto.length) {
    cursor.remove();
    elementos.textoInicio.innerHTML += textoCompleto[indexDigitacao];
    elementos.textoInicio.appendChild(cursor);
    indexDigitacao++;
    setTimeout(escrever, 65);
  } else {
    // Remove cursor e mostra botão
    setTimeout(() => {
      cursor.remove();
      elementos.botaoAlbum.classList.add("mostrar");
    }, 500);
  }
}

// ===== TELA FINAL =====
const textoFinalCompleto = `Meu amor, obrigado por me fazer tão feliz todos os dias da minha vida. Obrigado por ter aparecido na minha vida e por ter me escolhido. Eu espero que um dia você consiga entender o quanto você significa pra mim, amor. Você é tudo pra mim. A gente ainda vai tirar muito mais fotos pra guardar um pouquinho da nossa história juntos, amor.`;

function escreverFinal() {
  const elemento = elementos.textoFinal;
  const linhaAmor = document.querySelector('.linha-amor');
  const videoContainer = document.querySelector('.video-container');
  elemento.textContent = "";
  let i = 0;

  function digitar() {
    if (i < textoFinalCompleto.length) {
      elemento.textContent += textoFinalCompleto[i];
      i++;
      setTimeout(digitar, 45);
    } else {
      // Mostra "Te amo + coração" após terminar de digitar
      setTimeout(() => {
        linhaAmor.classList.add('mostrar');
        // Mostra vídeo após o "Te amo"
        setTimeout(() => {
          videoContainer.classList.add('mostrar');
        }, 1000);
      }, 500);
    }
  }

  digitar();
}

// ===== INICIALIZAÇÃO =====
function inicializar() {
  // Inicia efeito de digitação
  escrever();
  
  // Carrega primeira foto (escondida)
  mostrarFoto();
}

// Aguarda carregamento completo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  inicializar();

}
