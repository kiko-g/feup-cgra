/**
* MyTreeBranch
* @constructor
*/
class MyTreeBranch extends CGFobject
{
    constructor(scene, woodT)
    {
        super(scene);
        this.branch = new MyCilinder(scene, 30, 2, 0.1);
        this.woodTex = woodT;
        this.init();
    }
    
    init()
    {
        this.woodtex = new CGFappearance(this.scene);
        this.woodtex.setAmbient(0.1, 0.1, 0.1, 1);
        this.woodtex.setDiffuse(1, 1, 1, 1);
        this.woodtex.setSpecular(1, 1, 1, 1);
        this.woodtex.setShininess(20);
        this.woodtex.loadTexture(this.woodTex);
        this.woodtex.setTextureWrap('REPEAT', 'REPEAT');
    }

    display()
    {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2.0, 1, 0, 0);
        this.woodtex.apply();
        this.branch.display();
        this.scene.popMatrix();
    }
}