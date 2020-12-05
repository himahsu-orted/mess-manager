**Mess Manager**

**Smart Mess System Powered by Microcontroller And Web Technologies**

Video With Complete Explanation- https://www.youtube.com/watch?v=0Ktue1P7kTw 

__AIM__
The aim of this project is to eliminate the usage of a whole other id card for mess and yet another coupon for supplementary meals. The project will also check if the student is enrolled in the mess.
COMPONENTS REQUIRED
ESP8266 NODE MCU 
RFID Sensor
1x4 Keypad
An Led Bulb


**EXPLANATION**
ESP8266 NODE MCU has been used for its wifi capability over the arduino. It will receive the input from the RFID sensor and the 1x4 keypad and put the result through the LED.
The RFID Card will scan the student's card (with RFID) and will return the student id.
THe 1x4 keypad will help to input the supplement meal of different prices.
The LED bulb will indicate the result of the request made to the server.
 
 
**WORKING**
The ESP8266 will wait for the wifi connection and when it's connected, it can take the input from the keypad. Each key of the keypad will have a particular price. After the price has been provided the RFID sensor will take the input by scanning the card and will return the student id to the ESP8266. 
After having the price and Student ID, the ESP8266 will make an HTTP request to Google App Script Server and check whether the student exists and if he does, do he/she have enough balance to buy the particular supplementary meal. If his enrollment exists then, and has enough balance, then the amount will be deducted from it. All the data is stored and is changed in Google Spreadsheet store in Google Drive. The processes are realtime and the device can be used from anywhere at any time.

**SIMULATION**
LED is OFF - No Wifi Connection

LED is ON Continuously - The device is connected to wifi ready to take input

LED is not blinking after request - The request is successful and ready for next input.

LED is blinking slowly - The student doesn't have enough balance.

LED is blinking fast - The student is not enrolled.

**LINKS**

Video With Complete Explanation- https://www.youtube.com/watch?v=0Ktue1P7kTw 

Source Code- https://github.com/himahsu-orted/mess-manager 


