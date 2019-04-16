/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene
{
    constructor()
    {
        super();
    }
    init(application)
    {  
        super.init(application);
        this.initCameras();
        this.initLights();

        this.gl.clearColor(0, 0, 0.1, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        // Objects connected to MyInterface
        this.selectedObject = 3;
        this.selectedMaterial = 3;
        this.displayAxis = true;
        this.displayNormals = true;
        this.nearest = true;
        this.objectComplexity = 0.5;

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.house = new MyHouse(this, 'images/oak.jpg', 'images/birch.jpg', 'images/door.png', 'images/window.jpg');

    }

    initLights()
    {
        this.lights[0].setPosition(0, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras()
    {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 25, 15), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() //Pinkish appearance
    {
        this.setAmbient(0.9, 0.5, 0.5, 1);
        this.setDiffuse(0.9, 0.5, 0.5, 1);
        this.setSpecular(0.9, 0.5, 0.5, 1);
        this.setShininess(10.0);
    }

    display()
    {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.updateProjectionMatrix();
        this.loadIdentity();
        this.applyViewMatrix();
        this.axis.display();
        this.setDefaultAppearance();
        
        // ---- BEGIN Primitive drawing section =====================================================================================

        this.house.display();
        
        // ---- END Primitive drawing section =======================================================================================

        if (this.nearest) this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        else this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    }
}