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
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'enableTex').name('Enable Textures');
        //this.gui.add(this.scene, 'day_night').name('Toggle day/night').onChange(this.scene.initLights.bind(this.scene));
        return true;
    }
}