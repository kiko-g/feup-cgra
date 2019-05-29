/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene
{
    constructor(){ super(); }
    init(application)
    {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.2, 0.3, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(50);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new Plane(this, 32);
        
        //(order for below tex declarations)
        //headT, mainT, wingsT, noseT, eyesT, white 
        this.bird = new MyBird(this, 
        "images/darkgreen.png",
        "images/body.jpg", 
        "images/brown.png",
        "images/nose.jpg",
        "images/eye.png",
        "images/white.png");
        
        //Objects connected to MyInterface
    }

    initLights()
    {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setAmbient(0.2, 0.2, 0.2, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras()
    {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance()
    {
        this.setAmbient(0.2, 1.0, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    
    update(t){  }

    display()
    {
        // ---- BEGIN Background, camera and axis setup
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Clear image and depth buffer everytime we update the scene
        // Initialize Model-View matrix as identity (no transformation)
        // Apply transformations corresponding to the camera position relative to the origin
        this.updateProjectionMatrix();
        this.loadIdentity();
        this.applyViewMatrix();
        // Draw axis
        //Apply default appearance
        this.axis.display();
        this.setDefaultAppearance();


        // ---- BEGIN Primitive drawing section

        
        this.pushMatrix();
        //this.rotate(-0.5 * Math.PI, 1, 0, 0);
        this.bird.display();
        this.popMatrix();

        //this.pushMatrix();
        //this.rotate(-0.5*Math.PI, 1, 0, 0);
        //this.scale(10, 10, 10);
        //this.plane.display();
        //this.popMatrix();


        // ---- END Primitive drawing section
    }
}