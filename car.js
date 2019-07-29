var margin = 50
var width = 600
var height = 600
var cx = d3.scaleLog().domain([10,150]).range([0,width-100]);
var cy = d3.scaleLog().domain([10,150]).range([height-100,0]);

var f = d3.format(",d")
     
async function gasoline() {
	var svg = d3.select("#chart")
        .html("")
        .append("svg")
        .attr("height",height)
        .attr("width", width)
    	.append("g")
    	.attr("transform", "translate("+[margin,margin]+")")
        
	d3.select("svg").append("g")
    .attr("transform", "translate("+[margin,margin]+")")
    .call(d3.axisLeft(cy).tickValues([10,20,50,100]).tickFormat(d3.format("~s")));
    svg.append("text")
    	.attr("transform","rotate(-90)")
        .attr("y", 0 - margin)
        .attr("x", 0 - (height/2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Average Highway MPG");
        
	d3.select("svg").append("g")
    .attr("transform", "translate("+[margin,height-margin]+")")
    .call(d3.axisBottom(cx).tickValues([10,20,50,100]).tickFormat(d3.format("~s")));
    svg.append("text")
    	.attr("transform", "translate("+[width/2,height-margin-10]+")")
        .style("text-anchor", "middle")
        .text("Average City MPG");        

    svg.append("text")
    	.attr("x",width/2)
        .attr("y", 0)
        .attr("text-anchor","middle")
        .style("font-size","24px")
        .style("text-decoration","underline")
        .text("Gasoline");
    
	const data = await d3.csv('https://flunky.github.io/cars2017.csv');
  	var selectedData = data.filter(function(d){return d.Fuel == 'Gasoline';});
    var cityMean = d3.mean(selectedData, function(d){return d.AverageCityMPG;});
    var highwayMean = d3.mean(selectedData, function(d){return d.AverageHighwayMPG;});
    
    svg.selectAll("circle")
	.data(selectedData)
    .enter().append("circle")
      .attr('cx',function (d,i) { return cx(d.AverageCityMPG); })
      .attr('cy',function (d,i) { return cy(d.AverageHighwayMPG); })
      .attr('r',function(d) {return  d.EngineCylinders/2*2+5;})
       .on("mouseover", function(d){
		tooltip.style("display",null);
        })
      .on("mouseout",function(){
        tooltip.style("display","none");
      })
      .on("mousemove", function(d){
        var xPos = d3.mouse(this)[0] - 10;
        var yPos = d3.mouse(this)[1] - 20;
        tooltip.attr("transform","translate(" + xPos + "," + yPos + ")");
        tooltip.select("text").text("" + d.AverageCityMPG + ":" + d.AverageHighwayMPG);
      });

    svg.append("text")
    	.attr("x",width/2)
        .attr("y", 30)
        .attr("text-anchor","middle")
        .attr("fill","blue")
        .text("Hovering on the circle to see city and highway MPG");


    svg.append("text")
    	.attr("transform", "translate("+[200,100]+")")
        .style("text-anchor", "middle")
        .text("Average City MPG: "+ f(cityMean)); 
     svg.append("text")
    	.attr("transform", "translate("+[200,120]+")")
        .style("text-anchor", "middle")
        .text("Average Highway MPG: "+ f(highwayMean)); 
        
	var tooltip = svg.append("g")
	.attr("class", tooltip)
    .style("display", "none");

	tooltip.append("text")
	.attr("x", 15)
  .attr("dy", "1.2em");

}

async function diesel() {
	var svg = d3.select("#chart")
        .html("")
        .append("svg")
        .attr("height",height)
        .attr("width", width)
    	.append("g")
    	.attr("transform", "translate("+[margin,margin]+")")
        
	d3.select("svg").append("g")
    .attr("transform", "translate("+[margin,margin]+")")
    .call(d3.axisLeft(cy).tickValues([10,20,50,100]).tickFormat(d3.format("~s")));
    svg.append("text")
    	.attr("transform","rotate(-90)")
        .attr("y", 0 - margin)
        .attr("x", 0 - (height/2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Average Highway MPG");
	d3.select("svg").append("g")
    .attr("transform", "translate("+[margin,height-margin]+")")
    .call(d3.axisBottom(cx).tickValues([10,20,50,100]).tickFormat(d3.format("~s")));
    svg.append("text")
    	.attr("transform", "translate("+[width/2,height-margin-10]+")")
        .style("text-anchor", "middle")
        .text("Average City MPG");  

    svg.append("text")
    	.attr("x",width/2)
        .attr("y", 0)
        .attr("text-anchor","middle")
        .style("font-size","24px")
        .style("text-decoration","underline")
        .text("Diesel");
        
	const data = await d3.csv('https://flunky.github.io/cars2017.csv');
  	var selectedData = data.filter(function(d){return d.Fuel == 'Diesel';})
    var cityMean = d3.mean(selectedData, function(d){return d.AverageCityMPG;});
    var highwayMean = d3.mean(selectedData, function(d){return d.AverageHighwayMPG;});
    
    svg.selectAll("circle")
	.data(selectedData)
    .enter().append("circle")
      .attr('cx',function (d,i) { return cx(d.AverageCityMPG); })
      .attr('cy',function (d,i) { return cy(d.AverageHighwayMPG); })
      .attr('r',function(d) {return  d.EngineCylinders/2*2+5;})      
       .on("mouseover", function(d){
		tooltip.style("display",null);
        })
      .on("mouseout",function(){
        tooltip.style("display","none");
      })
      .on("mousemove", function(d){
        var xPos = d3.mouse(this)[0] - 10;
        var yPos = d3.mouse(this)[1] - 20;
        tooltip.attr("transform","translate(" + xPos + "," + yPos + ")");
        tooltip.select("text").text("" + d.AverageCityMPG + ":" + d.AverageHighwayMPG);
      });

    svg.append("text")
    	.attr("x",width/2)
        .attr("y", 30)
        .attr("text-anchor","middle")
        .attr("fill","blue")
        .text("Hovering on the circle to see city and highway MPG");
        
    svg.append("text")
    	.attr("transform", "translate("+[200,100]+")")
        .style("text-anchor", "middle")
        .text("Average City MPG: "+ f(cityMean)); 
     svg.append("text")
    	.attr("transform", "translate("+[200,120]+")")
        .style("text-anchor", "middle")
        .text("Average Highway MPG: "+ f(highwayMean)); 
        
	var tooltip = svg.append("g")
	.attr("class", tooltip)
    .style("display", "none");

	tooltip.append("text")
	.attr("x", 15)
    .attr("dy", "1.2em");

}

async function electricity() {
	var svg = d3.select("#chart")
        .html("")
        .append("svg")
        .attr("height",height)
        .attr("width", width)
    	.append("g")
    	.attr("transform", "translate("+[margin,margin]+")")
        
	d3.select("svg").append("g")
    .attr("transform", "translate("+[margin,margin]+")")
    .call(d3.axisLeft(cy).tickValues([10,20,50,100]).tickFormat(d3.format("~s")));
    svg.append("text")
    	.attr("transform","rotate(-90)")
        .attr("y", 0 - margin)
        .attr("x", 0 - (height/2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Average Highway MPG");
        
	d3.select("svg").append("g")
    .attr("transform", "translate("+[margin,height-margin]+")")
    .call(d3.axisBottom(cx).tickValues([10,20,50,100]).tickFormat(d3.format("~s")));
    svg.append("text")
    	.attr("transform", "translate("+[width/2,height-margin-10]+")")
        .style("text-anchor", "middle")
        .text("Average City MPG");  

    svg.append("text")
    	.attr("x",width/2)
        .attr("y", 0)
        .attr("text-anchor","middle")
        .style("font-size","24px")
        .style("text-decoration","underline")
        .text("Electricity");
        
	const data = await d3.csv('https://flunky.github.io/cars2017.csv');
    var selectedData = data.filter(function(d){return d.Fuel == 'Electricity';})
    var cityMean = d3.mean(selectedData, function(d){return d.AverageCityMPG;});
    var highwayMean = d3.mean(selectedData, function(d){return d.AverageHighwayMPG;});
    
    svg.selectAll("circle")
	.data(selectedData)
    .enter().append("circle")
      .attr('cx',function (d,i) { return cx(d.AverageCityMPG); })
      .attr('cy',function (d,i) { return cy(d.AverageHighwayMPG); })
      .attr('r',function(d) {return  d.EngineCylinders/2*2+5;})
       .on("mouseover", function(d){
		tooltip.style("display",null);
        })
      .on("mouseout",function(){
        tooltip.style("display","none");
      })
      .on("mousemove", function(d){
        var xPos = d3.mouse(this)[0] - 10 ;
        var yPos = d3.mouse(this)[1] - 20;
        tooltip.attr("transform","translate(" + xPos + "," + yPos + ")");
        tooltip.select("text").text("" + d.AverageCityMPG + ":" + d.AverageHighwayMPG);
      });

    svg.append("text")
    	.attr("x",width/2)
        .attr("y", 30)
        .attr("text-anchor","middle")
        .attr("fill","blue")
        .text("Hovering on the circle to see city and highway MPG");
        
    svg.append("text")
    	.attr("transform", "translate("+[200,100]+")")
        .style("text-anchor", "middle")
        .text("Average City MPG: "+ f(cityMean)); 
     svg.append("text")
    	.attr("transform", "translate("+[200,120]+")")
        .style("text-anchor", "middle")
        .text("Average Highway MPG: "+ f(highwayMean)); 
        
	var tooltip = svg.append("g")
	.attr("class", tooltip)
    .style("display", "none");

	tooltip.append("text")
	.attr("x", 15)
    .attr("dy", "1.2em");
}