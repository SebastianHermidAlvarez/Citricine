let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');  /* la declaracion de botones se repite codigo */ 
const btnSiguiente = document.getElementById('btnSiguiente');
const btnAnteriorInferior = document.getElementById('btnAnteriorInferior');
const btnSiguienteInferior = document.getElementById('btnSiguienteInferior');
 /*btnSiguinte y Anterior con su version Inferior se podrian fusionar para reducir codigo*/ 
btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

btnSiguienteInferior.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnteriorInferior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});
/*Se podria cambiar top_rated por una variable para que le permita al usuario  elegir otro tipo de listas de peliculas*/ 

const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=b7f9be5d7d8dea1d2870b3eda0c2cc8c&language=es-MX&page=${pagina}`);
		/* La api es tomada  de  https://developers.themoviedb.org/ y la key es b7f9be5d7d8dea1d2870b3eda0c2cc8c */
		console.log(respuesta);

		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
					<h3 class="titulo">${pelicula.title}</h3>	
					<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" style= "width:100%;max-width:20%">
					<h3> <br> </h3>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){
			console.log('Error de Servidor');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}
cargarPeliculas();