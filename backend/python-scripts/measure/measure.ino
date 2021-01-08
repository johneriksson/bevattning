const int AirValue = 800;
const int WaterValue = 660;
int value1 = 0;
int value2 = 0;
int value3 = 0;
int value4 = 0;
int perc1 = 0;
int perc2 = 0;
int perc3 = 0;
int perc4 = 0;

void setup() {
	Serial.begin(9600);
}

void loop() {
	value1 = analogRead(A0);
	value2 = analogRead(A1);
	value3 = analogRead(A2);
	value4 = analogRead(A3);
	perc1 = map(value1, AirValue, WaterValue, 0, 100);
	perc2 = map(value2, AirValue, WaterValue, 0, 100);
	perc3 = map(value3, AirValue, WaterValue, 0, 100);
	perc4 = map(value4, AirValue, WaterValue, 0, 100);

	Serial.print(perc1);
	Serial.print(":");
	Serial.print(perc2);
	Serial.print(":");
	Serial.print(perc3);
	Serial.print(":");
	Serial.print(perc4);
	Serial.println();
	
	delay(30 * 1000);
}
