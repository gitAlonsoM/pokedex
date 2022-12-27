
/* referencias */
const pokeName = document.querySelector('.pkm-name');
const pokeImg = document.querySelector('.pkm-img');
const pokeShiny = document.querySelector(".pkm-shiny")
const pokeImgContainer = document.querySelector('.pkm-img-container');
const pokeId = document.querySelector('.pkm-id');
const pokeTypes = document.querySelector('.pkm-types');
const pokeStats = document.querySelector('.pkm-stats');
const habilidades = document.querySelector('.habilidades');
const altura = document.querySelector('.pkm-hight')
const peso = document.querySelector('.pkm-wight')


/* Objeto que asocia el tipo de pkm a un color propio */
const colorSegunTipo = {
    electric: 'rgb(255, 234, 112)',
    normal: 'rgb(176, 147, 152)',
    fire: 'rgb(255, 103, 92)',
    water: 'rgb(5, 150, 199)',
    ice: 'rgb(175, 234, 253)',
    rock: 'rgb(153, 151, 153)',
    flying: 'rgb(122, 231, 199)',
    grass: 'rgb(74, 150, 129)',
    psychic: 'rgb(255, 198, 217)',
    ghost: 'rgb(148, 0, 211)',
    bug: 'rgb(162, 250, 163)',
    poison: 'rgb(128, 0, 128)',
    ground: 'rgb(210, 176, 116)',
    dragon: 'rgb(218, 98, 125)',
    steel: 'rgb(29, 138, 153)',
    fighting: 'rgb(47, 47, 47)',
    fairy: 'rgb(255, 192, 203)',
    dark:'#000000',
    default: 'rgb(255, 255, 255)',
    }


