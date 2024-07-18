Overview
The project will read words from the server and put them in rectangles that will bounce around the
screen.
● Instructions
The app will be built as a single page application (SPA).

Steps
• In the app.js (node) script:
• When the script first loads, use the fsPromises.readFile method from the node api to read in a
text file containing a list of words. You may format the file however you like as long as you are
able to separate the contents of the file into a list (array?) of words.
• Create a router (you decide on the path) which will return a word to the client.
• In the index.html file create :
• A canvas element that takes the whole body of the html page. Everything that appears on the
page must be drawn on the canvas.
• Draw a button on the canvas with the word Launch on it (or something else comparable). Of
course this isn't an html button, but rather a rectangle drawn on the canvas. Place it wherever
you think best. When the user clicks on the "button":
• Do an ajax call to the server to retrieve a word.
• Pick a random color for the rectangle that will hold the word and use an appropriate color
for the text of the word (light rectangle, dark text / dark rectangle, light text). The
rectangle with text will look like another button.

• Launch the button from an edge of the canvas at an oblique angle and have the button
slide across the canvas until it hits an edge of the canvas, at which point it should bounce
off the edge at the same angle that it arrived [to put it in physics terms, the angle of
incidence equals the angle of reflection.] The button keeps bouncing off edges until the
window is closed.
• Each time the launch button is clicked, another word is gotten from the server and starts
on its journey around the canvas.
• HTML, CSS and JS code each goes in it's own file(s).
