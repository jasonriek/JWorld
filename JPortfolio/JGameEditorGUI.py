
import sys
import os 
from PySide2.QtWidgets import (QApplication, QMainWindow, QTextEdit, QLineEdit, QWidget, QGridLayout, QLabel, QPushButton, QAction) 
from PySide2.QtWebEngineWidgets import (QWebEngineView, QWebEngineSettings, QWebEnginePage)
from PySide2 import QtWebChannel
from PySide2.QtCore import (QUrl)
from CustomQtWidgets import (Filler, HorizontalFiller)
from ThreadTypes import(Message)
from JWorldCommands import (JWorldCommands)
from Server import LocalServer
from time import sleep

class WebPage(QWebEnginePage):
    def __init__(self, message):
        super(WebPage, self).__init__()
        self.message = message

        
    def javaScriptConsoleMessage(self, level, message, lineNumber, sourceID):
        #print("javaScriptConsoleMessage: ", level, message, lineNumber, sourceID)
        self.message.setMessage(message)
        self.message.entry.setText(message)
        print(self.message.getMessage())
    
    def getMessage(self):
        return self.message

class Window(QMainWindow):
    def __init__(self, parent=None):
        
        self.app = QApplication(sys.argv)
        self.app.setStyle("Fusion")
        super(Window, self).__init__(parent)
        self.server = LocalServer()
        self.server.start()
        self.url = "http://localhost:1234/JPortfolio.html"
        sleep(1)
        self.view = QWebEngineView()
        self.message_entry = QLineEdit()
        self.message = Message(self.message_entry)
        self.page = WebPage(self.message)
        self.view.load(self.url)
        self.page.load(self.url)
        self.jworld_commands = JWorldCommands(self.page)

        # Menu Actions
        self.open_command = QAction("Open", self)
        #self.open_command.triggered.connect(self.load)
        self.save_as_command = QAction("&Save", self)
        self.save_as_command.setShortcut("Ctrl+s")
        #self.save_as_command.triggered.connect(self.save)
        self.exit_command = QAction("Exit", self)
        self.exit_command.triggered.connect(self.close)
        self.view_grid_command = QAction("View Tile Grid", self)
        self.view_grid_command.triggered.connect(self.jworld_commands.viewGrid)

        # Window Menu
        self.main_menu = self.menuBar() 
        self.file_menu = self.main_menu.addMenu("File")
        #self.file_menu.addAction(self.open_command)
        self.file_menu.addAction(self.open_command)
        self.file_menu.addAction(self.save_as_command)
        self.file_menu.addSeparator()
        self.file_menu.addAction(self.exit_command)
        self.edit_menu = self.main_menu.addMenu("Edit")
        self.view_menu = self.main_menu.addMenu("View")
        self.view_menu.addAction(self.view_grid_command)
        self.help_menu = self.main_menu.addMenu("Help")
        
        # Window Title
        self.setWindowTitle("JWorld - Editor")

        self.main_widget = QWidget(self)
        self.main_layout = QGridLayout(self.main_widget)
        self.preview_label = QLabel("World Preview:")

        self.preview_space = QWidget(self)
        self.preview_space_layout = QGridLayout(self.preview_space)
        self.preview_space_layout.addWidget(self.view)
        self.preview_space.setFixedHeight(620)

        # ROW 1
        self.row_1 = QWidget()
        self.row_1_layout = QGridLayout(self.row_1)
        self.test_button = QPushButton("Test")
        self.test_button.clicked.connect(self.getPageText)
        
        self.row_1_layout.addWidget(self.test_button, 0, 0)
        self.row_1_layout.addWidget(self.message_entry, 0, 1)
        self.row_1_layout.addWidget(HorizontalFiller(), 0, 2)

        self.main_layout.addWidget(self.preview_label)
        self.main_layout.addWidget(self.preview_space)
        self.main_layout.addWidget(self.row_1)
        self.main_layout.addWidget(Filler())
        self.setCentralWidget(self.main_widget)

    def sendAlert(self):
        script = """
            var data = []
            data.push(document.getElementById("something").innerHTML);
            for(var i = 0; i < data.length; i++)
                console.log(data[i]);
        """
        self.page.runJavaScript(script)
        
    def getPageText(self, page_text):
        script = None
        if page_text:
            print(page_text)
            script = """
            var data = []
            data.push(document.getElementById("something").innerHTML);
            for(var i = 0; i < data.length; i++)
                console.log(data[i]);
            alert("""+page_text+""");
        """
        self.page.runJavaScript(script)

    def start(self):
        self.showMaximized()

        sys.exit(self.app.exec_())



if __name__ == "__main__":
    window = Window()
    window.start()