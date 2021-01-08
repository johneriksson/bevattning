#!/usr/bin/env python3
import time
from ADCDevice import ADCDevice, PCF8591
import os
import sys

adc = ADCDevice()

def setup():
	_original_stdout = sys.stdout
	sys.stdout = open(os.devnull, "w")

	global adc
	if(adc.detectI2C(0x48)): # Detect the pcf8591.
		adc = PCF8591()
	else:
		raise EnvironmentError("No correct I2C address found, \n"
			"Please use command 'i2cdetect -y 1' to check the I2C address! \n"
			"Program Exit. \n")
	
	sys.stdout.close()
	sys.stdout = _original_stdout
		
def measure():
	values = [None] * 100
	for i in range(100):
		values[i] = adc.analogRead(0) # read the ADC value of channel 0
		time.sleep(0.05)
	# voltage = value / 255.0 * 5  # calculate the voltage value
	# print ('ADC Value : %d, Voltage : %.2f'%(value,voltage))
	maxValue = 65535
	value = 1 - (round((sum(values) / len(values)) / float(maxValue), 2))
	print(value)

def destroy():
	adc.close()
	
setup()
measure()
destroy()
		
	



# import serial
# import RPi.GPIO as GPIO
# import time

# ser = serial.Serial("/dev/ttyACM0", 9600)
# pins = [11]
# on = GPIO.HIGH
# off = GPIO.LOW

# GPIO.setmode(GPIO.BOARD)
# for pin in pins:
# 	GPIO.setup(pin, GPIO.OUT)

# def loop():
# 	while True:
# 		if (ser.in_waiting > 0):
# 			line = ser.readline()
# 			print(line.strip())

# 			# if (int(line) > 50):
# 			# 	GPIO.output(pin, on)
# 			# else:
# 			# 	GPIO.output(pin, off)


# try:
# 	loop()
# except KeyboardInterrupt: # Press ctrl-c to end the program.
# 	for pin in pins:
# 		GPIO.output(pin, off)
	
# 	GPIO.cleanup()

