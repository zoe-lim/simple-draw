//drawing helper - set some basic properties to be shared by other tools

let drawingProperties = {
    weight: 1,
    sliderValue: 1,
    backgroundColour: "#FFFFFF",
    startHelper: null,

};

//allow for weight of stroke and/or size of an item to be changed depending on the value retrieved from the slider
function displaySliderValue(val) {
    drawingProperties.sliderValue = document.getElementById("output").innerHTML = parseInt(val);
    drawingProperties.weight = drawingProperties.sliderValue;
    strokeWeight(drawingProperties.weight);
}
