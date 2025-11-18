function StartCode() {
         const earning = document.getElementById("earning");
         const frank = document.getElementById("frank");
         const ballance = document.getElementById("balance");
         const frank1 = 'franklin' 
    if (frank.innerText == frank1) {
        earning.innerHTML="200"
        ballance.innerHTML="500"
    }
    else{
        return false
    }
}
StartCode();
 