//                                                          6 ---------------7  
// Let's define the 6 faces of                             /                /|
// the Unit Cube as A, B, C, D, E and F                   /                / |
// C, D, E and F are the side faces                      /                /  |
// B is the top face and A is the bottom face           2 -------------- 3   |
//                                                      |                |   |
// A contains vortexes (0 1 4 5) bottom                 |                |   |
// B contains vortexes (2 3 6 7) top                    |    4           |   5   
// C contains vortexes (0 1 2 3)                        |                |  /    
// D contains vortexes (1 5 3 7)                        |                | /  
// E contains vortexes (5 4 7 6)                        0 -------------- 1    
// F contains vortexes (0 4 2 6)
//

//  ----------> XX
// |
// |
// |
// |
// v
// ZZ


/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */

var c = 40;
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
             4, 1,   5,          //Face A
             4, 0,   1,
             3, 2,   6,          //Face B
             7, 3,   6,
            11, 9,  10,          //Face C
             9, 8,  10,
            23, 21, 19,          //Face D
            21, 17, 19,
            14, 13, 15,          //Face E
            14, 12, 13,
            18, 20, 22,          //Face F
            18, 16, 20,
            
            
        ];
        
        this.normals = 
        [
          1, 1,-1,
         -1, 1,-1,
          1,-1,-1,
         -1,-1,-1, 
          1, 1, 1,
         -1, 1, 1,
          1,-1, 1,
         -1,-1, 1,

          1, 1,-1,
         -1, 1,-1,
          1,-1,-1,
         -1,-1,-1, 
          1, 1, 1,
         -1, 1, 1,
          1,-1, 1,
         -1,-1, 1,
         
          1, 1,-1,
         -1, 1,-1,
          1,-1,-1,
         -1,-1,-1, 
          1, 1, 1,
         -1, 1, 1,
          1,-1, 1,
         -1,-1, 1,
        ];

        var h = 0.02;
        this.texCoords =
        [
            1/4,    1,       //0
            2/4,    1,       //1
            1/4,    0,       //2
            2/4,    0,       //3
            1/4,  2/3,       //4
            2/4,  2/3,       //5
            1/4,  1/3,       //6
            2/4,  1/3,       //7
            1,    2/3,       //0
            3/4,  2/3,       //1
            1,    1/3,       //2
            3/4,  1/3,       //3
            1/4,  2/3,       //4
            2/4,  2/3,       //5
            1/4,  1/3,       //6
            2/4,  1/3,       //7
              0,  2/3,       //0
            3/4,  2/3,       //1
              0,  1/3,       //2
            3/4,  1/3,       //3
            1/4,  2/3,       //4
            2/4,  2/3,       //5
            1/4,  1/3,       //6
            2/4,  1/3,       //7 

        ];
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    enableNormalViz()
    {
    }
}

/*
1, 0, 4,        //Face A
1, 4, 5,
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
*/