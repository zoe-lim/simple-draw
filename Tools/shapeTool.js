//Shape Tool - allows user to draw different shape

function ShapesTool(){
	//set an icon and a name for the object
	this.icon = "assets/shapes.jpg";
	this.name = "shapes";
    
    this.fillMode = "fill";
    var self = this;
    var shapeType = 1;

	var previousMouseX = -1;
	var previousMouseY = -1;
    var firstMouseX = -1;
    var firstMouseY = -1;
    
	this.draw = function(){
        
		if(mouseIsPressed){

            //set strokeweight for shape
            strokeWeight(drawingProperties.sliderValue);
            
            //prevent out of the canvas click
            if(mouseX>30 && mouseY<630){
                updatePixels();
                if(self.fillMode=="fill") {
                    fill(colourP.selectedColour);
                    stroke(colourP.selectedColour);
                    drawShape();
                }
                else{
                    fill('rgba(0,0,0,0)');
                    drawShape();
                }
            }
		}
		else{
			previousMouseX = -1;
			previousMouseY = -1;
            loadPixels();//save the pixel
		}
	};
    
    var drawShape = function() {
        if(shapeType == 1) {
            drawRectShape(mouseX, mouseY);
        }
        else if(shapeType == 2) {
            drawEllipseShape(mouseX, mouseY);
        }
        else if(shapeType == 3) {
            drawTriShape(mouseX, mouseY);
        }
    }
    
    //Types of Shapes
    
        //for rectangle shape
        var drawRectShape = function(mx,my) {
            //check if they previousX and Y are -1. 
            //set them to the current mouse X & Y if they are.
            if (previousMouseX == -1){
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                firstMouseX = mouseX;
                firstMouseY = mouseY;
            }
            else{
                //erase the old rect and redraw
                updatePixels();
                var rLength = (mouseX-firstMouseX);
                var rWidth = (mouseY-firstMouseY);
                rect(firstMouseX, firstMouseY,rLength,rWidth);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        };

        //for ellipse shape
        var drawEllipseShape = function(mx,my) {
            //check if they previousX and Y are -1. 
            //set them to the current mouse X & Y if they are.
            if (previousMouseX == -1){
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                firstMouseX = mouseX;
                firstMouseY = mouseY;
            }
            else{
                updatePixels();
                var rLength = (mouseX-firstMouseX)*2;
                var rWidth = (mouseY-firstMouseY)*2;
                ellipse(firstMouseX, firstMouseY,rLength,rWidth);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        };
    
        //for triangle shape
        var drawTriShape = function(mx,my) {
            //check if they previousX and Y are -1. set them to the current mouse X and Y if they are.
            if (previousMouseX == -1){
                previousMouseX = mouseX;
                previousMouseY = mouseY;
                firstMouseX = mouseX;
                firstMouseY = mouseY;
            }
            else{
                updatePixels();
                var rLength = (mouseX-firstMouseX);
                var rWidth = (mouseY-firstMouseY);
                triangle(firstMouseX, firstMouseY, firstMouseX-rLength, firstMouseY+rWidth, firstMouseX+rLength, firstMouseY+rWidth);
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        }
    
    //when the tool is deselected update the pixels & clear options
	this.unselectTool = function() {
		updatePixels();
		//clear options
		select(".options").html("<div class = 'options1'></div><div class = 'options2'></div>");
        
        //return to default fill and shape, rectangle
        this.fillMode = "fill";
        if (shapeType != 1) {
            shapeType = 1;
        }
	};
    
    //adds a button and click handler to the options area. 
	this.populateOptions = function() {
        loadPixels();
        
        //create button for fill/no fill
		select(".options1").html(
			"<button id='fillButton'>No Fill</button>");
        
        //click handler
		select("#fillButton").mouseClicked(function() {
			var button = select("#" + this.elt.id);
			if (self.fillMode == "fill") {
				self.fillMode = "nofill";
				button.html('Fill');
			} else {
				self.fillMode = "fill";
				button.html('No Fill');
			}
		});
        
        //buttons for different stamp types
        select(".options2").html(
            "<p>Shape Types:</p><button id='rectShape'>Rectangle</button><button id='ellipseShape'>Ellipse</button><button id='triShape'>Triangle</button>");

        //when buttons are clicked,
        select("#rectShape").mouseClicked(function() {
            shapeType = 1;
        });
        select("#ellipseShape").mouseClicked(function() {
            shapeType = 2;
        });
        select("#triShape").mouseClicked(function() {
            shapeType = 3;
        });
        
    }

}
