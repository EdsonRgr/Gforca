const usersRef = firebase.firestore().collection("users");
const auth = firebase.auth();

const btnFacil = document.getElementById('btnFacil')
const btnMedio = document.getElementById('btnMedio')
const btnDificil = document.getElementById('btnDificil')

const btnVoltar = document.getElementById('btnVoltar')

const moedasPerfil = document.getElementById('moedasPefil')

showLoading()
firebase.auth().onAuthStateChanged((user) => {
    const uid = user.uid;
    if(user){         
        usersRef.doc(uid).get()
        .then((doc) => {
          if (doc.exists) {
                     
            const data = doc.data();
            const moedas = data.money;
            
            moedasPerfil.innerHTML = moedas
            hideLoading()
            
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

  btnVoltar.addEventListener("click", ()=>{
    window.location.href = "index.html";
  })

btnFacil.addEventListener('click' , ()=>{
    if(moedasPerfil.textContent >= 50){
      window.location.href = "match.html";
    }else{
      alert("Você não tem moedas suficientes, valor da aposta de 50 moedas")
    }

  })

  btnMedio.addEventListener('click' , ()=>{
    if(moedasPerfil.textContent >= 125){
      window.location.href = "match.html";
    }else{
      alert("Você não tem moedas suficientes, valor da aposta de 125 moedas")
    }
  })

  btnDificil.addEventListener('click' , ()=>{
    if(moedasPerfil.textContent >= 250){
      window.location.href = "match.html";
    }else{
      alert("Você não tem moedas suficientes, valor da aposta de 250 moedas")
    }
  })

  