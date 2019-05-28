/**
 * BirdBody
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBirdBody extends CGFobject
{
    constructor(scene, edges, cilinderT)
    {
        super(scene);
        this.body = new MyCilinder(scene, edges, 1, 1);
        this.bodycover = new MyCircle(scene, edges);
        this.belly = new MySemiSphere(scene, edges, 6);
        this.cilinderTex = cilinderT;
        this.init();
    }

    init()
    {
        this.tex = new CGFappearance(this.scene);
        this.tex.setAmbient(1, 1, 1, 1);
        this.tex.setDiffuse(1, 1, 1, 1);
        this.tex.setSpecular(1, 1, 1, 1);
        this.tex.setShininess(20);
        this.tex.loadTexture(this.cilinderTex);
        this.tex.setTextureWrap('REPEAT', 'REPEAT');
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
        this.scene.pushMatrix();
        this.scene.rotate(90 * DTR, 1, 0, 0);
        this.belly.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-90 * DTR, 1, 0, 0);
        this.scene.rotate(180 * DTR, 0, 0, 1);
        this.belly.display();
        this.scene.popMatrix();
    }

    enableNormalViz()
    {
        this.cube.enableNormalViz();
    }
}
