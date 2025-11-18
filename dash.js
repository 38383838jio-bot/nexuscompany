function StartCode() {
         const earning = document.getElementById("earning");
         const dashin = document.getElementById("frank");
         const ballance = document.getElementById("balance");
         const franklin = 'franklin' 
         const frank = "frank"
              
    if (dashin.innerText == frank) {
        earning.innerHTML="20"
        ballance.innerHTML="100"
    }
    
    if (dashin.innerText == franklin) {
        earning.innerHTML="200"
        ballance.innerHTML="500"
    }
    else{
        return false
    }
}
StartCode();
 