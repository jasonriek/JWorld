
let JWorldCanvas = document.getElementById("JWorld");
let ctx = JWorldCanvas.getContext("2d");
const TILE_SIZE = 64;

class Sprite
{
    // First load sprite/sprite sheet 
    constructor(image_src, width, height, j_world)
    {
        this.image_src = image_src;
        this.image = new Image();
        this.image.src = this.image_src;
        this.width = width
        this.height = height 
    }
    

    drawFromSpriteSheet(sprite_sheet_x, sprite_sheet_y, x, y)
    {
        ctx.drawImage(this.image, sprite_sheet_x, sprite_sheet_y, this.width, this.height, x, y, this.width, this.height);
    }
}

class CharacterSprite extends Sprite
{
    constructor(image_src, width, height, j_world, sprite_locations, idle=true)
    {
        super(image_src, width, height, j_world);
        this.sprite_locations = sprite_locations;
        this.j_world = j_world;
        this.x = 0;
        this.y = 0;
        this.current_move_loop_index = 0;
        this.idle = idle;
    }

    setIdle(idle)
    {
        this.idle = idle; 
    }

    drawUp(x, y, sprite_sheet_x, sprite_sheet_y=this.sprite_locations["up_y"])
    {
        if(this.idle)
            this.drawMovement(x, y, sprite_sheet_x=this.sprite_locations["up_x"], sprite_sheet_y);
        else
            this.drawMovement(x, y, sprite_sheet_x, sprite_sheet_y);
    }

    drawLeft(x, y, sprite_sheet_x=this.sprite_locations["left_x"], sprite_sheet_y=this.sprite_locations["left_y"])
    {
        if(this.idle)
            this.drawMovement(x, y, sprite_sheet_x=this.sprite_locations["left_x"], sprite_sheet_y);
        else
            this.drawMovement(x, y, sprite_sheet_x, sprite_sheet_y);
    }

    drawDown(x, y, sprite_sheet_x=this.sprite_locations["down_x"], sprite_sheet_y=this.sprite_locations["down_y"])
    {
        if(this.idle)
            this.drawMovement(x, y, sprite_sheet_x=this.sprite_locations["down_x"], sprite_sheet_y);
        else
            this.drawMovement(x, y, sprite_sheet_x, sprite_sheet_y);
    }

    drawRight(x, y, sprite_sheet_x=this.sprite_locations["right_x"], sprite_sheet_y=this.sprite_locations["right_y"])
    {
        if(this.idle)
            this.drawMovement(x, y, sprite_sheet_x=this.sprite_locations["right_x"], sprite_sheet_y);
        else
            this.drawMovement(x, y, sprite_sheet_x, sprite_sheet_y);
    }

    drawMovement(x, y, sprite_sheet_x, sprite_sheet_y)
    {
        this.x = x;
        this.y = y;
        if(this.idle)
            this.drawFromSpriteSheet(sprite_sheet_x, sprite_sheet_y, x, y);
        else
        {
            this.drawFromSpriteSheet(this.current_move_loop_index, sprite_sheet_y, x, y);
            this.current_move_loop_index += TILE_SIZE;
            if(this.current_move_loop_index > sprite_sheet_x*TILE_SIZE)
                this.current_move_loop_index = 0;
        }
    }

    

}