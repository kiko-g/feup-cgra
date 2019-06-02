/**
 * MyInterface
 * @constructor
 */
class MyInterface extends CGFinterface
{
    constructor() { super(); }
    init(application)
    {
        super.init(application);
        // call CGFinterface init
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        var obj = this;
        
        this.gui = new dat.GUI();
        this.gui.add(this.scene, 'enableTex').name('Enable Textures');
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        // this.gui.add(this.scene, 'scaleFactor', -30, 30).onChange(this.scene.onScaleFactorChanged.bind(this.scene));
        // this.gui.add(this.scene, 'speedFactor', -5, 5).onChange(this.scene.onScaleFactorChanged.bind(this.scene));
        
        // this.initKeys();
        return true;
    }
    
    initKeys()
    {
        this.scene.gui=this;                // create reference from the scene to the GUI
        this.processKeyboard=function(){};  // disable the processKeyboard function
        this.activeKeys={};                 // create a named array to store which keys are being pressed
    }
    
    processKeyDown(event)
    {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    };
    
    processKeyUp(event)
    {
        this.activeKeys[event.code]=false;  // called when a key is released, mark it as inactive in the array
    };
    
    isKeyPressed(keyCode)
    {
        return this.activeKeys[keyCode] || false; // returns true if a key is marked as pressed, false otherwise
    }
}