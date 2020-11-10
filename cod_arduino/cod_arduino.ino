
#define MOTOR_1 2
#define MOTOR_2 3
#define MOTOR_1_DIRECTION 51
#define MOTOR_2_DIRECTION 53

#include <ArduinoJson.h>

// address we will assign if dual sensor is present
#define LOX1_ADDRESS 0x30
#define LOX2_ADDRESS 0x31

// set the pins to shutdown
#define SHT_LOX1 24
#define SHT_LOX2 25


#define RED 400
#define YELLOW 700

int sensor_1_value = 0, sensor_2_value = 0;

// objects for the vl53l0x
Adafruit_VL53L0X lox1 = Adafruit_VL53L0X();
Adafruit_VL53L0X lox2 = Adafruit_VL53L0X();

// this holds the measurement
VL53L0X_RangingMeasurementData_t measure1;
VL53L0X_RangingMeasurementData_t measure2;

#define numberOfSensors 2
String last_colors[numberOfSensors]  = {"green","green"};
String current_colors[numberOfSensors]  = {"green","green"};



   /* Reset all sensors by setting all of their XSHUT pins low for delay(10), then set all XSHUT high to bring out of reset
    Keep sensor #1 awake by keeping XSHUT pin high
    Put all other sensors into shutdown by pulling XSHUT pins low
    Initialize sensor #1 with lox.begin(new_i2c_address) Pick any number but 0x29 and it must be under 0x7F. Going with 0x30 to 0x3F is probably OK.
    Keep sensor #1 awake, and now bring sensor #2 out of reset by setting its XSHUT pin high.
    Initialize sensor #2 with lox.begin(new_i2c_address) Pick any number but 0x29 and whatever you set the first sensor to*/
 
void setID() {
  // all reset
  digitalWrite(SHT_LOX1, LOW);    
  digitalWrite(SHT_LOX2, LOW);
  delay(10);
  // all unreset
  digitalWrite(SHT_LOX1, HIGH);
  digitalWrite(SHT_LOX2, HIGH);
  delay(10);

  // activating LOX1 and reseting LOX2
  digitalWrite(SHT_LOX1, HIGH);
  digitalWrite(SHT_LOX2, LOW);

  // initing LOX1
  if(!lox1.begin(LOX1_ADDRESS)) {
    Serial.println(F("Failed to boot first VL53L0X"));
    while(1);
  }
  delay(10);

  // activating LOX2
  digitalWrite(SHT_LOX2, HIGH);
  delay(10);

  //initing LOX2
  if(!lox2.begin(LOX2_ADDRESS)) {
    Serial.println(F("Failed to boot second VL53L0X"));
    while(1);
  }
}

void read_dual_sensors() {
  
  lox1.rangingTest(&measure1, false); // pass in 'true' to get debug data printout!
  lox2.rangingTest(&measure2, false); // pass in 'true' to get debug data printout!

  if(measure1.RangeStatus != 4) {     // if not out of range
    sensor_1_value = measure1.RangeMilliMeter;
  }
  else{
    sensor_1_value = 2000;
  }
  
  if(measure2.RangeStatus != 4) {
    sensor_2_value =  measure2.RangeMilliMeter;
  } 
  else{
    sensor_2_value = 2000;
  }
  
}


void setup() {



 // put your setup code here, to run once:
  pinMode(MOTOR_1, OUTPUT);
  digitalWrite(MOTOR_1, LOW);

  pinMode(MOTOR_2, OUTPUT);
  digitalWrite(MOTOR_2, LOW);

  pinMode(MOTOR_1_DIRECTION, OUTPUT);
  digitalWrite(MOTOR_1_DIRECTION, LOW);

  pinMode(MOTOR_2_DIRECTION, OUTPUT);
  digitalWrite(MOTOR_2_DIRECTION, LOW);

// wait until serial port opens for native USB devices
  while (! Serial) { delay(1); }

  pinMode(SHT_LOX1, OUTPUT);
  pinMode(SHT_LOX2, OUTPUT);

  Serial.println(F("Shutdown pins inited..."));

  digitalWrite(SHT_LOX1, LOW);
  digitalWrite(SHT_LOX2, LOW);

  Serial.println(F("Both in reset mode...(pins are low)"));
  
  
  Serial.println(F("Starting..."));
  setID();

  
 
  Serial.begin(9600);
}

long int motor_1_power = 0, motor_2_power = 0;
bool direction_1 = false, direction_2 = false;

String command;
StaticJsonDocument<200> doc;


String getColor(int sensorValue){
  if(sensorValue < RED){
    return "red";
  }
  if(sensorValue < YELLOW){
    return "yellow";
  }
  return "green";
}


bool verifyChangedColors(){
  for(int i = 0 ; i < numberOfSensors; i++){
    if(last_colors[i] != current_colors[i]){
      return true;
    }
  }
  return false;
}

void updateChangedColors(){
  for(int i = 0 ; i < numberOfSensors; i++){
    last_colors[i] = current_colors[i];
  }
  
}
int read_int_from_server(){
  int readNumber = 0;
  String lmao;
  if(Serial.available()){
           char c = Serial.read();  //gets one byte from serial buffer
           readNumber = c;
           lmao += c;
          }
  Serial.print("number=");
  Serial.print(readNumber);
 
  return readNumber;
}

void loop() {
  // put your main code here, to run repeatedly:
  read_dual_sensors();
  delay(10);

  current_colors[0] = getColor(sensor_1_value);
  current_colors[1] = getColor(sensor_2_value);

  if(verifyChangedColors()){
    doc["sensor_0"] = getColor(sensor_1_value);
    doc["sensor_1"] = getColor(sensor_2_value);

    updateChangedColors();
    serializeJson(doc, Serial);
    Serial.println();
  }

  
     if(Serial.available()){
              delay(20);
             int direction1 = read_int_from_server();
             Serial.println(" Finished-Direction1");
            int motor_1_power = read_int_from_server() * 2;
             Serial.println(" Finished-Power1");
            int direction2 = read_int_from_server();
            Serial.println(" Finished-Direction2");
            int motor_2_power = read_int_from_server() * 2;
            Serial.println(" Finished-Power2");
            Serial.flush();
           direction_1 = direction1 == 1 ? true : false;
           direction_2 = direction2 == 1 ? true : false;
           digitalWrite(MOTOR_1_DIRECTION, direction_1);
           digitalWrite(MOTOR_2_DIRECTION, direction_2);
           
           analogWrite(MOTOR_1, motor_1_power);
           analogWrite(MOTOR_2, motor_2_power);
     }
}
