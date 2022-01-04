import os
dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, "led-status.txt")

with open(filename, "r") as text_file:
    text = text_file.read()
    print(text)