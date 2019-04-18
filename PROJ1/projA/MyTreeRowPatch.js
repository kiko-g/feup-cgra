/**
 * MyTreeRowPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeRowPatch extends CGFobject
{
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture, lowerCone)
    {
        super(scene);
        this.tree = new MyTree(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture, lowerCone);
        this.TTR = treeTopRadius;
        this.treeRandTX = []; this.treeRandTZ = [];
        this.treeRandSX = []; this.treeRandSY = []; this.treeRandSZ = []; 
        for(var k=0; k<9; k++)
        {
            // Below are 2 vectors of random values for axis X and Z
            this.treeRandTX.push(Math.random() * 0.4 - 0.2);     // MAX 0.2, MIN -0.2
            this.treeRandTZ.push(Math.random() * 0.6 - 0.4);     // MAX 0.4, MIN -0.4
            
            this.treeRandSX.push(Math.random() * 0.3 + 0.9);     // MAX 1.1, MIN 0.9
            this.treeRandSY.push(Math.random() * 0.3 + 0.9);     // MAX 1.1, MIN 0.9
            this.treeRandSZ.push(Math.random() * 0.3 + 0.9);     // MAX 1.1, MIN 0.9
            // Above 3 vectors of random values for each scaling axis
            // The aim is to format the object slightly thats why values are between 1.1 and 0.9
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
        this.trees = [];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display()
    {
        var help1=0;
        this.scene.pushMatrix();
        for(var i=0; i<6; i++)
        {
            //this.scene.translate(1, 0, 1);
            //Shifts i * 2 * radius and adds a random offset between 2 numbers specified inside the constructor
            this.scene.translate(this.treeRandTX[help1] + i * this.TTR*2, 0, this.treeRandTZ[help1]);
            this.scene.scale(this.treeRandSX[help1], this.treeRandSY[help1], this.treeRandSZ[help1]);
            this.tree.display();
            this.scene.popMatrix();
            this.scene.pushMatrix();
            help1++;
        }
        this.scene.popMatrix();
    }
    
    enableNormalViz()
    {
        this.tree.enableNormalViz();
    }
}