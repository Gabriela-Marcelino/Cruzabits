// ======================================================
// CruzaBits — Cruzadinha de Arquitetura Computacional
// Cada palavra tem 3 dicas (da mais difícil para a mais fácil)
// e as letras dela aparecem embaralhadas para ajudar.
// ======================================================

const LINHAS = 12;
const COLUNAS = 16;

// linha/coluna = casa onde a palavra começa (contando do 0)
// direcao: "H" = horizontal, "V" = vertical
const PALAVRAS = [
  {
    resposta: "MICROCONTROLADOR", linha: 6, coluna: 0, direcao: "H",
    dicas: [
      "Chip que reúne processador, memória e entradas e saídas num só componente.",
      "Coração de sistemas embarcados, como máquinas de lavar e brinquedos eletrônicos.",
      "O ATmega328, usado no Arduino, é um exemplo dele."
    ]
  },
  {
    resposta: "DUALCORE", linha: 0, coluna: 9, direcao: "V",
    dicas: [
      "Processador com duas unidades de execução independentes no mesmo chip.",
      "Permite rodar duas tarefas realmente em paralelo, uma em cada núcleo.",
      "Processador de dois núcleos."
    ]
  },
  {
    resposta: "UC", linha: 5, coluna: 5, direcao: "V",
    dicas: [
      "Parte da CPU que coordena o funcionamento dos demais componentes.",
      "Decodifica as instruções e gera os sinais que orientam a ULA.",
      "É o maestro do processador, ditando a ordem das operações."
    ]
  },
  {
    resposta: "EEPROM", linha: 2, coluna: 14, direcao: "V",
    dicas: [
      "Memória não volátil que pode ser reescrita byte a byte no próprio circuito.",
      "Guarda configurações de microcontroladores que sobrevivem ao desligamento.",
      "Guarda poucos dados permanentes, como calibrações, e aceita regravação sem retirar o chip."
    ]
  },
  {
    resposta: "CACHE", linha: 4, coluna: 7, direcao: "H",
    dicas: [
      "Guarda cópias dos dados mais usados para evitar buscas lentas na RAM.",
      "Memória pequena e muito rápida que fica entre a CPU e a RAM.",
      "Memória organizada em níveis chamados L1, L2 e L3."
    ]
  },
  {
    resposta: "FLASH", linha: 2, coluna: 7, direcao: "H",
    dicas: [
      "Memória não volátil regravável, apagada em blocos inteiros.",
      "Tecnologia usada em pendrives, SSDs e cartões SD.",
      "Memória dos pendrives cujo nome em inglês também significa clarão."
    ]
  },
  {
    resposta: "REGISTRADORES", linha: 0, coluna: 1, direcao: "H",
    dicas: [
      "Topo da hierarquia de memória: pouquíssima capacidade e acesso quase instantâneo.",
      "Guardam temporariamente os valores que a ULA está usando no momento.",
      "Pequenas memórias dentro da CPU, as mais rápidas do computador."
    ]
  },
  {
    resposta: "RAM", linha: 4, coluna: 0, direcao: "V",
    dicas: [
      "Memória de leitura e escrita onde ficam os programas em execução.",
      "Memória principal e volátil: perde tudo quando o computador desliga.",
      "Quanto mais GB dela, mais programas abertos ao mesmo tempo."
    ]
  },
  {
    resposta: "CPU", linha: 4, coluna: 13, direcao: "H",
    dicas: [
      "Componente que busca, decodifica e executa as instruções dos programas.",
      "Abriga a ULA, a UC e os registradores.",
      "Conhecido como o cérebro do computador."
    ]
  },
  {
    resposta: "DATABUS", linha: 5, coluna: 12, direcao: "V",
    dicas: [
      "Bidirecional: leva e traz os valores lidos e escritos na memória.",
      "Sua largura (8, 32 ou 64 bits) indica quantos bits viajam de uma vez.",
      "Linhas que transportam as informações entre CPU, memória e periféricos."
    ]
  },
  {
    resposta: "MEMORIADEMASSA", linha: 11, coluna: 1, direcao: "H",
    dicas: [
      "Grande capacidade e baixo custo por GB, porém bem mais lenta que a RAM.",
      "Guarda arquivos, fotos e o sistema operacional mesmo sem energia.",
      "Dispositivos como HD e SSD."
    ]
  },
  {
    resposta: "QUADCORE", linha: 2, coluna: 2, direcao: "V",
    dicas: [
      "Executa quatro tarefas realmente em paralelo, uma em cada unidade de execução.",
      "Tem o dobro de núcleos de um processador de dois núcleos.",
      "Processador de quatro núcleos."
    ]
  },
  {
    resposta: "ULA", linha: 3, coluna: 2, direcao: "H",
    dicas: [
      "Circuito que executa operações como AND, OR e NOT sobre os bits.",
      "Recebe valores dos registradores e devolve o resultado do cálculo.",
      "Parte da CPU que faz somas, subtrações e comparações."
    ]
  },
  {
    resposta: "DMA", linha: 9, coluna: 7, direcao: "V",
    dicas: [
      "Seu controlador avisa a CPU com uma interrupção quando a transferência termina.",
      "Técnica que libera o processador durante grandes transferências de dados.",
      "Permite que periféricos copiem dados para a RAM sem ocupar a CPU."
    ]
  },
  {
    resposta: "ROM", linha: 8, coluna: 2, direcao: "H",
    dicas: [
      "Memória não volátil com conteúdo gravado de fábrica, sem alteração no uso normal.",
      "Tradicionalmente guarda o firmware de inicialização, como a BIOS.",
      "Mantém os dados sem energia, mas o usuário não consegue reescrevê-los."
    ]
  },
  {
    resposta: "ADDRESSBUS", linha: 9, coluna: 5, direcao: "H",
    dicas: [
      "Sua largura em bits define quanta memória a CPU consegue alcançar.",
      "Unidirecional: sai da CPU indicando onde ler ou gravar.",
      "Linhas pelas quais a CPU informa qual posição de memória quer acessar."
    ]
  }
];

