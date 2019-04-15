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

        //Background color
        this.gl.clearColor(0, 0, 0.1, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        

        //, 'images/bg7.jpg', 'images/bg7.jpg'
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        //TREE: Trunk H, Trunk R, TreeTop H, TreeTop R
        this.tree = new MyTree(this, 2, 0.4, 1.5, 0.8);

        // Objects connected to MyInterface
        this.selectedObject = 3;
        this.selectedMaterial = 3;
        this.displayAxis = true;
        this.displayNormals = true;
        this.objectComplexity = 0.5;

        this.mat = new CGFappearance(this);
        this.mat.setAmbient(0.4, 0.3, 0.2, 1); this.mat.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mat.setSpecular(0.2, 0.4, 0.5, 1); this.mat.setShininess(10.0);
        this.mat.loadTexture('images/moussa.jpg');
        this.mat.setTextureWrap('REPEAT', 'REPEAT');
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
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance()
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
        this.updateProjectionMatrix();          // Initialize Model-View matrix as identity (no transformation)
        this.loadIdentity();
        this.applyViewMatrix();                 // Apply transformations corresponding to the camera position relative to the origin
        
        this.axis.display();                    // Draw axis
        this.setDefaultAppearance();            //Apply default appearance
        
        // ---- BEGIN Primitive drawing section

        this.mat.apply();
        this.tree.display();
        //this.tree.display();      
        
        
        // ---- END Primitive drawing section
    }
}