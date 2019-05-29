/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyBird extends CGFobject 
{
    // This is a flying duck :)
    constructor(scene, headT, mainT, wingsT, noseT, eyesT, white)
    {
        super(scene);
        this.birdbody   = new MyBirdBody(scene, 20, mainT);
        this.head       = new MyBirdHead(scene, 20, headT, eyesT, white);
        this.wing       = new MyQuad(scene);
        this.wing2      = new MyTriangle(scene);
        this.tail       = new MyPyramid(scene, 8, 1);
        this.mainBirdTex    = mainT;
        this.headTex        = headT;
        this.wingsTex       = wingsT;
        this.noseTex        = noseT;
        this.init();
    }

    init()
    {
        this.headtex = new CGFappearance(this.scene);
        this.headtex.setAmbient(1, 1, 1, 1);
        this.headtex.setDiffuse(1, 1, 1, 1);
        this.headtex.setSpecular(1, 1, 1, 1);
        this.headtex.setShininess(20);
        this.headtex.loadTexture(this.headTex);
        this.headtex.setTextureWrap('REPEAT', 'REPEAT');

        this.wingstex = new CGFappearance(this.scene);
        this.wingstex.setAmbient(1, 1, 1, 1);
        this.wingstex.setDiffuse(1, 1, 1, 1);
        this.wingstex.setSpecular(1, 1, 1, 1);
        this.wingstex.setShininess(20);
        this.wingstex.loadTexture(this.wingsTex);
        this.wingstex.setTextureWrap('REPEAT', 'REPEAT');

        this.mainbirdtex = new CGFappearance(this.scene);
        this.mainbirdtex.setAmbient(1, 1, 1, 1);
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
        var DTR = Math.PI / 180;
        var n1 = Math.sqrt(2);
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.scale(1.5, 0.7, 1);
        this.mainbirdtex.apply();               //BODY TEX
        this.birdbody.display();                //DISPLAY BODY
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.1, 0);
        this.scene.scale(0.8, 0.8, 0.8);
        this.head.display();                    //DISPLAY HEAD 
        this.scene.popMatrix();                 //Has its own texture inside "MyBirdHead.js"

        this.scene.pushMatrix();
        this.scene.translate(0.2, 1.2, 1.2);
        this.scene.rotate(-DTR * 105, 1, 0, 0);
        this.mainbirdtex.apply();              
        this.wing.display();                    //DISPLAY RIGHT WING 1
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, 1.2, -1.2);
        this.scene.rotate(-DTR * 75, 1, 0, 0);
        this.mainbirdtex.apply();
        this.wing.display();                    //DISPLAY LEFT WING 1
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, 1.33, 1.67);
        this.scene.scale(0.35, 0.5, 0.8);
        this.scene.rotate(-DTR * 90, 0, 1, 0);
        this.scene.rotate(-DTR * 90, 1, 0, 0);
        this.wingstex.apply();
        this.wing2.display();                   //DISPLAY RIGHT WING 2
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, 1.33, -1.67);
        this.scene.scale(0.35, 0.5, 0.8);
        this.scene.rotate(DTR * 90, 0, 1, 0);
        this.scene.rotate(DTR * 90, 1, 0, 0);
        this.wingstex.apply();
        this.wing2.display();                   //DISPLAY LEFT WING 2
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.4, 1, 0);
        this.scene.scale(0.75, 0.15, 0.15);
        this.scene.rotate(DTR * 90, 0, 0, 1);
        this.headtex.apply();
        this.tail.display();                    //DISPLAY TAIL
        this.scene.popMatrix();
        /*
        */
    }

    enableNormalViz()
    {
        this.cube.enableNormalViz();
    }
}