// ---------- Estado do jogo ----------
const casas = [];            // casas[l][c] = { input, div, palavras: [] } ou null
let palavraAtiva = null;
let casaFoco = null;         // { l, c }
let dicasExtras = 0;

// ---------- Elementos da página ----------
const elTabuleiro = document.getElementById("tabuleiro");
const elListaH = document.getElementById("lista-h");
const elListaV = document.getElementById("lista-v");
const elContador = document.getElementById("contador");
const elContadorDicas = document.getElementById("contador-dicas");
const elMensagem = document.getElementById("mensagem");
const elRotulo = document.getElementById("ativa-rotulo");
const elTamanho = document.getElementById("ativa-tamanho");
const elDica = document.getElementById("ativa-dica");
const elNumDica = document.getElementById("ativa-num-dica");
const elLetras = document.getElementById("letras");
const btnDica = document.getElementById("btn-dica");
const btnEmbaralhar = document.getElementById("btn-embaralhar");
const btnApagar = document.getElementById("btn-apagar");

// ---------- Utilidades ----------
function embaralhar(texto) {
  const letras = texto.split("");
  do {
    for (let i = letras.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letras[i], letras[j]] = [letras[j], letras[i]];
    }
  } while (letras.length > 1 && letras.join("") === texto && new Set(letras).size > 1);
  return letras;
}

function casasDaPalavra(p) {
  const lista = [];
  for (let i = 0; i < p.resposta.length; i++) {
    const l = p.direcao === "V" ? p.linha + i : p.linha;
    const c = p.direcao === "H" ? p.coluna + i : p.coluna;
    lista.push({ l, c });
  }
  return lista;
}

function letrasAtuais(p) {
  return casasDaPalavra(p).map(({ l, c }) => casas[l][c].input.value.toUpperCase());
}