const buscarPokemon = e => { 
    
    e.preventDefault();// Prevenir el envio del formulario 
    const pokemonName = e.target.pokemon.value; // Obtener el valor del campo de entrada del formulario
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`) //llamado a la api, en especifico del value ingresado en el input + transformando todo a minuscula
      .then(response => response.json()) // Convertir la respuesta a json
      .then(data => {  // se cargan los datos del llamado en la variable data y se llama a la funcion pintarpkm entregandole data como parametro
        console.log(data);  //datos cargados especificos del pkm ingresado en el input
        pintarPkm(data);})
       .catch(error=> noEncontrado()) //en caso que en el input se ingrese un valor incorrecto, no se podra hacer la peticion a la api, entonces al haber error, se llamara al catch y a su funcion
}


  

const pintarPkm = data => {
    const sprite =  data.sprites.other.home.front_default;  //ruta de la img en la data
    pokeImg.setAttribute('src', sprite); //se pinta la img

    const spriteShiny =  data.sprites.other.home.front_shiny
    pokeShiny.setAttribute('src', spriteShiny);

    /* se cargan los datos de name e id en el dom,
     estos datos estan disponibles a la primera
    en data a diferencia de otros datos, como la Img que hay que marcar toda la ruta, mirar la data
    en la pagina de pokeapi, para ver como estan hechas las rutas de datos*/
    
    const name = data.name;//se captura el name del pkm de data, esta todo en minuscula
    const primeraLetra = name.charAt(0).toUpperCase(); //la primera letra se pasa a Mayuscula
    const nombrePkm = `${primeraLetra}${name.slice(1)}`;//finalmente se concatena todo, primera letra y resto del nombre
    pokeName.textContent = nombrePkm; //se entrega el nombre del pkm al dom
    
    pokeId.textContent = `Nº ${data.id}`; 
    
    //se cargan las propiedades de stats, types, abilities, etc de data con el metodo destructuring, en vez de crear 1 variable por cada una, se pueden extraer todas en una sola linea, y usar cada una en distintas funciones mas abajo a medida que se necesiten
    const { stats, types, abilities, height, weight} = data;  
    //const stats = data.stats;     /* destructuring es equivalente a crear una variable por cada elemento extraido */
    //const types = data.types;

    colorFondo(types);
    tipoPkm(types);
    statsPkm(stats);
    habilidadPkm(abilities);
    alturaPeso(height, weight);
}



//relacionando el color de la card con el tipo del pokemon
const colorFondo = types => {
 
    const type0 = types[0].type.name; //ruta para acceder al primer tipo del pkm
    const colorOne = colorSegunTipo[type0]; //accediendo al objeto colorSegunTipo y asignandole su valor a colorOne

    if (types[1]) { //si existe un segundo tipo de pkm se asigna su nombre a colorTwo, de lo contrario se asigna un color por defecto
        var colorTwo = colorSegunTipo[types[1].type.name];
      } else {
        var colorTwo = colorSegunTipo["default"];
    }

    pokeImg.style.background = `radial-gradient(${colorTwo}, ${colorOne})`; //asignando colores de backgroun a la imagen de canal alfa png qe soporta colores de fondo
    pokeShiny.style.background = `radial-gradient(${colorOne}, ${colorTwo})`;
    //console.log(types[0].type.name) //usado para visualizar el tipo del pokemon del input
    //console.log(types[1].type.name) //algunos pkm tienen 2 tipos
};

  



const tipoPkm = types => {
    pokeTypes.textContent = ''; //usado para reiniciar los tipos y dejarlos en cero cada vez que se realiza un input y rellenar con los correspondientes tipos
    
    types.forEach(i => { //se iteraran los types pueden ser 1 o 2)
        const nombreTipo = document.createElement("div"); // Creamos un elemento div
        const colorTipo = colorSegunTipo[i.type.name]; // Obtenemos el color del tipo
        const nombre = i.type.name; // Obtenemos el nombre del tipo
        nombreTipo.style.color = colorTipo; // Asignamos el color al elemento div
        nombreTipo.textContent = nombre; // Asignamos el nombre al elemento div
        pokeTypes.appendChild(nombreTipo); // Añadimos el elemento div al contenedor de tipos
    });
}
 



//todos los stats del pkm
const statsPkm = stats => {
    pokeStats.textContent = ''; //se reinician las stats con cada input
    stats.forEach(i => {
        /* console.log(i) */  //iteracion de todos los stats, son 6

        const statsCompletos= document.createElement("div");
        const nombreStats = document.createElement("div");  
        const numeroStats = document.createElement("div");

        nombreStats.textContent = i.stat.name;
        numeroStats.textContent = i.base_stat;
        statsCompletos.append(nombreStats, numeroStats);
    
        pokeStats.appendChild(statsCompletos); //solo se envia statsCompletos al DOM
        
    });
}


const habilidadPkm= abilities =>{

    habilidades.textContent=""; //se reinicia
    
    var palabraHabilidad = document.createElement("div");
    palabraHabilidad.textContent = "Abilities";

   /*  const todoHabilidad = document.createElement("div"); */
    
    abilities.forEach(i=>{
        /* console.log(i); */

        
        const namesHabilidad = document.createElement("div");
        namesHabilidad.textContent = i.ability.name;

        habilidades.appendChild(namesHabilidad);

    })

    habilidades.prepend(palabraHabilidad)

}




const alturaPeso = (height, weight)=>{
   /*  console.log(`${height/10} m`)
    console.log(`${weight/10} kg`) */

    peso.textContent= "";
    altura.textContent= "";

    const namePeso = document.createElement("div");
    const pesoPkm = document.createElement("div")
    namePeso.textContent = "wight(kg)";
    pesoPkm.textContent = `${weight/10}`;

    const nameAltura = document.createElement("div");
    const alturaPkm = document.createElement("div")
    nameAltura.textContent = "height(m)";
    alturaPkm.textContent = `${height/10}`

    peso.append(namePeso, pesoPkm)
    altura.append(nameAltura, alturaPkm)
}




//en caso que en el input se ingrese un valor que no esta en la api
const noEncontrado = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'poke-shadow.png');
    pokeShiny.setAttribute('src', 'poke-shadow.png');
    pokeImg.style.background =  '#fff';
    pokeShiny.style.background= "#fff";
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
    habilidades.textContent= '';
    altura.textContent= "";
    peso.textContent="";
}



/* Usado para activar o desactivar audio, se uso icono de google fonts */
const audioElement = document.querySelector('#miAudio');
const playButton = document.querySelector('#playButton');

playButton.addEventListener('click', ()=> {
  if (audioElement.paused) { //si esta pausado el audio, se activa el play al clickearlo...
    audioElement.play();
    playButton.textContent = 'volume_up'; //texto especial de googlefont para generar el icono
  } 
  else if (audioElement.played) { //si esta en play, lo pausa y agrega el icono de pausado
    audioElement.pause();
    playButton.textContent = 'volume_off'; //texto especial de googlefont para generar el icono
  }
});