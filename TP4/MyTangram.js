/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject
{
    constructor(scene)
    {
        super(scene);

        this.diamond = new MyDiamond(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.Triangle = new MyTriangle(scene);
        this.bigTriangle = new MyTriangleBig(scene);
        this.smallTriangle = new MyTriangleSmall(scene);
        
        this.displayGreen = true;
        this.displayYellow = true;
        this.displayOrange = true;
        this.displayPurple = true;
        this.displayRed = true;
        this.displayBlue = true;
        this.displayPink = true;
     
        this.material1 = new CGFappearance(this.scene);
        this.material1.setAmbient(1, 1, 1, 1.0);
        this.material1.setDiffuse(1, 1, 1, 1.0);
        this.material1.setSpecular(0, 0, 0, 1.0);
        this.material1.setShininess(10.0); 
        this.material1.loadTexture('images/tangram-lines.png');
        this.material1.setTextureWrap('REPEAT', 'REPEAT');   
                
    }

    initBuffers()
    {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    display()
    {
        //TANGRAM Drawing section
        //Declare GREEN DIAMOND matrices
        var n1 = Math.cos((Math.PI) / 4);
        var n2 = Math.sin((Math.PI) / 4);
        var n3 = Math.sqrt(2)/2;
        var n4 = (Math.PI);
        

        //GREEN DIAMOND
        var diamond_rot =
        [
           n1, n2,  0, 0,
          -n2, n1,  0, 0,
            0,  0,  1, 0,
            0,  0,  0, 1
        ]; 
            
        var diamond_transl =
        [
           1,    0,  0, 0,
           0,    1,  0, 0,
           0,    0,  1, 0,
         -n3, 3*n3,  0, 1
        ];
        
                
        this.scene.pushMatrix();
        this.scene.multMatrix(diamond_transl);
        this.scene.multMatrix(diamond_rot);
        

        this.material1.apply();
        if(this.displayGreen) this.diamond.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        //YELLOW [PARALLELOGRAM]
        this.scene.translate(0, n3*2, 0);
        this.scene.scale(1, -1, 1);
        this.scene.rotate(0.75*n4, 0, 0, 1);
        if(this.displayYellow) this.parallelogram.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        //ORANGE [BIG TRIANGLE]
        this.scene.translate(-n3*2, 0, 0);
        if(this.displayOrange) this.bigTriangle.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        //PINK [TRIANGLE]
        this.scene.translate(-1, -1, 0);
        this.scene.rotate(0.75 * n4, 0, 0, 1);
        if(this.displayPink) this.Triangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();    

        //BLUE [BIG TRIANGLE]
        this.scene.translate(-2, -2, 0);
        if (this.displayBlue) this.bigTriangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix(); 

        //PURPLE [SMALL TRIANGLE]
        this.scene.translate(1, 0, 0);
        this.scene.rotate(-n4/2, 0, 0, 1);
        if (this.displayPurple) this.smallTriangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        //RED [SMALL TRIANGLE]
        this.scene.translate(2, -1, 0);
        this.scene.rotate(n4, 0, 0, 1);
        if (this.displayRed) this.smallTriangle.display();

    }
        enableNormalViz()
        {
            this.parallelogram.enableNormalViz();
            this.bigTriangle.enableNormalViz();
            this.smallTriangle.enableNormalViz();
            this.Triangle.enableNormalViz();
            this.diamond.enableNormalViz();
        }   

        disableNormalViz()
        {
            this.parallelogram.disableNormalViz();
            this.bigTriangle.disableNormalViz();
            this.smallTriangle.disableNormalViz();
            this.Triangle.disableNormalViz();
            this.diamond.disableNormalViz();
        }
}
