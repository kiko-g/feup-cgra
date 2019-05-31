/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene
{
    constructor() { super(); }
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
        this.campfire_lights = false;

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.house = new MyHouse(this, 'images/oak2.jpg', 'images/oak.jpg', 'images/door.png', 'images/window.jpg', 'images/pillar2.jpg');
        this.vh1 = new MyVoxelHill(this, 'images/mineSide.png', 'images/mineBottom.png', 'images/mineTop.png', 5);
        this.vh2 = new MyVoxelHill(this, 'images/mineSide.png', 'images/mineBottom.png', 'images/mineTop.png', 7);
        this.amb = new MyCubeMap(this);
        this.ground = new MyGround(this);
        this.treegroupdark = new MyTreeGroupPatch(this, 4, 1, 5, 3, 'images/wood.jpg', 'images/leaves2.jpg', 0.15);
        this.treegrouplight = new MyTreeGroupPatch(this, 5, 1, 4, 3, 'images/wood2.jpg', 'images/leaves.jpg', 0.15);
        this.treerow = new MyTreeRowPatch(this, 4, 1, 5, 3, 'images/wood.jpg', 'images/leaves2.jpg', 0.15);
        this.fire = new MyCone(this, 7, 0.7, 0.7);
        this.seats = new MyUnitCubeQuad(this, 'images/oak2.jpg', 'images/mineBottom.png', 'images/oak.jpg');
        this.campfire = new MyUnitCubeQuad(this, 'images/stone.jpg', 'images/stone.jpg', 'images/stone.jpg');
        this.sidewalk = new MyUnitCubeQuad(this, 'images/pillar2.jpg', 'images/pillar2.jpg', 'images/pillar2.jpg');
        this.welcome = new MyUnitCubeQuad(this, 'images/oak2.jpg', 'images/oak2.jpg', 'images/welcome.jpg');
        this.water = new MyUnitCubeQuad2(this, 'images/water.jpg', 'images/water.jpg', 'images/water.jpg');
        this.tower = new MyTree(this, 5, 0.6, 1.5, 1, 'images/oak2.jpg', 'images/brick.jpg', 0);
        this.walls = new MyUnitCubeQuad(this, 'images/oak2.jpg', 'images/stone.jpg', 'images/oak.jpg');
        this.prism = new MyPrism(this, 5, 1);
        this.godlycube = new MyUnitCubeQuad(this, 'images/portugal.png', 'images/oak.jpg', 'images/default_eder.jpg');
        
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

        this.groundtexday = new CGFappearance(this);
        this.groundtexday.setAmbient(0.8, 0.8, 0.8, 1);
        this.groundtexday.setDiffuse(1, 1, 1, 1);
        this.groundtexday.setSpecular(1, 1, 1, 1);
        this.groundtexday.setShininess(10);
        this.groundtexday.loadTexture('images/grass.jpg');
        this.groundtexday.setTextureWrap('REPEAT', 'REPEAT');

        this.groundtexnight = new CGFappearance(this);
        this.groundtexnight.setAmbient(0.4, 0.4, 0.4, 1);
        this.groundtexnight.setDiffuse(1, 1, 1, 1);
        this.groundtexnight.setSpecular(1, 1, 1, 1);
        this.groundtexnight.setShininess(10);
        this.groundtexnight.loadTexture('images/grass.jpg');
        this.groundtexnight.setTextureWrap('REPEAT', 'REPEAT');

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

        this.watertex = new CGFappearance(this);
        this.watertex.setAmbient(1, 1, 1, 1);
        this.watertex.setDiffuse(0, 0, 0, 0);
        this.watertex.setSpecular(1, 1, 1, 1);
        this.watertex.setShininess(10);
        this.watertex.loadTexture('images/water.jpg');
        this.watertex.setTextureWrap('REPEAT', 'REPEAT');

        this.oaktex = new CGFappearance(this);
        this.oaktex.setAmbient(1, 1, 1, 1);
        this.oaktex.setDiffuse(0, 0, 0, 0);
        this.oaktex.setSpecular(1, 1, 1, 1);
        this.oaktex.setShininess(10);
        this.oaktex.loadTexture('images/oak2.jpg');
        this.oaktex.setTextureWrap('REPEAT', 'REPEAT');
    }


    initLights()
    {
        this.setGlobalAmbientLight(0.15, 0.15, 0.15, 1);
        if(this.day_night)
        {
            //SUNLIGHT
            this.lights[0].setPosition(20, 15, -20, 1);
            this.lights[0].setAmbient(0.1, 0.1, 0.1, 1);
            this.lights[0].setDiffuse(1, 1, 1, 1);
            this.lights[0].setSpecular(1, 1, 1, 1);
            this.lights[0].enable();
            this.lights[0].update();
            this.lights[0].setLinearAttenuation(1);

            this.lights[1].setPosition(20, 15, 20, 0);
            this.lights[1].setAmbient(0.1, 0.1, 0.1, 1);
            this.lights[1].setDiffuse(1, 1, 1, 1);
            this.lights[1].setSpecular(1, 1, 1, 1);
            this.lights[1].enable();
            this.lights[1].update();
            this.lights[1].setLinearAttenuation(1);
            
            //FOUNTAIN LIGHTS
            this.lights[2].setPosition(-36, 10, 0, 0);
            this.lights[2].setAmbient(0.2, 0.2, 0.2, 1);
            this.lights[2].setDiffuse(1, 1, 1, 1);
            this.lights[2].setSpecular(1, 1, 1, 1);
            this.lights[2].enable();
            this.lights[2].update();
            this.lights[2].setLinearAttenuation(0);

            this.lights[3].setPosition(28, 10, 0, 0);
            this.lights[3].setAmbient(0.2, 0.2, 0.2, 1);
            this.lights[3].setDiffuse(1, 1, 1, 1);
            this.lights[3].setSpecular(1, 1, 1, 1);
            this.lights[3].enable();
            this.lights[3].update();
            this.lights[3].setLinearAttenuation(0);
        }

        else
        {
            //MOONLIGHT
            this.lights[0].setPosition(20, 15, -20, 1);
            this.lights[0].setAmbient(0.05, 0.05, 0.05, 1);
            this.lights[0].setDiffuse(0, 0, 0, 1);
            this.lights[0].setSpecular(0, 0, 0, 1);
            this.lights[0].enable();
            this.lights[0].update();
            this.lights[0].setLinearAttenuation(1);

            this.lights[1].setPosition(20, 15, 20, 0);
            this.lights[1].setAmbient(0.05, 0.05, 0.05, 1);
            this.lights[1].setDiffuse(0, 0, 0, 1);
            this.lights[1].setSpecular(0, 0, 0, 1);
            this.lights[1].enable();
            this.lights[1].update();
            this.lights[1].setLinearAttenuation(1);

            //CAMPFIRE LIGHTS
            if(this.campfire_lights)
            {
                this.lights[2].setPosition(15, 0.5, 9, 1);       // Y --> 0.5
                this.lights[2].setAmbient(0.2, 0.2, 0.2, 1);
                this.lights[2].setDiffuse(1, 1, 1, 1);
                this.lights[2].setSpecular(0, 0, 0, 0);
                this.lights[2].enable();
                this.lights[2].update();
                this.lights[2].setLinearAttenuation(0);
            }
            else
            {
                this.lights[2].setPosition(14, 0.5, 8, 1);      // Y --> 0.5
                this.lights[2].setDiffuse(0, 0, 0, 0);
                this.lights[2].setSpecular(0, 0, 0, 0);
                this.lights[2].enable();
                this.lights[2].update();
                this.lights[2].setLinearAttenuation(0);

                // PORTUGAL CUBE LIGHTS
                this.lights[5].setPosition(-19, 11, 11, 0);
                this.lights[5].setAmbient(0.05, 0.05, 0.05, 1);
                this.lights[5].setDiffuse(0, 0, 0, 0);
                this.lights[5].setSpecular(0, 0, 0, 0);
                this.lights[5].enable();
                this.lights[5].update();
                this.lights[5].setLinearAttenuation(0);
            }

            //FOUNTAIN LIGHTS
            this.lights[3].setPosition(28, 10, 0, 0);
            this.lights[3].setAmbient(0.02, 0.02, 0.02, 1);
            this.lights[3].setDiffuse(0, 0, 0, 0);
            this.lights[3].setSpecular(0, 0, 0, 0);
            this.lights[3].enable();
            this.lights[3].update();
            this.lights[3].setLinearAttenuation(1);

            this.lights[4].setPosition(-36, 10, 0, 0);
            this.lights[4].setAmbient(0.02, 0.02, 0.02, 1);
            this.lights[4].setDiffuse(0, 0, 0, 0);
            this.lights[4].setSpecular(0, 0, 0, 0);
            this.lights[4].enable();
            this.lights[4].update();
            this.lights[4].setLinearAttenuation(1);

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
        this.lights[4].update();
        this.lights[5].update();

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
        this.treegroupdark.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(28, 0, -12);
        this.scale(0.5, 0.5, 0.5);
        this.treegroupdark.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(28, 0, 12);
        this.scale(0.5, 0.5, 0.5);
        this.treegrouplight.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-36, 0, 12);
        this.scale(0.5, 0.5, 0.5);
        this.treegrouplight.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(23, 0, 27);
        this.scale(0.5, 0.5, 0.5);
        this.treegrouplight.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-29, 0, 27);
        this.scale(0.5, 0.5, 0.5);
        this.treegrouplight.display();

        //DRAW FOUNTAINS
        this.popMatrix();
        this.pushMatrix();
        this.translate(28, 0, 0);
        this.scale(8, 0.3, 8);
        this.campfire.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-36, 0, 0);
        this.scale(8, 0.3, 8);
        this.campfire.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-35.5, 0.1, 0.5);
        this.scale(7, 0.3, 7);
        this.water.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(28.5, 0.1, 0.5);
        this.scale(7, 0.3, 7);
        this.watertex.apply();          //quite useless
        this.water.display();       
        // WATER is represented MyUnitCubeQuad2. This object
        // applies textures inside itself and has no diffuse
        // light, only specular and ambient

        // DRAW TREE ROWS
        this.popMatrix();
        this.pushMatrix();
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
        this.translate(-38, 0, -32);
        this.rotate(30 * DTR, 0, 1, 0)
        this.vh2.display();
                
        // VOXEL 2
        this.popMatrix();
        this.pushMatrix();
        this.translate(25, 0, -38);
        this.rotate(-30 * DTR,0, 1, 0)
        this.vh2.display();

        // VOXEL 3
        this.popMatrix();
        this.pushMatrix();
        this.translate(5, 0, 23);
        this.vh2.display();

        // VOXEL 4
        this.popMatrix();
        this.pushMatrix();
        this.translate(-15, 0, 23);
        this.vh2.display();
        
        // CAMPFIRE
        this.popMatrix();
        this.pushMatrix();
        this.translate(15.5, 0.21, 9.5);
        this.scale(1.2, 1.4, 1.2);
        this.firetex.apply();
        if(!this.day_night && this.campfire_lights) this.fire.display();
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
        this.scale(c*2,c*2,c*2);                // c is a global variable, represents half the side of the huge cube
        if(this.day_night) this.groundtexday.apply();
        else this.groundtexnight.apply();
        this.ground.display();

        //DRAW SIDEWALK
        this.popMatrix();
        this.pushMatrix();
        this.translate(-2.5, 0, -23.3);
        this.scale(5, 0.1, 8);
        this.sidewalk.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-2.5, 0.01, -19.3);
        this.scale(5, 0.1, 8);
        this.sidewalk.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(0, 0.02, -19.3);
        this.scale(5, 0.1, 8);
        this.sidewalk.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-5, 0.02, -19.3);
        this.scale(5, 0.1, 8);
        this.sidewalk.display();
        // DRAW WELCOME HOME RUG
        this.popMatrix();
        this.pushMatrix();
        this.translate(0.4, 0.09, -23.3);
        this.scale(1.8, 0.1, 1.2);
        this.welcome.display();

        // DRAW FORTRESS
        this.popMatrix();
        this.pushMatrix();
        this.translate(-20, 0, 15);
        this.tower.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-15, 0, 15);
        this.tower.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-15, 0, 10);
        this.tower.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-20, 0, 10);
        this.tower.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-20, 0, 10);
        this.scale(5, 4, 5);
        this.walls.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-17.5, 4, 12.5);
        this.scale(1, 6, 1);
        this.oaktex.apply();
        this.prism.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-19, 8, 11);
        this.scale(4, 3, 3);
        this.godlycube.display();


        // CUBE MAP
        this.popMatrix();
        this.pushMatrix();
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