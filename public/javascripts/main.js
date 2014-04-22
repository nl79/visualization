



function getInitialData() {
    //ajax call to get the initial data.
    $.ajax({
        type: "POST",
        url: "/load",
        data: { name: "John", location: "Boston" },
        success: function (result) {
            alert(result); 
        }
    });
}



$( document ).ready(function() {
     //load the data into the graph.
     getInitialData(); 
 });
    
    
