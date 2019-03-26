/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 */

 
class MyTriangleBig extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [

            0, 0, 0,	//0
            2, 2, 0,	//1
            4, 0, 0,	//2
            0, 0, 0,	//3 0
            2, 2, 0,	//4 1
            4, 0, 0,	//5 2            
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 2, 1,
            4, 5, 3,        //cant use 1, 2, 0 ---> would be refering to the "same object" 
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0,-1,
            0, 0,-1,
            0, 0,-1,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}