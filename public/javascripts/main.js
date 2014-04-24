

function updateList(json) {
    
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
            $("#ulList").append(li); 
        }
        
    }
    
}

function getInitialData() {
    //ajax call to get the initial data.
    $.ajax({
        type: "POST",
        url: "/load",
        data: { name: "John", location: "Boston" },
        success: function (result) {
            updateList(result); 
        }
    });
}

function selectSchool(evt) {
    console.log(evt.target); 
    alert("here"); 
}


$( document ).ready(function() {
     //load the data into the graph.
     getInitialData();
     
     //wire the events
     $("#ulList").on("click", selectSchool); 
 });
    
    
