function AirportsBuilder() {
    /**
     * @param {Array} airport [{id: {Number}, icao: {String}, iata: {String}, 
     *                          longitude: {Number}, latitude: {Number}}[
     */
    this.initFromJson = function (map, airports) {
        var airport;
        var geometryUnils = new GeometryUtils();
        var airportsMap = {};    
        var airportsObject = new Airports();
        
                
        for (var i = 0; i < airports.length; i++) {
            airport = airports[i];
            airportsMap[airport.id] = airport;   
            geometryUnils.addPointOnMap(map.getProjection(), map.getSVGComponent(),
                                        {longitude: airport.longitude, latitude: airport.latitude});
        }
        
        airportsObject.setAirports(airportsMap);
        
        return airportsObject;
    };
}