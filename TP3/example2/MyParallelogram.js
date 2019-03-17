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
            0, 0, 0,	//1
            1, 1, 0,	//2
            1, 1, 0,	//3
            2, 0, 0,	//4
            2, 0, 0,	//5
            3, 1, 0,	//6
            3, 1, 0,	//7                        
            
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 2, 4,
            5, 3, 1,
            2, 4, 6,
            7, 5, 3,
        ];
        this.normals = [
            0, 0,  1,
            0, 0, -1,
            0, 0,  1,
            0, 0, -1,
            0, 0,  1,
            0, 0, -1,
            0, 0,  1,
            0, 0, -1,                                    
        ]
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}