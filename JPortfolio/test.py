from PySide2 import QtCore, QtWidgets, QtWebEngineWidgets, QtWebChannel


class WebEnginePage(QtWebEngineWidgets.QWebEnginePage):
    def __init__(self, *args, **kwargs):
        super(WebEnginePage, self).__init__(*args, **kwargs)
        self.loadFinished.connect(self.onLoadFinished)

    @QtCore.Slot(bool)
    def onLoadFinished(self, ok):
        print("Finished loading: ", ok)
        if ok:
            self.load_qwebchannel()
            self.run_scripts_on_load()

    def load_qwebchannel(self):
        file = QtCore.QFile(":/qtwebchannel/qwebchannel.js")
        if file.open(QtCore.QIODevice.ReadOnly):
            content = file.readAll()
            file.close()
            self.runJavaScript(content.data().decode())
        if self.webChannel() is None:
            channel = QtWebChannel.QWebChannel(self)
            self.setWebChannel(channel)

    def add_objects(self, objects):
        if self.webChannel() is not None:
            initial_script = ""
            end_script = ""
            self.webChannel().registerObjects(objects)
            for name, obj in objects.items():
                initial_script += "var {helper};".format(helper=name)
                end_script += "{helper} = channel.objects.{helper};".format(helper=name)
            js = initial_script + \
                 "new QWebChannel(qt.webChannelTransport, function (channel) {" + \
                 end_script + \
                 "} );"
            self.runJavaScript(js)

    def run_scripts_on_load(self):
        pass


class WebRTCPageView(WebEnginePage):
    def __init__(self, *args, **kwargs):
        super(WebRTCPageView, self).__init__(*args, **kwargs)
        self.featurePermissionRequested.connect(self.onFeaturePermissionRequested)
        self.load(QtCore.QUrl("https://test.webrtc.org/"))

    @QtCore.Slot(QtCore.QUrl, QtWebEngineWidgets.QWebEnginePage.Feature)
    def onFeaturePermissionRequested(self, url, feature):
        if feature in (QtWebEngineWidgets.QWebEnginePage.MediaAudioCapture,
                       QtWebEngineWidgets.QWebEnginePage.MediaVideoCapture,
                       QtWebEngineWidgets.QWebEnginePage.MediaAudioVideoCapture):
            self.setFeaturePermission(url, feature, QtWebEngineWidgets.QWebEnginePage.PermissionGrantedByUser)
        else:
            self.setFeaturePermission(url, feature, QtWebEngineWidgets.WebEnginePage.PermissionDeniedByUser)

    def run_scripts_on_load(self):
        if self.url() == QtCore.QUrl("https://test.webrtc.org/"):
            self.add_objects({"jshelper": self})
            js = '''
                var button = document.getElementById("startButton");
                button.addEventListener("click", function(){ jshelper.on_clicked() });
            '''
            self.runJavaScript(js)

    @QtCore.Slot()
    def on_clicked(self):
        print("clicked on startButton")
        QtCore.QCoreApplication.quit()


if __name__ == '__main__':
    import sys

    app = QtWidgets.QApplication(sys.argv)

    w = QtWidgets.QWidget()
    lay = QtWidgets.QVBoxLayout(w)

    button = QtWidgets.QToolButton()
    button.setStyleSheet('''
        QToolButton{
            border: 1px; 
            border-color: black; 
            border-style: outset
        }
        QToolButton[success="true"]{
            background-color: red; 
        }
        QToolButton[success="false"]{
            background-color: green; 
        }
    ''')

    def refresh_button(ok):
        button.setProperty("success", ok)
        button.style().unpolish(button)
        button.style().polish(button)

    refresh_button(False)

    view = QtWebEngineWidgets.QWebEngineView()
    page = WebRTCPageView()
    page.profile().clearHttpCache()
    view.setPage(page)

    progressbar = QtWidgets.QProgressBar()
    page.loadProgress.connect(progressbar.setValue)
    page.loadFinished.connect(refresh_button)

    hlay = QtWidgets.QHBoxLayout()
    hlay.addWidget(progressbar)
    hlay.addWidget(button)

    lay.addWidget(view)
    lay.addLayout(hlay)
    w.resize(640, 480)
    w.show()
    sys.exit(app.exec_())