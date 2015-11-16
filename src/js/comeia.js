/**
 * @author Diego Barros
 */



var color = d3.scale.ordinal().domain([0, 1, 2, 3, 4, 5])
    .range(["#FFF", "#EFF3FF","#BDD7E7","#6BAED6","#3182BD","#08519C"]);

$(document).ready(function() {
    console.log("ready!");
    CriaLegenda();
	 for (var i=0; i < 4; i++) {
     	CriaColmeias("data/pdm_data_c"+(i+1)+".csv","#comunicacao-"+(i+1));
    };


function CriaColmeias(arquivoAnalise, idContainer){
	var width = 428,
    height = 270,
 
svg = d3.select(idContainer)
		.append("svg")
		.attr("preserveAspectRatio", "xMinYMin meet")	// Way to Go!! 
    	.attr("viewBox","0 0 " + width + " " + height)  // Essas duas linhas deixam os gráficos reponsivos! =D
    		.append('svg:g');
    	
d3.json("data/polygons.json", function(data) {
	
var dimensoes = data.pdm;
	
var tip = d3.tip()
	.attr('class', 'd3-tip')
    .offset([-15, 0])
    .html(function(d,i) {
    	var textoTip = "";
    return textoTip = "<span id='titulo-tip'>" + d.name +"</span> </div>";
 }); 	
  
  svg.call(tip); 
	
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
      				for(var i=0; i < dadosAnalise.length; i++)
      				{
      					if(d.id == dadosAnalise[i].id)
      					{
      						var level = dadosAnalise[i].level;
      						
      						if(level == 2)
							{
								return "15, 3";
							}else if (level == 3){
								return "7, 5";
							}else if (level == 4){
								return "12,5,5,5,12";
							}else if(level == 5){
								return "3, 3";
							}
      					}	
      				}
      			})*/
      			/*.attr("stroke-width", function(d){ 
      				if (d.id == "IC5"){
      					return 0;
      				}
      				for(var i=0; i < dadosAnalise.length; i++)
      				{
      					if(d.id == dadosAnalise[i].id)
      					{
      						var level = dadosAnalise[i].level;

      						if(level == 0)
      						{
      							return 5;	
      						}else{
      							return 3;
      						}
      					}	
      				}
      			})*/
      		/*.attr("fill", function(d){ 
      				for(var i=0; i < dadosAnalise.length; i++)
      				{
      					if(d.id == dadosAnalise[i].id)
      					{
      						var group = dadosAnalise[i].group;
      						
      						if(group == 0)
      						{
      							return color(0);
      						}else if(group == 1)
      						{
      							return color(1);
      						}else if(group == 2)
      						{
      							return color(2);
      						}else if(group == 3)
      						{
      							return color(3);
      						}else if(group == 4)
      						{
      							return color(4);
      						}else if(group == 5)
      						{
      							return color(5);
      						}
      						
      					}	
      				}
      			})
      		*/	
      			.on('mouseover', tip.show)
  	  			.on('mouseout', tip.hide)
  	  			
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
			.attr("dx", function(d){return d.translade_x + 54; })
			.attr("dy", function(d){return d.translade_y + 56; })
			
			/*.attr("fill", function(d){ 
				for(var i=0; i < dadosAnalise.length; i++)
      			{
      				if(d.id == dadosAnalise[i].id){
      					if(dadosAnalise[i].group == 0){
      						return "#000";
	      				}else if (dadosAnalise[i].group == 1)
	      				{
	      					return "#000";
	      				}else{
	      					return "#FFF"; 
	      				}
	      			}
	      		}
			})*/
			.attr("font-size", 18)
			.text(function(d){ 
				
				
				/*
      				for(var i=0; i < dadosAnalise.length; i++)
      				{
      					if(d.id == dadosAnalise[i].id)
      					{
							return dadosAnalise[i].group;
							}
					}
					
					*/
			});
	});

		
});
	
}


 function exibeComentarios(comentario, titulo) {
	
  	if ($('.modal-body').has('p').length) {
  		$( ".modal-title" ).empty();	
  		$( ".modal-body" ).empty();	  	
  		$(titulo).appendTo(".modal-title");
  		$(comentario).appendTo(".modal-body");
  	} else{
  		$(titulo).appendTo(".modal-title");
  		$(comentario).appendTo(".modal-body");
  	};
  	  	  
} // Fim da funÃ§Ã£o exibeComentarios

	
}); 	
    	
function atualizaGroup(dimensao, valor){

	var hexagono = d3.select('#' + dimensao);
	var hexagonoSemFoco = d3.selectAll('path:not(#' + dimensao + ')');
	
	hexagonoSemFoco.transition()
			.duration(1500)
			.ease('out')
			.attr("opacity", 0.3); 
	
	hexagono.transition().duration(1500)
		.ease('ease')
		.attr("opacity", 1) 
		.attr("fill", function() {
		return color(valor);
	}); 

}



