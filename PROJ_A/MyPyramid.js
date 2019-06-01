/**
* MyPyramid
* @constructor
*/
class MyPyramid extends CGFobject
{
    constructor(scene, slices, stacks, pT)
    {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
        this.tex = pT;
        this.init();
    }

    init()
    {
        this.T = new CGFappearance(this.scene);
        this.T.setAmbient(1, 1, 1, 1);
        this.T.setDiffuse(1, 1, 1, 1);
        this.T.setSpecular(1, 1, 1, 1);
        this.T.setShininess(20);
        this.T.loadTexture(this.tex);
        this.T.setTextureWrap('REPEAT', 'REPEAT');
    }

    initBuffers()
    {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var theta = 2 * Math.PI/this.slices;

        // All vertices have to be declared for a given face even if they are shared with others, as the normals in each face will be different
        for(var i = 0; i < this.slices; i++)
        {
            var sa  = Math.sin(ang);
            var saa = Math.sin(ang+theta);
            var ca  = Math.cos(ang);
            var caa = Math.cos(ang+theta);

            this.vertices.push(0,1,0);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal = 
            [
                saa-sa, ca*saa-sa*caa, caa-ca
            ];

            // normalization
            var nsize=Math.sqrt( normal[0]*normal[0] + normal[1]*normal[1] + normal[2]*normal[2] );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );
            
            // ALMOST OK... CORRECT AT THE END
            this.texCoords.push(0.5, 0);
            this.texCoords.push(i / this.slices, 1);
            this.texCoords.push((i+1) / this.slices, 1);

            ang+=theta;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity)
    {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


