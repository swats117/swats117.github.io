mercator = (longitude, latitude) => {
    latitude = latitude / 360 * 2 * Math.PI;
    longitude = longitude / 360 * 2 * Math.PI;
    mercator_result = {x: longitude, y: Math.log(Math.tan(latitude / 2 + Math.PI / 4))};
    return mercator_result;
}

chicagoTop = mercator( -87.942932,42.024115).y;
chicagoLeft = mercator(-87.942932,42.024115 ).x;
// chicagoBottom = mercator(41.644724, -87.522325).y;
// chicagoBottom = mercator(41.643724, -87.522325).y;
chicagoBottom = mercator( -87.522325,41.643024).y;
// chicagoRight = mercator(41.644724, -87.522325).x;
chicagoRight = mercator(-87.521325,41.644724 ).x;
chicagoMercator = (x, y) => {
    let intermediate = mercator(x,y)
    return {x: 1 - (intermediate.x - chicagoRight) / (chicagoLeft - chicagoRight),
        y: 1 - (intermediate.y - chicagoBottom) / (chicagoTop - chicagoBottom)};
};

// Top left: 42.024115, -87.942932
// Bottom right: 41.644724, -87.522325
// Top right 42.024115, -87.522325
// Bottom left 41.644724, -87.942932
// console.log(mercator(42.024115, -87.942932))
// console.log(mercator(41.644724, -87.522325))
// console.log(mercator(42.024115, -87.522325))
// console.log(mercator(41.644724, -87.942932))






// markLocation = (x,y) => {
//     let localData = [chicagoMercator(x, y), chicagoMercator(42.024115, -87.942932),
//         chicagoMercator(41.644724, -87.522325),
//         chicagoMercator(42.024115, -87.522325),
//         chicagoMercator(41.644724, -87.942932),
//         chicagoMercator(41.948987, -87.657965),
//         chicagoMercator(41.961629, -87.665955),
//         chicagoMercator(41.773684, -87.800801),
//         chicagoMercator(41.683650, -87.739483),
//         chicagoMercator(41.953824, -87.922043),
//         chicagoMercator(41.960160, -87.639662),
//         chicagoMercator(41.914771, -87.620945),
//         chicagoMercator(41.793391, -87.586602),
//         chicagoMercator(41.785679, -87.615745),
//         chicagoMercator(41.908835, -87.805747),
//         chicagoMercator(41.695774, -87.875153),
//         chicagoMercator(42.018926, -87.806610)
//     ];
//     svg.selectAll("circle")
//         .data(localData)
//         .enter().append("circle")
//         .attr("r", "1")
//         .attr("cx", d => d.x * width)
//         .attr("cy", d => d.y * height);
// };


