/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface
{
    constructor() { super(); }
    init(application)
    {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        
        //var obj = this;
        this.gui = new dat.GUI();
        
        var obj = this;
        
        this.gui.add(this.scene, 'day_night').name('Toggle day/night').onChange(this.scene.initLights.bind(this.scene));
        this.initKeys();
        return true;
    }
    
    initKeys() {// create reference from the scene to the GUI
        this.scene.gui=this;// disable the processKeyboard function
        this.processKeyboard=function(){};// create a named array to store which keys are being pressed
        
        this.activeKeys={};
    }
    processKeyDown(event) {// called when a key is pressed down// mark it as active in the array
        this.activeKeys[event.code]=true;
    };
    processKeyUp(event) {// called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    };
    isKeyPressed(keyCode) {// returns true if a key is marked as pressed, false otherwisereturn 
        this.activeKeys[keyCode] || false;
    }
}