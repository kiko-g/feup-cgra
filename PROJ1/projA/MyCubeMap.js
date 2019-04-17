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

//0,  

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */

var c = 20;
class MyCubeMap extends CGFobject
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
            1, 4, 0,        //Face A
            1, 5, 4,
            3, 5, 1,        //Face B
            3, 7, 5,
            2, 6, 3,        //Face C
            6, 7, 3,
            0, 4, 2,        //Face D
            4, 6, 2,
            2, 1, 0,        //Face E
            2, 3, 1,
            4, 5, 6,        //Face F
            5, 7, 6,

        ];

        this.normals = 
        [
          -c, 0, 0,
           c, 0, 0,
          -c, 0, 0,
           c, 0, 0, 
          -c, 0, 0,
           c, 0, 0, 
          -c, 0, 0,
           c, 0, 0,

           0,-c, 0, 
           0,-c, 0,  
           0, c, 0, 
           0, c, 0,  
           0,-c, 0,
           0,-c, 0, 
           0, c, 0,
           0, c, 0,
           
           0, 0, c,
           0, 0, c,  
           0, 0, c, 
           0, 0, c,  
           0, 0,-c,
           0, 0,-c, 
           0, 0,-c,
           0, 0,-c,    
        ];


        this.texCoords =
        [
            1/4, 2/3,       //0
            1/4, 2/3,       //1
            1/4, 2/3,       //2
            0,   2/3,       //3
            1/4,   1,       //4
            1,   2/3,       //5
            1/4, 1/3,       //6
            1/4, 1/3,       //7
            1/4, 1/3,       //8
            0,   1/3,       //9
            1/4,   0,       //10
            1,   1/3,       //11
            2/4, 2/3,       //12
            2/4, 2/3,       //13
            2/4, 2/3,       //14
            3/4, 2/3,       //15
            2/4,   1,       //16
            3/4, 2/3,       //17
            2/4, 1/3,       //18
            2/4, 1/3,       //19
            2/4, 1/3,       //20
            3/4, 1/3,       //21
            2/4,   0,       //22
            3/4, 1/3,       //23
            
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}