/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeGroupPatch extends CGFobject
{
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture)
    {
        super(scene);
        this.tree = new MyTree(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture);
        this.TTR = treeTopRadius;
        this.treeRand = [];
        for(var k=0; k<9; k++) this.treeRand.push(Math.random() * 1.05 + 1);
        this.init();
    }

    init()
    {
    }

    initBuffers()
    {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        this.trees = [];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display()
    {
        var help1=0;
        this.scene.pushMatrix();
        for(var j=0; j<3; j++)
        {
            for(var i=0; i<3; i++)
            {
                this.scene.translate(this.treeRand[help1] * i * this.TTR*2, 0, this.treeRand[help1] * j * this.TTR*2);
                this.tree.display();
                this.scene.popMatrix();
                this.scene.pushMatrix();
                help1++;

            }
        }
    }
    
    enableNormalViz()
    {
        this.tree.enableNormalViz();
    }
}