// ---------- Montagem do tabuleiro ----------
function montarTabuleiro() {
  elTabuleiro.style.gridTemplateColumns = `repeat(${COLUNAS}, var(--tam-casa))`;

  for (let l = 0; l < LINHAS; l++) casas.push(new Array(COLUNAS).fill(null));

  // descobre quais casas são usadas e por quais palavras
  PALAVRAS.forEach(p => {
    casasDaPalavra(p).forEach(({ l, c }, i) => {
      if (!casas[l][c]) casas[l][c] = { letra: p.resposta[i], palavras: [] };
      casas[l][c].palavras.push(p);
    });
  });

  // numeração no estilo de cruzadinha: da esquerda para a direita, de cima para baixo
  let numero = 1;
  const inicios = {};
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      const comecaAqui = PALAVRAS.filter(p => p.linha === l && p.coluna === c);
      if (comecaAqui.length) {
        comecaAqui.forEach(p => (p.numero = numero));
        inicios[`${l},${c}`] = numero;
        numero++;
      }
    }
  }

  // cria as casas na tela
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      const div = document.createElement("div");
      div.className = "casa";
      const dados = casas[l][c];

      if (!dados) {
        div.classList.add("vazia");
      } else {
        if (inicios[`${l},${c}`]) {
          const num = document.createElement("span");
          num.className = "numero";
          num.textContent = inicios[`${l},${c}`];
          div.appendChild(num);
        }
        const input = document.createElement("input");
        input.maxLength = 1;
        input.autocomplete = "off";
        input.setAttribute("aria-label", `Linha ${l + 1}, coluna ${c + 1}`);
        input.addEventListener("mousedown", e => { e.preventDefault(); clicarCasa(l, c); });
        input.addEventListener("focus", () => { if (!casaFoco || casaFoco.l !== l || casaFoco.c !== c) clicarCasa(l, c, true); });
        input.addEventListener("keydown", e => teclaNaCasa(e, l, c));
        input.addEventListener("input", () => digitarNaCasa(l, c));
        div.appendChild(input);
        dados.input = input;
        dados.div = div;
      }
      elTabuleiro.appendChild(div);
    }
  }
}

function montarListas() {
  const ordenadas = [...PALAVRAS].sort((a, b) => a.numero - b.numero);
  ordenadas.forEach(p => {
    p.dicaAtual = 0;
    p.embaralhada = embaralhar(p.resposta);
    const li = document.createElement("li");
    li.addEventListener("click", () => selecionarPalavra(p));
    p.li = li;
    atualizarItemLista(p);
    (p.direcao === "H" ? elListaH : elListaV).appendChild(li);
  });
}

function atualizarItemLista(p) {
  p.li.innerHTML = "";
  const num = document.createElement("span");
  num.className = "num";
  num.textContent = p.numero + ".";
  const texto = document.createTextNode(" " + p.dicas[p.dicaAtual] + " ");
  const qtd = document.createElement("span");
  qtd.className = "qtd";
  qtd.textContent = `(${p.resposta.length})`;
  p.li.append(num, texto, qtd);
}

// ---------- Seleção e foco ----------
function clicarCasa(l, c, veioDoFoco = false) {
  const dados = casas[l][c];
  const mesmaCasa = casaFoco && casaFoco.l === l && casaFoco.c === c;
  let palavra;

  if (mesmaCasa && !veioDoFoco && dados.palavras.length > 1) {
    // clicar de novo na mesma casa troca a direção
    palavra = dados.palavras.find(p => p !== palavraAtiva) || dados.palavras[0];
  } else if (palavraAtiva && dados.palavras.includes(palavraAtiva)) {
    palavra = palavraAtiva;
  } else {
    palavra = dados.palavras[0];
  }

  casaFoco = { l, c };
  selecionarPalavra(palavra, false);
}

function selecionarPalavra(p, irParaInicio = true) {
  palavraAtiva = p;

  if (irParaInicio) {
    const posicoes = casasDaPalavra(p);
    casaFoco = posicoes.find(({ l, c }) => !casas[l][c].input.value) || posicoes[0];
  }

  desenharDestaques();
  casas[casaFoco.l][casaFoco.c].input.focus();
  atualizarPainel();
}

function desenharDestaques() {
  document.querySelectorAll(".casa").forEach(d => d.classList.remove("na-palavra", "foco"));
  PALAVRAS.forEach(p => p.li.classList.remove("ativa"));

  if (!palavraAtiva) return;
  casasDaPalavra(palavraAtiva).forEach(({ l, c }) => casas[l][c].div.classList.add("na-palavra"));
  if (casaFoco) casas[casaFoco.l][casaFoco.c].div.classList.add("foco");
  palavraAtiva.li.classList.add("ativa");
}

