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

        let url = `https://wttr.in/${city}?format=j1`;
        console.log(url);

        document.getElementById("loading").textContent = "Loading...";

        let response = await fetch(url);
        console.log(response);

        let data = await response.json();
        console.log(data);

        document.getElementById("loading").textContent = "";

        console.log(data.current_condition[0]);

        let temp = data.current_condition[0].temp_C;
        let humidity = data.current_condition[0].humidity;
        let condition = data.current_condition[0].weatherDesc[0].value;

        console.log(temp);
        console.log(humidity);
        console.log(condition);

        document.getElementById("temp").textContent = temp + "℃";
        document.getElementById("condition").textContent = condition;
        document.getElementById("humidity").textContent = humidity + "%";
        document.getElementById("cityName").textContent = city;

        let wind = data.current_condition[0].windspeedKmph;
        document.getElementById("wind").textContent = wind + " Km/h";

        let feels = data.current_condition[0].FeelsLikeC;
        document.getElementById("feels").textContent = feels + "℃";

        let icon = data.current_condition[0].weatherIconUrl[0].value;
        document.getElementById("icon").src = icon;

        let today = new Date();
        document.getElementById("date").textContent =
            today.toDateString();

        localStorage.setItem("lastCity", city);

    }

    catch (error) {
        console.error(error);
        document.getElementById("loading").textContent = "";
        alert("Something went wrong!");
    }

}
