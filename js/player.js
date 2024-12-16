
/*Invitawhats
Autor: Ulises Perez
Version: 1.0*/
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
window.onload=inicio;
var vid;                                  

	function inicio(){
		vid = document.querySelector("video");
		vid.src=`video/invitacion.mp4`;
		vid.onclick = play;
		document.querySelector(".play").onclick=play;
		document.querySelector(".playportada").onclick=play;
		document.querySelector(".botonplay").onclick=play;
		/*document.querySelector(".volumen").onclick=volumen;*/
		document.querySelector(".reiniciar").onclick=reiniciar;
		/*document.querySelector(".reducir").onclick=reducir;*/
		document.querySelector(".barragris").onclick=buscar;
		vid.ontimeupdate = actualizar;
		vid.onloadeddata = actualizar;
		vid.onended = enlaces;
	}
	function play(){
		if (vid.paused){
			vid.play();
			document.querySelector(".play").src="img/pausa.svg";
			document.querySelector(".barrabotones").style.display = "none";
			document.querySelector(".invitacion-portada").style.display = "none";
			document.querySelector(".botonplay").style.display = "none";
		} else{
			vid.pause();
			document.querySelector(".play").src="img/play.svg";
			document.querySelector(".barrabotones").style.display = "flex";
			document.querySelector(".botonplay").style.display = "none";
		}
		
	}
/*	function volumen(){
		vid.volume=!vid.volume;
		this.src=`img/volumen${vid.volume}.svg`;
	}*/
	function reiniciar(){
		vid.currentTime=0;
		document.querySelector(".barrabotones").style.display = "none";
		document.querySelector(".botonplay").style.display = "none";
		vid.play();
	}
/*	function reducir(){
		let s = document.querySelector("contenedorvideo");
		if (s.style.transform == "scale(0.5)"){
			s.style.transform = "scale(1)";
			document.querySelector(".reducir").src="img/reducir.svg";
		} else{
			s.style.transform = "scale(0.5)";
			document.querySelector(".reducir").src="img/ampliar.svg";
		}
		
	}*/
	function actualizar(){
		document.querySelector(".estado").innerHTML = `${conversion(vid.currentTime)} / ${conversion(vid.duration)}`;
		let porcentaje = (100 * vid.currentTime) / vid.duration;
		document.querySelector(".barraroja").style.width = `${porcentaje}%`;
	}
	function conversion(segundos){
		let d = new Date(segundos*1000);
		let segundo = (d.getSeconds() <= 9) ? "0" + d.getSeconds() : d.getSeconds();
		let minuto = (d.getMinutes() <= 9) ? "0" + d.getMinutes() : d.getMinutes();
		return `${minuto}:${segundo}`;
	}
	function buscar(e){
		let dondeheHechoclick = e.offsetX;
		let anchoNavegador = document.querySelector(".barragris").offsetWidth;
		let porcentaje = (100 * dondeheHechoclick) / anchoNavegador;
		let posicion = Math.floor(vid.duration * (porcentaje / 100));
		vid.currentTime = posicion;
	}
	function enlaces(){
		document.querySelector(".barrabotones").style.display = "grid";
		document.querySelector(".play").src="img/play.svg";
	}

