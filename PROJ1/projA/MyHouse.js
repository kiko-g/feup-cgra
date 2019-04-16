/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHouse extends CGFobject
{
    constructor(scene, mainT, topT, doorT, windowT)
    {
        super(scene);
        this.cube = new MyUnitCubeQuad(scene, mainT, mainT, mainT);
        this.pyramid = new MyPyramid(scene, 4, 1);
        this.prism = new MyPrism(scene, 6, 1);
        this.door = new MyQuad(scene);
        this.pyramidTex = topT;
        this.doorTex = doorT;
        this.windowTex = windowT;
        this.init();
    }

    init()
    {
        this.pyramidtex = new CGFappearance(this.scene);
        this.pyramidtex.setAmbient(1, 1, 1, 1);
        this.pyramidtex.setDiffuse(1, 1, 1, 1);
        this.pyramidtex.setSpecular(1, 1, 1, 1);
        this.pyramidtex.setShininess(20);
        this.pyramidtex.loadTexture(this.pyramidTex);
        this.pyramidtex.setTextureWrap('REPEAT', 'REPEAT');

        this.doortex = new CGFappearance(this.scene);
        this.doortex.setAmbient(1, 1, 1, 1);
        this.doortex.setDiffuse(1, 1, 1, 1);
        this.doortex.setSpecular(1, 1, 1, 1);
        this.doortex.setShininess(20);
        this.doortex.loadTexture(this.doorTex);
        this.doortex.setTextureWrap('REPEAT', 'REPEAT');

        this.windowtex = new CGFappearance(this.scene);
        this.windowtex.setAmbient(1, 1, 1, 1);
        this.windowtex.setDiffuse(1, 1, 1, 1);
        this.windowtex.setSpecular(1, 1, 1, 1);
        this.windowtex.setShininess(20);
        this.windowtex.loadTexture(this.windowTex);
        this.windowtex.setTextureWrap('REPEAT', 'REPEAT');   
    }

    initBuffers()
    {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display()
    {
        var DTR = Math.PI/180;
        var n1 = Math.sqrt(2) / 2;
        this.scene.pushMatrix();
        this.scene.scale(6, 6, 6);                 //BASE
        this.cube.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(4.5, 2, 6.01);        //DOOR
        this.scene.scale(2, 4, 2);
        this.doortex.apply();
        this.door.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(1.5, 3, 6.01);        //WINDOW
        this.scene.scale(1.7, 2, 1.7);
        this.windowtex.apply();
        this.door.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(3, 5.8, 3);           //TOP
        this.scene.scale(5.5, 4.5, 5.5);
        this.scene.rotate(45*DTR, 0, 1, 0);
        this.pyramidtex.apply();
        this.pyramid.display();
        
        this.scene.popMatrix();
    }
    
    enableNormalViz()
    {
        this.cube.enableNormalViz();
    }
}