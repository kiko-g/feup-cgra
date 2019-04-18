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
        this.day_night = false;

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.house = new MyHouse(this, 'images/oak2.jpg', 'images/oak.jpg', 'images/door.png', 'images/window.jpg', 'images/pillar2.jpg');
        this.vh1 = new MyVoxelHill(this, 'images/mineSide.png', 'images/mineBottom.png', 'images/mineTop.png', 5);
        this.vh2 = new MyVoxelHill(this, 'images/mineSide.png', 'images/mineBottom.png', 'images/mineTop.png', 7);
        this.amb = new MyCubeMap(this);
        this.ground = new MyGround(this);
        this.treegroup = new MyTreeGroupPatch(this, 4, 1, 5, 3, 'images/wood.jpg', 'images/leaves2.jpg');
        this.treerow = new MyTreeRowPatch(this, 4, 1, 5, 3, 'images/wood.jpg', 'images/leaves2.jpg');
        this.fire = new MyCone(this, 7, 0.7, 0.7);
        this.seats = new MyUnitCubeQuad(this, 'images/oak2.jpg', 'images/mineBottom.png', 'images/oak.jpg');
        this.campfire = new MyUnitCubeQuad(this, 'images/stone.jpg', 'images/stone.jpg', 'images/stone.jpg');
        
        //Initializing Materials
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

        this.groundtex = new CGFappearance(this);
        this.groundtex.setAmbient(1, 1, 1, 1);
        this.groundtex.setDiffuse(1, 1, 1, 1);
        this.groundtex.setSpecular(1, 1, 1, 1);
        this.groundtex.setShininess(10);
        this.groundtex.loadTexture('images/grass.jpg');
        this.groundtex.setTextureWrap('REPEAT', 'REPEAT');

        this.firetex = new CGFappearance(this);
        this.firetex.setAmbient(1, 1, 1, 1);
        this.firetex.setDiffuse(1, 1, 1, 1);
        this.firetex.setSpecular(1, 1, 1, 1);
        this.firetex.setShininess(10);
        this.firetex.loadTexture('images/fire.jpg');
        this.firetex.setTextureWrap('REPEAT', 'REPEAT');

        this.stonetex = new CGFappearance(this);
        this.stonetex.setAmbient(1, 1, 1, 1);
        this.stonetex.setDiffuse(1, 1, 1, 1);
        this.stonetex.setSpecular(1, 1, 1, 1);
        this.stonetex.setShininess(10);
        this.stonetex.loadTexture('images/stone.jpg');
        this.stonetex.setTextureWrap('REPEAT', 'REPEAT');
    }


    initLights()
    {
        this.setGlobalAmbientLight(0.15, 0.15, 0.15, 1);
        if(this.day_night)
        {
            //SUNLIGHT
            this.lights[0].setPosition(20, 15, -20, 1);
            this.lights[0].setAmbient(0.3, 0.3, 0.3, 1);
            this.lights[0].setDiffuse(1, 1, 1, 1);
            this.lights[0].setSpecular(1, 1, 1, 1);
            this.lights[0].enable();
            this.lights[0].update();
            this.lights[0].setLinearAttenuation(1);

            this.lights[1].setPosition(20, 15, 20, 0);
            this.lights[1].setAmbient(0.3, 0.3, 0.3, 1);
            this.lights[1].setDiffuse(1, 1, 1, 1);
            this.lights[1].setSpecular(1, 1, 1, 1);
            this.lights[1].enable();
            this.lights[1].update();
            this.lights[1].setLinearAttenuation(1);


        }

        else
        {
            //MOONLIGHT
            this.lights[0].setPosition(20, 15, -20, 1);
            this.lights[0].setAmbient(0, 0, 0, 1);
            this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
            this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
            this.lights[0].enable();
            this.lights[0].update();
            this.lights[0].setLinearAttenuation(1);

            this.lights[1].setPosition(20, 15, 20, 0);
            this.lights[1].setAmbient(0.03, 0.03, 0.03, 1);
            this.lights[1].setDiffuse(0, 0, 0, 1.0);
            this.lights[1].setSpecular(0, 0, 0, 1.0);
            this.lights[1].enable();
            this.lights[1].update();
            this.lights[1].setLinearAttenuation(1);

            //CAMPFIRE LIGHT
            this.lights[2].setPosition(14, 0.5, 8, 1);
            this.lights[2].setDiffuse(1, 1, 1, 1);
            this.lights[2].setSpecular(1, 1, 1, 1);
            this.lights[2].enable();
            this.lights[2].update();

            this.lights[3].setPosition(16, 0.5, 10, 1);
            this.lights[3].setDiffuse(1, 1, 1, 1);
            this.lights[3].setSpecular(1, 1, 1, 1);
            this.lights[3].enable();
            this.lights[3].update();
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
        this.pushMatrix(); 
        this.scale(2, 2, 2);
        this.axis.display();
        this.setDefaultAppearance();
        
        this.lights[0].update();
        this.lights[1].update();
        this.lights[2].update();
        this.lights[3].update();

        // ---- BEGIN Primitive drawing section =====================================================================================
        
        this.popMatrix();
        this.pushMatrix(); 

        //DISPLAY CENTER HOUSE (NEEDED)
        this.scale(1, 0.7, 1);
        this.translate(0, 0, 0);
        this.house.display();
        this.popMatrix();
        this.pushMatrix();

        //DISPLAY OUTSIDE SEATS
        this.translate(18, 0, 10);
        this.seats.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(18, 0, 8);
        this.seats.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(12, 0, 10);
        this.seats.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(12, 0, 8);
        this.seats.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(14, 0, 6);
        this.seats.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(16, 0, 6);
        this.seats.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(14, 0, 12);
        this.seats.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(16, 0, 12);
        this.seats.display();
        this.popMatrix();
        this.pushMatrix();
        
        
        // --- DRAW HOUSE
        this.scale(0.9, 0.9, 0.9);
        this.translate(-3, 0, -32);
        this.house.display();
        this.popMatrix();
        this.pushMatrix();

        // DRAW TREE GROUPS
        this.translate(-36, 0, -12);
        this.scale(0.5, 0.5, 0.5);
        this.treegroup.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(28, 0, -12);
        this.scale(0.5, 0.5, 0.5);
        this.treegroup.display();
        this.popMatrix();
        this.pushMatrix();

        // DRAW TREE ROWS
        this.translate(-8, 0, -36);
        this.scale(0.5, 0.5, 0.5);
        this.rotate(0, 0, 1, 0);
        this.treerow.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(7, 0, -18); 
        this.scale(0.5, 0.5, 0.5);
        this.rotate(90 * DTR, 0, 1, 0);
        this.treerow.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-8, 0, -18);
        this.scale(0.5, 0.5, 0.5);
        this.rotate(90 * DTR, 0, 1, 0);
        this.treerow.display();

        // VOXEL 1
        this.popMatrix();
        this.pushMatrix();
        this.translate(-37, 0, -30);
        this.rotate(15 * DTR, 0, 1, 0)
        this.vh2.display();
                
        // VOXEL 2
        this.popMatrix();
        this.pushMatrix();
        this.translate(25, 0, -35);
        this.rotate(-15 * DTR,0, 1, 0)
        this.vh2.display();
        
        // CAMPFIRE
        this.popMatrix();
        this.pushMatrix();
        this.translate(15.5, 0.21, 9.5);
        this.scale(1.2, 1.4, 1.2);
        this.firetex.apply();
        if(!this.day_night) this.fire.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(14.5, 0, 8.5);
        this.scale(2, 0.2, 2);
        this.stonetex.apply();
        this.campfire.display();
        
        // GROUND
        this.popMatrix();
        this.pushMatrix();
        this.rotate(90 * DTR, 1, 0, 0);         // (ANGLE, X, Y, Z) --> Angle and around which axis
        this.scale(c*2,c*2,c*2);                // c is a global variable, represents hald the side of the huge cube
        this.groundtex.apply();
        this.ground.display(); 

        this.popMatrix();
        this.pushMatrix(); 

        // CUBE MAP
        this.translate(0, 30, 0);
        if(this.day_night) this.McubeDay.apply();
        else this.McubeNight.apply();
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