from threading import Thread

class Message:
    def __init__(self, entry):
        self.content = None
        self.entry = entry
    
    def setMessage(self, message):
        try:
            self.content = message
        except Exception as e:
            print(str(e))

    def getMessage(self):
        try:
            return self.content

        except Exception as e:
            print(str(e))

class MessageThread(Thread):
    def __init__(self, message):
        super(MessageThread, self).__init__()
        self.message = message 
    
    def run(self):
        self.message.getMessage()
