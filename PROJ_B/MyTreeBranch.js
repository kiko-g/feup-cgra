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
        //generating coords between m and (n+m)
        this.x = Math.random() * 3 + 15;            //this wont be used for display of trees
        this.y = 6;                                 //this wont be used for display of trees
        this.z = Math.random() * 3 + 10;            //this wont be used for display of trees
        this.rot = Math.random() * 360 * DTR;       //this wont be used for display of trees
        this.targetRadius = 3;
        this.init();
    }
    
    init()
    {
        this.woodtex = new CGFappearance(this.scene);
        this.woodtex.setAmbient(0.5, 0.5, 0.5, 1); //slightly darker
        this.woodtex.setDiffuse(0.5, 0.5, 0.5, 1); //slightly darker
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