function atualizaLevel(dimensao, valor){

	var hexagono = d3.select('#' + dimensao);
	var hexagonoSemFoco = d3.selectAll('path:not(#' + dimensao + ')');
	var tipoLinha;
	var expessura;
	
	if(valor == 2){
		tipoLinha = "15,7";
	}else if (valor == 3){
		tipoLinha = "8, 2";
	}else if (valor == 4){
		tipoLinha = "7,3,3,3,3,3";
	}else if (valor == 5){
		tipoLinha = "3, 2";
	}
	
	if (valor == 0)
		expessura = 5;
	else
		expessura = 2;
	
	console.log(tipoLinha);
	console.log(valor);
	
	hexagonoSemFoco.transition()
			.duration(1500)
			.ease('out')
			.attr("opacity", 0.3); 
	
	hexagono.transition().duration(1500)
		.ease('ease')
		.attr("opacity", 1) 
		.attr("stroke-dasharray", function() { return tipoLinha; })
		.attr("stroke-width", function() { return expessura; });

}

$("input[type=radio]").change(function(){		
	if($(this).is(":checked")){
		
		var tipo = $(this).attr("name");
		var campos = tipo.split("-");
		var valor;
		
		if(campos[1] == "group"){
			
			valor = $(this).val();
			atualizaGroup(campos[0], valor);
		} else {
			
			valor = $(this).val();
			atualizaLevel(campos[0], valor);
			
		}
	}	
});


$(".panel").on('mouseleave', function(){	
	d3.selectAll('path')
		.transition()
		.duration(1250)
		.attr('opacity', 1);	
	
}); 

$(window).load(function(){	
	var radios = $("input[type=radio]");
	console.log("Eu vivo load");
	
});


function CriaLegenda(){
	console.log("cheguei!!");

var widthLegenda = 200,
    heightLegenda = 75,
svgLegenda = d3.select("#container-legenda-edit")
		.append("svg")
		.attr("preserveAspectRatio", "xMinYMin meet")	// Way to Go!! 
    	.attr("viewBox","0 0 " + widthLegenda + " " + heightLegenda)  // Essas duas linhas deixam os gráficos reponsivos! =D
    		.append('svg:g');
    		
   console.log(svgLegenda);

console.log("cheguei aqui tbm!!");

svgLegenda.append("text")
  .attr('x', 90)
  .attr('y', 6)
  .attr('fill', "#000")
  .attr('font-size', 7)
  .text("Group");

svgLegenda.append("text")
  .attr('x', 90)
  .attr('y', 44)
  .attr('fill', "#000")
  .attr('font-size', 7)
  .text("Level");
  
/*var legenda = svgLegenda.append("rect")
	.attr("width", widthLegenda)
	.attr("height", heightLegenda)
	.attr("x", 0)
	.attr("y", 0)
	.attr("class", "legenda")
	.attr("fill", "#FFF");
*/	
var legendRectSize = 8;
var legendSpacingX = 13;
var legendSpacingY = 50;

var	legend = svgLegenda.selectAll('.legend')
	.data(["0", "1", "2", "3", "4", "5"])
	.enter().append('g')
	.attr("class", 'legend')
	.attr("transform", function(d,i) {return "translate("+ ((i*35)+8) + ","+ "16)"; });
	
legend.append('rect')
	.attr("width", legendRectSize)
	.attr("height", legendRectSize)
	.attr('fill', color)
	.attr('stroke', function(d,i){
		console.log(d);
		if(d == "0"){
			return "#000";
		}else{
			return color;
		}	
	})
	.attr("stroke-width", 1);
	
legend.append("text")
  .attr('x', 2)
  .attr('y', 16)
  .attr('fill', "#383838")
  .attr('font-size', 7)
  .text(function(d) { return d; });
 
  
var espacamentoTextoX = 5;
var espacamentoTextoY = 2;  
  
var	legendLevel = svgLegenda.selectAll('.legend-2')
	.data(["0", "1","2", "3", "4","5"])
	.enter().append('g')
	.attr("class", 'legend')
	.attr("transform", function(d,i) {return "translate("  + (i * 35) +","+ "30)"; });
	
// 3 Valor Fixo Comunicação/Controle Variável 
// 4 Valor Fixo Comunicação/Controle Variável 
// 5 Variáveis 

legendLevel.append('line')
	.style("stroke", "black")
	.attr("x1", 0)
	.attr("y1", 30)
	.attr("x2", 24)
	.attr("y2", 30)
	.attr("stroke-dasharray", function(d,i){ 
		if(i == 2)
		{
			return "6,1,6,1,6,1,6,1,6";
		}else if (i == 3){
			return "3, 3";
		}else if (i == 4){
			return "5,2,2,2,2,2";
		}else if (i == 5){
			return "1, 1";
		}
	})
	.attr("stroke-width", function(d,i){ 
     	if(i == 0)
		{
			return 3;
		}else{
			return 1;
		}
	});
	
legendLevel.append("text")
  .attr('x', 10)
  .attr('y', 39)
  .attr('fill', "#383838")
  .attr('font-size', 7)
  .text(function(d) { return d; });
	
	
};
