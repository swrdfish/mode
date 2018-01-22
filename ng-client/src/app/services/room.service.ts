import { Service } from './../service';
import { Injectable } from '@angular/core';
import { IceServer, RtcConf } from './rtc-conf';


@Injectable()
export class RoomService {
  private connectedUser: any
  private myConnection :any
  private dataChannel: any
  private receiveChannel: any;
  private connection: any;

  private callback:any;
  constructor() { }

  init(callback) {
    this.connection = new WebSocket("ws://localhost:9090");
    let service = this;
    this.connection.onmessage = function(message) {
      service.onMessage(message);
    };
    this.connection.onopen = this.onOpen;
    this.connection.onerror = this.onError; 
    this.callback = callback;
    this.doLogin();
    
  }

  onMessage(message) {
    console.log("Got message", message.data); 
    let data = JSON.parse(message.data); 
   
    switch(data.type) { 
       case "login": 
          this.onLogin(data.success); 
          break; 
       case "offer": 
          this.onOffer(data.offer, data.name); 
          break; 
       case "answer":
          this.onAnswer(data.answer); 
          break; 
       case "candidate": 
          this.onCandidate(data.candidate); 
          break; 
       default: 
          break; 
    } 
  }

  onOpen() {
    console.log("Its Connected");
  }

  onError(err) {
    console.error("Its Error:"+err);
  }

  onLogin(success) { 
    
       if (success === false) { 
          alert("oops...try a different username"); 
       } else { 
          let iceServer = new IceServer("stun:stun.1.google.com:19302");
          let servers = [iceServer];
          let rtcConf = new RtcConf(servers);
        
          this.myConnection = new webkitRTCPeerConnection(rtcConf); 
        
          console.log("RTCPeerConnection object was created"); 
          console.log(this.myConnection); 
          let service = this;
          //setup ice handling 
          //when the browser finds an ice candidate we send it to another peer 
          this.myConnection.onicecandidate = function (event) { 
        
             if (event.candidate) { 
                service.send({ 
                   type: "candidate", 
                   candidate: event.candidate 
                });
             } 
          }; 
    
          this.myConnection.ondatachannel = function (event) {
                this.receiveChannel = event.channel;
                this.receiveChannel.onmessage = function (event) {
                      console.log(event.data);
                }
          }
        
          this.openDataChannel();
          this.connectTo();
       } 
    }

    connectTo() {      
      this.connectedUser = "m";
      let service = this;
         
      this.myConnection.createOffer(function (offer) { 
        console.log(); 
                 
        service.send({ 
           type: "offer", 
           offer: offer 
        }); 
                 
        service.myConnection.setLocalDescription(offer); 
     }, function (error) { 
        alert("An error has occurred."); 
     }); 
    }


    openDataChannel() { 
      
        var dataChannelOptions = { 
          reliable:true 
        }; 
        let service = this;
          
        this.dataChannel = this.myConnection.createDataChannel("myDataChannel", dataChannelOptions);
        this.dataChannel.onopen = function(event) {
              console.log(event);
        }   
        this.dataChannel.onerror = function (error) { 
          console.log("Error:", error); 
        };
          
        this.dataChannel.onmessage = function (event) { 
          console.log("Got message:", event.data); 
          service.callback(event.data);
        };  
    }

    onOffer(offer, name) { 
      this.connectedUser = name; 
      this.myConnection.setRemoteDescription(new RTCSessionDescription(offer));
        let service = this;
      this.myConnection.createAnswer(function (answer) { 
         this.myConnection.setLocalDescription(answer); 
               
         service.send({ 
            type: "answer", 
            answer: answer 
         }); 
               
      }, function (error) { 
         alert("oops...error"); 
      }); 
   }

  onAnswer(answer) { 
    this.myConnection.setRemoteDescription(new RTCSessionDescription(answer)); 
  }

  onCandidate(candidate) { 
    this.myConnection.addIceCandidate(new RTCIceCandidate(candidate)); 
  }


  sendMessage(value) {
    this.dataChannel.send(value);
  }

  send(message) { 
    if (this.connectedUser) { 
       message.name = this.connectedUser; 
    }
   
    this.connection.send(JSON.stringify(message)); 
 };

  doLogin() {
    this.send({ 
      type: "login", 
      name: "m1" 
   }); 
  }
}
