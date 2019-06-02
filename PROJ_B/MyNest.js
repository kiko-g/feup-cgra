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
        this.init();
    }
    
    init()
    {
        this.nesttex = new CGFappearance(this.scene);
        this.nesttex.setAmbient(1, 1, 1, 1);
        this.nesttex.setDiffuse(0.5, 0.5, 0.5, 1); //slightly darker
        this.nesttex.setSpecular(1, 1, 1, 1);
        this.nesttex.setShininess(20);
        this.nesttex.loadTexture(this.nestTex);
        this.nesttex.setTextureWrap('REPEAT', 'REPEAT');
    }

    display()
    {
        var DTR = Math.PI / 180.0;
        var angle;
        var theta = DTR * 360.0 / this.edges;
        
        this.nesttex.apply();
        for(var i=1; i <= this.edges; ++i)
        {            
            angle = i * theta;
            this.scene.pushMatrix();
            this.scene.translate(Math.sin(angle)*this.r, 10, Math.cos(angle)*this.r); //move each to its spot
            this.scene.rotate(angle, 0, 1, 0);          //rotate them around y (green) axis
            this.scene.rotate(DTR * 90, 0, 0, 1);       //cilinders are laying all in the same spot
            this.scene.scale(0.5, 7*this.r/this.edges, 0.5);
            this.scene.translate(0, -0.5, 0);
            this.side.display();
            this.scene.popMatrix();
        }
    }
}