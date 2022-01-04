import RPi.GPIO as GPIO
import time
import sys
import os

pin = 40
arg = int(sys.argv[1])
if arg < 0 or arg > 1:
    raise ValueError("arg should be 0 or 1")

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(pin, GPIO.OUT)
GPIO.output(pin, GPIO.HIGH if arg == 1 else GPIO.LOW)

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, "led-status.txt")
with open(filename, "w") as text_file:
    text_file.write("ON" if arg == 1 else "OFF")