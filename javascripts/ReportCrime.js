function reportCrime(){
    let iucr = document.getElementById("iucrInput").value;
    let block = document.getElementById("blockInput").value;

    console.log(iucr);
    console.log(block);

    fetch("crime/" + iucr, {
        method: "POST",
        body: JSON.stringify({
            block: block,
            lowTemp: document.getElementById("lowTemp").checked,
            midTemp: document.getElementById("midTemp").checked,
            highTemp: document.getElementById("highTemp").checked,
            lowVisibility: document.getElementById("lowVisibility").checked,
            highVisibility: document.getElementById("highVisibility").checked,
            lowWindspeed: document.getElementById("lowWindspeed").checked,
            midWindspeed: document.getElementById("midWindspeed").checked,
            highWindspeed: document.getElementById("highWindspeed").checked,
            lowPrecipitation: document.getElementById("lowPrecipitation").checked,
            highPrecipitation: document.getElementById("highPrecipitation").checked,
            lowSnowdepth: document.getElementById("lowSnowdepth").checked,
            highSnowdepth: document.getElementById("highSnowdepth").checked,
            fog: document.getElementById("fogCheck").checked,
            rain: document.getElementById("rainCheck").checked,
            snow: document.getElementById("snowCheck").checked,
            hail: document.getElementById("hailCheck").checked,
            thunder: document.getElementById("thunderCheck").checked,
            tornado: document.getElementById("tornadoCheck").checked,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

