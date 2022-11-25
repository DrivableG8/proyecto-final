const APP_ID = '9b5d80c48b69522963d29087e6c40eee'; /*constante para estar llamando a la API que se usara para obtener informacion del lugar*/

const fetchData = position => {
    const { latitude, longitude } = position.coords; /*Se obtienen las coordenadas*/
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`) /*Se llama a la API */
        .then(response => response.json())
        .then(data => setWeatherData(data));
}

const setWeatherData = data => { /*Mediante los siguientes comandos se obtiene la localizacion y los datos para mostrar en*/
    const weatherData = { 
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key => { /*Con estas linea de codigo se llega a mostrar la informacion en el documento html*/
        setTextContent(key, weatherData[key]);
    });

    cleanUp();
}

const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none'; 
    container.style.display = 'flex'; 
}

const getDate = () => { /*Se obtiene la fecha actual*/
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`; /*Se modifica la obtencion de la fecha del mes para que aparezca de forma correcta */
}

const setTextContent = (element, text) => {
    document.getElementById(element).textContent = text;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}