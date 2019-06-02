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
        this.speed = 2.0;
        this.scale = 1.0;
        this.states = { casual: 0, flyDown: 1, flyUp: 2, stopped: 3 }
        //stopped case works like a reset but in a different position
        this.x = x0; //set
        this.y = y0; //set
        this.z = z0; //set
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
        
        //helpful movement variables
        this.rate = 360 * DTR / (1000 / scene.msNumber);
        this.lastUpdate = 0;
        this.targetRadius = 2;
        this.alpha = 0;
        this.init();
        this.resetBird();
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
    display()
    {
        var r = this.radius;
        this.scene.pushMatrix();
        this.scene.translate(-this.x0, this.y0, this.z0);         // y0 = 5+3 = 8 (ground height is 5)
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        //DISPLAYING BODY
        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);          //RECENTER (Applied to all)
        this.scene.scale(1.4, 0.8, 1);
        this.scene.rotate(90 * DTR, 1, 0, 0);   
        this.mainbirdtex.apply();               //BODY TEX
        this.belly.display();                   //Semisphere, one half of the belly
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.scale(1.4, 0.8, 1);
        this.scene.rotate(-90 * DTR, 1, 0, 0);
        this.scene.rotate(180 * DTR, 0, 0, 1);
        this.mainbirdtex.apply();               //BODY TEX
        this.belly.display();                   //Semisphere, the other half of the belly
        this.scene.popMatrix();
        
        //DISPLAYING HEAD 
        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.translate(1.25, 0.4, 0);
        this.scene.scale(0.9, 0.9, 0.9);
        this.headtex.apply();                   //head main texture
        this.mainhead.display();                //cilinder, head 
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.translate(1.25, 1.03, 0);
        this.scene.scale(0.9, 0.9, 0.9);
        this.scene.scale(r, 0.25, r);
        this.scene.rotate(-90 * DTR, 1, 0, 0);
        this.headtex.apply();                   //head main texture
        this.headtop.display();                 //semi sphere, top of the head
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.translate(1.25, 0.4, 0);
        this.scene.scale(0.9, 0.9, 0.9);
        this.scene.scale(r, r, r);
        this.scene.rotate(90 * DTR, 1, 0, 0);
        this.headtex.apply();                   //head main texture
        this.neck.display();                    //circle to cover head beneath
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.translate(1.65, 1.0, 0.28);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.scale(0.8, 0.8, 0.8);
        this.scene.rotate(-DTR * 90, 0, 0, 1);
        this.eye.display();                     //DISPLAY FIRST EYE
        this.scene.popMatrix();                 //Eye has its own textures (CUBE)
        
        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.translate(1.65, 1.0, -0.38);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.scale(0.8, 0.8, 0.8);
        this.scene.rotate(-DTR * 90, 0, 0, 1);
        this.eye.display();                     //DISPLAY SECOND EYE
        this.scene.popMatrix();                 //Eye has its own textures (CUBE)
        
        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.translate(1.8, 0.75, 0);
        this.scene.scale(0.24, 0.14, 0.14);
        this.scene.scale(0.8, 0.8, 0.8);
        this.scene.rotate(-DTR * 90, 0, 0, 1);
        this.nosetex.apply();                   //NOSE TEX
        this.nose.display();                    //DISPLAY NOSE
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.translate(-1.3, 0, 0);
        this.scene.scale(0.6, 0.1, 0.1);
        this.scene.rotate(DTR * 90, 0, 0, 1);
        this.tailtex.apply();                   //TAIL TEX
        this.tail.display();                    //DISPLAY TAIL
        this.scene.popMatrix();
        
        //DISPLAYING WINGS
        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.translate(0.2, 0.2, 1.2);
        this.scene.scale(0.8, 0.8, 0.8);
        this.scene.rotate(-DTR * 105, 1, 0, 0);
        this.mainbirdtex.apply();               //BODY TEX
        this.wing.display();                    //DISPLAY RIGHT WING 1 (FRONT VIEW)
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.translate(0.2, 0.2, -1.2);
        this.scene.scale(0.8, 0.8, 0.8);
        this.scene.rotate(-DTR * 75, 1, 0, 0);
        this.mainbirdtex.apply();               //BODY TEX
        this.wing.display();                    //DISPLAY LEFT WING 1 (FRONT VIEW)
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.translate(0.2, 0.3, 1.58);
        this.scene.scale(0.354, 0.5, 0.8);
        this.scene.scale(0.8, 0.8, 0.8);
        this.scene.rotate(-DTR * 90, 0, 1, 0);
        this.scene.rotate(-DTR * 90, 1, 0, 0);
        this.wingstex.apply();                  //Texture for the outside part of the wing
        this.rightwing2.display();              //DISPLAY RIGHT WING 2 (FRONT VIEW)
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.translate(0.2, 0.3, -1.58);
        this.scene.scale(0.354, 0.5, 0.8);
        this.scene.scale(0.8, 0.8, 0.8);
        this.scene.rotate(DTR * 90, 0, 1, 0);
        this.scene.rotate(DTR * 90, 1, 0, 0);
        this.wingstex.apply();                  //Texture for the outside part of the wing
        this.leftwing2.display();               //DISPLAY LEFT WING 2 (FRONT VIEW)
        this.scene.popMatrix();
    }
    // END OF DISPLAY
    
    updateBird(t)
    {
        if (t - this.lastUpdate >= 15) // +/- 67 updates per sec (basically FPS) 
        { 
            this.x += this.speed * Math.sin(this.angle);
            this.z += this.speed * Math.cos(this.angle);
            
            switch(this.currentState)
            {
                case this.states.casual: //case 0
                {
                    this.wobbleCoeficient += this.wobbleRate;
                    this.wobbleCoeficient %= 2 * Math.PI;
                    this.y += 0.05 * Math.sin(this.wobbleCoeficient);
                    break;
                }
                
                
                case this.states.flyDown:
                {
                    if (this.y <= 0)
                    {
                        this.currentState = this.states.flyUp;
                        this.y += 0.2;
                        this.scene.catchBranch();
                    }
                    else this.y -= 0.2;
                    break;
                }
                case this.states.flyUp: //case 2
                {
                     if (this.y >= 4) this.currentState = this.states.casual;
                     else this.y += 0.2;
                     break;
                }
            }
                
                this.wingFlapFactor += (this.speed + 0.5) * this.wingFlapMultiplier;
                this.wingFlapFactor %= 2 * Math.PI;
                this.leftWing.setAngle(this.wingFlapFactor);
                this.rightWing.setAngle(this.wingFlapFactor);
                this.lastUpdate = t;
            }
        }
        
    resetBird()
    {
        this.x = this.x0;
        this.y = this.y0;
        this.z = this.z0;
        this.currentState = this.states.casual;
        this.speed = 0;
        this.angle = 0;
        this.wingAddedAngle = 0;
        this.wingAmplitude = Math.PI * 7 / 48;
        this.wingFlapFactor = 0;
        this.wingFlapMultiplier = Math.PI / 6;
        this.branchPickedUp = null;
    }
    
    setWingAngle()
    {

    }

    flyDown()
    {
        this.currentState = this.states.flyDown;
    }

    standStill()
    {
        this.currentState = this.states.stopped;
    }

    setSpeed(newspeed) { this.speed = newspeed; }
    setScale(newscale) { this.scale = newscale; }

    turn(v)
    { 
        this.angle += v * this.speed;
    }
    
    accelerate(v)
    {
        var a = v * this.speed;
        this.speed += a;
        this.speed = clamp(this.speed, -Math.abs(a), Math.abs(a));
    }
    

    toggleTreeBranch()
    {
        if(this.pickedBranch != null) this.pickedBranch.display();
    }

    getBranch(thebranch)
    {
        this.branchPickedUp = theranch;
        this.branchPickedUp.x = 0;
        this.branchPickedUp.y = 10;
        this.branchPickedUp.z = -2;
        this.branchPickedUp.rot = 0 * DTR;
    }

    rmBranch()
    {
        this.branchPickedUp = null;
    }


}