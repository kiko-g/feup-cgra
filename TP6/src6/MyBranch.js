/**
 * MyBranch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBranch extends CGFobject 
{
	constructor(scene) 
	{
		super(scene);
		this.cilinder = new MyCilinder(scene, 4, 1, 0.2);

		this.material = new CGFappearance(this.scene);
        this.material.setAmbient(68/256,48/256, 34/256, 1.0);
        this.material.setDiffuse(68/256,48/256, 34/256, 1.0);
        this.material.setSpecular(0, 0, 0, 1.0);
        this.material.setShininess(10.0); 

	

	}
    display()
    {
		this.material.apply();
		this.cilinder.display();
    }
    
    enableNormalViz()
    {
        this.MyBranch.enableNormalViz();
    }
}
