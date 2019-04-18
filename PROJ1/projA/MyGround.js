/**
 * MyGround
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyGround extends CGFobject 
{
    constructor(scene, coords)
    {
		super(scene);
		this.initBuffers();
        if (coords != undefined) this.updateTexCoords(coords);
        
        this.init();
	}
    
    init()
    {
    }

    initBuffers()
    {
        this.vertices = 
        [
		   -0.5,  -0.5,   0,	//0
			0.5,  -0.5,   0,	//1
		   -0.5,   0.5,   0,	//2
            0.5,   0.5,   0,	//3
		   -0.5,  -0.5,   0,	//0
			0.5,  -0.5,   0,	//1
		   -0.5,   0.5,   0,	//2
            0.5,   0.5,   0,	//3              
		];

		//Counter-clockwise reference of vertices
        this.indices = 
        [
			0, 1, 2,
            1, 3, 2,
            6, 5, 4,
            6, 7, 5,
		];

		//Facing Z positive
        this.normals = 
        [
			0, 0, 2,
			0, 0, 2,
			0, 0, 2,
            0, 0, 2,
			0, 0,-2,
			0, 0,-2,
			0, 0,-2,
			0, 0,-2,            
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

        this.texCoords = 
        [
			0,  20,     //0
			20, 20,     //1
			0,  0,      //2
            20, 0,      //3

			20,20,      //1
            0, 20,      //0
			20, 0,      //3
			0,  0,      //2
        ];
        
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

    
	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
    updateTexCoords(coords)
    {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

