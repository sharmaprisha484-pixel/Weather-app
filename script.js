const API_KEY="ee43c643f9842d4ce2b67dc53a0f2a9e";

window.onload = function () {
    let lastCity = localStorage.getItem("lastCity");

    if (lastCity) {
        document.getElementById("city").value = lastCity;
        test(); // last searched city automatically load ho jayegi
    }
}


async function test() {

    try {

        let city = document.getElementById("city").value;
        console.log(city);

        if (city === "") {
            alert("Please enter a city name.");
            return;
        }
        
        document.getElementById("loading").textContent = "Loading...";

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        let response = await fetch(url);
        console.log(response);

        let data = await response.json();
        console.log(data);
        

        if(data.cod!=200){
            alert("City not found");
            return;
        }

        document.getElementById("loading").textContent = "";

        console.log(temp);
        console.log(humidity);
        console.log(condition);
         
        document.getElementById("temp").textContent =
        data.main.temp + "℃";

        document.getElementById("condition").textContent =
        data.weather[0].description;

        document.getElementById("humidity").textContent =
        data.main.humidity + "%";

        document.getElementById("cityName").textContent =
        data.name;

        document.getElementById("city").value =
        data.name;

        document.getElementById("wind").textContent =
        data.wind.speed + " m/s";

        document.getElementById("feels").textContent =
        data.main.feels_like + "℃";

        document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    
        let today = new Date();
        document.getElementById("date").textContent =
            today.toDateString();

        localStorage.setItem("lastCity", data.name);

    }

    catch (error) {
        console.error(error);
        document.getElementById("loading").textContent = "";
        alert("Something went wrong!");
    }
   
    

}

function getLocation(){
     
    alert("Button Clicked");

    if(navigator.geolocation){

       navigator.geolocation.getCurrentPosition(

          showPosition,

          function(error){
             console.log(error);
             alert(error.message);
           }
        );

    }

    else{
        alert("geolocaltion is not supported.");
    }
}

async function showPosition(position) {

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    document.getElementById("loading").textContent = "Loading...";

    let response = await fetch(url);

    let data = await response.json();

    console.log(data.weather[0].icon);

    console.log(data);
    

    document.getElementById("loading").textContent = "";

    document.getElementById("temp").textContent =
    data.main.temp + "℃";

    document.getElementById("condition").textContent =
    data.weather[0].description;

    document.getElementById("humidity").textContent =
    data.main.humidity + "%";

    document.getElementById("cityName").textContent =
    data.name;

    document.getElementById("city").value =
    data.name;

    document.getElementById("wind").textContent =
    data.wind.speed + " m/s";

    document.getElementById("feels").textContent =
    data.main.feels_like + "℃";

    document.getElementById("icon").src =
   `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

   
    
    let today = new Date();
    
    document.getElementById("date").textContent = 
    today.toDateString();

    
    
}

let isCelsius = true;

function changeUnit(){

    let temp = Number(document.getElementById("temp").textContent.replace("℃",""));

    if(isCelsius){
        let f=(temp*9/5)+32;
        document.getElementById("temp").textContent=f.toFixed(1)+"℉";
        isCelsius=false;
    }

    else{
        let c=(temp-32)*5/9;
        document.getElementById("temp").textContent=c.toFixed(1)+"℃";
        isCelsius=true;
    }
}


