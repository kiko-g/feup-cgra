/**
 * My Unit Cube Quad
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyUnitCubeQuad extends CGFobject
{
    constructor(scene, Side, Bottom, Top)
    {
        super(scene);

        this.quad = new MyQuad(scene);
        this.sideTex = Side;
        this.bottomTex = Bottom;
        this.topTex = Top;
        this.init();
    }

    init()
    {
        this.nearest = true;
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
        var DTR = Math.PI/180; // DEG TO RAD
        
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.5, 0);
        this.scene.scale(1, 1, 1);
        this.sidetex.apply();
        if (this.scene.nearestVoxel) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        this.quad.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.5, 0.5, 1);
        this.quad.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0.5, 0.5);
        this.scene.rotate(90 * DTR, 0, 1, 0);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(1, 0.5, 0.5);
        this.scene.rotate(90 * DTR, 0, 1, 0);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.5, 1, 0.5);
        this.scene.rotate(-90 * DTR, 1, 0, 0);
        this.toptex.apply();
        if(this.scene.nearestVoxel) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);        
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.5, 0, 0.5);
        this.scene.rotate(-90 * DTR, 1, 0, 0);
        this.bottomtex.apply();
        if(this.scene.nearestVoxel) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);        
        this.quad.display();
        this.scene.popMatrix();
    }

    enableNormalViz()
    {
        this.quad.enableNormalViz();
    }
}