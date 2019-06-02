/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeGroupPatch extends CGFobject
{
    constructor(scene, spacing, angle, iterations, scaleFactor)
    {
        super(scene);
        this.spacing=spacing;
        this.axiom = "X";
        this.angle = angle;
        this.iterations = iterations;
        this.scaleFactor = scaleFactor;
        this.trees = [];
        this.treeRandT = [];
        for(var k=0; k<9; k++)
        {
            this.treeRandT.push(Math.random() * 0.2 + 1);      // MAX 1.2, MIN 1
            this.trees[k] = new MyLSPlant(this.scene);
            this.doGenerate = function () {
                this.trees[k].generate(
                    this.axiom,
                    {
                        "F": [ "FF" ],
                        "X": [ "F[-X][X]F[-X]+X", "F[-X][X]+X", "F[+X]-X", "F[/X][X]F[\\\\X]+X", "F[\\X][X]/X", "F[/X]\\X", "F[^X][X]F[&X]^X", "F[^X]&X", "F[&X]^X" ]
                    },
                    this.angle,
                    this.iterations,
                    this.scaleFactor
                );
            }
            this.doGenerate();
        }
        this.init();
    }

    init()
    {
    }

    display()
    {
        var counter=0;
        this.scene.pushMatrix();
        for(var j=0; j<3; j++)
        {
            for(var i=0; i<3; i++)
            {
                this.scene.translate(1, 0, 1);
                this.scene.translate(this.treeRandT[counter] * i * this.spacing*2, 0, this.treeRandT[counter] * j * this.spacing*2);
                this.trees[counter].display();
                this.scene.popMatrix();
                this.scene.pushMatrix();
                counter++;
            }
        }
        this.scene.popMatrix();
    }
    
    enableNormalViz()
    {
        this.trees.enableNormalViz();
    }
}