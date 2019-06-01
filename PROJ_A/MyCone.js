/**
* MyCone
* @constructor
*/
class MyCone extends CGFobject
{
    constructor(scene, slices, height, radius)
    {
        super(scene);
        this.slices = slices;
        this.height = height;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers()
    {
        this.vertices   = [];
        this.indices    = [];
        this.normals    = [];
        this.texCoords  = [];

        var r = this.radius, s = this.slices, ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
       for(var i = 0; i < this.slices; i++)
       {
            this.vertices.push(Math.cos(ang)*r, 0, -Math.sin(ang)*r);
            this.texCoords.push(0.5 + Math.cos(ang) * 0.5, 0.5 - Math.sin(ang)*0.5);
            this.indices.push(i, (i+1) % s, s);
            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            ang+=alphaAng;
        }
        this.vertices.push(0,this.height,0);
        this.normals.push(0,1,0);
        this.texCoords.push(0.5, 0.5);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateTexCoords(coords)
    {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
    }

    updateBuffers(complexity)
    {
        this.slices = 5 + Math.round(5 * complexity); //complexity varies 0-1, so slices varies 5-10

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


