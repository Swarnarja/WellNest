/* 
  PURPOSE: Pushbutton operated dispenser with distance monitoring. 
  Pressing the button turns the servo to 180 degrees.
  Releasing it returns it to 0 degrees.
  The ultrasonic sensor constantly measures and displays the distance.
*/

#include <Servo.h>

Servo myServo;

// Define the pins
const int buttonPin = 2;  
const int servoPin = 4;
const int trigPin = 10;   // Ultrasonic Trigger Pin
const int echoPin = 11;   // Ultrasonic Echo Pin

// Variables for button and distance
int buttonState = 0;      
long duration;            // Stores the time it takes for the sound wave to travel
int distance;             // Stores the calculated distance in cm

void setup() {
  // Initialize serial communication
  Serial.begin(9600);
  
  // Configure the button and sonar pins
  pinMode(buttonPin, INPUT);
  pinMode(trigPin, OUTPUT); // Trigger sends the sound wave out
  pinMode(echoPin, INPUT);  // Echo listens for the sound wave to return

  // Configure the servo motor
  myServo.attach(servoPin);
  
  // Set default starting position to 0 degrees
  myServo.write(0);   
  delay(500); // Give the servo a moment to reach the start position
}

void loop() {
  // ----------------------------------------
  // 1. READ THE ULTRASONIC SENSOR
  // ----------------------------------------
  
  // Clear the trigger pin to ensure a clean pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  
  // Send a 10-microsecond HIGH pulse to trigger the sensor
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Read the echoPin, which returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  
  // Calculate the distance in centimeters
  // (Speed of sound is roughly 0.034 cm/microsecond. Divide by 2 because it's a round trip)
  distance = duration * 0.034 / 2;


  // ----------------------------------------
  // 2. READ THE BUTTON & MOVE THE SERVO
  // ----------------------------------------
  
  // Read the digital state of the button pin
  buttonState = digitalRead(buttonPin);

  // Print the distance first, so it sits on the same line
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.print(" cm | ");
  if(distance >= 40) {
    Serial.print(" RESTOCK | ");
  }
  else {
    Serial.print(" SUFFICIENT STOCK | ");
  }

  if (buttonState == HIGH) {
    Serial.println("HIGH - Button Pressed. Dispensing (180 deg)!");
    
    // Make servo do a full sweep to 180 degrees
    myServo.write(180); 
    
  } else {
    Serial.println("LOW - Button Not Pressed.");
    
    // Return servo to default 0 degree position
    myServo.write(0);  
  }

  // Small delay to make the Serial output readable and debounce the button
  delay(100);
}
