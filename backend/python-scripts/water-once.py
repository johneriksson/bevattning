import RPi.GPIO as GPIO
import time
import sys

pins = [7, 11, 13, 15]
plantIndex = int(sys.argv[1])
if plantIndex < 0 or plantIndex > 3:
    raise ValueError("plantIndex should be 0-3")
pin = pins[plantIndex]

GPIO.setmode(GPIO.BOARD)
GPIO.setup(pin, GPIO.OUT)

GPIO.output(pin, GPIO.LOW)
time.sleep(1)
GPIO.output(pin, GPIO.HIGH)

GPIO.cleanup()
