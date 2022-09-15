//Colour Picker - allw user to choose and change background colour of canvas

function ColourPicker() {

    //calls element from Index
    var colorInput = document.getElementById('Colours')

    //change background colour according colour chosen
    select("#Colours").mouseClicked(function() {
    background(colorInput.value);
    
    //call loadPixels to update the drawing state
    loadPixels();
    });
    
}