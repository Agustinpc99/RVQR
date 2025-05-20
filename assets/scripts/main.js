const zona=document.getElementById("zonaqr")
const codigo= document.getElementById("cod")
const btn = document.getElementById("btn-escanear");
const resultado = document.getElementById("resultado");

btn.addEventListener("click", () => {
  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#contenedor-video"),
      constraints: {
        facingMode: "environment" // usa la cámara trasera en móvil
      }
    },
    decoder: {
      readers: ["ean_reader", "code_128_reader", "upc_reader"] // tipos soportados
    }
  }, function(err) {
    if (err) {
      console.error("Error al iniciar Quagga:", err);
      return;
    }
    Quagga.start();
  });

  Quagga.onDetected(data => {
    const code = data.codeResult.code;
    resultado.innerText = `Código detectado: ${code}`;
    Quagga.stop(); // detiene el escaneo después de detectar
  });
});




codigo.addEventListener("input",(e)=>{
    zona.innerHTML = `<img src='https://api.qrserver.com/v1/create-qr-code/?data={"id":"${codigo.value}","t":"lm"}&size=200x200' alt=""></img>`
    console.log(zona)
})