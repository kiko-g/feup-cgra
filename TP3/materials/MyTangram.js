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

        var cor;
        cor = this.scene.hexToRgbA('#00ff00');      //GREEN       
        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(cor[0], cor[1], cor[2], 1.0);
        this.green.setDiffuse(cor[0], cor[1], cor[2], 1.0);
        this.green.setSpecular(0, 0, 0, 1.0);
        this.green.setShininess(10.0);       
        
        cor = this.scene.hexToRgbA('#ffff00');      //YELLOW
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(cor[0], cor[1], cor[2], 1.0);
        this.yellow.setDiffuse(cor[0], cor[1], cor[2], 1.0);
        this.yellow.setSpecular(0, 0, 0, 1.0);
        this.yellow.setShininess(10.0);       
        
        cor = this.scene.hexToRgbA('#ff8000');      //ORANGE
        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(cor[0], cor[1], cor[2], 1.0);
        this.orange.setDiffuse(cor[0], cor[1], cor[2], 1.0);
        this.orange.setSpecular(0, 0, 0, 1.0);
        this.orange.setShininess(10.0);       
        
        cor = this.scene.hexToRgbA('#7a3dad');      //PURPLE
        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(cor[0], cor[1], cor[2], 1.0);
        this.purple.setDiffuse(cor[0], cor[1], cor[2], 1.0);
        this.purple.setSpecular(0, 0, 0, 1.0);
        this.purple.setShininess(10.0);       
        
        cor = this.scene.hexToRgbA('#ff0000');      //RED 
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(cor[0], cor[1], cor[2], 1.0);
        this.red.setDiffuse(cor[0], cor[1], cor[2], 1.0);
        this.red.setSpecular(0, 0, 0, 1.0);
        this.red.setShininess(10.0);       
        
        cor = this.scene.hexToRgbA('#0085ff');      //BLUE
        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(cor[0], cor[1], cor[2], 1.0);
        this.blue.setDiffuse(cor[0], cor[1], cor[2], 1.0);
        this.blue.setSpecular(0, 0, 0, 1.0);
        this.blue.setShininess(10.0);       
        
        cor = this.scene.hexToRgbA('#ff99cc');      //PINK
        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(cor[0], cor[1], cor[2], 1.0);
        this.pink.setDiffuse(cor[0], cor[1], cor[2], 1.0);
        this.pink.setSpecular(0, 0, 0, 1.0);
        this.pink.setShininess(10.0);       
        
        
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
        

        this.scene.customMaterial.apply();
        if(this.displayGreen) this.diamond.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        //YELLOW [PARALLELOGRAM]
        this.scene.translate(0, n3*2, 0);
        this.scene.scale(1, -1, 1);
        this.scene.rotate(0.75*n4, 0, 0, 1);
        this.yellow.apply();
        if(this.displayYellow) this.parallelogram.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        //ORANGE [BIG TRIANGLE]
        this.scene.translate(-n3*2, 0, 0);
        this.orange.apply();
        if(this.displayOrange) this.bigTriangle.display();
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        //PINK [TRIANGLE]
        this.scene.translate(-1, -1, 0);
        this.scene.rotate(0.75 * n4, 0, 0, 1);
        this.pink.apply();
        if(this.displayPink) this.Triangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();    

        //BLUE [BIG TRIANGLE]
        this.scene.translate(-2, -2, 0);
        this.blue.apply();
        if (this.displayBlue) this.bigTriangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix(); 

        //PURPLE [SMALL TRIANGLE]
        this.scene.translate(1, 0, 0);
        this.scene.rotate(-n4/2, 0, 0, 1);
        this.purple.apply();
        if (this.displayPurple) this.smallTriangle.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        //RED [SMALL TRIANGLE]
        this.scene.translate(2, -1, 0);
        this.scene.rotate(n4, 0, 0, 1);
        this.red.apply();
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
