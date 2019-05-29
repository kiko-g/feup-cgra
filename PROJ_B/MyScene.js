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

        
        //MyInterface
        this.day_night = true;

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
        this.amb = new MyCubeMap(this);

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

        //Objects connected to MyInterface
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
        }
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
        this.setAmbient(0.2, 1.0, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    update(t){
        this.checkKeys();
    }

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

        //Lights         
        this.lights[0].update();
        this.lights[1].update();


        // ---- BEGIN Primitive drawing section

        
        this.pushMatrix();
        //this.rotate(-0.5 * Math.PI, 1, 0, 0);
        this.bird.display();

        //this.pushMatrix();
        //this.rotate(-0.5*Math.PI, 1, 0, 0);
        //this.scale(10, 10, 10);
        //this.plane.display();
        //this.popMatrix();
        
        // CUBE MAP
        this.popMatrix();
        this.pushMatrix();
        this.translate(0, 30, 0);
        if(this.day_night) this.McubeDay.apply();
        else this.McubeNight.apply();
        this.amb.display();


        // ---- END Primitive drawing section
    }
}