/**
* MyTreeBranch
* @constructor
*/
class MyTreeBranch extends CGFobject
{
    constructor(scene, woodT, hor_vert)
    {
        super(scene);
        this.branch = new MyCilinder(scene, 30, 2, 0.1);
        this.woodTex = woodT;
        this.hor_vert = hor_vert;
        this.x = Math.random() * 8 + 8;             // X between 8 and 16
        this.y = 5;
        this.z = Math.random() * 10 - 4;            // Y between -4 and 10
        this.rot = Math.random() * 360 * DTR;       // Angle between 0 and 360
        this.init();
    }
    
    init()
    {
        this.woodtex = new CGFappearance(this.scene);
        this.woodtex.setAmbient(1, 1, 1, 1);
        this.woodtex.setDiffuse(1, 1, 1, 1);
        this.woodtex.setSpecular(1, 1, 1, 1);
        this.woodtex.setShininess(20);
        this.woodtex.loadTexture(this.woodTex);
        this.woodtex.setTextureWrap('REPEAT', 'REPEAT');
    }

    display()
    {
        this.scene.pushMatrix();
        //true  -> horizontal
        //false -> vertical
        if(this.hor_vert) this.scene.rotate(90 * DTR, 1, 0, 0);
        this.woodtex.apply();
        this.branch.display();
        this.scene.popMatrix();
    }
}