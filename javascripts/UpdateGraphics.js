dimensions = document.getElementById('chicago').getBoundingClientRect();
height = dimensions.height;
width = dimensions.width;
d3.selectAll("svg.chicago")
    .attr("height", height)
    .attr("width", width);

// This is what map data will look like:
// {
//     avgData: {
//         year: {
//             latitude
//             longitude
//         }
//         year: {
//             latitude
//             longitude
//         }
//         }
//     beatData: {
//         year: {
//             beat: {latitude, longitude, count}
//             beat: {latitude, longitude, count}
//         }
//         year: {
//             beat: [{latitude, longitude, count}]
//             beat: [{latitude, longitude, count}]
//         }
//         }
// }

// This is what table data will look like:
// {
//      attribute: value
//      attribute: value
// }

// Top left: 42.024115, -87.942932
// Bottom right: 41.644724, -87.522325
// 41.961629, -87.665955
// 41.773684, -87.800801
// 41.683650, -87.739483
// 41.953824, -87.922043
// newMapData = {
//     avgData: {
//         2001: {latitude: 41.948987, longitude: -87.657965},
//         2002: {latitude: 41.961629, longitude: -87.800801},
//         2003: {latitude: 41.683650, longitude: -87.739483},
//         2004: {latitude: 41.953824, longitude: -87.922043},
//         2005: {latitude: 41.948987, longitude: -87.657965},
//         2006: {latitude: 41.948987, longitude: -87.657965},
//         2007: {latitude: 41.948987, longitude: -87.657965}
//     },
//     beatData: {
//         2001: {
//             131: {latitude: 42.024115, longitude: -87.942932, count: 49}
//         },
//         2002: {
//             131: {latitude: 41.644724, longitude: -87.522325, count: 1}
//         },
//         2003: {
//             131: {latitude: 42.024115, longitude: -87.942932, count: 49}
//         },
//         2004: {
//             131: {latitude: 41.644724, longitude: -87.522325, count: 1}
//         },
//         2005: {
//             131: {latitude: 42.024115, longitude: -87.942932, count: 49}
//         },
//         2006: {
//             131: {latitude: 41.644724, longitude: -87.522325, count: 1}
//         },
//         2007: {
//             131: {latitude: 42.024115, longitude: -87.942932, count: 49}
//         },
//         2008: {
//             131: {latitude: 41.644724, longitude: -87.522325, count: 1}
//         },
//         2012: {
//             131: {latitude: 42.024115, longitude: -87.942932, count: 49}
//         },
//         2013: {
//             131: {latitude: 41.644724, longitude: -87.522325, count: 1}
//         }
//     }
// }


centerOfChicago = {latitude: 41.838519, longitude: -87.685160};
function updateMapData(newMapData) {

    avgData = newMapData.avgData;
    newMapData = newMapData.beatData;
    console.log(newMapData);

    duration = 400;
    delay = 800;

    d3.select('svg.chicago').selectAll("circle")
        .data(beats.map(beat => beatLocations[beat]).map(latlon => chicagoMercator(latlon.longitude, latlon.latitude)))
        .enter().append("circle")
        .attr("fill", "red")
        .attr("cx", d => d.x * width)
        .attr("cy", d => d.y * height)
        .attr("r", d => 0);
    d3.select('svg.chicago').selectAll("rect")
        .data(["baz"])
        .enter().append("rect")
        .attr("width", width / 30)
        .attr("height", height / 30)
        .attr("x", width * chicagoMercator(centerOfChicago.longitude, 0).x - width / 60)
        .attr("y", height * chicagoMercator(0, centerOfChicago.latitude).y - height / 60)
        .attr("fill", "blue");
    d3.select('svg.chicago').selectAll("text")
        .data(["2001"])
        .enter().append("text")
        .attr("y", height * 9/10)
        .attr("x", width * 1/10)
        .attr("font-size", height/8)
        .text(d => d);

    transition = d3.select('svg.chicago').selectAll("circle").data(beats);
    textTransition = d3.select('svg.chicago').selectAll("text").data(["foo"]);
    averageTransition = d3.select('svg.chicago').selectAll("rect").data(["bar"])

    for (let year = 2001; year <= 2019; year++) {
        transition = transition
            .transition()
            .delay(delay)
            .duration(duration)
            .attr("cx", d =>
                width * chicagoMercator((newMapData[year] && newMapData[year][d] ||
                beatLocations[d]).longitude, 0).x
            )
            .attr("cy", d =>
                height * chicagoMercator(0, (newMapData[year] && newMapData[year][d] || beatLocations[d]).latitude).y
            )
            .attr("r", d =>
                Math.sqrt((newMapData[year] && newMapData[year][d] || beatLocations[d]).count)
            )
        d3.select('svg.chicago')

        textTransition = textTransition
            .transition()
            .delay(delay)
            .duration(duration)
            .text(year);

        averageTransition = averageTransition
            .transition()
            .delay(delay)
            .duration(duration)
            .attr("x", d => width * chicagoMercator((avgData[year] || centerOfChicago).longitude, 0).x - width/60  )
            .attr("y", d => height * chicagoMercator(0, (avgData[year] || centerOfChicago).latitude).y - width/60  )
    }
}

function updateTableData(newTableData) {
    document.getElementById("low_temperature").innerHTML = Math.round(newTableData.low_temperature) / 100;
    document.getElementById("mid_temperature").innerHTML = Math.round(newTableData.mid_temperature) / 100;
    document.getElementById("high_temperature").innerHTML = Math.round(newTableData.high_temperature) / 100;
    document.getElementById("low_visibility").innerHTML = Math.round(newTableData.low_visibility) / 100;
    document.getElementById("high_visibility").innerHTML = Math.round(newTableData.high_visibility) / 100;
    document.getElementById("low_windspeed").innerHTML = Math.round(newTableData.low_windspeed) / 100;
    document.getElementById("mid_windspeed").innerHTML = Math.round(newTableData.mid_windspeed) / 100;
    document.getElementById("high_windspeed").innerHTML = Math.round(newTableData.high_windspeed) / 100;
    document.getElementById("low_precipitation").innerHTML = Math.round(newTableData.low_precipitation) / 100;
    document.getElementById("high_precipitation").innerHTML = Math.round(newTableData.high_precipitation) / 100;
    document.getElementById("low_snowdepth").innerHTML = Math.round(newTableData.low_snowdepth) / 100;
    document.getElementById("high_snowdepth").innerHTML = Math.round(newTableData.high_snowdepth) / 100;
    document.getElementById("fog").innerHTML = Math.round(newTableData.fog) / 100;
    document.getElementById("rain_drizzle").innerHTML = Math.round(newTableData.rain_drizzle) / 100;
    document.getElementById("snow_ice_pellets").innerHTML = Math.round(newTableData.snow_ice_pellets) / 100;
    document.getElementById("hail").innerHTML = Math.round(newTableData.hail) / 100;
    document.getElementById("thunder").innerHTML = Math.round(newTableData.thunder) / 100;
    document.getElementById("tornado_funnel_cloud").innerHTML = Math.round(newTableData.tornado_funnel_cloud) / 100;
}

function plotAverageBeatLocations() {
    console.log(beats.map(beat => beatLocations[beat]).map(latlon => chicagoMercator(latlon.longitude, latlon.latitude)));
    d3.select('svg.chicago').selectAll("circle")
        .data(beats.map(beat => beatLocations[beat]).map(latlon => chicagoMercator(latlon.longitude, latlon.latitude)))
        .enter().append("circle")
        .attr("cx", d => d.x * width)
        .attr("cy", d => d.y * height)
        .attr("r", "5");
}

