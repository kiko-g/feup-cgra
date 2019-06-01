/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeaf extends CGFobject 
{
	constructor(scene) 
	{
		super(scene);
		this.diamond = new MyDiamond(scene);

		this.material = new CGFappearance(this.scene);
        this.material.setAmbient(48/256, 153/256, 27/256, 1.0);
        this.material.setDiffuse(48/256, 153/256, 27/256, 1.0);
        this.material.setSpecular(0, 0, 0, 1.0);
        this.material.setShininess(10.0); 
		

	}
    display()
    {
		this.material.apply();
		this.scene.translate(0.3,0.3,0);
		this.scene.scale(0.3,0.3,0);
		this.diamond.display();
    }
    
    enableNormalViz()
    {
        this.MyLeaf.enableNormalViz();
    }
}
