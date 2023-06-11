  const themeElement = document.getElementById("theme");
  const hintElement = document.getElementById("hint");
  const hiddenWordElement = document.getElementById("hidden-word");

  const usersRef = firebase.firestore().collection("users");
  // const auth = firebase.auth();

showLoading();
 

    const timeElement = document.getElementById("time");
    let countdown = 30; // Contagem regressiva de 30 segundos
    let countdownInterval; // Referência para o intervalo da contagem regressiva

    const arrayObj = [
      { nivel: 3, theme: 'tecnologia', word: 'criptomoedas', tips: [
        { id: 'KEbR0i85A9avVyMrQ6nA', nameTips: 'segurança nas transações' },
        { id: 'NcI1U7m1qHlxKN5MbUvz', nameTips: 'moeda digital descentralizada' }
      ] },
      { nivel: 3, theme: 'natureza', word: 'desertos', tips: [
        { id: 'kAaONjwcKEU088jbf6Nz', nameTips: 'climas áridos e secos' }
      ] },
      { nivel: 3, theme: 'natureza', word: 'florestas', tips: [
        { id: 'LeLKTgfwrMfy4SKL4iO4', nameTips: 'pulmão do planeta' }
      ] },
      { nivel: 1, theme: 'natureza', word: 'rios', tips: [
        { id: 'TJSQAgCXGqcr04XA5pva', nameTips: 'transporte e geração de energia' }
      ] },
      { nivel: 3, theme: 'natureza', word: 'montanhas', tips: [
        { id: 'BqcPaEU4Em4zNZmfhcQM', nameTips: 'preservação da fauna e flora' }
      ] },
      { nivel: 3, theme: 'restaurante', word: 'mcdonalds', tips: [
        { id: '8sQucowXfa0WTFCG3qb3', nameTips: 'fastfood' }
      ] },
      { nivel: 2, theme: 'restaurante', word: 'habibs', tips: [
        { id: 'nysBbXgYGK1POrujoiWt', nameTips: 'fastfood' }
      ] },
      { nivel: 3, theme: 'restaurante', word: 'sal grosso', tips: [
        { id: 'Sph2CNBFMybgtrH7nL9R', nameTips: 'chef henrique fogaça' }
      ] },
      { nivel: 1, theme: 'saúde', word: 'sono', tips: [
        { id: 'Z0V7yasNE6dVT002YfZN', nameTips: 'importância para o bem-estar físico e mental' }
      ] },
      { nivel: 3, theme: 'saúde', word: 'alimentação', tips: [
        { id: 'cslMCYj3bL4PR22CVztG', nameTips: 'nutrientes essenciais para a saúde' }
      ] },
      { nivel: 3, theme: 'saúde', word: 'exercício', tips: [
        { id: '9NAMler7Kb1wfywmAWwN', nameTips: 'fortalecimento muscular e cardiovascular' }
      ] },
      { nivel: 2, theme: 'saúde', word: 'higiene', tips: [
        { id: 'VDtQnkZpx6OcnFCDdeOH', nameTips: 'prevenção de doenças infecciosas' }
      ] },
      { nivel: 1, theme: 'animais', word: 'leão', tips: [
        { id: 'uAFlvDK2eOaEqjEB7eCb', nameTips: 'mamífero da família dos felinos' }
      ] },
      { nivel: 3, theme: 'animais', word: 'elefante', tips: [
        { id: 'O8ezcLGU9kbaHGDX5XQe', nameTips: 'maior animal terrestre' }
      ] }
    ];

    const nivel  = 3
    let premio = 0
    

    if(nivel === 1){
      premio = 100
    }else if(nivel === 2){
      premio = 250
    }else if(nivel === 3){
      premio = 500
    }

    const palavrasNivelDesejado = arrayObj.filter(word => word.nivel === nivel);
    const randomWord = palavrasNivelDesejado[Math.floor(Math.random() * palavrasNivelDesejado.length)];
    const dWord = randomWord.word.toUpperCase().replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u0366\u0368-\u036F]/g, '');
    const dTheme = randomWord.theme.toUpperCase()
    const dTips =  randomWord.tips[0].nameTips
    
    console.log(dWord,dTheme,dTips )
    
    // Define o tema, palavra e dica no HTML
    themeElement.textContent = "Tema: " + dTheme;

    hintElement.textContent = dTips;
    
    // Divide a palavra em letras
    const wordLetters = dWord.split("");
    
    // Inicializa a palavra oculta com underscores
    let hiddenWord = Array(wordLetters.length).fill(" ");

    function drawHiddenWord() {
      hiddenWordElement.innerHTML = ""; // Limpa o conteúdo anterior
    
      for (let i = 0; i < hiddenWord.length; i++) {
        const letter = hiddenWord[i];
    
        if (letter !== "  ") {
          const letterBox = document.createElement("div");
          letterBox.className = "letter-box";
          letterBox.textContent = letter;
          hiddenWordElement.appendChild(letterBox);
        } else {
          const space = document.createElement("div");
          space.className = "space";
          hiddenWordElement.appendChild(space);
        }
      }
    }
    
    drawHiddenWord();
    
    // Variáveis para controlar as partes do corpo do boneco
    let bodyParts = 0;
    const maxBodyParts = 6;
    
    const attemptsPlayer1 = document.getElementById('attemptsPlayer1')
    const attemptsPlayer2 = document.getElementById('attemptsPlayer2')

    attemptsPlayer1.innerHTML = "Tentativas restantes " + maxBodyParts
    attemptsPlayer2.innerHTML = "Tentativas restantes " + maxBodyParts



  // Verifica se a letra fornecida pelo jogador está correta
    function checkLetter(letter, button) {

      let foundLetter = false;
      console.log(letter)
      // Verifica se a letra está presente na palavra
      for (let i = 0; i < wordLetters.length; i++) {
        if (wordLetters[i] === letter) {
          hiddenWord[i] = letter;
          foundLetter = true;
        }
      }
    
      // Atualiza o elemento da palavra oculta no HTML
      drawHiddenWord();
    
      // Verifica se o jogador ganhou ou perdeu
      if (!hiddenWord.includes(" ")) {
        //alert("Parabéns! Você venceu!");
        showModalWin()
        verificarEAtualizarMoedas(premio)
        stopTimer()
        
        //location.reload();
      } else if (!foundLetter) {
        // O jogador errou a letra, adiciona uma parte do corpo do boneco
        startTimer()
        bodyParts++;

        drawBodyPart(bodyParts);
        attemptsPlayer1.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyParts)
        attemptsPlayer2.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyParts)

        if (bodyParts === maxBodyParts) {
          
          showModalLoser()
          //verificarEAtualizarMoedas(-100)
        
        } else {
          //alert("Letra incorreta. Tente novamente.");
          button.disabled = true;
          button.classList.add("disabled");
        }
      } else {
        startTimer()
        button.disabled = true;
        button.classList.add("hit");
      }
    }

    const keys = document.getElementsByClassName("key");
    for (let i = 0; i < keys.length; i++) {
      const button = keys[i];
      const letter = button.textContent;
      button.addEventListener("click", function () {
        checkLetter(letter, button);
      });
    }


    //controle dos falicitadores dentro do jogo
    const facilitador1 = document.getElementById('facilitador1')
    const facilitador2 = document.getElementById('facilitador2')
    const facilitador3 = document.getElementById('facilitador3')
    const facilitador4 = document.getElementById("facilitador4")
    
  
    facilitador1.addEventListener("click", function() {
      const valorfacilitador1 = 15

      if(bodyParts === 0){
        showModalMsg("Você ainda não pode usar esse facilitador")
        facilitador1.disabled = false
        
      }else if(moedasPerfil.textContent >= valorfacilitador1){

        verificarEAtualizarMoedas(-valorfacilitador1)
      
        facilitador1.querySelector('img').style.filter = "opacity(0.4) drop-shadow(0 0 0 #82c762)";
        facilitador1.style.cursor = "not-allowed"
        facilitador1.disabled = true
        
        bodyParts = (bodyParts - 1)
        drawBodyPart(bodyParts)
        attemptsPlayer1.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyParts )
        attemptsPlayer2.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyParts )
      }else{
        showModalMsg("Você não tem moedas suficientes. Aqui")
      }
      // Restante do código relacionado ao facilitador1
    });



    facilitador2.addEventListener("click", function() {
      const valorFacilitador2 = 30;
    
      if (moedasPerfil.textContent >= valorFacilitador2) {
        verificarEAtualizarMoedas(-valorFacilitador2);
    
        facilitador2.querySelector('img').style.filter = "opacity(0.4) drop-shadow(0 0 0 #82c762)";
        facilitador2.style.cursor = "not-allowed"
        facilitador2.disabled = true;
    
        // Lógica para revelar uma letra da palavra
        const hiddenLetters = wordLetters.reduce((acc, letter, index) => {
          if (hiddenWord[index] === " ") {
            acc.push(index);
          }
          return acc;
        }, []);
    
        if (hiddenLetters.length > 0) {
          let randomIndex = null;
    
          if (hiddenLetters.length <= 3) {
            randomIndex = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
          } else {
            const filteredLetters = hiddenLetters.filter(index => !wordLetters[index].includes(" "));
            if (filteredLetters.length > 0) {
              randomIndex = filteredLetters[Math.floor(Math.random() * filteredLetters.length)];
            } else {
              randomIndex = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
            }
          }
    
          hiddenWord[randomIndex] = wordLetters[randomIndex];
          drawHiddenWord();
    
          if (hiddenLetters.length <= 3) {
            facilitador2.disabled = true;
          }
        }
    

      } else {
        showModalMsg("Você não tem moedas suficientes. Aqui");
      }
    });
    

    facilitador3.addEventListener("click", function() {
      const valorFacilitador3 = 25;
    
       if (moedasPerfil.textContent >= valorFacilitador3) {
        verificarEAtualizarMoedas(-valorFacilitador3);
    
        facilitador3.querySelector('img').style.filter = "opacity(0.4) drop-shadow(0 0 0 #82c762)";
        facilitador3.disabled = true;
        facilitador3.style.cursor = "not-allowed"
    
        //availableLetters são as letras que não contem na palavra
        const availableLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter(letter => !wordLetters.includes(letter));
        
        if (availableLetters.length >= 3) {
          const removedLetters = [];
          for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * availableLetters.length);
            const removedLetter = availableLetters.splice(randomIndex, 1)[0];
            //removedLetters são as letras que vão ser retiradas aleatoriamente
            removedLetters.push(removedLetter);
          }
          
          const keys = document.getElementsByClassName("key");
          for (let i = 0; i < keys.length; i++) {
            const button = keys[i];
            const letter = button.textContent;
            if (removedLetters.includes(letter)) {
              button.disabled = true;
              button.classList.add("disabled");
            }
          }

        } else {
          showModalMsg("Não há letras suficientes para remover da palavra.");
        }
      } else {
        showModalMsg("Você não tem moedas suficientes.");
      }
    });

    const btnDicaDiv = document.getElementById("btnDica")
    const textDica = document.getElementById("textDica")

      facilitador4.addEventListener("click", function() {
        const valorfacilitador1 = 20
        

        if(moedasPerfil.textContent >= valorfacilitador1){
  
          verificarEAtualizarMoedas(-valorfacilitador1)
          btnDicaDiv.classList.add("hide")
          textDica.classList.remove("hide")
        }else{
          showModalMsg("Você não tem moedas suficientes. Aqui")
        }
        // Restante do código relacionado ao facilitador1
      });

      facilitador4.addEventListener("click", function() {
        
      });


      



    const btnArricar = document.getElementById("enviarArricar")
    
    btnArricar.addEventListener("click", function() {
      const inputArriscar = document.getElementById('tentativa').value.toUpperCase()
    
      if (inputArriscar.trim() !== "") {
        if (inputArriscar === dWord) {
          closeModalArriscar()
          showModalWin("Parabéns, você acertou a palavra!")
          verificarEAtualizarMoedas(premio)
          stopTimer()
        } else {
          closeModalArriscar()
          showModalLoser("Você errou a palavra! A palavra correta era " + dWord)
          //verificarEAtualizarMoedas(-100)
        }
      } else {
        // Caso o input esteja em branco ou nulo
        alert("Digite uma palavra antes de arriscar.")
      }
    });

   
    //função dos segundos
    function startTimer() {
      clearInterval(countdownInterval)
      countdown = 20
      timeElement.textContent = countdown
      
      countdownInterval = setInterval(() => {
        countdown--;
        timeElement.textContent = countdown
    
        if (countdown === 0) {
          clearInterval(countdownInterval)
          keyboardDisable()

          if (bodyParts !== (maxBodyParts-1)) {
            keyboardDisable()
            setTimeout(()=>{
              startTimer()
              keyboardEnable();
            },2000)

            
            
            bodyParts++
            drawBodyPart(bodyParts)
            attemptsPlayer1.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyParts)
            attemptsPlayer2.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyParts)
            console.log(bodyParts, maxBodyParts)
          }else if (bodyParts === (maxBodyParts-1)){
            showModalLoser("Você perdeu, seu tempo acabou!")
            //verificarEAtualizarMoedas(-100)
          }
        }
      }, 1000)
    }
    //função para parar o timer
    function stopTimer() {
      clearInterval(countdownInterval)
    }


  // Função para desenhar uma parte do corpo do boneco na forca
  const imgForcaPlayer1 = document.getElementById('imgPlayer1');
  const imgForcaPlayer2 = document.getElementById('imgPlayer2');

  function drawBodyPart(imgValor) {
    imgForcaPlayer1.src = "images/robo" + imgValor + ".png";
    imgForcaPlayer2.src = "images/robo" + imgValor + ".png";
  }