// ---------- Painel da palavra ativa ----------
function atualizarPainel() {
  const p = palavraAtiva;
  if (!p) return;

  elRotulo.textContent = `${p.numero} ${p.direcao === "H" ? "Horizontal" : "Vertical"}`;
  elTamanho.textContent = `${p.resposta.length} letras`;
  elDica.textContent = p.dicas[p.dicaAtual];
  elNumDica.textContent = `Dica ${p.dicaAtual + 1} de ${p.dicas.length}`;
  btnDica.disabled = p.dicaAtual >= p.dicas.length - 1;
  btnEmbaralhar.disabled = false;
  btnApagar.disabled = false;
  desenharLetras();
}

function desenharLetras() {
  const p = palavraAtiva;
  elLetras.innerHTML = "";

  // conta quantas vezes cada letra já foi colocada na palavra
  const usadas = {};
  letrasAtuais(p).forEach(letra => { if (letra) usadas[letra] = (usadas[letra] || 0) + 1; });

  p.embaralhada.forEach(letra => {
    const botao = document.createElement("button");
    botao.className = "letra";
    botao.textContent = letra;
    if (usadas[letra] > 0) {
      usadas[letra]--;
      botao.disabled = true;
    } else {
      botao.addEventListener("click", () => colocarLetra(letra));
    }
    elLetras.appendChild(botao);
  });
}

function colocarLetra(letra) {
  const posicoes = casasDaPalavra(palavraAtiva);
  const vazia = posicoes.find(({ l, c }) => !casas[l][c].input.value);
  if (!vazia) return;

  const dados = casas[vazia.l][vazia.c];
  dados.input.value = letra;
  limparMarcacao(vazia.l, vazia.c);

  const proxima = posicoes.find(({ l, c }) => !casas[l][c].input.value);
  casaFoco = proxima || vazia;
  desenharDestaques();
  casas[casaFoco.l][casaFoco.c].input.focus();
  desenharLetras();
}

// ---------- Digitação ----------
function digitarNaCasa(l, c) {
  const input = casas[l][c].input;
  const letra = input.value.toUpperCase().normalize("NFD").replace(/[^A-Z]/g, "").slice(-1);
  input.value = letra;
  limparMarcacao(l, c);
  if (letra) moverNaPalavra(1);
  if (palavraAtiva) desenharLetras();
}

function teclaNaCasa(e, l, c) {
  const input = casas[l][c].input;

  if (/^[a-zA-Z]$/.test(e.key) && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    input.value = e.key.toUpperCase();
    limparMarcacao(l, c);
    moverNaPalavra(1);
    desenharLetras();
  } else if (e.key === "Backspace") {
    e.preventDefault();
    if (input.value) {
      input.value = "";
    } else {
      moverNaPalavra(-1);
      casas[casaFoco.l][casaFoco.c].input.value = "";
    }
    limparMarcacao(casaFoco.l, casaFoco.c);
    desenharLetras();
  } else if (e.key === "Delete") {
    e.preventDefault();
    input.value = "";
    limparMarcacao(l, c);
    desenharLetras();
  } else if (e.key.startsWith("Arrow")) {
    e.preventDefault();
    const passos = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key];
    let nl = l + passos[0], nc = c + passos[1];
    while (nl >= 0 && nl < LINHAS && nc >= 0 && nc < COLUNAS && !casas[nl][nc]) {
      nl += passos[0]; nc += passos[1];
    }
    if (nl >= 0 && nl < LINHAS && nc >= 0 && nc < COLUNAS) {
      const direcao = passos[0] !== 0 ? "V" : "H";
      const alvo = casas[nl][nc].palavras.find(p => p.direcao === direcao) || casas[nl][nc].palavras[0];
      casaFoco = { l: nl, c: nc };
      selecionarPalavra(alvo, false);
    }
  } else if (e.key === "Tab" || e.key === "Enter") {
    e.preventDefault();
    const ordem = [...PALAVRAS].sort((a, b) => (a.direcao + a.numero).localeCompare(b.direcao + b.numero, undefined, { numeric: true }));
    const i = ordem.indexOf(palavraAtiva);
    const proxima = ordem[(i + (e.shiftKey ? -1 : 1) + ordem.length) % ordem.length];
    selecionarPalavra(proxima);
  }
}

