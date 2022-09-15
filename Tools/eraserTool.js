// Eraser Tool - allows user to erase mistakes drawn on the app

function EraserTool() {
    
    //set an icon and a name for the object
    this.icon = "assets/eraser.jpg";
    this.name = "eraser";

    this.startMouseX = -1;
    this.startMouseY = -1;
    
    var colorInput = document.getElementById('Colours')

    this.draw = function () {
        
        if (mouseIsPressed && drawingProperties.sliderValue != null) {
            if (this.startMouseX == -1) {
                this.startMouseX = mouseX;
                this.startMouseY = mouseY;
            } 
            else {
                //set the eraser tool removed area to be the same as the background colour
                if (drawingProperties.backgroundColour == "#FFFFFF") {
                    stroke(colorInput.value);
                }
                //such that eraser is larger then just the slider value
                strokeWeight(8 + drawingProperties.sliderValue); 
                line(this.startMouseX, this.startMouseY, mouseX, mouseY);
                this.startMouseX = mouseX;
                this.startMouseY = mouseY;
            }
        } 
        else {
            this.startMouseX = -1;
            this.startMouseY = -1;
        }
    };
    
    //reset when tool no longer in use
    this.unselectTool = function() {
        stroke(colourP.selectedColour);
        strokeWeight(drawingProperties.sliderValue);
    }
    
}
