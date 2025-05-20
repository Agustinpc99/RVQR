const zona=document.getElementById("zonaqr")
const codigo= document.getElementById("cod")
const boton = document.getElementById("btn-escanear");
console.log(zona)
let escaner;
const formatsToSupport = [
  Html5QrcodeSupportedFormats.QR_CODE,
  Html5QrcodeSupportedFormats.CODE_128,
  Html5QrcodeSupportedFormats.EAN_13,
  Html5QrcodeSupportedFormats.UPC_A
];


boton.addEventListener("click", () => {
  // Evita múltiples instancias
  if (escaner) {
    return;
  }

  escaner = new Html5Qrcode("reader");

  escaner.start(
    { facingMode: "environment" },
  {
    fps: 10,
    qrbox: 250,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    formatsToSupport: formatsToSupport
  },
    (decodedText) => {
      resultado.innerText = `Código detectado: ${decodedText}`;
      codigo.value = decodedText;
      escaner.stop().then(() => {
        escaner.clear();
        escaner = null;
      });
    },
    (errorMessage) => {
      // Errores de escaneo (opcional)
      console.log("No se detectó:", errorMessage);
    }
  ).catch(err => {
    console.error("Error al iniciar cámara:", err);
  });
});



codigo.addEventListener("input",(e)=>{
    zona.innerHTML = `<img src='https://api.qrserver.com/v1/create-qr-code/?data={"id":"${codigo.value}","t":"lm"}&size=200x200' alt=""></img>`
    console.log(zona)
})