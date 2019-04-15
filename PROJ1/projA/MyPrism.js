/**
* MyPrism
* @constructor
*/
class MyPrism extends CGFobject
{
    constructor(scene, slices, stacks)
    {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    
    initBuffers() 
    {
        this.vertices   = [];
        this.indices    = [];
        this.normals    = [];
        this.texCoords = [];
        
        var ang = 0;
        var theta = 2 * Math.PI / this.slices;

        for(var i=0; i < this.slices; i++)
        {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different
            
            var sinAng      = Math.sin(ang);
            var sinAngNext  = Math.sin(ang + theta);
            var cosAng      = Math.cos(ang);
            var cosAngNext  = Math.cos(ang + theta);

            this.vertices.push(cosAng, 1, -sinAng); 
            this.vertices.push(cosAngNext, 1, -sinAngNext);
            
            this.vertices.push(cosAng, 0, -sinAng); 
            this.vertices.push(cosAngNext, 0, -sinAngNext);

            // normal computed by cross product of two edges
            var normal =
            [
                sinAngNext - sinAng,
                cosAng * sinAngNext - sinAng * cosAngNext,
                cosAngNext - cosAng
            ];

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);
            var h = 4*i; //h means help
            this.indices.push((h + 1), (h + 0), (h + 3));
            this.indices.push((h + 2), (h + 3), (h + 0));
            
            this.texCoords.push(1,0);
            this.texCoords.push(0,0);
            this.texCoords.push(1,1);
            this.texCoords.push(0,1);
            ang += theta;

        }

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
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}