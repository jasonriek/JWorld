window.addEventListener('keydown', function (e) {
    e.preventDefault();
    //alert(e.key);
    let explorer = j_world.explorer;
    let tiles = j_world.tiles;

    if(e.key === "ArrowDown")
    {
        explorer.current_direction = "Down"
        if(explorer.y_index < j_world.y_min_boundary + explorer.world_move_y_boundary)
        {
            explorer.y_index += 1;
            j_world.draw();
            explorer.move(tiles[explorer.x_index][explorer.y_index], j_world.x_grid_offset, j_world.y_grid_offset, explorer.current_direction);
        }
        else if(explorer.y_index < j_world.y_max_boundary - explorer.world_move_y_boundary)
        {
            // Whole World Moves Around Explorer.
            j_world.y_grid_offset += TILE_SIZE;
            j_world.y_index_offset += 1;
            explorer.y_index += 1;
            j_world.draw();
            explorer.draw(explorer.current_direction);
        }
        
        else if(explorer.y_index < j_world.y_max_boundary)
        { 
            explorer.y_index += 1;
            j_world.draw();
            explorer.move(tiles[explorer.x_index][explorer.y_index], j_world.x_grid_offset, j_world.y_grid_offset, explorer.current_direction);
        }
        else
        {
            j_world.draw();
            explorer.draw(explorer.current_direction);
        }
    }
    else if(e.key === "ArrowUp")
    {
        explorer.current_direction = "Up"
        if(explorer.y_index > j_world.y_max_boundary - explorer.world_move_y_boundary)
        {
            explorer.y_index -= 1;
            j_world.draw();
            explorer.move(tiles[explorer.x_index][explorer.y_index], j_world.x_grid_offset, j_world.y_grid_offset, explorer.current_direction);
        }
        else if(explorer.y_index > j_world.y_min_boundary + explorer.world_move_y_boundary)
        {
            // Whole World Moves Around Explorer.
            j_world.y_grid_offset -= TILE_SIZE;
            j_world.y_index_offset -= 1;
            explorer.y_index -= 1;
            j_world.draw();
            explorer.draw(explorer.current_direction);
        }
        
        else if(explorer.y_index > j_world.y_min_boundary)
        { 
            explorer.y_index -= 1;
            j_world.draw();
            explorer.move(tiles[explorer.x_index][explorer.y_index], j_world.x_grid_offset, j_world.y_grid_offset, explorer.current_direction);
        }
        else
        {
            j_world.draw();
            explorer.draw(explorer.current_direction);
        }
        
    }
    else if(e.key === "ArrowRight")
    {
        explorer.current_direction = "Right"
        // Explorer is moving right and is not past the center of farthest left grid.
        if (explorer.x_index < explorer.world_move_x_boundary)
        {
            explorer.x_index += 1;
            j_world.draw();
            explorer.move(tiles[explorer.x_index][explorer.y_index], j_world.x_grid_offset, j_world.y_grid_offset, explorer.current_direction);
        }
        // Explorer is moving right.
        else if(explorer.x_index < j_world.x_max_boundary - explorer.world_move_x_boundary)
        {
            // Whole World Moves Around Explorer.
            j_world.x_grid_offset += TILE_SIZE;
            j_world.x_index_offset += 1;
            explorer.x_index += 1;
            j_world.draw();
            explorer.draw(explorer.current_direction);
        }
        // Explorer is at the center of the most right grid, now only explorer moves.
        else if(explorer.x_index < j_world.x_max_boundary)
        { 
            explorer.x_index += 1;
            j_world.draw();
            explorer.move(tiles[explorer.x_index][explorer.y_index], j_world.x_grid_offset, j_world.y_grid_offset, explorer.current_direction);
        }
        else
        {
            j_world.draw();
            explorer.draw(explorer.current_direction);
        }

    }
    else if(e.key === "ArrowLeft")
    {
        explorer.current_direction = "Left"
        // Explorer is moving right and is not past the center of farthest left grid.
        if (explorer.x_index > j_world.x_max_boundary - explorer.world_move_x_boundary)
        {
            explorer.x_index -= 1;
            j_world.draw();
            explorer.move(tiles[explorer.x_index][explorer.y_index], j_world.x_grid_offset, j_world.y_grid_offset, explorer.current_direction);
        }
        // Explorer is moving left and is not past the center of farthest left grid.
        else if(explorer.x_index > j_world.x_min_boundary + explorer.world_move_x_boundary)
        {
                j_world.x_grid_offset -= TILE_SIZE;
                j_world.x_index_offset -= 1;
                explorer.x_index -= 1;
                j_world.draw();
                explorer.draw(explorer.current_direction);
        }
        // Explorer is at the center of the most left grid, now only explorer moves.
        else if(explorer.x_index > j_world.x_min_boundary)
        {
            explorer.x_index -= 1;
            j_world.draw();
            explorer.move(tiles[explorer.x_index][explorer.y_index], j_world.x_grid_offset, j_world.y_grid_offset, explorer.current_direction);
        }
        else
        {
            j_world.draw();
            explorer.draw(explorer.current_direction);
        }
            
    }

    if(explorer.x_index == 17 && explorer.y_index == 17)
    {
        FoundEvent();
    }

    UpdateExplorerStatus();
 });

 function UpdateExplorerStatus()
 {
    let explorer = j_world.explorer;
    let explorer_index_table = document.getElementById("explorer_index");
    let explorer_canvas_table = this.document.getElementById("explorer_canvas_pos");

    explorer_index_table.innerHTML = ("("+explorer.x_index.toString()+", "+explorer.y_index.toString()+")");
    explorer_canvas_table.innerHTML = ("("+explorer.x.toString()+", "+explorer.y.toString()+")");

 }

 function activateGrid()
 {
     j_world.tile_grid = !(j_world.tile_grid);
     j_world.draw();
     j_world.explorer.draw(j_world.explorer.current_direction)
 }


// Iniate Character Drawing
function iniateCharacterDrawing()
{
    let explorer = j_world.explorer;
    let tiles = j_world.tiles;
    j_world.draw();
    if(explorer.sprite.image.complete)
        explorer.move(tiles[explorer.x_index][explorer.y_index], j_world.x_grid_offset, j_world.y_grid_offset, "Up");
    else
    {
        explorer.sprite.image.onload = function()
        {
            explorer.move(tiles[explorer.x_index][explorer.y_index], j_world.x_grid_offset, j_world.y_grid_offset, "Up");
        };
    }
}

class MainLoop
{
    constructor(frame_rate)
    {
        this.frame_rate = frame_rate;

    }

}




UpdateExplorerStatus();
iniateCharacterDrawing();


function mainLoop()
{

    j_world.draw()
}