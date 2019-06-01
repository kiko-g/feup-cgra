/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyBird extends CGFobject 
{
    // This is a flying duck :)
    constructor(scene, headT, mainT, wingsT, noseT, eyesT, tailT)
    {
        super(scene);
        this.radius = 0.6;
        this.body = new MyCilinder(scene, 30, 1, 1);
        this.bodycover = new MyCircle(scene, 30);
        this.belly = new MySemiSphere(scene, 30, 6);
        this.wing = new MyQuad(scene);
        this.wing2 = new MyTriangle(scene);
        this.tail = new MyCone(scene, 30, 1, 1);
        this.mainhead = new MyCilinder(scene, 30, 0.7, this.radius);
        this.neck = new MyCircle(scene, 30);
        this.headtop = new MySemiSphere(scene, 30, 5);
        this.eye = new MyUnitCubeQuad(scene, "images/white.png", "images/white.png", eyesT);
        this.nose = new MyCone(scene, 30, 2, 1);
        this.mainBirdTex = mainT;
        this.headTex = headT;
        this.wingsTex = wingsT;
        this.noseTex = noseT;
        this.tailTex = tailT;
        this.init();
    }

    init()
    {
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
    }

    initBuffers()
    {
        this.vertices   = [];
        this.indices    = [];
        this.normals    = [];
        this.texCoords  = [];
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    display()
    {
        var r = this.radius;
        var DTR = Math.PI / 180; //DEGREES TO RADIAN
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

        //DISPLAYING THE REST
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
        this.wing2.display();                   //DISPLAY RIGHT WING 2 (FRONT VIEW)
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.translate(0.2, 0.3, -1.58);
        this.scene.scale(0.354, 0.5, 0.8);
        this.scene.scale(0.8, 0.8, 0.8);
        this.scene.rotate(DTR * 90, 0, 1, 0);
        this.scene.rotate(DTR * 90, 1, 0, 0);
        this.wingstex.apply();                  //Texture for the outside part of the wing
        this.wing2.display();                   //DISPLAY LEFT WING 2 (FRONT VIEW)
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        this.scene.translate(-1.3, 0, 0);
        this.scene.scale(0.6, 0.1, 0.1);
        this.scene.rotate(DTR * 90, 0, 0, 1);
        this.tailtex.apply();
        this.tail.display();                    //DISPLAY TAIL
        this.scene.popMatrix();
    }

    enableNormalViz()
    {
        this.cube.enableNormalViz();
    }
}