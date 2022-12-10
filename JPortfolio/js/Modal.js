
// Get the modal
var tile_settings_modal = document.getElementById("TileSettings");
var audio_settings_modal = document.getElementById("AudioSettings");

// Get the button that opens the modal
let tile_settings_button = document.getElementById("tile_settings_button");
let audio_settings_button = document.getElementById("audio_settings_button");

// Get the <span> element that closes the modal
let tile_settings_close = document.getElementsByClassName("close")[0];
let audio_settings_close = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
tile_settings_button.onclick = function() {tile_settings_modal.style.display = "block";}
audio_settings_button.onclick = function() {audio_settings_modal.style.display = "block";}

// When the user clicks on <span> (x), close the modal
tile_settings_close.onclick = function() {tile_settings_modal.style.display = "none";}
audio_settings_close.onclick = function() {audio_settings_modal.style.display = "none";}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) 
{
  if (event.target == tile_settings_modal) {tile_settings_modal.style.display = "none";}

  else if (event.target == audio_settings_modal) {audio_settings_modal.style.display = "none";}
}