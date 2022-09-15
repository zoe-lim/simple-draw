//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
var cPicker = null;


function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions, colour palette & colour picker
	helpers = new HelperFunctions();
	colourP = new ColourPalette();
    cPicker = new ColourPicker();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new mirrorDrawTool());
    toolbox.addTool(new StampTool());
    toolbox.addTool(new ShapesTool());
    toolbox.addTool(new ScissorsTool());
    toolbox.addTool(new EraserTool());
	background(255);

}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} 
    else {
		alert("it doesn't look like your tool has a draw method!");
	}
}

function mousePressed(){
    if (toolbox.selectedTool.hasOwnProperty("mousePressed")) {
		toolbox.selectedTool.mousePressed();
	}
}

function mouseDragged()
{
    if (toolbox.selectedTool.hasOwnProperty("mouseDragged")) {
		toolbox.selectedTool.mouseDragged();
	}
}