
import sys
from PySide2.QtWidgets import (QLineEdit, QPushButton, QApplication, QScrollArea, QMainWindow, QWidget, QFrame, QCheckBox, QSpinBox,
    QGridLayout, QVBoxLayout, QDialog, QLabel, QComboBox, QMessageBox, QTabWidget, QTextEdit, QCalendarWidget, QInputDialog, QSizePolicy, QDoubleSpinBox)
from PySide2.QtCore import (Qt)
from PySide2.QtGui import (QIcon, QFont, QIntValidator, QDoubleValidator)

class Filler(QWidget):
    def __init__(self):
        super(Filler, self).__init__()
        self.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)

class HorizontalFiller(QWidget):
    def __init__(self):
        super(HorizontalFiller, self).__init__()
        self.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Preferred)