//botão sair  
  const btnSair = document.getElementById('sair')
  btnSair.addEventListener('click', function(){
    window.location.href = "index.html";
  })

  const roundPlayer = document.getElementById('roundPlayer');
  roundPlayer.innerHTML = "Player 1 jogando..."

// informaçoes do perfil do jogador

  const moedasPerfil = document.getElementById('moedas')
  const dPlayer1 = document.getElementById('dPlayer1')

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      if(user){         
          usersRef.doc(uid).get()
          .then((doc) => {
            if (doc.exists) {
            
              const data = doc.data();
              const nome = data.name;
              const moedas = data.money;
              const partidasGanhas = data.partidasGanhas;
              const partidasPerdidas = data.partidasPerdidas

              moedasPerfil.innerHTML = moedas
              dPlayer1.innerHTML = "Player 1 - " + nome
              setTimeout(() =>{
                hideLoading();
              }, 1000)

            } else {
              // o documento do usuário não existe
              console.log("Documento do usuário não encontrado.");
            }
          })
          .catch((error) => {
            console.log("Erro ao recuperar informações do usuário: ", error);
          });
      }
  
    });

//função para atualizar o valor das moedas
    function verificarEAtualizarMoedas(quantidadeMoedas) {
      const uid = firebase.auth().currentUser.uid;
    
      usersRef
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const moedas = data.money;
            if (quantidadeMoedas > 0){
              modificarMoedas(uid, quantidadeMoedas);
              moedasPerfil.innerHTML = moedas + quantidadeMoedas

            }else if (moedas > (Math.abs(quantidadeMoedas))) {
              modificarMoedas(uid, quantidadeMoedas);
                moedasPerfil.innerHTML = moedas - (Math.abs(quantidadeMoedas))

            }else {
              showModalMsg("Você não tem moedas suficientes.")
            }
          } else {
            alert("Perfil do jogador não encontrado.");
          }
        })
        .catch((error) => {
          console.log("Erro ao acessar o perfil do jogador: ", error);
        });
    }


    function modificarMoedas(uid, quantidadeMoedas) {
      usersRef
        .doc(uid)
        .update({
          money: firebase.firestore.FieldValue.increment(quantidadeMoedas)
        })
        .then(() => {
          console.log("Moedas removidas com sucesso!");
        })
        .catch((error) => {
          console.log("Erro ao remover moedas: ", error);
        });
    }


