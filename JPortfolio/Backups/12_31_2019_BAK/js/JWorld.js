let JWorldCanvas = document.getElementById("JWorld");
let ctx = JWorldCanvas.getContext("2d");

const TILE_SIZE = 64;
const CANVAS_WIDTH = 832;
const CANVAS_HEIGHT = 576;
const TEST_OFFSET = 24;

class Tile 
{
    constructor(x, y, x_index, y_index) 
    {
        this.x = x;
        this.y = y;
        this.x_index = x_index;
        this.y_index = y_index;
        this.w = TILE_SIZE;
        this.h = TILE_SIZE;
    }
    getCoordinates()
    {
        return("x: "+this.x.toString()+", y:"+this.y.toString());
    }
    drawGrid()
    {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#555555";
        ctx.stroke();
    }
    drawCoordinates()
    {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.font = "10px Arial";
        ctx.fillStyle = "#222222";
        ctx.fillText((this.x.toString()+", "+this.y.toString()), this.x+12, this.y+32);
    }
    drawIndex()
    {
        let x_offset = 32;  
        ctx.font = "10px Arial";
        ctx.fillStyle = "#222222";
        ctx.fillText("("+this.x_index.toString()+", "+this.y_index.toString()+")", this.x+x_offset, this.y+12);
    }
    draw()
    {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "#00CC00";
        ctx.fill();
    }
}

class Explorer
{
    constructor(x, y, x_index, y_index)
    {
        this.x = x;
        this.y = y;
        this.w = 16;
        this.h = 16;
        this.x_index = x_index;
        this.y_index = y_index;
    }
    draw()
    {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "#dfdfdf";
        ctx.fill();
    }
    move(tile)
    {
        this.x = tile.x+TEST_OFFSET;
        this.y = tile.y+TEST_OFFSET;
        this.draw();
    }

}

class JWorld
{
    constructor()
    {
        this.tiles = []
        this.explorer = null;
        this.x_max_boundary = 0;
        this.x_min_boundary = 0;
        this.y_max_boundary = 0;
        this.y_min_boundary = 0;
    }

    setJWorld()
    {
        // Place tile grid into the world. 
        let x = 0;
        let y = 0;
        let y_space = []
        for(let i = 0; i<JWorldCanvas.width; i+=TILE_SIZE)
        {   y = 0;
            y_space = []
            for(let j=0; j<JWorldCanvas.height; j+=TILE_SIZE)
            {
                y_space.push(new Tile(i, j, x, y));
                y++;
            }
            this.tiles.push(y_space);
            x++;
        }
        this.x_max_boundary = x-1;
        this.y_max_boundary = y-1;
        this.explorer = new Explorer(this.tiles[6][4].x+TEST_OFFSET, this.tiles[6][4].y+TEST_OFFSET, 6, 4);
        this.draw();
        this.explorer.draw();
    }

    draw()
    {
        for(let x = 0; x<this.tiles.length; x++)
        {
            for(let y = 0; y<this.tiles[x].length; y++)
            { 
                this.tiles[x][y].draw();
                this.tiles[x][y].drawGrid();
                this.tiles[x][y].drawCoordinates();
                this.tiles[x][y].drawIndex();
            }
        }
        this.explorer.draw();
    }
}

function init()
{
    
    /* 13 x 64px tiles horizontal */
    JWorldCanvas.width = CANVAS_WIDTH;
    /* 8 x 64px tiles vertical */
    JWorldCanvas.height = CANVAS_HEIGHT;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, JWorldCanvas.width, JWorldCanvas.height);
    j_world.setJWorld(draw_grid=true, draw_coordinates=true, draw_index=true);
}


window.addEventListener('keydown', function (e) {
    e.preventDefault();
    //alert(e.key);
    let explorer = j_world.explorer;
    let tiles = j_world.tiles;

    if(e.key === "ArrowDown")
    {
        if(explorer.y_index < j_world.y_max_boundary)
        {
            explorer.y_index += 1;
            explorer.move(tiles[explorer.x_index][explorer.y_index]);
            j_world.draw();
        }
    }
    else if(e.key === "ArrowUp")
    {
        if(explorer.y_index > j_world.y_min_boundary)
        {
            explorer.y_index -= 1;
            explorer.move(tiles[explorer.x_index][explorer.y_index]);
            j_world.draw();
        }
    }
 
    else if(e.key === "ArrowRight")
    {
        if(explorer.x_index < j_world.x_max_boundary)
        {
            explorer.x_index += 1;
            explorer.move(tiles[explorer.x_index][explorer.y_index]);
            j_world.draw();
        }
            
    }
    else if(e.key === "ArrowLeft")
    {
        if(explorer.x_index > j_world.x_min_boundary)
        {
            explorer.x_index -= 1;
            explorer.move(tiles[explorer.x_index][explorer.y_index]);
            j_world.draw();
        }
      
    }
 });

 let j_world = new JWorld();
 init();