
const C_WIDTH = 512;
const C_HEIGHT = 512;
const TILE_SIZE = 64;
let tiles = [];
 
class Tile
{
    constructor(x, y, x_index, y_index)
    {
        this.x = x;
        this.y = y;
        this.x_index = x_index;
        this.y_index = y_index;
    }
    getCoords()
    {
        return(this.x.toString()+", "+this.y.toString())
    }
}
 
 
let x = 0;
for(let i = 0; i<C_WIDTH; i+=TILE_SIZE)
{
    let y = 0;
    let temp = [];
    for(let j = 0; j<C_HEIGHT; j+=TILE_SIZE)
    {
        temp.push(new Tile(i, j, x, y));
        y++;
    }
    tiles.push(temp);
    x++;
}