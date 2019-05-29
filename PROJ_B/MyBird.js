/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBird extends CGFobject 
{
    constructor(scene, headT, mainT, wingsT, noseT, eyesT, white)
    {
        super(scene);
        this.birdbody = new MyBirdBody(scene, 20, mainT);
        this.head = new MyBirdHead(scene, 20, white);
        this.nose = new MyCone(scene, 7, 2, 1);
        this.eye = new MyUnitCubeQuad(scene, white, white, eyesT);
        this.wing = new MyQuad(scene);
        this.wing2 = new MyTriangle(scene);
        this.tail = new MyPyramid(scene, 8, 1);
        this.mainBirdTex = mainT;
        this.headTex = headT;
        this.wingsTex = wingsT;
        this.noseTex = noseT;
        this.toup = 1;
        this.init();
    }

    init()
    {
        this.nosetex = new CGFappearance(this.scene);
        this.nosetex.setAmbient(1, 1, 1, 1);
        this.nosetex.setDiffuse(1, 1, 1, 1);
        this.nosetex.setSpecular(1, 1, 1, 1);
        this.nosetex.setShininess(20);
        this.nosetex.loadTexture(this.noseTex);
        this.nosetex.setTextureWrap('REPEAT', 'REPEAT');

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
        this.scene.scale(2, 0.8, 1);
        this.mainbirdtex.apply();
        this.birdbody.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 1, 0.9);
        //this.scene.rotate(DTR * 90, 1, 0, 0);
        //this.scene.rotate(DTR * 90, 0, 0, 1);
        this.head.display();    //has its own texture inside "MyBirdHead.js"
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.15, 2, 0.3);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate(-DTR * 90, 0, 0, 1);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.15, 2, -0.4);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate(-DTR * 90, 0, 0, 1);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.2, 1.8, -0.05); //0.05 is middle between the eyes zed coords
        this.scene.scale(0.15, 0.1, 0.1);
        this.scene.rotate(-DTR * 90, 0, 0, 1);
        this.nosetex.apply();
        this.nose.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, 1.2, 1.2); //0.05 is middle between the eyes zed coords
        this.scene.scale(1.3, 1, 1);
        this.scene.rotate(-DTR * 100, 1, 0, 0);
        this.headtex.apply();
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, 1.2, -1.2); //0.05 is middle between the eyes zed coords
        this.scene.scale(1.3, 1, 1);
        this.scene.rotate(-DTR * 80, 1, 0, 0);
        this.headtex.apply();
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, 1.28, 1.67); //0.05 is middle between the eyes zed coords
        this.scene.scale(0.46, 0.5, 1);
        this.scene.rotate(-DTR * 90, 0, 1, 0);
        this.scene.rotate(-DTR * 90, 1, 0, 0);
        this.headtex.apply();
        this.wing2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, 1.28, -1.67); //0.05 is middle between the eyes zed coords
        this.scene.scale(0.46, 0.5, 1);
        this.scene.rotate(DTR * 90, 0, 1, 0);
        this.scene.rotate(DTR * 90, 1, 0, 0);
        this.headtex.apply();
        this.wing2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.9, 1, 0);
        this.scene.scale(0.5, 0.1, 0.1);
        this.scene.rotate(DTR * 90, 0, 0, 1);
        this.headtex.apply();
        this.tail.display();
        this.scene.popMatrix();
        
        /*
        */
    }

    enableNormalViz()
    {
        this.cube.enableNormalViz();
    }
}