/** 
 * @param json - описание создаваемой карты
 *  {width {Number}, height{Number}, rotate{Number}, maxlat{Number}, rootComponent{Component}, callback{Function}}
 */
function MapBuilder(json) {
    if (json) {
        var newMap = new MapObject(json.width, json.height, json.rotate, 
                                   json.maxlat, null, function() { json.callback(); } );
        if (json.zoom) {
            newMap.setZoom(json.zoom);
        }        
        return newMap;
    }
    return {};
}