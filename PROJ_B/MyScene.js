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
        this.gl.clearColor(0.0, 0.2, 0.3, 1.0); //Background color 
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        // ==== Objects for LS System (Trees)
        this.axiom = "X";
        this.ruleF = "FF"; 
        this.ruleX = "F[-X][X]F[-X]+FX";
        this.angle = 60.0;
        this.iterations = 2;
        this.scaleFactor = 1;
        this.lSystem = new MyLSPlant(this);

        this.doGenerate = function () {
            this.lSystem.generate(
                this.axiom,
                {
                    "F": [ "FF" ],
                    "X": [ "F[-X][X]F[-X]+X", "F[-X][X]+X", "F[+X]-X", "F[/X][X]F[\\\\X]+X", "F[\\X][X]/X", "F[/X]\\X", "F[^X][X]F[&X]^X", "F[^X]&X", "F[&X]^X" ]
                },
                this.angle,
                this.iterations,
                this.scaleFactor
            );
        }
        // do initial generation
        this.doGenerate();

        // ==== Initialize scene objects ====
        // headT, mainT wingsT, noseT, eyesT, tailT
        this.bird = new MyBird(this, "images/darkgreen.png", "images/body.jpg", "images/brown.png", "images/nose.jpg", "images/eye.png", "images/tail.png");
        this.axis = new CGFaxis(this);
        this.terrain = new MyTerrain(this);
        this.amb = new MyCubeMap(this);
        this.branch = new MyTreeBranch(this, "images/wood.jpg");
        this.house = new MyHouse(this, "images/oak2.jpg", "images/oak.jpg", "images/door.png", "images/window.jpg", "images/pillar2.jpg");
        this.nest = new MyNest(this, "images/nest.jpg", 5);
        //this.treegroup = new MyTreeGroupPatch(this);

        // ==== Objects connected to MyInterface
        this.enableTex = true;
        this.displayAxis = true;
        
        
        // ==== Initializing Materials
        this.McubeDay = new CGFappearance(this);
        this.McubeDay.setAmbient(1, 1, 1, 1);
        this.McubeDay.setDiffuse(1, 1, 1, 1);
        this.McubeDay.setSpecular(1, 1, 1, 1);
        this.McubeDay.setShininess(10);
        this.McubeDay.loadTexture("images/cubemaptexday.png");
        this.McubeDay.setTextureWrap('REPEAT', 'REPEAT');

        // ========== END INIT
        // ========== END INIT
        // ========== END INIT
    }

    initLights()
    {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setAmbient(0.1, 0.1, 0.1, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(0, 0, 0, 1);
        this.lights[1].setAmbient(0.05, 0.05, 0.05, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[1].enable();
        this.lights[1].update();
    }

    initCameras()
    {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
    }

    checkKeys(){
        var text = "Keys pressed: ";
        var keysPressed=false;

        if (this.gui.isKeyPressed("KeyW")){
            text+= " W ";
            keysPressed=true;
        }
        
        if (this.gui.isKeyPressed("KeyS")){
            text+= " S ";
            keysPressed=true;
        }
        if (keysPressed)
            console.log(text);

    }

    setDefaultAppearance()
    {
        this.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(100.0);
    }

    update(t){
        this.checkKeys();
    }

    display()
    {
        // ---- BEGIN Background, camera and axis setup 
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.updateProjectionMatrix();
        this.loadIdentity();            // Initialize Model-View matrix as identity (no transformation)
        this.applyViewMatrix();         // Apply transformations corresponding to the camera position relative to the origin
        this.pushMatrix();
        this.translate(0, 5, 0);                         // VIEW AXIS MORE CLEARLY
        this.scale(2, 2, 2);                             // LARGER AXIS
        if(this.displayAxis) this.axis.display();        // DRAW AXIS
        this.popMatrix();
        this.setDefaultAppearance();    //Apply default appearance
        
        
        // ---- BEGIN Primitive drawing section =====================================================================================
        var DTR = Math.PI / 180;
        
        this.pushMatrix();
        this.translate(0, 30, 0);
        this.McubeDay.apply();
        this.amb.display();                 //DISPLAY CUBE MAP (AMBIENT)
        this.popMatrix();
        
        this.pushMatrix();
        this.translate(-10, 10, -10);
        this.bird.display();                //DISPLAY BIRD
        this.popMatrix();
        
        this.pushMatrix();
        this.scale(c*2, c*2, c*2); //c is defined inside MyCubeMap and represents half of the side of the cube
        this.rotate(-90 * DTR, 1, 0, 0);
        this.terrain.display();             //DISPLAY TERRAIN
        this.popMatrix();

        this.pushMatrix();
        this.translate(-17, 3.2, -3);
        this.scale(0.7, 0.7, 0.8);
        this.rotate(90*DTR, 0, 1, 0);
        this.house.display();              //DISPLAY HOUSE
        this.popMatrix();

        this.pushMatrix();
        this.translate(15, 3.2, -3);
        this.scale(0.7, 0.7, 0.8);
        this.rotate(90*DTR, 0, 1, 0);
        //this.treegroup.display();              //DISPLAY FORREST
        this.popMatrix();

        //DISPLAY THE 3 BACK BRANCHES 
        var h = 2.7; //branch height
        this.pushMatrix();
        this.translate(17, h, 12);
        this.rotate(90*DTR, 0, 1, 0);
        this.branch.display();
        this.translate(0.4, 0.1, 2.8);
        this.rotate(60*DTR, 0, 1, 0);
        this.branch.display();
        this.rotate(30 * DTR, 0, 1, 0);
        this.translate(-1.1, 0.1, 2.8);
        this.branch.display(); 
        this.popMatrix();

        //DISPLAY THE 2 FRONT BRANCHES 
        this.pushMatrix(); 
        this.translate(17, h, 11);
        this.rotate(120 * DTR, 0, 1, 0);
        this.branch.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(19, h, 9.5);
        this.rotate(150 * DTR, 0, 1, 0);
        this.branch.display();
        this.popMatrix();

        //DISPLAYING NEST
        this.pushMatrix();
        this.translate(17, h, 11);
        this.nest.display();
        this.popMatrix();

        
        

        // ---- END Primitive drawing section =====================================================================================
        if (this.enableTex) this.enableTextures(true);
        else this.enableTextures(false);
    }

    enableNormalViz()
    {
        //this.amb.enableNormalViz();
    }
}