/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */


class MyTriangle extends CGFobject
{
    constructor(scene)
    {
        super(scene);
        this.initBuffers();
    }
    initBuffers()
    {
        var x = Math.sqrt(2);
        this.vertices = 
        [
            0,-x, 0,    //0
            x, 0, 0,	//1
            0, x, 0,    //2

            0,-x, 0,    //0
            x, 0, 0,	//1
            0, x, 0,    //2            

        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            5, 4, 3,
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0,-1,
            0, 0,-1,
            0, 0,-1,
        ]

        this.texCoords = [
            0, 0.5,
            0, 1,
            0.5, 1,
            0, 0.5,
            0, 1,
            0.5, 1,
        ]
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