//tooltip do botões

    const tooltipButtons = document.querySelectorAll('.tooltip-button');
    let tooltip;
    
    tooltipButtons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        const text = this.dataset.text;
        showTooltip(text, button);
      });
    
      button.addEventListener('mouseleave', function() {
        hideTooltip();
      });
    });
    
    function showTooltip(message, button) {
      hideTooltip();
    
      tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.textContent = message;
      button.appendChild(tooltip);
    }
    
    function hideTooltip() {
      if (tooltip) {
        tooltip.remove();
        tooltip = null;
      }
    }


//bloquea teclado
    const keyboard = document.getElementById("keyboard");

    function keyboardDisable(){
      keyboard.style.pointerEvents = "none";
      keyboard.style.filter = "blur(3px)";
    }
    
    function keyboardEnable() {
      keyboard.style.pointerEvents = "auto";
      keyboard.style.filter = "none";
    }
    
// controle dos modals

const modalWin = document.getElementById('modal-win')
const modalLoser = document.getElementById('modal-loser')
const fecharModalWin = document.getElementById('fecharModalWin')

function showModalWin(mensagem){

  const msgWin = document.getElementById("msgWin")
  if (mensagem) {
    msgWin.textContent = mensagem
  }
  modalWin.classList.remove('hide')
}

