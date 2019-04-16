/**
 * MyVoxelHill
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVoxelHill extends CGFobject
{
    constructor(scene, side, bottom, top, N)
    {
        super(scene);
        this.cube = new MyUnitCubeQuad(scene, side, bottom, top);
        this.sideTex = side;
        this.bottomTex = bottom;
        this.topTex = top;
        this.levels = N;
        this.init();
    }

    init()
    {
        this.sidetex = new CGFappearance(this.scene);
        this.sidetex.setAmbient(1, 1, 1, 1);
        this.sidetex.setDiffuse(1, 1, 1, 1);
        this.sidetex.setSpecular(1, 1, 1, 1);
        this.sidetex.setShininess(20);
        this.sidetex.loadTexture(this.sideTex);
        this.sidetex.setTextureWrap('REPEAT', 'REPEAT');

        this.bottomtex = new CGFappearance(this.scene);
        this.bottomtex.setAmbient(1, 1, 1, 1);
        this.bottomtex.setDiffuse(1, 1, 1, 1);
        this.bottomtex.setSpecular(1, 1, 1, 1);
        this.bottomtex.setShininess(20);
        this.bottomtex.loadTexture(this.bottomTex);
        this.bottomtex.setTextureWrap('REPEAT', 'REPEAT');

        this.toptex = new CGFappearance(this.scene);
        this.toptex.setAmbient(1, 1, 1, 1);
        this.toptex.setDiffuse(1, 1, 1, 1);
        this.toptex.setSpecular(1, 1, 1, 1);
        this.toptex.setShininess(20);
        this.toptex.loadTexture(this.topTex);
        this.toptex.setTextureWrap('REPEAT', 'REPEAT');   
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
        var L = this.levels;
        var NL = 0;  //Number of pieces per line
        
        for(var i=L; i>0; i--)
        {
            this.scene.pushMatrix();
            NL = (2*i - 1);
            this.scene.translate(L-i, L-i, L-i); //Start point for each layer
            for(var j=0; j < NL; j++)
            {
                this.scene.pushMatrix();
                for(var k=0; k < NL; k++)
                {
                    this.scene.pushMatrix();
                    this.scene.translate(j, 0, k);
                    this.cube.display();
                    this.scene.popMatrix();
                }
                this.scene.popMatrix();
            }
            this.scene.popMatrix();
        }
    }
    
    enableNormalViz()
    {
        this.cube.enableNormalViz();
    }
}