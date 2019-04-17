/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface
{
    constructor()
    {
        super();
    }

    init(application)
    {
        // call CGFinterface init
        super.init(application);
        this.gui = new dat.GUI();
        var obj = this;
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        
        //Checkbox element in GUI
        this.gui.add(this.scene, 'nearestVoxel').name('Nearest for Voxel');
        this.gui.add(this.scene, 'enableTex').name('Enable Textures');



        return true;
    }
}