function moverNaPalavra(passo) {
  if (!palavraAtiva || !casaFoco) return;
  const posicoes = casasDaPalavra(palavraAtiva);
  const i = posicoes.findIndex(({ l, c }) => l === casaFoco.l && c === casaFoco.c);
  const novo = Math.min(Math.max(i + passo, 0), posicoes.length - 1);
  casaFoco = posicoes[novo];
  desenharDestaques();
  casas[casaFoco.l][casaFoco.c].input.focus();
}

// ---------- Botões do painel ----------
btnDica.addEventListener("click", () => {
  const p = palavraAtiva;
  if (!p || p.dicaAtual >= p.dicas.length - 1) return;
  p.dicaAtual++;
  dicasExtras++;
  elContadorDicas.textContent = `Dicas extras usadas: ${dicasExtras}`;
  atualizarItemLista(p);
  atualizarPainel();
  casas[casaFoco.l][casaFoco.c].input.focus();
});

btnEmbaralhar.addEventListener("click", () => {
  if (!palavraAtiva) return;
  palavraAtiva.embaralhada = embaralhar(palavraAtiva.resposta);
  desenharLetras();
});

btnApagar.addEventListener("click", () => {
  if (!palavraAtiva) return;
  casasDaPalavra(palavraAtiva).forEach(({ l, c }) => {
    casas[l][c].input.value = "";
    limparMarcacao(l, c);
  });
  selecionarPalavra(palavraAtiva);
});

// ---------- Conferir / Reiniciar ----------
function limparMarcacao(l, c) {
  casas[l][c].div.classList.remove("certa", "errada");
  casas[l][c].palavras.forEach(p => p.li.classList.remove("certa", "errada"));
}

function conferir() {
  let acertos = 0;
  const corretas = new Set();

  PALAVRAS.forEach(p => {
    const certa = letrasAtuais(p).join("") === p.resposta;
    p.li.classList.toggle("certa", certa);
    p.li.classList.toggle("errada", !certa);
    if (certa) { acertos++; corretas.add(p); }
  });

  // uma casa fica verde se faz parte de alguma palavra certa
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      const dados = casas[l][c];
      if (!dados) continue;
      const certa = dados.palavras.some(p => corretas.has(p));
      dados.div.classList.toggle("certa", certa);
      dados.div.classList.toggle("errada", !certa);
    }
  }

  elContador.textContent = `${acertos} de ${PALAVRAS.length} palavras`;

  if (acertos === PALAVRAS.length) {
    elMensagem.textContent = dicasExtras === 0
      ? "Parabéns! Você completou tudo sem usar dicas extras!"
      : `Parabéns! Você completou a cruzadinha usando ${dicasExtras} dica(s) extra(s).`;
    elMensagem.className = "mensagem vitoria";
  } else {
    elMensagem.textContent = `Faltam ${PALAVRAS.length - acertos} palavra(s). As erradas estão em vermelho.`;
    elMensagem.className = "mensagem";
  }
}

function reiniciar() {
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      const dados = casas[l][c];
      if (!dados) continue;
      dados.input.value = "";
      dados.div.classList.remove("certa", "errada", "na-palavra", "foco");
    }
  }
  PALAVRAS.forEach(p => {
    p.dicaAtual = 0;
    p.embaralhada = embaralhar(p.resposta);
    p.li.classList.remove("certa", "errada", "ativa");
    atualizarItemLista(p);
  });

  dicasExtras = 0;
  palavraAtiva = null;
  casaFoco = null;
  elContador.textContent = `0 de ${PALAVRAS.length} palavras`;
  elContadorDicas.textContent = "Dicas extras usadas: 0";
  elMensagem.textContent = "";
  elMensagem.className = "mensagem";
  elRotulo.textContent = "Clique numa casa ou numa pista";
  elTamanho.textContent = "";
  elDica.textContent = "Escolha uma palavra para ver a dica e as letras embaralhadas.";
  elNumDica.textContent = "";
  elLetras.innerHTML = "";
  btnDica.disabled = btnEmbaralhar.disabled = btnApagar.disabled = true;
}

document.getElementById("btn-conferir").addEventListener("click", conferir);
document.getElementById("btn-reiniciar").addEventListener("click", reiniciar);

// ---------- Início ----------
montarTabuleiro();
montarListas();
elContador.textContent = `0 de ${PALAVRAS.length} palavras`;
