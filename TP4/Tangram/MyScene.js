/**
* MyScene
* @constructor
*/

class MyScene extends CGFscene
{
    constructor()
    {
        super();
    }

    init(application)
    {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.quad = new MyQuad(this);
        this.tangram = new MyTangram(this);

        //------ Applied Material
        this.quadMaterial = new CGFappearance(this);
        this.quadMaterial.setAmbient(0.4, 0.3, 0.2, 1);
        this.quadMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.quadMaterial.setSpecular(0.2, 0.4, 0.5, 1);
        this.quadMaterial.setShininess(10.0);
        this.quadMaterial.loadTexture(dpp);
        this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //------
        
        //DEFAULT TEXTURE DPP --> Default png/jpg path
        var dpp = 'images/default_eder.jpg';      

        //------ Textures
        this.texture0 = new CGFtexture(this, 'images/default.png');
        this.texture1 = new CGFtexture(this, dpp);
        this.texture2 = new CGFtexture(this, 'images/board.jpg');
        this.texture3 = new CGFtexture(this, 'images/floor.png');
        this.texture4 = new CGFtexture(this, 'images/window.jpg');
        //-------

        //-------Objects connected to MyInterface
        
        this.textureIds = { '(NULL)': 0, 'Default': 1, 'Board': 2, 'Floor': 3, 'Window': 4 };
        this.wrappingS = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };
        this.wrappingT = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };
        
        this.displayMine = false;
        this.nearest = true;
        this.displayAxis = true;
        this.displayQuad = false;
        this.displayTangram = true;
        this.displayQuadMaterial = false;
        this.scaleFactor = 2;
        this.selectedTexture = 1;        
        this.wrapS = 0;
        this.wrapT = 0;
        
        this.textures = [this.texture0, this.texture1, this.texture2, this.texture3, this.texture4];
        this.texCoords = [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0];
        this.wrappingMethods = ['REPEAT', 'CLAMP_TO_EDGE', 'MIRRORED_REPEAT'];
      }

    initLights()
    {
        this.lights[0].setPosition(5, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras()
    {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance()
    {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    //Function that resets selected texture in quadMaterial
    updateAppliedTexture()
    {
        this.quadMaterial.setTexture(this.textures[this.selectedTexture]);
    }

    //Function that updates wrapping mode in quadMaterial
    updateTextureWrapping()
    {
        this.quadMaterial.setTextureWrap(this.wrappingMethods[this.wrapS], this.wrappingMethods[this.wrapT]);
    }

    //Function that updates texture coordinates in MyQuad
    updateTexCoords() 
    {
        this.quad.updateTexCoords(this.texCoords);
    }

    display()
    {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation)
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        if (this.displayAxis) this.axis.display();
        this.setDefaultAppearance();
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        
        ////////////////////////////////////////////////////////////
        // ---------- BEGIN Primitive drawing section ----------- //
        this.quadMaterial.apply();      // APPLY MATERIAL 
        
        // Dealing with checkboxes 
        // If the checkbox 'Quad Material' is UNCHECKED Minecraft block texture will be applied
        // If the checkbox 'Quad Material' is CHECKED the selected texture from 'Selected Texture' dropdown will be applied 
        if (!this.displayQuadMaterial)  this.quadMaterial.setTexture(this.textures[0]);
        else this.quadMaterial.setTexture(this.textures[this.selectedTexture]);

        this.translate(0.5, 0.5, 0.01);             // 0.01 ---> quad slightly "taller" than tangram
        if (this.displayQuad) this.quad.display();
        
        this.translate(-0.5, -0.5, -0.01);
        if (this.displayTangram) this.tangram.display();
        // -----------  END Primitive drawing section ----------- //
        ////////////////////////////////////////////////////////////
    }
}








/*

        //------ Applied Material
        
        this.quadMaterial = new CGFappearance(this);
        this.quadMaterial.setAmbient(0.4, 0.3, 0.2, 1);
        this.quadMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.quadMaterial.setSpecular(0.2, 0.4, 0.5, 1);
        this.quadMaterial.setShininess(10.0);
        this.quadMaterial.loadTexture(dpp);
        this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //------
        
        //DEFAULT TEXTURE DPP --> Default png/jpg path
        var dpp = 'images/fernandoa1.jpg';      

        //------ Textures
        this.texture0 = new CGFtexture(this, 'images/default.png');
        this.texture1 = new CGFtexture(this, dpp);
        this.texture2 = new CGFtexture(this, 'images/board.jpg');
        this.texture3 = new CGFtexture(this, 'images/floor.png');
        this.texture4 = new CGFtexture(this, 'images/window.jpg');
        this.texture5 = new CGFtexture(this, 'images/mineTop.png');
        //-------

        //-------Objects connected to MyInterface
        
        this.textureIds = { '(NULL)': 0, 'Default': 1, 'Board': 2, 'Floor': 3, 'Window': 4, 'MineTop': 5 };
        this.wrappingS = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };
        this.wrappingT = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };

*/