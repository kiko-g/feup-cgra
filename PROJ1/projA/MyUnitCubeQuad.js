//                                                          2 ---------------3          0 -->   (0, 1, 1)   
// Let's define the 6 faces of                             /                /|          1 -->   (1, 1, 1)
// the Unit Cube as A, B, C, D, E and F                   /                / |          2 -->   (0, 1, 0)
// A, B, C and D are the side faces                      /                /  |          3 -->   (1, 1, 0)
// E is the top face and F is the bottom face           0 -------------- 1   |          4 -->   (0, 0, 1)
//                                                      |                |   |          5 -->   (1, 0, 1)
// A contains vortexes (0 1 4 5)                        |                |   |          6 -->   (0, 0, 0) --> O
// B contains vortexes (1 3 5 7)                        |    6           |   7          7 -->   (1, 0, 0)
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
class MyUnitCubeQuad extends CGFobject
{
    constructor(scene, SideTex)
    {
        super(scene);

        this.quad = new MyQuad(scene);
        this.tex = SideTex;
        this.init();
    }

    init()
    {
        this.T = new CGFappearance(this.scene);
        this.T.setAmbient(0.4, 0.3, 0.2, 1);
        this.T.setSpecular(0.2, 0.4, 0.5, 1);
        this.T.setSpecular(0.1, 0.1, 0.1, 1);
        this.T.setShininess(10);
        this.T.loadTexture(this.tex);
        this.T.setTextureWrap('REPEAT', 'REPEAT');
    }

    initBuffers()
    {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    
    display()
    {
        var DTR = Math.PI/180; // DEG TO RAD
        
        this.scene.pushMatrix();
        this.T.apply();
        this.scene.translate(0.5, 0.5, 0);
        this.scene.scale(1, 1, 1);
        this.quad.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.5, 0.5, 1);
        this.quad.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0.5, 0.5);
        this.scene.rotate(90 * DTR, 0, 1, 0);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(1, 0.5, 0.5);
        this.scene.rotate(90 * DTR, 0, 1, 0);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.5, 1, 0.5);
        this.scene.rotate(-90 * DTR, 1, 0, 0);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.5, 0, 0.5);
        this.scene.rotate(-90 * DTR, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
    }

    enableNormalViz()
    {
        this.quad.enableNormalViz();
    }
}