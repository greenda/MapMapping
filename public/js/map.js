function MapObject(width, height, rotate, maxlat, rootComponent, callback) {
	var width = width;
	var height = height;
	var rotate = rotate;
	var maxlat = maxlat;
	
	var projection,
	    svg,
	    path;
	    
	var tlast = [0,0],
        slast = null;
	
	var scaleExtent;
	
    this.recreate = function (newWidth, newHeight) {
    	/*svg.attr('width',width)
    	   .attr('height',height);
    	
    	          // set up the scale extent and initial scale for the projection
        var b = mercatorBounds(projection, maxlat),
            s = width/(b[1][0]-b[0][0]),
        scaleExtent = [s, 10*s];

        projection.scale(scaleExtent[0]);
        projection.scale(slast);
        
        redraw();*/
       width = newWidth;
       height = newHeight;
       d3.select("svg").remove();
       create();
    };
	
	function create(callback) {
		projection = d3.geo.orthographic()
		                   //.equirectangular()
                           .rotate([rotate,0])
                           .scale(1)        
                           .translate([width/2, height/2]);
                           
                        
        
          // set up the scale extent and initial scale for the projection
        var b = mercatorBounds(projection, maxlat),
            s = width/(b[1][0]-b[0][0]),
        scaleExtent = [s, 100*s];

        projection.scale(scaleExtent[0]);

        var zoom = d3.behavior.zoom()
                              .scaleExtent(scaleExtent)
                              .scale(projection.scale())
                              .translate([0,0])               // not linked directly to projection
                              .on("zoom", redraw);
    
        path = d3.geo.path()
                     .projection(projection);

        svg = d3.selectAll('#map')
                     .append('svg')
                     .attr('width',width)
                     .attr('height',height)
                     .call(zoom);

        function redraw() {
        if (d3.event) {
        	var scale = d3.event.scale,
        		    t = d3.event.translate;                
        
                // if scaling changes, ignore translation (otherwise touch zooms are weird)
                if (scale != slast) {
                	projection.scale(scale);
                } else {
                	var dx = t[0] - tlast[0],
                	    dy = t[1] - tlast[1],
                       yaw = projection.rotate()[0],
                        tp = projection.translate();
        
                        // use x translation to rotate based on current scale
                        projection.rotate([yaw + 360. * dx / width * scaleExtent[0] / scale, 0, 0]);
                        // use y translation to translate projection, clamped by min/max
                        var b = mercatorBounds(projection, maxlat);
                        if (b[0][1] + dy > 0) {
                        	 dy = -b[0][1];
                        	 
                        } else if (b[1][1] + dy < height) { 
                             dy = height-b[1][1];
                             //projection.translate([width/2, height/2]);
                        }
                        projection.translate([tp[0],tp[1]+dy]); 
                        
                }
                // save last values.  resetting zoom.translate() and scale() would
                // seem equivalent but doesn't seem to work reliably?
                slast = scale;
                tlast = t;
        }
    
        svg.selectAll('path')       // re-project path data
           .attr('d', path);
           
        /*svg.selectAll('circle')
           .attr("cx", function() { 
           return projection([this.cy.animVal.value, this.cx.animVal.value])[0]; 
           })
           .attr("cy", function() { 
           return projection([this.cy.animVal.value, this.cx.animVal.value])[1]; 
           });   */   
    }

        d3.json("http://127.0.0.1:8020/20170101/jsons/world-50m.json", function ready(error, world) {

            svg.selectAll('path')
               .data(topojson.feature(world, world.objects.countries).features)
               .enter()
               .append('path');
               
           
            callback();
            redraw();       // update path data
        });

        /*d3.json("http://127.0.0.1:8020/20170101/jsons/10_m_world.geojson", function ready(error, world) {

            svg.selectAll('path')
               .data(world.features)
               .enter()
               .append('path');
    
            redraw();       // update path data
        });*/


        // track last translation and scale event we processed
        tlast = [0,0],
        slast = null;
   
    }
    
    // find the top left and bottom right of current projection
    function mercatorBounds(projection, maxlat) {
      	var yaw = projection.rotate()[0],
       	    xymax = projection([-yaw + 180 - 1e-6, - maxlat]),
       	    xymin = projection([-yaw - 180 + 1e-6,   maxlat]);
    
            return [xymin,xymax];
    }   
    
    this.setZoom = function (zoom) {
        if (zoom) {
            projection.scale(zoom);
        }
    };
    
    this.getProjection = function() {
        return projection;
    };
    
    this.getSVGComponent = function() {
        return svg;
    };
    
    this.getPath = function() {
        return path;
    };
    
	create(callback);
}
