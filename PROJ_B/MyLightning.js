/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends CGFobject
{
    constructor(scene, angle, iterations, scaleFactor)
    {
        super(scene);
        this.axiom = "X";
        this.angle = angle;
        this.iterations = iterations;
        this.scaleFactor = scaleFactor;

        this.lightning = new MyLSLightning(this.scene);
        this.doGenerate = function () {
            this.lightning.generate(
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

        this.init();
    }

    init()
    {
    }

    display()
    {

        this.scene.pushMatrix();
        this.scene.scale(0, 0, -1);
        this.lightning.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

    }
    
    enableNormalViz()
    {
        this.lightning.enableNormalViz();
    }
}