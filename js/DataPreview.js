//Table ID varies depending on desired data set
var table_id = 'places';
var key = 'i9VTDsvooscG7eFQ6ycBX16gwAvLqOVUDv9u2dMh';
var URL = 'http://www.factual.com/data/t/'+table_id+'#';

//Filters holds all appropriate details (label, searchable terms, history) on faceted filters
// {name:{label:"Label", searchable:["name","label","synonyms"], history:["prevsearches"]}}
var filters = {}; 
var filtersCount = 0;
var qHistory = [];
var filterKey = "";



$(function() {$('.searchInput').focus();});
makeSchemaCall();
makeReadCall();