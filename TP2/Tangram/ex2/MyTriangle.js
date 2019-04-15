/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */

var x = Math.sqrt(2);

class MyTriangle extends CGFobject
{
    constructor(scene)
    {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            0, -x, 0,	//0
            x, 0, 0,	//1
            0, x, 0	    //2

        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            2, 1, 0
        ];
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

