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

        this.day_night = true;

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.house = new MyHouse(this, 'images/oak2.jpg', 'images/oak.jpg', 'images/door.png', 'images/window.jpg', 'images/pillar2.jpg');
        this.vh1 = new MyVoxelHill(this, 'images/mineSide.png', 'images/mineBottom.png', 'images/mineTop.png', 5);
        this.vh2 = new MyVoxelHill(this, 'images/mineSide.png', 'images/mineBottom.png', 'images/mineTop.png', 7);
        this.amb = new MyCubeMap(this);
        this.ground = new MyQuad(this);
        this.treegroup1 = new MyTreeGroupPatch(this, 2, 1, 5, 3, 'images/wood.jpg', 'images/leaves.jpg');
        this.treegroup2 = new MyTreeGroupPatch(this, 2, 1, 5, 3, 'images/wood.jpg', 'images/leaves.jpg'); 
        this.treerow1 = new MyTreeRowPatch(this, 2, 1, 5, 3, 'images/wood.jpg', 'images/leaves.jpg');
        this.treerow2 = new MyTreeRowPatch(this, 2, 1, 5, 3 , 'images/wood.jpg', 'images/leaves.jpg'); 
        this.fire = new MyCone(this, 7, 0.7, 0.7);


        this.McubeDay = new CGFappearance(this);
        this.McubeDay.setAmbient(1, 1, 1, 1);
        this.McubeDay.setDiffuse(1, 1, 1, 1);
        this.McubeDay.setSpecular(1, 1, 1, 1);
        this.McubeDay.setShininess(10);
        this.McubeDay.loadTexture('images/cubemaptexday.png');
        this.McubeDay.setTextureWrap('REPEAT', 'REPEAT');

        this.McubeNight = new CGFappearance(this);
        this.McubeNight.setAmbient(1, 1, 1, 1);
        this.McubeNight.setDiffuse(1, 1, 1, 1);
        this.McubeNight.setSpecular(1, 1, 1, 1);
        this.McubeNight.setShininess(10);
        this.McubeNight.loadTexture('images/cubemaptexnight.png');
        this.McubeNight.setTextureWrap('REPEAT', 'REPEAT');

        this.M2 = new CGFappearance(this);
        this.M2.setAmbient(1, 1, 1, 1);
        this.M2.setDiffuse(1, 1, 1, 1);
        this.M2.setSpecular(1, 1, 1, 1);
        this.M2.setShininess(10);
        this.M2.loadTexture('images/mineTop.png');
        this.M2.setTextureWrap('REPEAT', 'REPEAT');

        this.M3 = new CGFappearance(this);
        this.M3.setAmbient(1, 1, 1, 1);
        this.M3.setDiffuse(1, 1, 1, 1);
        this.M3.setSpecular(1, 1, 1, 1);
        this.M3.setShininess(10);
        this.M3.loadTexture('images/fire.jpg');
        this.M3.setTextureWrap('REPEAT', 'REPEAT');
    }


    initLights()
    {
        if(this.day_night){ 
            //SUNLIGHT
            this.lights[0].setPosition(0, 2, 5, 1);
            this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
            this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
            this.lights[0].enable();
            this.lights[0].update();
        }
        else{
            //MOONLIGHT
            this.lights[0].setPosition(0, 2, 5, 1);
            this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
            this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
            this.lights[0].enable();
            this.lights[0].update();

            //CAMPFIRE LIGHT
            this.lights[0].setPosition(0, 2, 5, 1);
            this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
            this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
            this.lights[0].enable();
            this.lights[0].update();

        }

    }

    //15, 25, 15
    initCameras()
    {
        this.camera = new CGFcamera(0.8, 0.1, 500, vec3.fromValues(30, 50, 30), vec3.fromValues(0, 0, 0));
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
        var DTR = Math.PI/180; // DEG TO RAD
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
        this.pushMatrix(); 
        
        // --- DRAW HOUSE
        this.popMatrix();
        this.pushMatrix();
        this.M2.apply();
        this.scale(0.5,0.5,0.5);
        this.translate(15, 0, 20);
        this.house.display();

        // --- DRAW TREES
        this.popMatrix();
        this.pushMatrix();
        this.scale(0.5,0.5,0.5);
        this.translate(-8, 0, 20);
        this.treegroup1.display();

        this.popMatrix();
        this.pushMatrix();
        this.scale(0.5,0.5,0.5);
        this.translate(28, 0, 20);
        this.treegroup2.display();

        this.popMatrix();
        this.pushMatrix();
        this.scale(0.5,0.5,0.5);
        this.rotate(1,0, -75*DTR, 0);
        this.translate(0, 0, -30);
        this.treerow1.display();

        this.popMatrix();
        this.pushMatrix();
        this.scale(0.5,0.5,0.5);
        this.rotate(1,0, 75*DTR, 0);
        this.translate(-10, 0, 0); 
        this.treerow2.display();

        // --- DRAW VOXEL

        this.popMatrix();
        this.pushMatrix();
        this.translate(-20, 0, -6);
        this.vh1.display();

        
        this.popMatrix();
        this.pushMatrix();
        this.translate(30, 0, -15);
        this.rotate(1,0, -15*DTR, 0)
        this.vh2.display();

        // --- DRAW FIRE
        this.popMatrix();
        this.pushMatrix();
        this.translate(10, 0, 0);
        this.M3.apply();
        this.fire.display();


        // --- DRAW GROUND
        this.popMatrix();
        this.pushMatrix();
        this.M2.apply();
        this.rotate(90 * DTR,90 * DTR, 0, 0);
        this.scale(100,100,1);
        this.ground.display(); 
        // --- DRAW OUTSIDE CUBE
        this.popMatrix();
        this.pushMatrix(); 
        this.translate(0, 20,0);
        
        if(this.day_night)
            this.McubeDay.apply();
        else
            this.McubeNight.apply();

        this.amb.display();
        // ---- END Primitive drawing section =======================================================================================
        if(this.enableTex) this.enableTextures(true);
        else this.enableTextures(false);
    }
    enableNormalViz()
    {
        this.amb.enableNormalViz();
    }
}