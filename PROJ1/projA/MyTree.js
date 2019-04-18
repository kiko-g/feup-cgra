/**
 * MyTree
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTree extends CGFobject
{//, trunkTexture, treeTopTexture
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture, lowerCone)
    {
        super(scene);

        this.cone = new MyCone(scene, 10, treeTopHeight, treeTopRadius);
        this.cilinder = new MyCilinder(scene, 10, trunkHeight, trunkRadius);
        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;
        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;
        this.trunkTexture = trunkTexture;
        this.treeTopTexture = treeTopTexture;
        this.atten = lowerCone;
        
        this.init();
    }   
    
    init()
    {
        this.M1 = new CGFappearance(this.scene);
        this.M1.setAmbient(1, 1, 1, 1);
        this.M1.setDiffuse(1, 1, 1, 1);
        this.M1.setSpecular(1, 1, 1, 1);
        this.M1.setShininess(10);
        this.M1.loadTexture(this.trunkTexture);
        this.M1.setTextureWrap('REPEAT', 'REPEAT');

        this.M2 = new CGFappearance(this.scene);
        this.M2.setAmbient(1, 1, 1, 1);
        this.M2.setDiffuse(1, 1, 1, 1);
        this.M2.setSpecular(1, 1, 1, 1);
        this.M2.setShininess(10);
        this.M2.loadTexture(this.treeTopTexture);
        this.M2.setTextureWrap('REPEAT', 'REPEAT');
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
        this.scene.pushMatrix();    //PUSH IT
        this.M1.apply();
        this.cilinder.display();    //DISPLAY CILINDER
        this.scene.translate(0, this.trunkHeight - this.atten, 0);
        this.M2.apply();
        this.cone.display();        //DISPLAY CONE
        this.scene.popMatrix();     //POP IT
    }
    enableNormalViz()
    {
        this.cone.enableNormalViz();
        this.cilinder.enableNormalViz();
    }
}