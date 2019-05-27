/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBird extends CGFobject 
{
    constructor(scene, mainT, headT, wingsT, noseT, eyesT)
    {
        super(scene);
        this.body = new MyUnitCubeQuad(scene, mainT, mainT, mainT);
        this.nose = new MyPyramid(scene, 7, 1);
        this.tail = new MyPyramid(scene, 4, 1);
        this.eye = new MyPrism(scene, 6, 1);
        this.wing = new MyQuad(scene);
        this.mainBirdTex = mainT;
        this.headTex = headT;
        this.noseTex = noseT;
        this.wingsTex = wingsT;
        this.eyesTex = eyesT;

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
        this.headtex.loadTexture(this.headtex);
        this.headtex.setTextureWrap('REPEAT', 'REPEAT');

        this.wingstex = new CGFappearance(this.scene);
        this.wingstex.setAmbient(1, 1, 1, 1);
        this.wingstex.setDiffuse(1, 1, 1, 1);
        this.wingstex.setSpecular(1, 1, 1, 1);
        this.wingstex.setShininess(20);
        this.wingstex.loadTexture(this.wingsTex);
        this.wingstex.setTextureWrap('REPEAT', 'REPEAT');

        this.eyestex = new CGFappearance(this.scene);
        this.eyestex.setAmbient(1, 1, 1, 1);
        this.eyestex.setDiffuse(1, 1, 1, 1);
        this.eyestex.setSpecular(1, 1, 1, 1);
        this.eyestex.setShininess(20);
        this.eyestex.loadTexture(this.eyesTex);
        this.eyestex.setTextureWrap('REPEAT', 'REPEAT');

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
        var n1 = Math.sqrt(2) / 2;
        this.scene.pushMatrix();
        this.scene.scale(2, 2, 2);                        //CORPO
        this.body.display();
        this.scene.popMatrix();
        /*
        
        this.scene.pushMatrix();
        this.scene.translate(1.5, 1.5, 1.5);             //CABECA
        this.scene.scale(1.5, 1.5, 1.5);
        this.tex.apply();
        this.scene.door.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(1.5, 3, 6.01);             //NOSE
        this.scene.scale(1.7, 2, 1.7);
        this.tex.apply();
        this.scene.nose.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(6.01, 4, 1.5);             //WINDOW
        this.scene.scale(1.7, 2, 1.7);
        this.scene.rotate(90 * DTR, 0, 1, 0);
        this.scene.door.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(6.01, 4, 4.5);             //WINDOW
        this.scene.scale(1.7, 2, 1.7);
        this.scene.rotate(90 * DTR, 0, 1, 0);
        this.scene.door.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(3, 5.8, 3);                //TOP
        this.scene.scale(6, 4, 7);
        this.scene.rotate(45 * DTR, 0, 1, 0);
        this.tex.apply();
        this.scene.pyramid.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(6.7, 0, 7.4);              //COLUMN
        this.scene.scale(0.25, 6, 0.25);
        this.tex.apply();
        this.prism.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-0.7, 0, 7.4);             //COLUMN
        this.scene.scale(0.25, 6, 0.25);
        this.tex.apply();
        this.prism.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(6.7, 0, -1.4);              //COLUMN
        this.scene.scale(0.25, 6, 0.25);
        this.tex.apply();
        this.prism.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-0.7, 0, -1.4);             //COLUMN
        this.scene.scale(0.25, 6, 0.25);
        this.tex.apply();
        this.prism.display();

        this.scene.popMatrix();*/
    }

    enableNormalViz()
    {
        this.cube.enableNormalViz();
    }
}