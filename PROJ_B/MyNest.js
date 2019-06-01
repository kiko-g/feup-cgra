/**
* MyNest
* @constructor
*/
class MyNest extends CGFobject
{
    constructor(scene, nestT, edges)
    {
        super(scene);
        if(edges <= 2) edges = 3;
        this.side = new MyCilinder(scene, 30, 3, 0.4);
        this.edges = edges;
        this.nestTex = nestT;
        this.init();
    }
    
    init()
    {
        this.nesttex = new CGFappearance(this.scene);
        this.nesttex.setAmbient(1, 1, 1, 1);
        this.nesttex.setDiffuse(1, 1, 1, 1);
        this.nesttex.setSpecular(1, 1, 1, 1);
        this.nesttex.setShininess(20);
        this.nesttex.loadTexture(this.nestTex);
        this.nesttex.setTextureWrap('REPEAT', 'REPEAT');
    }

    display()
    {
        var DTR = Math.PI / 180.0;
        var angle = DTR * 360.0 / this.edges;
        this.nesttex.apply();
        for(var i=0; i < this.edges; ++i)
        {
            this.scene.pushMatrix();
            this.scene.translate(10, 8, 10);
            this.scene.rotate(angle * i, 0, 1, 0);
            this.side.display();
            this.scene.popMatrix();
        }
    }
}