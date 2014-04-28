function formatMoney(num, decPlaces, thouSeparator, decSeparator) {
    var n = num,
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSeparator = decSeparator == undefined ? "." : decSeparator,
    thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
    sign = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};


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
     
    //get the currently active LI and remove the active class
    var curr = document.getElementById("inputActiveItem").value;

    if(curr !== "") {
        document.getElementById(curr).setAttribute('class', '');
    }
    //set the selected items class. 
    document.getElementById("inputActiveItem").value = evt.target.id;
    evt.target.setAttribute("class", "active");
    
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
        //return x(d.val) + "px";
        return d.val/100 + "px"; 
    });
    barEnter.style("height", "45px"); 
    barEnter.style("background-color", "#2D4066");
    barEnter.style("margin", "2px");
    barEnter.style("padding", "20px 20px 0px 0px");
    barEnter.style("font-size", "120%");
    barEnter.style("border-radius", "15px");
    
    barEnter.text(function(d) {
        //if the value si empty, return an empty string
        if (d.val == "") {
            return ""; 
        }
        var label = d.key.split('_').join(" ");
        var label = ucwords(label);
        var value = formatMoney(d.val,2,',','.');
        
        //var txt =  label + " "+ d.val;
        var txt = label + ": " + "$" + value; 
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
    
    return output.trim(); 
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