/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTerrain extends CGFobject
{
    constructor(scene) 
    {
        super(scene);
        this.scene = scene;
        this.plane = new Plane(scene, 32);
        this.init();
    }
    
    init()
    {
        // ==== Initializing Shader textures
        this.t = new CGFappearance(this.scene);
        this.t.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.t.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.t.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.t.setShininess(20.0);

        this.terraintex = new CGFtexture(this.scene, "images/terrain.jpg");
        this.terrainmap = new CGFtexture(this.scene, "images/heightmap.jpg");
        this.altimetry  = new CGFtexture(this.scene, "images/altimetry.png");
        
        this.t.setTexture(this.terraintex);
        this.t.setTextureWrap('REPEAT', 'REPEAT');
        
        
        // ==== Shaders Initialization
        this.terrainShad = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainShad.setUniformsValues({ uSampler0: 0 });   //passing TERRAIN MAP texture
        this.terrainShad.setUniformsValues({ uSampler1: 1 });   //passing TERRAIN MAP texture
        this.terrainShad.setUniformsValues({ uSampler2: 2 });   //passing ALTIMETRY texture
        
    }
    
    
    
    display()
    {   
        // BINDING SHADER TEXTURES
        this.terrainmap.bind(1);
        this.altimetry.bind(2);
        
        this.scene.pushMatrix();
        this.t.apply();
        this.scene.setActiveShader(this.terrainShad);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }    
}