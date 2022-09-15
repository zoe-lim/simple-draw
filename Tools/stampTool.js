//Stamp Tool - allows user to print different type of stamps on canvas

function StampTool() {
    
	//set icon and name for object
	this.icon = "assets/stamp.jpg";
	this.name = "stamp";
    
    this.fillMode = "fill";
	var self = this;
    var stampType = 1;

	this.draw = function () {
		if (mouseIsPressed) {
            console.log(mouseY);
            
            //prevent out of the canvas click
            if (mouseX > 30 && mouseY < 630) {
                updatePixels();
                if (self.fillMode == "fill") {
                    strokeWeight(1);
                    fill(colourP.selectedColour);
                    stroke(colourP.selectedColour);
                    drawStamp();
                } else {
                    strokeWeight(2);
                    fill(255);
                    drawStamp(); 
                }
            }
		} else {
            loadPixels();
        }
	};
    
    var drawStamp = function() {
        if(stampType == 1) {
            drawStampA(mouseX, mouseY);
        }
        else if(stampType == 2) {
            drawStampB(mouseX, mouseY);
        }
        else if(stampType == 3) {
            drawStampC(mouseX, mouseY);
        }
    }
    
    
    //Stamp Types
    
        //Stamp A: Flower Stamp
        var drawStampA = function(mx,my){

            push();
            translate(mx,my);
            beginShape();

            var xOffSet = 80;
            var yOffSet = 80;
            //such that size of stamp will adjust according to value on slider
            var size = drawingProperties.sliderValue;
            
            //flower petals
            ellipse((105-xOffSet)*size, (33-yOffSet)*size, 50*size, 50*size);
            ellipse((75-xOffSet)*size, (58-yOffSet)*size, 50*size, 50*size);
            ellipse((135-xOffSet)*size, (58-yOffSet)*size, 50*size, 50*size);
            ellipse((122-xOffSet)*size, (90-yOffSet)*size, 50*size, 50*size);
            ellipse((88-xOffSet)*size, (90-yOffSet)*size, 50*size, 50*size);
            
            //flower core
            ellipse((105-xOffSet)*size, (63-yOffSet)*size, 35*size, 35*size);

            endShape();
            pop();
        };

        //Stamp B: Cat Stamp
        var drawStampB = function(mx,my){

            push();
            translate(mx,my);
            beginShape();

            var xOffSet = 25;
            var yOffSet = 25;
            //such that size of stamp will adjust according to value on slider
            var size = drawingProperties.sliderValue;

            //cat ears
            triangle((0-xOffSet)*size, (25-yOffSet)*size, (-3-xOffSet)*size, (1-yOffSet)*size, (17-xOffSet)*size, (10-yOffSet)*size);
            triangle((33-xOffSet)*size, (10-yOffSet)*size, (53-xOffSet)*size, (1-yOffSet)*size, (50-xOffSet)*size, (25-yOffSet)*size);
            
            //cat face
            ellipse((25-xOffSet)*size, (31-yOffSet)*size, 52*size, 50*size);
            
            //cat whiskers(left)
            line((-8-xOffSet)*size, (44-yOffSet)*size, (10-xOffSet)*size, (43-yOffSet)*size);
            line((-10-xOffSet)*size, (55-yOffSet)*size, (10-xOffSet)*size, (43-yOffSet)*size);
            
            //cat whiskers(right)
            line((58-xOffSet)*size, (44-yOffSet)*size, (40-xOffSet)*size, (43-yOffSet)*size);
            line((60-xOffSet)*size, (55-yOffSet)*size, (40-xOffSet)*size, (43-yOffSet)*size);
            
            //cat mouth
            if (self.fillMode =="fill"){
                noStroke();
                fill(255);
            }
            triangle((25-xOffSet)*size, (47-yOffSet)*size, (19-xOffSet)*size, (41-yOffSet)*size, (31-xOffSet)*size, (41-yOffSet)*size);
            
            //cat eyes
            fill(255);
            noStroke();
            if (self.fillMode =="nofill"){
                fill(colourP.selectedColour);
            }
            ellipse((10-xOffSet)*size, (33-yOffSet)*size, 8*size, 8*size);
            ellipse((40-xOffSet)*size, (33-yOffSet)*size, 8*size, 8*size);

            endShape(CLOSE);
            pop();
        };

        //Stamp C: Heart Stamp
        var drawStampC = function(mx,my){

            push();
            translate(mx,my);
            

            var xOffSet = 15;
            var yOffSet = 15;
            //such that size of stamp will adjust according to value on slider
            var size = drawingProperties.sliderValue;

            beginShape();
            curveVertex((15-xOffSet)*size, (30-yOffSet)*size);
            curveVertex((15-xOffSet)*size, (27-yOffSet)*size);
            curveVertex((3-xOffSet)*size, (15-yOffSet)*size);
            curveVertex((7.5-xOffSet)*size, (7.5-yOffSet)*size);
            curveVertex((15-xOffSet)*size, (10-yOffSet)*size);
            curveVertex((15-xOffSet)*size, (30-yOffSet)*size);
            endShape();
            
            beginShape();
            curveVertex((15-xOffSet)*size, (30-yOffSet)*size);
            curveVertex((15-xOffSet)*size, (10-yOffSet)*size);
            curveVertex((22.5-xOffSet)*size, (7.5-yOffSet)*size);
            curveVertex((27-xOffSet)*size, (15-yOffSet)*size);
            curveVertex((15-xOffSet)*size, (27-yOffSet)*size);
            curveVertex((15-xOffSet)*size, (30-yOffSet)*size);

            endShape();
            pop();
        };
        
    //when the tool is deselected update the pixels, clear op(ions & reset
	this.unselectTool = function() {
		updatePixels();
        
		//clear options
		select(".options").html("<div class = 'options1'></div><div class = 'options2'></div>");
        
        //return stroke weight to according to slider value
        strokeWeight(drawingProperties.sliderValue);
        
        //return to default fill and stamp, flower
        this.fillMode = "fill";
        if (stampType != 1) {
            stampType = 1;
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
			} 
            else {
				self.fillMode = "fill";
				button.html('No Fill');
			}
		});
        
        //create buttons for different stamp types
        select(".options2").html(
            "<p>Stamp Types:</p><button id='StampA'>Flower</button><button id='StampB'>Cat</button><button id='StampC'>Heart</button>");
        
        //when different stamp buttons are clicked,
        select("#StampA").mouseClicked(function() {
            stampType = 1;
        });
        select("#StampB").mouseClicked(function() {
            stampType = 2;
        });
        select("#StampC").mouseClicked(function() {
            stampType = 3;
        });
	};
}