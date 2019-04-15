/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyParallelogram extends CGFobject
{
    constructor(scene)
    {
        super(scene);
        this.initBuffers();
    }
    initBuffers()
    {
        this.vertices = [
            0, 0, 0,	//0
            1, 1, 0,	//1
            2, 0, 0,	//2
            3, 1, 0,	//3

            0, 0, 0,	//4 0
            1, 1, 0,	//5 1
            2, 0, 0,	//6 2
            3, 1, 0,	//7 3        
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 2, 1,
            2, 3, 1,
            5, 6, 4,
            5, 7, 6,


        ];
        this.normals = [
            0, 0,-1,
            0, 0,-1,
            0, 0,-1,
            0, 0,-1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,                                    
        ];

        this.texCoords = [
            0.25, 0.75,
            0.5, 1,
            0.75, 0.75,
            1, 1,
            1, 1,
            0.75, 0.75,
            0.5, 1,
            0.25, 0.75,
        ];
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}