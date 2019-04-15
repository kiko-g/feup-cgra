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
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        
        this.gui = new dat.GUI();
        //this.gui.add(this.scene, 'faceNr', 3, 400, 1).name('Number of Faces').onChange();
        
        var obj = this;

        return true;
    }
}