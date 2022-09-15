//Displays and handles the colour palette.
function ColourPalette() {
	var colorInput = document.getElementById('Colours')
    
	//a list of web colour strings
	this.colours = ["black", "gray", "silver", "white", "maroon", "brown", "red", "coral", "orange", "gold", "yellow", "green", "mediumseagreen", "SpringGreen", "lightgreen", "lightskyblue", "cornflowerblue", "mediumblue", "indigo", "purple", "mediumorchid", "violet", "mistyrose", "pink", "hotpink", "deeppink"
	];
	//make the starting colour be black
	this.selectedColour = "black";

	var self = this;

	var colourClick = function() {
		//remove the old border
		var current = select("#" + self.selectedColour + "Swatch");
		current.style("border", "0");

		//get the new colour from the id of the clicked element
		var c = this.id().split("Swatch")[0];

		//set the selected colour and fill and stroke
		self.selectedColour = c;
		fill(c);
		stroke(c);

		//add a new border to the selected colour
		this.style("border", "2px solid blue");
	}

	//load in the colours
	this.loadColours = function() {
		//set the fill and stroke properties to be black at the start of the programme
		//running
		fill(this.colours[0]);
		stroke(this.colours[0]);

		//for each colour create a new div in the html for the colourSwatches
		for (var i = 0; i < this.colours.length; i++) {
			var colourID = this.colours[i] + "Swatch";

			//using JQuery add the swatch to the palette and set its background colour
			//to be the colour value.
			var colourSwatch = createDiv()
			colourSwatch.class('colourSwatches');
			colourSwatch.id(colourID);

			select(".colourPalette").child(colourSwatch);
			select("#" + colourID).style("background-color", this.colours[i]);
			colourSwatch.mouseClicked(colourClick)
		}

		select(".colourSwatches").style("border", "2px solid blue");
	};
    
	//call the loadColours function now it is declared
	this.loadColours();
}