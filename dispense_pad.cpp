#include <Servo.h>

Servo myServo;

const int trigPin = 10;
const int echoPin = 11;

void setup() {
  Serial.begin(9600);//initialize serial comms

  myServo.attach(9);
  delay(1000);
  myServo.write(-180);   // start at 0 degrees

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  float distance = duration * 0.034 / 2;

  Serial.println(distance);

  if (distance < 100) {
      Serial.print("Restock");// restock indicator in terminal
  }
}
