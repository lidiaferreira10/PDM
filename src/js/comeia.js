/**
 * @author Diego Barros
 */



var color = d3.scale.ordinal().domain([0, 1, 2, 3, 4, 5])
    .range(["#FFF", "#EFF3FF","#BDD7E7","#6BAED6","#3182BD","#08519C"]);

	var width = 428,
    height = 270,
 
svg = d3.select("#colmeia-menu")
		.append("svg")
		.attr("preserveAspectRatio", "xMinYMin meet")	// Way to Go!! 
    	.attr("viewBox","0 0 " + width + " " + height)  // Essas duas linhas deixam os gráficos reponsivos! =D
    		.append('svg:g');
    	
d3.json("data/menu_colmeia.json", function(data) {
	
var dimensoes = data.pdm; 
	
dimensoes.forEach(function(d){
		
var h2 = (Math.sqrt(3)/2),
    radius = 40,
    xp = 80,
    yp = 30,
    hexagonData = [
      { "x": radius+xp,   "y": yp}, 
      { "x": radius/2+xp,  "y": radius*h2+yp},
      { "x": -radius/2+xp,  "y": radius*h2+yp},
      { "x": -radius+xp,  "y": yp},
      { "x": -radius/2+xp,  "y": -radius*h2+yp},
      { "x": radius/2+xp, "y": -radius*h2+yp}
    ];

drawHexagon = d3.svg.line()
        	.x(function(d) { return d.x; })
        	.y(function(d) { return d.y; })
        	.interpolate("cardinal-closed")
        	.tension("0.25");
        	    	
var elemento = d;

var enterElements = svg.selectAll("path")
			//	.datum(data)
			.data(data.pdm)
			.enter()
			.append("path")
				.attr("id", function(d){ return d.id; })
                .attr("d", drawHexagon(hexagonData))
                .attr("transform",function(d){return "translate(" + d.translade_x + "," + d.translade_y + ") rotate(30 30 0)";})
  				.attr("stroke","#383838")
      			.attr("fill", "white")
      			.attr("cursor", "pointer")
      			.attr("stroke-width", function(d){ 
      				if (d.id == "NUL"){
      					return 0;
      				}
      			})
      			/*.attr("stroke-dasharray", function(d){ 
      				if (d.id == "menu-1"){
      					return "7, 5";
      				}else if(d.id == "menu-4"){
      					return "7, 5";
      				}else if(d.id == "menu-6"){
      					return "7, 5";
      				}else if(d.id == "menu-9"){
      					return "7, 5";
      				}
      			})*/
      			.attr("stroke-width", function(d){ 
      				/*if (d.id == "menu-5"){
      					return 0;
      				}*/
      				return 0;
      			})
      		.attr("fill", function(d){ 
      				if (d.id == "menu-1"){
      					return "#6BAED6";
      				}
      				if (d.id == "menu-2"){
      					return "#08519C";
      				}
      				if (d.id == "menu-3"){
      					return "#3182BD";
      				}
      				if (d.id == "menu-4"){
      					return "#BDD7E7";
      				}
      				if (d.id == "menu-6"){
      					return "#08519C";
      				}
      				if (d.id == "menu-7"){
      					return "#6BAED6";
      				}
      				if (d.id == "menu-8"){
      					return "#BDD7E7";
      				}
      				if (d.id == "menu-9"){
      					return "#3182BD";
      				}
      				else{
      					return "#ffffff";
      				}
      			})	
  	  			
			.on('click', function(d) {
				var titulo = "";
				var comentario = "";
				dadosAnalise.forEach(function(item) {
					if (item.id == d.id){
						titulo += "<p class='titulo'>" + item.name + "</p>";
						comentario += "<p class='comentario'>" + item.description + "</p>";
					}
				});
				exibeComentarios(comentario,titulo);
				$("#comentariosModalDialog").modal("show");

			});
			
			svg.selectAll("text")
			.data(data.pdm)
			.enter()
			.append("text")
			.attr("cursor", "pointer")
			.attr("dx", function(d){return d.translade_x + 41; })
			.attr("dy", function(d){return d.translade_y + 55; })
			.attr("fill", function(d){ 
      			if(d.id == "menu-2"){
      				return "#fff";
      			}else if(d.id == "menu-3"){
      				return "#fff";
      			}else if(d.id == "menu-7"){
      				return "#fff";
      			}else if(d.id == "menu-8"){
      				return "#383838";
      			}
			})
			.attr("font-size", 14)
			.text(function(d){ 
      			if(d.id == "menu-2")
      			{
					return "home";
				}else if(d.id == "menu-3")
      			{
					return "model";
				}else if(d.id == "menu-7")
      			{
					return "tool";
				}else if(d.id == "menu-8")
      			{
					return "about";
				}
			});
	});

		
});
