function Airports() {
    var airports = {};
    
    this.setAirports = function(newAirports) {
        airports = newAirports;
    };
    
    this.getAirports = function() {
        return airports;
    };
    
    this.findAirportById = function(id) {
        return airports[id];
    };
    
    this.addAirport = function(airport) {
    };
    
    this.removeAirport = function(airport) {
    };
    
}