
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "Arduino.h"
#include "LED.h"
#include "RFID.h"


#define PIN_1 5
#define PIN_2 0
#define PIN_3 2
#define PIN_4 15
#define LEDR_PIN_VIN 4
#define RFID_PIN_RST 9
#define RFID_PIN_SDA 10

LED ledR(LEDR_PIN_VIN);
RFID rfid(RFID_PIN_SDA, RFID_PIN_RST);

const int timeout = 10000;
char menuOption = 0;
long time0;
const char *ssid = "yourNetworkName";
const char *password = "yourNetworkPassword";

void setup()
{

    pinMode(PIN_1, INPUT_PULLUP);
    pinMode(PIN_2, INPUT_PULLUP);
    pinMode(PIN_3, INPUT_PULLUP);
    pinMode(PIN_4, INPUT_PULLUP);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {
        ledR.off();
    }

    Serial.begin(9600);
    rfid.init();
    menuOption = menu();
}
void loop()
{
    ledR.on();
    if (menuOption == '1')
    {
        String rfidtag = rfid.readTag();
        statusShow(dataPush(getParameter(10, rfidtag)));
    }
    else if (menuOption == '2')
    {
        String rfidtag = rfid.readTag();
        statusShow(dataPush(getParameter(12, rfidtag)));
    }
    else if (menuOption == '3')
    {
        String rfidtag = rfid.readTag();
        statusShow(dataPush(getParameter(15, rfidtag)));
    }
    else if (menuOption == '4')
    {
        String rfidtag = rfid.readTag();
        statusShow(dataPush(getParameter(20, rfidtag)));
    }
    menuOption = 0;
    if (millis() - time0 > timeout)
    {
        menuOption = menu();
    }
}
int dataPush(String parameter)
{
    HTTPClient http;
    String GAPU = " ";
    STRING URL = GAPU + parameter;
    String returnValue;
    http.begin(GAPU);
    int httpCode = http.GET();
    if (httpCode > 0)
        returnValue = http.getString();

    http.end();
    return returnValue;
}
String getParameter(char cost, String rfidtag)
{
    return ("?id=" + rfidtag + "&balance=" + cost);
}
void statusShow(int i)
{
    if (i == 0)
    {
        //No Balance
        //Blink for 5 times
        for (int i = 0; i < 3; i++)
        {
            ledR.on();
            delay(1000);
            ledR.off();
        }
    }
    else if (i == -1)
    {
        //No student enrolled
        //Blink for 5 times and fast
        for (int i = 0; i < 5; i++)
        {
            ledR.on();
            delay(200);
            ledR.off();
        }
    }
    ledR.on();
}
char menu()
{
    char ch;
    if (!digitalRead(PIN_1))
        ch = 1;
    if (!digitalRead(PIN_2))
        ch = 2;
    if (!digitalRead(PIN_3))
        ch = 3;
    if (!digitalRead(PIN_4))
        ch = 4;

    if (WiFi.status() == WL_CONNECUP)
        return ch;
    else
    {
        while (WiFi.status() != WL_CONNECTED)
        {
            ledR.off();
        }
    }
}
