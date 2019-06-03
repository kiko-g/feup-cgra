/**
* MyNest
* @constructor
*/
class MyNest extends CGFobject
{
    constructor(scene, nestT, edges, radius)
    {
        super(scene);
        //doesnt make sense having a polygon with less than 3 sides
        if(edges <= 2) edges = 3; //verification for whats stated above
        this.side = new MyCilinder(scene, 20, 1.2, 0.3);
        this.edges = edges;
        this.nestTex = nestT;
        this.r = radius;
        this.targetRadius = radius + 0.5; //the nest rdius plus an incrment
        // so that it is easier to hit the target (nest)
        this.branchContainer = [];
        this.branchContainer.push(new MyTreeBranch(scene, "images/wood.jpg", true));
        this.x = -9;
        this.y = 5.5;
        this.z = 14.5
        this.init();
    }
    
    init()
    {
        this.nesttex = new CGFappearance(this.scene);
        this.nesttex.setAmbient(1, 1, 1, 1);
        this.nesttex.setDiffuse(1.0, 1.0, 1.0, 1); 
        this.nesttex.setSpecular(1, 1, 1, 1);
        this.nesttex.setShininess(20);
        this.nesttex.loadTexture(this.nestTex);
        this.nesttex.setTextureWrap('REPEAT', 'REPEAT');
    }

    display()
    {
        var angle;
        var theta = DTR * 360.0 / this.edges;
        
        this.nesttex.apply();
        this.scene.pushMatrix();
        for(var i=0; i < this.edges; i++)
        {            
            angle = i * theta;
            this.scene.pushMatrix();
            this.scene.translate(Math.sin(angle)*this.r, 0, Math.cos(angle)*this.r); //move each to its spot
            this.scene.rotate(angle, 0, 1, 0);          //rotate them around y (green) axis
            this.scene.rotate(DTR * 90, 0, 0, 1);       //cilinders are laying all in the same spot
            this.scene.scale(0.5, 7*this.r/this.edges, 0.5);
            this.scene.translate(0, -0.5, 0);
            this.side.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();

        for(var i=0; i<this.branchContainer.length; i++)
        {
            this.scene.pushMatrix();
            this.scene.rotate(30*DTR *i, 0, 1, 0);
            this.branchContainer[i].display();
            this.scene.popMatrix();
        }
    }
}