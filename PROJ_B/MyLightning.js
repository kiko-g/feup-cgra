/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem
{
    constructor(scene)
    {
        super(scene);
        this.axiom = "X";
        this.initGrammar();
        this.generate(
            this.axiom,
            {
                "F": [ "FF" ],
                "X": [ "F[-X][X]F[-X]+FX", "F[-X-F[X]]+FF", "X[[-F+F-F]][+X][+F]-F-X" ]
            },
            25.0,
            3,
            0.5
        );


        this.material1 = new CGFappearance(this.scene);
        this.material1.setAmbient(1, 1, 1.0, 1.0);
        this.material1.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.material1.setSpecular(1, 1, 1.0, 1.0);
        this.material1.setShininess(100.0);
        
        this.time = 0;
    }

    initGrammar() {
        this.raio = new MyQuad(this.scene);

        this.grammar = {
            "F": this.raio,
            "X": this.raio
        };
    }

    update(t){
        if(this.time!=0){
            var timeNow = t - this.time;
            if(timeNow>=1000){
                this.time=0;
                this.depth = this.axiom.length;
            }
            else this.depth = this.axiom.length/(1000/timeNow);
        }

    }

    startAnimation(t){
        if (this.time == 0){
            this.depth = 0;
            this.time=t;

            this.axiom = "X";
            this.iterate();

        }
    }

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.scale(this.scale, this.scale, this.scale);

        var i;

        // percorre a cadeia de caracteres
        for (i=0; i<this.depth; ++i){

            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;
                
                case "\\":
                    this.scene.rotate(this.angle, 1, 0, 0);
                    break;

                case "/":
                    this.scene.rotate(this.angle, -1, 0, 0);
                    break;

                case "^":
                    this.scene.rotate(this.angle, 0, 1, 0);
                    break;

                case "&":
                    this.scene.rotate(this.angle, 0, -1, 1);
                    break;
                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive=this.grammar[this.axiom[i]];

                    if ( primitive )
                    {
                        
                        this.scene.pushMatrix();
                        this.material1.apply();
                        this.scene.scale(0.1,1,2);
                        primitive.display();
                        this.scene.popMatrix();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }
    
    enableNormalViz()
    {
        this.raio.enableNormalViz();
    }
    lightningOn() 
    { 
        if (this.time == 0) return false;
        else return true;
    }
}