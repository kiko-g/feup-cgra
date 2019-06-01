/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeGroupPatch extends CGFobject
{
    constructor(scene)
    {
        super(scene);
        this.tree = new MyLSPlant(this.scene);
        this.treeRandT = []; this.treeRandS = [];
        for(var k=0; k<9; k++)
        {
            this.treeRandT.push(Math.random() * 0.2 + 1);      // MAX 1.2, MIN 1
            this.treeRandS.push(Math.random() * 0.25 + 0.9);    // MAX 1.15, MIN 0.9
        }
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

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display()
    {
        this.scene.pushMatrix();
        for(var j=0; j<3; j++)
        {
            for(var i=0; i<3; i++)
            {
                this.scene.translate(1, 0, 1);
                this.tree.display();
                this.scene.popMatrix();
                this.scene.pushMatrix();
            }
        }
        this.scene.popMatrix();
    }
    
    enableNormalViz()
    {
        this.tree.enableNormalViz();
    }
}