//Scissors Tool - allows users to cut and paste a selected area on canvas

function ScissorsTool(){
    
    //set icon and name for object
	this.icon = "assets/scissors.jpg";
	this.name = "scissors";
    
    var previousMouseX = -1;
	var previousMouseY = -1;
    
    var selectMode = 1;
    var selectedArea = {x: 0, y:0, w: 0, h: 0};
    
    var selectedPixels;
    
    this.draw = function() {
        
    }
    
    this.mousePressed = function(){
        
        //ensure the pasted area is the middle of the mouse
        var xOffSet = (selectedArea.w/2);
        var yOffSet = (selectedArea.h/2);
        
        //change size of pasted area by slider
        var wantedW = selectedArea.w*(drawingProperties.sliderValue);
        var wantedH = selectedArea.h*(drawingProperties.sliderValue);
        
        if(mouseY<=getCurrentCanvasHeight()){
            console.log("in canvas");
            
            //select area mode
            if(selectMode == 1) { 
                if (previousMouseX == -1) {
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                    selectedArea = {x: mouseX, y:mouseY, w: 0, h: 0};
                }
            }
            
            //paste mode    
            else if(selectMode == 2) {
                console.log("paste");
                
                translate(mouseX, mouseY);

                image(selectedPixels, -xOffSet, -yOffSet, wantedW, wantedH);
                loadPixels();
            }
        }
    }

    this.mouseDragged = function() {
        
        //if out of canvas dont do anything
        if(mouseY>=getCurrentCanvasHeight()){
            return;
        }
        
        //select area mode
        if(selectMode == 1) {
            
            updatePixels();
            
            var w = mouseX - selectedArea.x;
            var h = mouseY - selectedArea.y;

            selectedArea.w = w;
            selectedArea.h = h;

            noStroke();
            fill(240,128,128,100);
            rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
        }
    }
    
    //when the tool is deselected update the pixels, clear options and reset
    this.unselectTool = function() {
        updatePixels();
        select(".options").html("<div class = 'options1'></div><div class = 'options2'></div>");
        
        //return fill and stroke to original chosen in colour palette
        fill(colourP.selectedColour);
        stroke(colourP.selectedColour);
        
        //reset to starting
        selectedArea = {x: 0, y:0, w: 0, h: 0};
        selectMode = 1;
        previousMouseX = -1;
        previousMouseY = -1;
        selectedPixels = null;
    }
    
    //if 'cut' is clicked
    function clickScissorButton() {
        if(selectMode==1){
            selectMode = 2;

            //label button to End Paste
            select("#scissorButton").html("End Paste");

            cutArea();
        }
        else if(selectMode==2){
            selectMode = 1;

            //label button to Cut
            select("#scissorButton").html("Cut");

            pasteCutArea();
            previousMouseX = -1;
        }
    }
        
    //function to cut the area chosen and store
    function cutArea(){
        console.log("cut clicked");
        updatePixels();
        console.log(selectedArea);
        
        //store the pixels
        selectedPixels = get(selectedArea.x , selectedArea.y , selectedArea.w, selectedArea.h);

        //draw rectangle over it to show being cut out
        var colorInput = document.getElementById('Colours'); //to make fill of rectangle to be same as background colour
        fill(colorInput.value);
        noStroke();
        rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
        loadPixels();
    }
    
    function getCurrentCanvasHeight(){
        var canvasContainer = select('#content');
        var drawingCanvasHeight = canvasContainer.size().height;   
        return drawingCanvasHeight;
    }
    
    function pasteCutArea(){
        loadPixels();
    }
    
    this.populateOptions = function() {
        
        //create cut buttons
        select(".options").html(
            "<button id='scissorButton'>Cut</button>");
        select("#scissorButton").mouseClicked(clickScissorButton);
    }
}
