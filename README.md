# arcelormittal_demo_server
this is a web server play a role like IIoT platform 

### launch the entire demo

1. install mosquitto
```
brew install mosquitto
```

2. launch mqtt server
```
/usr/local/sbin/mosquitto -c /usr/local/etc/mosquitto/mosquitto.conf
```

3. sub data from mqtt server through topic: 'test/topic' 
```
mosquitto_sub -h localhost -t 'test/topic' -v
```

4. pub data through mqtt client through topic: 'test/topic' 10 times
```
mosquitto_pub -h localhost -t 'test/topic' --repeat 10 -m 'aaa'
```
