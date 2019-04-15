/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene
{
    constructor()
    {
        super();
        this.displayTangram = true;
        this.displayUnitCube = true;
    }
    
    init(application) 
    {
        super.init(application);
        this.initCameras();
        this.initLights();
        
        //Background color
        this.gl.clearColor(0.0, 0.0, 0.1, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        
        //Initialize scene objects
        //Only axis, tangram and unitcube are essential  
        this.axis = new CGFaxis(this);
        this.diamond = new MyDiamond(this);
        this.triangle = new MyTriangle(this);
        this.parallelogram = new MyParallelogram(this);
        this.trianglebig = new MyTriangleBig(this);
        this.trianglesmall = new MyTriangleSmall(this);
        this.tangram = new MyTangram(this);
        this.unitcube = new MyUnitCube(this);
        
        
        //Objects connected to MyInterface
        this.scaleFactor = 0.5;
        
        //From previous exercises, unnecessary
        this.displayAxis = true;
        this.displayDiamond = false;
        this.displayTriangle = false;
        this.displayParallelogram = false;
        this.displayTriangleBig = false;
        this.displayTriangleSmall = false;
        
    }
    initLights()
    {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    
    initCameras()
    {
        this.camera = new CGFcamera(0.4, 0.1, 500,
        vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    
    setDefaultAppearance()
    {
        this.setAmbient(1, 1, 1, 1.0);
        this.setDiffuse(1, 0.6, 0.6, 1.0);
        this.setSpecular(1, 1, 1, 1.0);
        this.setShininess(10.0);
    }
    
    setColor(R, G, B, Alpha, Beta)
    {
        this.setAmbient(R, G, B, Alpha);
        this.setDiffuse(R, G, Alpha, Alpha);
        this.setSpecular(R, G, B, Alpha);
        this.setShininess(Beta);
    }
    
    display()
    {      
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);         // ---- BEGIN Background, camera and axis setup
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);          // Clear image and depth buffer everytime we update the scene
        this.updateProjectionMatrix();                                               // Initialize Model-View matrix as identity (no transformation)
        this.loadIdentity();    
        this.applyViewMatrix();                                                      // Apply transformations corresponding to the camera position relative to the origin
        this.setDefaultAppearance();
        if (this.displayAxis) this.axis.display();                                   // Draw axis

        this.translate(2.5, 0, 2.5);


        this.pushMatrix();
        this.translate(0.5, -.251, 0.50);                                            //The extra -0.01 is for the light blue face not to appear on top of the tangram
        this.scale(6, 0.5, 6);
        this.setColor(0.2, 1, 1, 1, 20);
        if(this.displayUnitCube) this.unitcube.display();

        this.popMatrix();
        this.pushMatrix();

        this.translate(c, 0, c)
        this.rotate(-Math.PI/2, 1, 0, 0);
        if(this.displayTangram) this.tangram.display();
        
        this.popMatrix();
        this.pushMatrix();
    
    }
    // ---- END Primitive drawing section
}    