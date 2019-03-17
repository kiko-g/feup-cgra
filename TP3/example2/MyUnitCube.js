//                                                          2 ---------------3  
// Let's define the 6 faces of                             /                /|
// the Unit Cube as A, B, C, D, E and F                   /                / |
// A, B, C and D are the side faces                      /                /  |
// E is the top face and F is the bottom face           0 -------------- 1   |
//                                                      |                |   |
// A contains vortexes (0 1 4 5)                        |                |   |
// B contains vortexes (1 3 5 7)                        |    6           |   7   
// C contains vortexes (2 3 6 7)                        |                |  /    
// D contains vortexes (0 2 4 6)                        |                | /  
// E contains vortexes (2 3 0 1)                        4 -------------- 5    
// F contains vortexes (6 7 4 5)
//



/**
 * My Unit Cube
 * @constructor
 * @param scene - Reference to MyScene object
 */

var c = 0.5;
class MyUnitCube extends CGFobject
{
    constructor(scene)
    {
        super(scene);
        this.initBuffers();
    }
    initBuffers()
    {
        this.vertices = 
        [
           -c, -c,   c,	      //0
            c, -c,   c,	      //1
           -c,  c,   c,	      //2
            c,  c,   c,    	  //3
           -c, -c,  -c,       //4
            c, -c,  -c,       //5
           -c,  c,  -c,       //6
            c,  c,  -c,       //7

           -c, -c,   c,	      //0
            c, -c,   c,	      //1
           -c,  c,   c,	      //2
            c,  c,   c,    	  //3
           -c, -c,  -c,       //4
            c, -c,  -c,       //5
           -c,  c,  -c,       //6
            c,  c,  -c,       //7

           -c, -c,   c,	      //0
            c, -c,   c,	      //1
           -c,  c,   c,	      //2
            c,  c,   c,    	  //3
           -c, -c,  -c,       //4
            c, -c,  -c,       //5
           -c,  c,  -c,       //6
            c,  c,  -c,       //7
        ];
        
        //Counter-clockwise reference of vertices
        this.indices = 
        [
            0, 4, 1,        //Face A
            4, 5, 1,
            1, 5, 3,        //Face B
            5, 7, 3,
            2, 6, 3,        //Face C
            6, 7, 3,
            0, 4, 2,        //Face D
            4, 6, 2,
            0, 1, 2,        //Face E
            1, 3, 2,
            4, 5, 6,        //Face F
            5, 7, 6,

        ];

        this.normals = [
            1, 0, 0,
           -1, 0, 0, 
            1, 0, 0,
           -1, 0, 0, 
            1, 0, 0,
           -1, 0, 0, 
            1, 0, 0,
           -1, 0, 0,                                                                                    


        ]

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}