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
        this.enableTex = true;
        this.enableTextures(true);

        // Objects connected to MyInterface
        this.selectedObject = 3;
        this.selectedMaterial = 3;
        this.displayAxis = true;
        this.displayNormals = true;
        this.objectComplexity = 0.5;
        this.nearestVoxel = true;
        this.enLightsInterface = true;
        
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.house = new MyHouse(this, 'images/oak2.jpg', 'images/oak.jpg', 'images/door.png', 'images/window.jpg', 'images/pillar2.jpg');
        this.vh = new MyVoxelHill(this, 'images/mineSide.png', 'images/mineBottom.png', 'images/mineTop.png', 5);
        this.amb = new MyCubeMap(this, 30);
        this.ground = new MyQuad(this);

        this.M1 = new CGFappearance(this);
        this.M1.setAmbient(1, 1, 1, 1);
        this.M1.setDiffuse(1, 1, 1, 1);
        this.M1.setSpecular(1, 1, 1, 1);
        this.M1.setShininess(10);
        this.M1.loadTexture('images/background.png');
        this.M1.setTextureWrap('REPEAT', 'REPEAT');

        this.grasstex = new CGFappearance(this);
        this.grasstex.setAmbient(1, 1, 1, 1);
        this.grasstex.setDiffuse(1, 1, 1, 1);
        this.grasstex.setSpecular(1, 1, 1, 1);
        this.grasstex.setShininess(10);
        this.grasstex.loadTexture('images/grass.jpg');
        this.grasstex.setTextureWrap('REPEAT', 'REPEAT');
    }
    
    initLights()
    {
            this.lights[0].setPosition(0, 2, 5, 1);
            this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
            this.lights[0].enable();
            this.lights[0].update();
        
        }
        
        //15, 25, 15
        //30, 50, 30
        initCameras()
        {
            this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 40, 30), vec3.fromValues(0, 0, 0));
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
        var DTR = Math.PI/180;
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.updateProjectionMatrix();
        this.loadIdentity();
        this.applyViewMatrix();
        this.setDefaultAppearance();
        
        // ---- BEGIN Primitive drawing section =====================================================================================
        
        this.pushMatrix();
        //this.house.display();
        this.translate(0, c, 0);
        this.M1.apply();
        this.amb.display();
        
        this.popMatrix();
        this.pushMatrix();

        this.translate(0, 10, 0);
        this.scale(80, 80, 80);
        this.rotate(90*DTR, 1, 0, 0);
        this.grasstex.apply();
        this.ground.display();

        this.popMatrix();
        this.pushMatrix();
        
        this.translate(0, 10, 0);
        this.scale(2, 2, 2);
        this.axis.display();
        
        // ---- END Primitive drawing section =======================================================================================
        if(this.enableTex) this.enableTextures(true);
        else this.enableTextures(false);
    }
    enableNormalViz()
    {
        this.amb.enableNormalViz();
    }
}