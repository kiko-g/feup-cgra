/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyBird extends CGFobject 
{
    // This is a flying duck :)
    constructor(scene, x0, y0, z0)
    {
        super(scene);
        this.radius = 0.6;
        this.birdspeed = 2.0;
        this.scaleF = 1.0;
        this.states = { casual: 0, flyDown: 1, flyUp: 2, stopped: 3 }
        this.x0 = x0;
        this.y0 = y0;
        this.z0 = z0;
        
        //init display members
        this.belly = new MySemiSphere(scene, 30, 6);
        this.wing = new MyQuad(scene);
        this.leftwing2 = new MyTriangle(scene);
        this.rightwing2 = new MyTriangle(scene);
        this.tail = new MyCone(scene, 30, 1, 1);
        this.mainhead = new MyCilinder(scene, 30, 0.7, this.radius);
        this.neck = new MyCircle(scene, 30);
        this.headtop = new MySemiSphere(scene, 30, 5);
        this.eye = new MyUnitCubeQuad(scene, "images/white.png", "images/white.png", "images/eye.png");
        this.nose = new MyCone(scene, 30, 2, 1);
        
        //get textures
        this.mainBirdTex = "images/body.jpg";
        this.headTex = "images/darkgreen.png";
        this.wingsTex = "images/brown.png";
        this.noseTex = "images/nose.jpg";
        this.tailTex = "images/tail.png";
        
        this.init();
        this.resetBird();

        //helpful movement variables
        this.birdrotangle = 0*DTR;
        this.floatVariation = 360 * DTR / (1000 / scene.msNumber); //wbble rate
        this.floatParameter = 0; //wobble coef
        this.lastUpdate = 0;
        this.targetRadius = 2;
    }

    init()
    {
        //REGULAR TEXTURES - MATERIALS
        this.nosetex = new CGFappearance(this.scene);
        this.nosetex.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.nosetex.setDiffuse(1., 1., 1., 1.);
        this.nosetex.setSpecular(1., 1., 1., 1.);
        this.nosetex.setShininess(20);
        this.nosetex.loadTexture(this.noseTex);
        this.nosetex.setTextureWrap('REPEAT', 'REPEAT');

        this.tailtex = new CGFappearance(this.scene);
        this.tailtex.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.tailtex.setDiffuse(1., 1., 1., 1.);
        this.tailtex.setSpecular(1., 1., 1., 1.);
        this.tailtex.setShininess(20);
        this.tailtex.loadTexture(this.tailTex);
        this.tailtex.setTextureWrap('REPEAT', 'REPEAT');

        this.headtex = new CGFappearance(this.scene);
        this.headtex.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.headtex.setDiffuse(1, 1, 1, 1);
        this.headtex.setSpecular(1, 1, 1, 1);
        this.headtex.setShininess(20);
        this.headtex.loadTexture(this.headTex);
        this.headtex.setTextureWrap('REPEAT', 'REPEAT');

        this.wingstex = new CGFappearance(this.scene);
        this.wingstex.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.wingstex.setDiffuse(1, 1, 1, 1);
        this.wingstex.setSpecular(1, 1, 1, 1);
        this.wingstex.setShininess(20);
        this.wingstex.loadTexture(this.wingsTex);
        this.wingstex.setTextureWrap('REPEAT', 'REPEAT');

        this.mainbirdtex = new CGFappearance(this.scene);
        this.mainbirdtex.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.mainbirdtex.setDiffuse(1, 1, 1, 1);
        this.mainbirdtex.setSpecular(1, 1, 1, 1);
        this.mainbirdtex.setShininess(20);
        this.mainbirdtex.loadTexture(this.mainBirdTex);
        this.mainbirdtex.setTextureWrap('REPEAT', 'REPEAT');
        //END OF REGULAR TEXTURES DEFINITION
    }
    

    // DISPLAY
    setWingAngle(v) { this.wingAngle = this.wingVariation * Math.cos(v); }
    displayOutsideLeftWing() //different methods, because these displays will vary, less confusing
    {
        this.scene.pushMatrix();
        this.scene.translate(0.2, 0.3, -1.58);
        this.scene.scale(0.354*0.8, 0.5*0.8, 0.8*0.8);
        this.scene.rotate(DTR * 90, 0, 1, 0);           //initial wing setup
        this.scene.rotate(DTR * 90, 1, 0, 0);           //initial wing setup
        this.scene.rotate(-this.wingAngle - Math.cos(this.flapwingF) * this.wingVariation, 0, 1, 0);     //actual wing movement
        this.wingstex.apply();                          //Texture for the outside part of the wing
        this.leftwing2.display();                       //DISPLAY LEFT WING 2 (FRONT VIEW)
        this.scene.popMatrix();
    }

    displayOutsideRightWing()
    {
        this.scene.pushMatrix();
        this.scene.translate(0.2, 0.3, 1.58);
        this.scene.scale(0.354*0.8, 0.5*0.8, 0.8*0.8);
        this.scene.rotate(-DTR * 90, 0, 1, 0);          //initial wing setup
        this.scene.rotate(-DTR * 90, 1, 0, 0);          //initial wing setup
        this.scene.rotate(this.wingAngle + Math.cos(this.flapwingF) * this.wingVariation, 0, 1, 0);     //actual wing movement
        this.wingstex.apply();                          //Texture for the outside part of the wing
        this.rightwing2.display();                      //DISPLAY RIGHT WING 2 (FRONT VIEW)
        this.scene.popMatrix();
    }

    togglePickedBranch() { if(this.branchPickedUp != null) this.branchPickedUp.display(); }
    
    display()
    {
        var r = this.radius;
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y+5, this.z);
        this.scene.scale(this.scaleF, this.scaleF, this.scaleF);
        this.scene.rotate(this.birdrotangle, 0, 1, 0);
        //DISPLAYING BODY
        this.scene.pushMatrix();
        this.scene.scale(1.4, 0.8, 1);
        this.scene.rotate(90 * DTR, 1, 0, 0);
        this.mainbirdtex.apply();               //BODY TEX
        this.belly.display();                   //Semisphere, one half of the belly
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.scale(1.4, 0.8, 1);
        this.scene.rotate(-90 * DTR, 1, 0, 0);
        this.scene.rotate(180 * DTR, 0, 0, 1);
        this.mainbirdtex.apply();               //BODY TEX
        this.belly.display();                   //Semisphere, the other half of the belly
        this.scene.popMatrix();
        
        //DISPLAYING HEAD 
        this.scene.pushMatrix();
        this.scene.translate(1.25, 0.4, 0);
        this.scene.scale(0.9, 0.9, 0.9);
        this.headtex.apply();                   //head main texture
        this.mainhead.display();              //cilinder, head 
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1.25, 1.03, 0);
        this.scene.scale(0.9, 0.9, 0.9);
        this.scene.scale(r, 0.25, r);
        this.scene.rotate(-90 * DTR, 1, 0, 0);
        this.headtex.apply();                   //head main texture
        this.headtop.display();                 //semi sphere, top of the head
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1.25, 0.4, 0);
        this.scene.scale(0.9*r, 0.9*r, 0.9*r);
        this.scene.rotate(90 * DTR, 1, 0, 0);
        this.headtex.apply();                   //head main texture
        this.neck.display();                    //circle to cover head beneath
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1.65, 1.0, 0.28);
        this.scene.scale(0.08, 0.08, 0.08);
        this.scene.rotate(-DTR * 90, 0, 0, 1);
        this.eye.display();                     //DISPLAY FIRST EYE
        this.scene.popMatrix();                 //Eye has its own textures (CUBE)
        
        this.scene.pushMatrix();
        this.scene.translate(1.65, 1.0, -0.38);
        this.scene.scale(0.08, 0.08, 0.08);
        this.scene.rotate(-DTR * 90, 0, 0, 1);
        this.eye.display();                     //DISPLAY SECOND EYE
        this.scene.popMatrix();                 //Eye has its own textures (CUBE)
        
        this.scene.pushMatrix();
        this.scene.translate(1.8, 0.75, 0);
        this.scene.scale(0.24*0.8, 0.14*0.8, 0.14*0.8);
        this.scene.rotate(-DTR * 90, 0, 0, 1);
        this.nosetex.apply();                   //NOSE TEX
        this.nose.display();                    //DISPLAY NOSE
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-1.3, 0, 0);
        this.scene.scale(0.6, 0.1, 0.1);
        this.scene.rotate(DTR * 90, 0, 0, 1);
        this.tailtex.apply();                   //TAIL TEX
        this.tail.display();                    //DISPLAY TAIL
        this.scene.popMatrix();
        
        //DISPLAYING WINGS
        this.scene.pushMatrix();
        this.scene.translate(0.2, 0.2, 1.2);
        this.scene.scale(0.8, 0.8, 0.8);
        this.scene.rotate(-DTR * 105, 1, 0, 0);
        this.mainbirdtex.apply();               //BODY TEX = INSIDE WING TEX
        this.wing.display();                    //DISPLAY RIGHT WING 1 (FRONT VIEW)
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0.2, 0.2, -1.2);
        this.scene.scale(0.8, 0.8, 0.8);
        this.scene.rotate(-DTR * 75, 1, 0, 0);
        this.mainbirdtex.apply();               //BODY TEX = INSIDE WING TEX
        this.wing.display();                    //DISPLAY LEFT WING 1 (FRONT VIEW)
        this.scene.popMatrix();
        
        this.displayOutsideRightWing();
        this.displayOutsideLeftWing();
        this.togglePickedBranch();
    }
    // END OF DISPLAY
    
    
    getBranch(thebranch)
    {
        this.branchPickedUp = thebranch;
        this.branchPickedUp.x = 0;
        this.branchPickedUp.y = 10;
        this.branchPickedUp.z = -2;
        this.branchPickedUp.rot = 0 * DTR;
    }
    
    flyDown() { this.currentState = this.states.flyDown; }
    rmBranch() { this.branchPickedUp = null; }
    updateBird(t) //switch structure for each situation
    {
        if (t - 10 >= this.lastUpdate) // 100 updates per sec (basically FPS) 
        { 
            this.z += this.birdspeed * (-Math.sin(this.birdrotangle));  //we dont exactly know why but we had to change the signal
            this.x += this.birdspeed * Math.cos(this.birdrotangle);     
            switch(this.currentState)
            {
                case this.states.casual: //case 0
                {
                    this.floatParameter += this.floatVariation;
                    this.floatParameter %= 360*DTR;
                    this.y += 0.02 * Math.cos(this.floatParameter);
                    break;
                }
                
                
                case this.states.flyDown: //case 1
                {
                    if(this.y >= 4)
                    {
                        this.currentState = this.states.flyUp;
                        this.y += 0.2;
                        this.scene.catchBranch();
                    }
                    else this.y -= 0.1;
                    break;
                }

                case this.states.flyUp: //case 2
                {
                    if (this.y >= 4) this.currentState = this.states.casual;
                    else this.y += 0.1;
                    break;
                }

                case this.states.stopped: //case 3
                {
                    this.birdspeed = 0;
                    this.wingAngle = 0;
                    this.wingVariation = 25 * DTR;
                    this.flapwingF = 0;
                    this.flapwingFreq = 30 * DTR;
                    break;
                }
            }
                
            this.flapwingF += (this.birdspeed + 0.5) * this.flapwingFreq;
            this.flapwingF %= 360*DTR;
            this.setWingAngle(this.flapwingF);
            this.lastUpdate = t;
        }
    }

    
    //birdspeed is different from speedFactor
    //setSpeed(v)
    setSpeedFactor(v) { this.speedFactor = v; } 
    setBirdScale(v){ this.scaleF = v; }
    fullStop() { this.currentState = this.states.stopped; }  // %
    holdStill(t)
    {   
        setSpeedFactor(0.5);
        this.currentState = this.states.casual;
    }   // &

    turn(v) { this.birdrotangle += v * this.speedFactor; }
    accelerate(v)
    {
        var a = v * this.speedFactor;
        this.birdspeed += a;
        this.birdspeed = Math.min(Math.max(this.birdspeed, -Math.abs(a)), Math.abs(a));
    }


    resetBird()
    {
        this.x = this.x0;
        this.y = this.y0;
        this.z = this.z0;
        this.currentState = this.states.casual;
        this.birdspeed = 0;
        this.birdrotangle = 0;
        this.wingAngle0 = 0 * DTR;
        this.wingAngle = 0*DTR;
        this.wingVariation = 20 * DTR;
        this.flapwingF = 0;
        this.flapwingFreq = 90 * DTR;   //measures "intensity" of flapping
        this.branchPickedUp = null;
    }
}