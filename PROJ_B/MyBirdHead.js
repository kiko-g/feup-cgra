/**
 * BirdHead
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBirdHead extends CGFobject
{
    constructor(scene, edges, T)
    {
        super(scene);
        this.radius = 0.8
        this.main = new MyCilinder(scene, edges, 0.7, this.radius);
        this.neck = new MyCircle(scene, edges)
        this.head = new MySemiSphere(scene, edges, 6);
        this.Tex = T;
        this.init();
    }

    init()
    {
        this.tex = new CGFappearance(this.scene);
        this.tex.setAmbient(1, 1, 1, 1);
        this.tex.setDiffuse(1, 1, 1, 1);
        this.tex.setSpecular(1, 1, 1, 1);
        this.tex.setShininess(20);
        this.tex.loadTexture(this.Tex);
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
        var r = this.radius;
        var DTR = Math.PI / 180;
        this.scene.pushMatrix();
        this.scene.translate(1.5, 1.4, 0);
        this.tex.apply();
        this.main.display(); //cilinder
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.5, 2.1, 0);
        this.scene.scale(r, 0.3, r);
        this.scene.rotate(-90 * DTR, 1, 0, 0);
        this.head.display(); //semi sphere
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.5, 1.4, 0);
        this.scene.scale(r, r, r);
        this.scene.rotate(90 * DTR, 1, 0, 0);
        this.neck.display(); //circle
        this.scene.popMatrix();
    }

    enableNormalViz()
    {
        this.cube.enableNormalViz();
    }
}
