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
        // call CGFinterface init ____ init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        var obj = this;
        this.gui = new dat.GUI();
        var settings_dropdown = this.gui.addFolder('Global Settings');
        var bird_dropdown = this.gui.addFolder('Bird Settings');
        
        settings_dropdown.open();
        settings_dropdown.add(this.scene, 'displayAxis').name('Display Axis');
        settings_dropdown.add(this.scene, 'enableTex').name('Enable Textures');
        settings_dropdown.add(this.scene, 'viewerPos', 0.0, 5.0).name('Viewer Distance (Position)');
        settings_dropdown.add(this.scene, 'sceneLight', 0.0, 1.0).name('Scene Amb Light');
        settings_dropdown.add(this.scene, 'msNumber', 5, 50).name('Miliseconds Update');
        // 10 ms ---> 200 FPS            50ms --->     20  FPS

        bird_dropdown.open();
        bird_dropdown.add(this.scene, 'birdScaleF', 0.5, 2.0).name('Bird Scale');
        bird_dropdown.add(this.scene, 'birdSpeedF', 0.1, 3.0).name('Bird Speed');
        
        this.initKeys();
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