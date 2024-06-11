
// Mobile Controller v.1.0
// Coded by Loroko 
// Created: 6/8/2024
// Last Updated: 6/10/2024
// blackflypress.com 

const tapThreshold = 150;
const swipeThreshold = 100

class Example extends Phaser.Scene{

    constructor(){
        super('Touchpad');
        this.touch = false;
        this.leftActive = false
        this.leftPointer = null;
        this.rightActive = false;
        this.rightPointer = null;
      }// end constructor 

      preload() {
        this.load.image('touchOrigin', 'touchpad.png'); // load touchpad assets
        this.load.image('touchCurrent', 'touchpad.png'); 
        this.load.image('touchButton', 'button.png'); 
        this.load.bitmapFont('p2', 'PressStart2P.png', 'PressStart2P.xml');
      }// end preload

      create() {
        this.add.line(config.width/2, config.height/2, 0, config.height, 0, 0, 0x00ff00);
        this.add.bitmapText(config.width/2 + 50, 25 , 'p2', `Left Control`, 45).setOrigin(0,0).setTint(0x00ff00);
        this.leftAngleText = this.add.bitmapText(50, 950 , 'p2', `Angle:`, 45).setOrigin(0,0).setTint(0x00ff00);
        this.leftDistanceText = this.add.bitmapText(50, 1000 , 'p2', `Distance:`, 45).setOrigin(0,0).setTint(0x00ff00);
        this.leftOrigin = this.add.image(0, 0, 'touchOrigin'); // create touchpad assets
        this.leftCurrent = this.add.image(0, 0, 'touchCurrent');
        this.leftOrigin.setScale(6);
        this.leftCurrent.setScale(6);
        this.leftOrigin.alpha = 0; 
        this.leftCurrent.alpha = 0;

        this.add.bitmapText(25, 25 , 'p2', `Right Control`, 45).setOrigin(0,0).setTint(0x00ff00);
        this.rightAngleText = this.add.bitmapText(1130, 950 , 'p2', `Angle:`, 45).setOrigin(0,0).setTint(0x00ff00);
        this.rightDistanceText = this.add.bitmapText(1130, 1000 , 'p2', `Distance:`, 45).setOrigin(0,0).setTint(0x00ff00);
        this.rightOrigin = this.add.image(0, 0, 'touchOrigin'); // create touchpad assets
        this.rightCurrent = this.add.image(0, 0, 'touchCurrent');
        this.rightOrigin.setScale(6);
        this.rightCurrent.setScale(6);
        this.rightOrigin.alpha = 0; 
        this.rightCurrent.alpha = 0;
        }// end create
      
        assignPointers() {
          this.touch = true;
            if (this.input.pointer1.x < config.width/2) { // check for location of pointer1
              this.leftPointer = this.input.pointer1 ;
              this.rightPointer = this.input.pointer2 ;
            } 
            if (this.input.pointer1.x > config.width/2) {
              this.rightPointer = this.input.pointer1 ;
              this.leftPointer = this.input.pointer2 ;
           }
        }// end touchAssign\c
      
        update() {
          this.leftAngleText.setText('Angle: ' + this.leftAngle); // UI updates
          this.leftDistanceText.setText('Distance: ' + this.leftDistance);
          this.rightAngleText.setText('Angle: ' + this.rightAngle); // UI updates
          this.rightDistanceText.setText('Distance: ' + this.rightDistance);
         
          if (this.touch == false && this.input.pointer1.active) { // first point of contact
            this.assignPointers();
          }// end if (this.touch...
      
          if (this.touch == true) {
            if (this.leftPointer.active && this.leftPointer.downX < config.width/2) { // handle analog control
              this.leftActive = true;
              // console.log('move');
              this.leftOrigin.alpha = .6; // increase opacity
              this.leftCurrent.alpha = .6;
              this.leftOrigin.setPosition(this.leftPointer.downX, this.leftPointer.downY); // assign coordinates
              this.leftCurrent.setPosition(this.leftPointer.x, this.leftPointer.y); 
              this.leftAngle = Math.trunc(this.leftPointer.getAngle() * 180/Math.PI); // get data
              this.leftDistance = Math.trunc(this.leftPointer.getDistance());


              // if (this.rightPointer.active && this.rightPointer.downX < config.width/2){
              //   // this.rightActive = false;

              //   // this.leftPointer = n
              //   console.log('destroy');
              // }
            }// end if (this.leftPointer.active...
      
            if (!this.leftPointer.active) {      // handle analog control end
              this.leftActive = false;
              this.leftOrigin.alpha = 0; // reduce opacity
              this.leftCurrent.alpha = 0;
            }// end if (!this.movePointer.active...
      
            if (this.rightPointer.active && this.rightPointer.downX > config.width/2) { // handle analog control
              this.rightActive = true;
              // console.log('move');
              this.rightOrigin.alpha = .6; // increase opacity
              this.rightCurrent.alpha = .6;
              this.rightOrigin.setPosition(this.rightPointer.downX, this.rightPointer.downY); // assign coordinates
              this.rightCurrent.setPosition(this.rightPointer.x, this.rightPointer.y); 
              this.rightAngle = Math.trunc(this.rightPointer.getAngle() * 180/Math.PI); // get data
              this.rightDistance = Math.trunc(this.rightPointer.getDistance());
            }// end if (this.movePointer.active...
      
            if (!this.rightPointer.active) {      // handle analog control end
              this.rightActive = false;
              this.rightOrigin.alpha = 0; // reduce opacity
              this.rightCurrent.alpha = 0;
            }// end if (!this.movePointer.active...

        

            if (!this.leftPointer.active && !this.rightPointer.active) { // handle all touch end
              this.touch = false;
            }// end if (!this.gesturePointer.active...
          }//end this.touch == true)
        }//end update
    //   } //end Touchpad scene
      
}
const config = {
    type: Phaser.AUTO,
    width: 2160,
    height: 1080,
    backgroundColor: 0xacabaf,
    input: {
      activePointers: 3
    },// end input
    physics: { 
        default: 'arcade',
        arcade: {
            
            debug: true,
            debugShowBody: true,
            debugBodyColor: 0x00ff00
        },// end arcade
    },// end physics
    render: {
        pixelArt: true
    },// end render
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },// end scale
    scene: [
        Example
    ]// end scene
    // seed: [ (Date.now() * Math.random()).toString() ]
  }; // end config
export default new Phaser.Game(config);

