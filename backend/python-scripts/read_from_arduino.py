import serial
import time

ser = serial.Serial("/dev/ttyACM0", 9600)

def read():
	line = ser.readline()
	print(line.strip())

# while True:
# 	if (ser.in_waiting > 0):
# 		read()

if (ser.in_waiting > 0):
	read()
else:
	hasRead = False
	retries = 10
	while (retries > 0):
		time.sleep(1)
		if (ser.in_waiting > 0):
			read()
			hasRead = True
			retries = 0
		else:
			retries = retries - 1
	
	if (hasRead == False):
		raise Exception("Could not find anything to read?")



