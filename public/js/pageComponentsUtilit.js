/** 
 * Функция формирует таблицу из переданного JSON-а
 * @param data {JSON} - json c данными
 * @param columns {Array} - список стоблцов таблицы для вывода
 * @param rootComponentId {String} - идентификатор компонента на странице, в который будет вложена таблица
 * @param tableId {String} - идентификатор таблицы
 */
function showTableFromJson(data, columns, rootComponentId, tableId) {
    var table = d3.select('#' + rootComponentId)
                 .append('table')
                 .attr("id", tableId);
	var thead = table.append('thead');
	var tbody = table.append('tbody');
	   
	// append the header row
	thead.append('tr')
	     .selectAll('th')
		 .data(columns).enter()
		 .append('th')
		 .text(function (column) { return column; });
       
    // create a row for each object in the data
	var rows = tbody.selectAll('tr')
		            .data(data)
		            .enter()
		            .append('tr')
		            .attr("id", function(d) { 
		                return "leg_row_" + d.id;
		            });

	// create a cell in each row for each column
	var cells = rows.selectAll('td')
		            .data(function (row) {
		                return columns.map(function (column) {
		                    return {column: column, value: row[column]};
		                });
		            })
		            .enter()
		            .append('td')
		            .text(function (d) { return d.value; });
}

/** 
 * Функция изменяет стиль элемента на странице
 * @param componentId
 * @param style
 */
function changeComponentStyle(componentId, style) {
    d3.select(componentId)
      .attr("style", style);
}

function removeComponent(componentId) {
    d3.select(componentId)[0][0].remove();
}