class JWorldCommands:
    def __init__(self, page):
        self.page = page 
    
    def viewGrid(self):
        script = """
            var tile_settings_modal = document.getElementById("TileSettings");
            tile_settings_modal.style.display = "block";

        """
        self.page.runJavaScript(script)

