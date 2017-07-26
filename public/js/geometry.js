function GeometryUtils() {
    this.addPointOnMap = function(projection, rootComponent, point) {
        rootComponent
          .append("circle")
          .attr("cx", projection([point.longitude, point.latitude])[0])
          .attr("cy", projection([point.longitude, point.latitude])[1])
          .attr("r", 5)
          .style("fill", "red");
    };
    
    this.addProjectedPointOnMap = function(projection, rootComponent, point, id) {
        rootComponent
          .append("circle")
          .attr("cx", point.longitude)
          .attr("cy", point.latitude)
          .attr("r", 5)
          .attr("id", id)
          .style("fill", "black");
    };
    
    this.addLegOnMap = function(map, rootComponent, airport1, airport2) {         
        var leg = rootComponent
        .append("path")
        .datum({type: "LineString", 
                coordinates: [[airport1.longitude, airport1.latitude], [airport2.longitude, airport2.latitude]]})
               .attr("class", "route")
               .attr("id", "route")
               .attr("d", map.getPath());
        return leg;       
               
    };
    
    this.movePoint = function(pointId, duration, x, y) {
        d3.select(pointId)
          .transition()                
          .duration(duration)
          .ease(d3.easeLinear) 
          .attr("cx", x)
          .attr("cy", y);
    };
    
    this.projectAndMovePoint = function(projection, pointId, duration, x, y) {
        this.movePoint(pointId, duration, projection([x, y])[0], projection([x, y])[0]);
    };
}
