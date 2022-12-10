class Character
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
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
        this.current_direction = "Down";
    }

    draw()
    {
        let body_orientation = this.current_direction;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        switch(body_orientation)
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


class AlanWatts extends Character
{
    constructor(x, y)
    {
        super(x, y);   
        this.sprite = new CharacterSprite("images/AlanWatts.png", TILE_SIZE, TILE_SIZE, j_world, this.sprite_locations);
        
    }

  
}