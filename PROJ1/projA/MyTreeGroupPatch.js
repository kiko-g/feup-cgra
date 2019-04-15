/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeGroupPatch extends CGFobject
{
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius)
    {
        super(scene);

        this.cone = new MyCone(scene, 10, treeTopHeight, treeTopRadius);
        this.cilinder = new MyCilinder(scene, 10, trunkHeight, trunkRadius);
        this.trunkHeight = trunkHeight;
        //this.trunkTexture = trunkTexture;
        //this.treeTopTexture = treeTopTexture;
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    display() {
        var q = 0.1 * this.trunkHeight       // Helpful variables

        this.scene.pushMatrix();
        // aplicar material tronco
        this.cilinder.display();

        // aplicar material treetop
        this.scene.translate(0, this.trunkHeight - q, 0);
        this.cone.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
    }
}
