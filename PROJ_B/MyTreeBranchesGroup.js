/**
 * MyTreeBranchesGroup
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeBranchesGroup extends CGFobject
{
    constructor(scene, n, woodT)
    {
        super(scene);
        this.branch = new MyCilinder(scene, 30, 2, 0.1);
        this.treeRandT = []; this.treeRandS = [];
        this.n = n;
        this.woodTex = woodT;
        this.init();
        for(var k=0; k<n; k++)
        {
            this.treeRandT.push(Math.random() * 0.2 + 1);      // MAX 1.2, MIN 1
            this.treeRandS.push(Math.random() * 0.25 + 0.9);    // MAX 1.05, MIN 0.95
        }
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
        var help1=0;
        this.scene.pushMatrix();
        this.woodtex.apply();
        var count=0;
        for(var j=0; j<this.n/2; j++)
        {
            if(count > this.n) break;
            for(var i=0; i<this.n/2; i++)
            {
                this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
                if(count > this.n) break; 
                this.scene.translate(1, 0, 1);
                this.scene.translate(this.treeRandT[help1] * i * 2.2, this.treeRandT[help1] * j * 2, 0);
                this.scene.scale(this.treeRandS[help1], this.treeRandS[help1], this.treeRandS[help1]);
                this.branch.display();
                this.scene.popMatrix();
                this.scene.pushMatrix();
                help1++;
                count++;
            }
            if(count > this.n) break;
        }
        this.scene.popMatrix();
    }
    
    enableNormalViz()
    {
        // this.tree.enableNormalViz();
    }
}