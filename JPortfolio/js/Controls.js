class MainLoopConfig
{
    constructor(frame_delay, frame_count)
    {
        this.frame_delay = frame_delay;
        this.frame_count = frame_count;
        this.explorer_move_down = false;
        this.explorer_move_up = false;
        this.explorer_move_right = false;
        this.explorer_move_left = false;
        this.change_direction = false;
    }

}
let main_loop_config = new MainLoopConfig(4, 0);

/*
document.onkeydown = function(e){
    let keycode = window.event ? window.event.keyCode : e.which;
    if(keycode == 40 || keycode == 39 || keycode == 38 || keycode == 37)
    {
        let timer = setTimeout(function()
        {
            main_loop_config.change_direction = false;
        }, 100); 
        document.onkeyup = function()
        {
            clearTimeout(timer);
            main_loop_config.change_direction = true;   
        }
    }
};
*/
/*
class Mouse
{
    constructor()
    {
        this.is_held = false; 
    }

}
let mouse = new Mouse();

window.addEventListener('mousedown', function (e)
{
    if(!mouse.is_held)
    {
        e.preventDefault();
        let mouse_x = event.layerX;
        let mouse_y = event.layerY;
        if(mouse_x > j_world.explorer.x + (j_world.explorer.w*2) )
            main_loop_config.explorer_move_right = true;
        
    }
    else
    {
        main_loop_config.explorer_move_down = false;
        main_loop_config.explorer_move_up = false;
        main_loop_config.explorer_move_right = false;
        main_loop_config.explorer_move_left = false;
    }
    
});

window.addEventListener('mouseup', function (e)
{
    mouse.is_held = false;
});

*/



window.addEventListener('keyup', function (e) 
{
    e.preventDefault();
    if(e.key === "ArrowDown")
    {
        main_loop_config.explorer_move_down = false;
    }
    else if(e.key === "ArrowUp")
    {
        main_loop_config.explorer_move_up = false;
    }
    else if(e.key === "ArrowRight")
    {
        main_loop_config.explorer_move_right = false;
    }
    else if(e.key === "ArrowLeft")
    {
        main_loop_config.explorer_move_left = false;
    }
});

window.addEventListener('keydown', function (e) {
    e.preventDefault();
    main_loop_config.all_movement_ceased = true;
    if(e.key === "ArrowDown")
    {
        main_loop_config.explorer_move_down = true;
    }
    else if(e.key === "ArrowUp")
    {
        main_loop_config.explorer_move_up = true;
    }
    else if(e.key === "ArrowRight")
    {
        main_loop_config.explorer_move_right = true;
    }
    else if(e.key === "ArrowLeft")
    {
        main_loop_config.explorer_move_left = true;
    }
   
 });

 function UpdateExplorerStatus()
 {
    let explorer = j_world.explorer;
    let explorer_index_table = document.getElementById("explorer_index");
    let explorer_canvas_table = this.document.getElementById("explorer_canvas_pos");

    explorer_index_table.innerHTML = ("("+explorer.x_index.toString()+", "+explorer.y_index.toString()+")");
    explorer_canvas_table.innerHTML = ("("+explorer.x.toString()+", "+explorer.y.toString()+")");

 }

 function ExplorerStartPos(x_offset, y_offset)
 {
    let explorer = j_world.explorer;
    explorer.current_direction = "Down";
    j_world.x_grid_offset += (TILE_SIZE*x_offset);
    j_world.y_grid_offset += (TILE_SIZE*y_offset);
    j_world.x_index_offset += (1*x_offset);
    j_world.y_index_offset += (1*y_offset);
    explorer.x_index += (1*x_offset); 
    explorer.y_index += (1*y_offset);
 }

 function activateGrid()
 {
     j_world.tile_grid = !(j_world.tile_grid);
 }

 function activateGridNumber()
 {
     j_world.grid_data = !(j_world.grid_data);
 }

function ExplorerMoveDown(only_change_direction)
{
    j_world.explorer.current_direction = "Down";
    if(j_world.explorer.y_index < j_world.y_max_boundary - j_world.explorer.world_move_y_boundary && !only_change_direction)
    {
        j_world.y_grid_offset += TILE_SIZE;
        j_world.y_index_offset += 1;
        j_world.explorer.y_index += 1;
    }
}
function ExplorerMoveUp(only_change_direction)
{
    j_world.explorer.current_direction = "Up";
    if(j_world.explorer.y_index > j_world.y_min_boundary + j_world.explorer.world_move_y_boundary && !only_change_direction)
    {
        j_world.y_grid_offset -= TILE_SIZE;
        j_world.y_index_offset -= 1;
        j_world.explorer.y_index -= 1;
    }
}
function ExplorerMoveRight(only_change_direction)
{
    j_world.explorer.current_direction = "Right";
    if(j_world.explorer.x_index < j_world.x_max_boundary - j_world.explorer.world_move_x_boundary && !only_change_direction)
    {
        j_world.x_grid_offset += TILE_SIZE;
        j_world.x_index_offset += 1;
        j_world.explorer.x_index += 1; 
    }
}
function ExplorerMoveLeft(only_change_direction)
{
    j_world.explorer.current_direction = "Left";
    if(j_world.explorer.x_index > j_world.x_min_boundary + j_world.explorer.world_move_x_boundary && !only_change_direction)
    {
        j_world.x_grid_offset -= TILE_SIZE;
        j_world.x_index_offset -= 1;
        j_world.explorer.x_index -= 1;
    }
}

function ExplorerMove()
{
    let only_change_direction = main_loop_config.change_direction;
 
    j_world.explorer.sprite.setIdle(false);
    if(main_loop_config.explorer_move_down)
        ExplorerMoveDown(only_change_direction);
    else if(main_loop_config.explorer_move_up)
        ExplorerMoveUp(only_change_direction);
    else if(main_loop_config.explorer_move_right)
        ExplorerMoveRight(only_change_direction);
    else if(main_loop_config.explorer_move_left)
        ExplorerMoveLeft(only_change_direction);
    else
        j_world.explorer.sprite.setIdle(true);
}

function mainLoop()
{
    main_loop_config.frame_count++;
    if(main_loop_config.frame_count < main_loop_config.frame_delay)
    {
        window.requestAnimationFrame(mainLoop);
        return;
    }
    j_world.events.playMusic();
    j_world.events.characterEvents("AlanWatts");

    main_loop_config.frame_count = 0;
    UpdateExplorerStatus();
    ExplorerMove();
    j_world.draw();
    j_world.explorer.draw();


    window.requestAnimationFrame(mainLoop);
}
window.requestAnimationFrame(mainLoop);

ExplorerStartPos(8, 8);