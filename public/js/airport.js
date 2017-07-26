function Airport() {
    var id;
    var icao;
    var iata;
    var longitude;
    var latitude;
    var description;
    var orders;
    var svgComponent;
    
    this.init = function(airport) {
        if (airport) {
            if (airport.id) {
                id = airport.id;
            }
            
            if (airport.icao) {
                icao = airport.icao;
            }
            
            if (airport.iata) {
                iata = airport.iata;
            }
            
            if (airport.longitude) {
                longitude = airport.longitude;
            }
            
            if (airport.latitude) {
                latitude = airport.latitude;
            }
                
        }        
    };
}