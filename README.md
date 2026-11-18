
🧩 CruzaBits
Cruzadinha de Arquitetura Computacional, com letras embaralhadas e várias dicas por palavra.

🔗 Jogue agora: https://gabriela-marcelino.github.io/Cruzabits/

📖 Sobre o jogo
O CruzaBits é um jogo de cruzadinha que roda direto no navegador. Ele foi feito para treinar os termos da aula de Tópicos de Arquitetura Computacional: CPU, memórias, barramentos, processadores e muito mais.

O jogo junta duas ideias:

Cruzadinha: as 16 palavras se cruzam no tabuleiro, e cada letra certa ajuda a descobrir as palavras vizinhas.
Letras embaralhadas: ao escolher uma palavra, as letras dela aparecem misturadas no painel. Você pode montar a resposta clicando nelas.
E se a dica estiver difícil, tudo bem: cada palavra tem 3 dicas, da mais difícil para a mais fácil. 💡

✨ Funcionalidades
🔠 Tabuleiro com todas as 16 palavras da lista, todas cruzadas entre si
📋 Pistas numeradas e separadas em Horizontais e Verticais, com a quantidade de letras de cada palavra
⌨️ As letras são digitadas direto nas casas do tabuleiro
🔀 Letras embaralhadas da palavra escolhida, que podem ser clicadas para preencher as casas
💡 Botão Outra dica, com até 3 dicas por palavra e um contador de dicas extras usadas
✅ Botão Conferir: palavras certas ficam verdes e erradas ficam vermelhas
🔢 Contador de acertos, por exemplo: "12 de 16 palavras"
🔄 Botão Reiniciar, que limpa o tabuleiro, volta para a primeira dica e embaralha as letras de novo
📱 Layout que se adapta ao celular
🎮 Como jogar
Escolha uma palavra: clique numa casa do tabuleiro ou numa pista da lista.
Leia a dica no painel ao lado. O número entre parênteses mostra quantas letras a palavra tem.
Preencha a palavra: digite as letras nas casas ou clique nas letras embaralhadas.
Travou? Clique em Outra dica para ver uma dica mais fácil.
Clique em Conferir para ver quantas você acertou.
Complete as 16 palavras. Tente usar o mínimo de dicas extras! 🏆
⌨️ Atalhos
Tecla / ação	O que faz
Clicar de novo na mesma casa	Troca entre horizontal e vertical
Setas ⬆️⬇️⬅️➡️	Andam pelas casas do tabuleiro
Tab ou Enter	Vai para a próxima palavra
Shift + Tab	Volta para a palavra anterior
Backspace	Apaga a letra e volta uma casa
📝 Palavras e pistas
No tabuleiro, as palavras são escritas em letras maiúsculas, sem acento e sem espaço.

Nº	Palavra	Dica 1 (difícil)	Dica 2 (média)	Dica 3 (fácil)
1	CPU	Componente que busca, decodifica e executa as instruções dos programas.	Abriga a ULA, a UC e os registradores.	Conhecido como o cérebro do computador.
2	ULA	Circuito que executa operações como AND, OR e NOT sobre os bits.	Recebe valores dos registradores e devolve o resultado do cálculo.	Parte da CPU que faz somas, subtrações e comparações.
3	UC	Parte da CPU que coordena o funcionamento dos demais componentes.	Decodifica as instruções e gera os sinais que orientam a ULA.	É o maestro do processador, ditando a ordem das operações.
4	REGISTRADORES	Topo da hierarquia de memória: pouquíssima capacidade e acesso quase instantâneo.	Guardam temporariamente os valores que a ULA está usando no momento.	Pequenas memórias dentro da CPU, as mais rápidas do computador.
5	RAM	Memória de leitura e escrita onde ficam os programas em execução.	Memória principal e volátil: perde tudo quando o computador desliga.	Quanto mais GB dela, mais programas abertos ao mesmo tempo.
6	ROM	Memória não volátil com conteúdo gravado de fábrica, sem alteração no uso normal.	Tradicionalmente guarda o firmware de inicialização, como a BIOS.	Mantém os dados sem energia, mas o usuário não consegue reescrevê-los.
7	EEPROM	Memória não volátil que pode ser reescrita byte a byte no próprio circuito.	Guarda configurações de microcontroladores que sobrevivem ao desligamento.	Guarda poucos dados permanentes, como calibrações, e aceita regravação sem retirar o chip.
8	FLASH	Memória não volátil regravável, apagada em blocos inteiros.	Tecnologia usada em pendrives, SSDs e cartões SD.	Memória dos pendrives cujo nome em inglês também significa clarão.
9	CACHE	Guarda cópias dos dados mais usados para evitar buscas lentas na RAM.	Memória pequena e muito rápida que fica entre a CPU e a RAM.	Memória organizada em níveis chamados L1, L2 e L3.
10	MEMORIADEMASSA	Grande capacidade e baixo custo por GB, porém bem mais lenta que a RAM.	Guarda arquivos, fotos e o sistema operacional mesmo sem energia.	Dispositivos como HD e SSD.
11	DMA	Seu controlador avisa a CPU com uma interrupção quando a transferência termina.	Técnica que libera o processador durante grandes transferências de dados.	Permite que periféricos copiem dados para a RAM sem ocupar a CPU.
12	ADDRESSBUS	Sua largura em bits define quanta memória a CPU consegue alcançar.	Unidirecional: sai da CPU indicando onde ler ou gravar.	Linhas pelas quais a CPU informa qual posição de memória quer acessar.
13	DATABUS	Bidirecional: leva e traz os valores lidos e escritos na memória.	Sua largura (8, 32 ou 64 bits) indica quantos bits viajam de uma vez.	Linhas que transportam as informações entre CPU, memória e periféricos.
14	MICROCONTROLADOR	Chip que reúne processador, memória e entradas e saídas num só componente.	Coração de sistemas embarcados, como máquinas de lavar e brinquedos eletrônicos.	O ATmega328, usado no Arduino, é um exemplo dele.
15	DUALCORE	Processador com duas unidades de execução independentes no mesmo chip.	Permite rodar duas tarefas realmente em paralelo, uma em cada núcleo.	Processador de dois núcleos.
16	QUADCORE	Executa quatro tarefas realmente em paralelo, uma em cada unidade de execução.	Tem o dobro de núcleos de um processador de dois núcleos.	Processador de quatro núcleos.
Todas as pistas têm no máximo 15 palavras e não contêm a resposta, nem parte dela, nem a sigla por extenso.

🛠️ Tecnologias
HTML5: estrutura da página
CSS3: visual, cores e layout responsivo
JavaScript puro: lógica do jogo, sem nenhuma biblioteca
GitHub Pages: publicação do site
📁 Estrutura do projeto
📦 Cruzabits
 ┣ 📜 index.html   → página do jogo
 ┣ 🎨 style.css    → estilos e cores
 ┣ ⚙️ script.js    → palavras, dicas e lógica do jogo
 ┗ 📝 README.md    → este arquivo
🚀 Como rodar no computador
Baixe ou clone este repositório.
Abra o arquivo index.html no navegador.
Pronto, é só jogar! Não precisa instalar nada.
Projeto feito para a disciplina de Arquitetura Computacional, Sprint 3. 💻