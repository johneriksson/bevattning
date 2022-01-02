import RPi.GPIO as GPIO
import time
import sys

pin = 40
arg = int(sys.argv[1])
if arg < 0 or arg > 1:
    raise ValueError("arg should be 0 or 1")

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(pin, GPIO.OUT)
GPIO.output(pin, GPIO.HIGH if arg == 1 else GPIO.LOW)
