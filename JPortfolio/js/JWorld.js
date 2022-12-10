const CANVAS_WIDTH = 832;
const CANVAS_HEIGHT = 576;
const X_TILE_COUNT = CANVAS_WIDTH/TILE_SIZE;
const Y_TILE_COUNT = CANVAS_HEIGHT/TILE_SIZE;
const CHARACTER_OFFSET = 8;
const AMOUNT_OF_GRIDS = 4;

class Tile 
{
    constructor(x, y, x_index, y_index, color, text_color) 
    {
        this.x = x;
        this.y = y;
        this.x_index = x_index;
        this.y_index = y_index;
        this.w = TILE_SIZE;
        this.h = TILE_SIZE;
        this.color = color;
        this.text_color = text_color;
        this.terrain = new Sprite("images/Sandx64/Sand1.png", TILE_SIZE, TILE_SIZE, j_world)
    }
    getCoordinates()
    {
        return("x: "+this.x.toString()+", y:"+this.y.toString());
    }
    drawGrid()
    {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#333333";
        ctx.stroke();
    }
    drawCoordinates(x_grid_offset=0, y_grid_offset=0)
    {
        let x_offset = 12;
        let y_offset = 32;  
        ctx.beginPath();
        ctx.moveTo(this.x - x_grid_offset, this.y + y_grid_offset);
        ctx.font = "10px Arial";
        ctx.fillStyle = this.text_color;
        ctx.fillText(( (this.x - x_grid_offset).toString()+", "+(this.y - y_grid_offset).toString()), (this.x + x_offset - x_grid_offset), (this.y + y_offset - y_grid_offset));
    }
    drawIndex(x_grid_offset=0, y_grid_offset=0)
    {
        let x_offset = 12;
        let y_offset = 12;  
        ctx.font = "10px Arial";
        ctx.fillStyle = this.text_color;
        ctx.fillText("("+this.x_index.toString()+", "+this.y_index.toString()+")", (this.x+x_offset-x_grid_offset), (this.y+y_offset - y_grid_offset));
    }
    draw(x_grid_offset=0, y_grid_offset=0)
    {
        this.terrain.drawFromSpriteSheet(0, 0, this.x - x_grid_offset, this.y - y_grid_offset)
        ctx.beginPath();
        ctx.moveTo(this.x - x_grid_offset, this.y - y_grid_offset);
        ctx.rect(this.x - x_grid_offset, this.y - y_grid_offset, this.w, this.h);
        //ctx.fillStyle = this.color;
        //ctx.fill();
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
        this.world_move_x_boundary = 6;
        this.world_move_y_boundary = 4;
        this.sprite_locations = {
            "up_x": 0, "up_y": 0,
            "left_x": 0, "left_y": 64,
            "down_x": 0, "down_y": 128,
            "animate_x_count": 8, 
            "animate_up_y": 512,
            "animate_left_y": 576,
            "animate_down_y": 640,
            "animate_right_y": 704,
            "right_x": 0, "right_y": 192,
        };
        this.sprite = new CharacterSprite("images/Explorer.png", TILE_SIZE, TILE_SIZE, j_world, this.sprite_locations);
        this.current_direction = "Up";
        
    }
    draw(directrion = this.current_direction)
    {
        let move_direction = directrion;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        switch(move_direction) 
        {
            case "Up":
                this.sprite.drawUp(this.x, this.y, this.sprite_locations["animate_x_count"], this.sprite_locations["animate_up_y"]);
              break;
            case "Left":
                this.sprite.drawLeft(this.x, this.y, this.sprite_locations["animate_x_count"], this.sprite_locations["animate_left_y"]);
                break;
            case "Down":
                this.sprite.drawDown(this.x, this.y, this.sprite_locations["animate_x_count"], this.sprite_locations["animate_down_y"]);
            break;
            case "Right":
                this.sprite.drawRight(this.x, this.y, this.sprite_locations["animate_x_count"], this.sprite_locations["animate_right_y"]);
                break;
          }
    }
    
    move(tile, x_tile_offset=0, y_tile_offset=0)
    {
        this.x = tile.x - x_tile_offset;
        this.y = (tile.y - CHARACTER_OFFSET) - y_tile_offset;
    }

}

class JWorld
{
    constructor()
    {
        this.tiles = []
        this.characers = []
        this.tile_grid = false;
        this.grid_data = false; 
        this.explorer = null;
        this.x_max_boundary = (X_TILE_COUNT*AMOUNT_OF_GRIDS)-1;
        this.x_min_boundary = 0;
        this.y_max_boundary = (Y_TILE_COUNT*AMOUNT_OF_GRIDS)-1;
        this.y_min_boundary = 0;
        this.x_grid_offset = 0;
        this.y_grid_offset = 0;
        this.x_index_offset = 0;
        this.y_index_offset = 0;
        this.events = new Events();
    }

    setJWorld()
    {
        //default green color for testing tiles:
        let color = "#00CC00";
        let text_color = "#222222";
        // Place tile grid into the world. 
        let x = 0;
        let y = 0;
        let y_space = []
        for(let i = 0; i<JWorldCanvas.width*AMOUNT_OF_GRIDS; i+=TILE_SIZE)
        {   
            if(i >= JWorldCanvas.width)
            {
                color = "#00CC00";
                text_color = "#222222";
            }
                
            y = 0;
            y_space = []
            for(let j=0; j<JWorldCanvas.height*AMOUNT_OF_GRIDS; j+=TILE_SIZE)
            {
                if(j >= JWorldCanvas.height && i < JWorldCanvas.width)
                {
                    color = "#00CC00";
                    text_color = "#222222";
                }
                else if(i < JWorldCanvas.width)
                {
                    color = "#00CC00";
                    text_color = "#222222";
                }
                y_space.push(new Tile(i, j, x, y, color, text_color));
                y++;
                
            }
            this.tiles.push(y_space);
            x++;
        }
        
        this.alan_watts = new AlanWatts(this.tiles[6][2].x, this.tiles[6][2].y - CHARACTER_OFFSET)
        this.explorer = new Explorer(this.tiles[6][4].x, this.tiles[6][4].y-CHARACTER_OFFSET, 6, 4);
        this.draw();
        
    }

    draw(new_x=this.x_index_offset, new_y=this.y_index_offset)
    {
        for(let x = new_x; x<(X_TILE_COUNT + new_x); x++)
        {
            for(let y = new_y; y<(Y_TILE_COUNT + new_y); y++)
            { 
                this.tiles[x][y].draw(this.x_grid_offset, this.y_grid_offset);
                if(this.tile_grid)
                    this.tiles[x][y].drawGrid();
                if(this.grid_data)
                {
                    this.tiles[x][y].drawCoordinates(this.x_grid_offset, this.y_grid_offset);
                this.tiles[x][y].drawIndex(this.x_grid_offset, this.y_grid_offset);
                }
            }
        }
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

 let j_world = new JWorld();
 init();
 