function getWeather(){
    const apiKey='579a4ab668cb5d2370e15904643a37ef';
    const city= document.getElementById('city').value;
    if(!city){
        alert('Please enter a City');
        return;
    }
    const currentWeatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', currentWeatherUrl, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                displayWeather(data);
            } else if (xhr.status === 404) {
                const data = JSON.parse(xhr.responseText);
                displayWeather(data); // Handle city not found scenario
            } else {
                alert('Error fetching current weather data. Please try again.');
                console.error('Error fetching current weather data: ', xhr.status);
            }
        }
    };
    xhr.send();
}

function displayWeather(data){
    const temp=document.getElementById('temp');
    const info=document.getElementById('info');
    const icon=document.getElementById('icon');

    temp.innerHTML="";
    info.innerHTML="";

    if(data.cod=='404'){
        info.innerHTML=`<p>${data.message}</p>`;
        icon.src="city_not_found.png"; // Display "city not found" image
        icon.alt="City not found";
        showImage();
    }
    else{
        const cityName=data.name;
        const temperature=Math.round(data.main.temp-273.15);
        const description=data.weather[0].description;
        const iconCode=data.weather[0].icon;

        const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        temp.innerHTML=`<p>${temperature}&deg;C</p>`;
        info.innerHTML=`<p>${cityName}</p><p>${description}</p>`;
        icon.src=iconUrl;
        icon.alt=description;
        showImage();
    }
}

function showImage() {
    const weatherIcon = document.getElementById('icon');
    weatherIcon.style.display = 'block';
}