fecharModalWin.addEventListener("click", function(){
  window.location.href = "niveis.html";
})


function showModalLoser(mensagem){
  console.log("você perdeu")
  const msgLoser = document.getElementById("msgLoser")
  if (mensagem) {
    msgLoser.textContent = mensagem
  }
  modalLoser.classList.remove('hide')
}

const modalMsg = document.getElementById('modal-msg')
const closeModalMsg = document.getElementById('btn-confirmar')
const fecharModalLoser = document.getElementById('fecharModalLoser')

function showModalMsg(mensagem){

  const msg = document.getElementById('msg')
  if (mensagem) {
    msg.textContent = mensagem
  }
  modalMsg.classList.remove('hide')
}
closeModalMsg.addEventListener("click", function() {
  modalMsg.classList.add('hide')
});

fecharModalLoser.addEventListener("click", function(){
  window.location.href = "niveis.html";
})

const facilitador5 = document.getElementById("facilitador5")
const modalArriscar = document.getElementById('modal-arriscar')
const btnCloseModal = document.getElementById('closeModal')

facilitador5.addEventListener("click", function() {
  modalArriscar.classList.remove('hide')
});

btnCloseModal.addEventListener("click", function() {
  closeModalArriscar()
});

function closeModalArriscar(){
  modalArriscar.classList.add('hide')
}














