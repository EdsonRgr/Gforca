const usersRef = firebase.firestore().collection("users");
const auth = firebase.auth();


const moedasPefil = document.getElementById('perfilMoedas')
const perfilNome = document.getElementById('perfilNome')


showLoading()
firebase.auth().onAuthStateChanged((user) => {
    const uid = user.uid;
    if(user){         
        usersRef.doc(uid).get()
        .then((doc) => {
          if (doc.exists) {
                     
            const data = doc.data();
            const moedas = data.money;
            const nome = data.name

            perfilNome.innerHTML = nome
            moedasPefil.innerHTML = moedas
            hideLoading()
            //console.log(premio,valorAposta,nivel)
          } else {
            console.log("Documento do usuário não encontrado.");
            hideLoading()
          }
        })
        .catch((error) => {
          console.log("Erro ao recuperar informações do usuário: ", error);
        });
    }

  });



const checkboxPlayer1 = document.getElementById("checkboxPlayer1")
const checkboxPlayer2 = document.getElementById("checkboxPlayer2")

const readyP1 = document.getElementById("readyP1")
const readyP2 = document.getElementById("readyP2")



checkboxPlayer1.addEventListener('click', function() {
    
    if (checkboxPlayer1.checked){
        readyP1.innerHTML = "Pronto"
    }else if (!checkboxPlayer1.disabled){
        readyP1.innerHTML = "Aguardando..."
    }
    verificarMarcacao();
});


checkboxPlayer2.addEventListener('click', function() {
    if (checkboxPlayer2.checked){
        readyP2.innerHTML = "Pronto"
    }else if (!checkboxPlayer2.disabled){
        readyP2.innerHTML = "Aguardando..."
    }
    verificarMarcacao();
});


function verificarMarcacao() {
    if (checkboxPlayer1.checked && checkboxPlayer2.checked) {
        checkboxPlayer1.disabled = true;
        checkboxPlayer2.disabled = true;
        console.log("marcou os dois check");
        showLoading()
        setTimeout(() => {
            window.location.href = "versus.html";
        }, 3000);
    }
}


function sair(){
    window.location.href = "index.html";
}