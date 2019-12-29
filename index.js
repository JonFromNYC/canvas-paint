// Target the canvas element in the HTML file
const canvas = document.querySelector('#draw'); //Target the draw ID

// Get a 2-Dimensional context
const ctx = canvas.getContext('2d');// 2D context

// Re-Size the canvas to the exact width of the window as needed
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set the base settings: strokeStyle, lineJoin, lineCap
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrawing = false; //Helps to only draw when holding button
let lastX = 0;
let lastY = 0;

let hue = 0;
let direction = true;

// Draw Function to be used with event listener
function draw(event){
    if(!isDrawing) return;//Stop the fn running when not moused down
    console.log(event);//Expect to only work when mousebutton is down
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);// start from
    ctx.lineTo(event.offsetX, event.offsetY);// go to
    ctx.stroke();
    [lastX, lastY] = [event.offsetX,event.offsetY];
    hue++;
    if(hue >= 360) hue = 0;
    
    // prevent the line width becoming too large or small
    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
        direction = !direction;
    }

    if(direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
};

// Event Listeners
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (event)=> {
    isDrawing = true;
    [lastX, lastY] = [event.offsetX, event.offsetY];
});
canvas.addEventListener('mouseup', ()=> isDrawing = false);
canvas.addEventListener('mouseout', ()=> isDrawing = false);
