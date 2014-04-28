

function updateList(json) {
    //clear the UL
    $("#ulList").empty();
    
    //get the reference to the UL
    var list = document.getElementById("ulList"); 
    
    //build a json object. 
    var obj = JSON.parse(json)
    //loop through the json object
    //build an LI link and append.
    for (var key in obj ) {
        if (obj.hasOwnProperty(key)) {
            var li = document.createElement("li");
            li.setAttribute('id', obj[key].id);
            var text = document.createTextNode(obj[key].name);
            li.appendChild(text); 
            //append to the list. 
            list.appendChild(li); 
        }
    }
}

function schoolClick(evt) {
    
    var id = evt.target.id; 
    
     //ajax call to get the initial data.
    $.ajax({
        type: "POST",
        url: "/load",
        data: { 'id': id},
        success: function (result) {
            displayData(result); 
        }
    });
}

function displayData(json) {
    
    //parse the json string
    var obj = JSON.parse(json);
    
    var obj = obj.pop();
    var data = new Array();
    var objArray = new Array(); 

    for (var key in obj ) {
        if (obj.hasOwnProperty(key)) {

            if (isNaN(obj[key]) || key == 'id') {
                continue; 
            }
            dataObj = {}; 
            dataObj['key'] = key; 
            dataObj['val'] = obj[key];
            objArray.push(dataObj);
            
            data.push(obj[key]);        
        }
    }
    
    console.log(dataObj);
    
    $("#divChart").empty(); 
    
    
    var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 650]);
    
    var chart = d3.select("#divChart");
    var bar = chart.selectAll("div");
    //var barUpdate = bar.data(data);
    var barUpdate = bar.data(objArray);
    
    var barEnter = barUpdate.enter().append("div");
    //barEnter.style("width", function(d) { return d / 100 + "px"; });
    barEnter.style("width", function(d) {
        return x(d.val) + "px";
    });
    
    barEnter.style("background-color", "#FF3300");
    barEnter.style("margin", "2px");
    barEnter.style("padding", "5px");
    
    barEnter.text(function(d) {
        var label = d.key.split('_').join(" ");
        var label = ucwords(label); 
        var txt =  label + "                "+ d.val; 
        return txt;
    }); 
    
    
    
}

function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.substr(1); 
}
function ucwords(str) {
    var output = ""; 
    var parts = str.split(" ");
    for(var i = 0; i < parts.length; i++) {
        output += ucfirst(parts[i]) + " "; 
    }
    
    return output; 
}

//initize the alphabet
function initAlphaList() {
    
    var list = document.getElementById("ulAlphaList");
    
    for (var i = 65; i <= 90; i++) {
        var LI = document.createElement('li');
        var text = document.createTextNode(String.fromCharCode(i));
        LI.appendChild(text);
        LI.setAttribute("char", String.fromCharCode(i)); 
        list.appendChild(LI); 
    }
}

//load the list of school by the selected letter.
function loadList(ch) {
    //ajax call to get the initial data.
    $.ajax({
        type: "POST",
        url: "/list",
        data: { 'name': ch},
        success: function (result) {
            updateList(result); 
        }
    });
}


function letterClick(evt) {
    // call the load list method and pass the clicked letter.
    var ch = evt.target.getAttribute('char');
  
    if (ch != null) { loadList(ch); }
}

$( document ).ready(function() {
     //load the initial data into the ul
     loadList('A'); 

     //build the alphabet list
     initAlphaList();
     
     $("#ulAlphaList").on("click", letterClick); 

     //wire the events
     $("#ulList").on("click", schoolClick);
     
     
 });