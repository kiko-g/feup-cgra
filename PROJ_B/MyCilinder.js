/**
* MyCilinder
* @constructor
*/
class MyCilinder extends CGFobject {
    constructor(scene, slices, height, radius) {
        super(scene);
        this.slices = slices;
        this.height = height;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var theta = 0;
        var alpha = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.slices + 1; i++) {
            this.vertices.push(Math.cos(theta) * this.radius, 0, -Math.sin(theta) * this.radius);
            this.normals.push(Math.cos(theta), Math.cos(Math.PI / 4.0), -Math.sin(theta));

            this.vertices.push(Math.cos(theta) * this.radius, this.height, -Math.sin(theta) * this.radius);
            this.normals.push(Math.cos(theta), Math.cos(Math.PI / 4.0), -Math.sin(theta));

            this.texCoords.push(i / this.slices, this.height);
            this.texCoords.push(i / this.slices, 1);

            theta += alpha;
        }

        for (var i = 0; i < this.slices; i++) {
            this.indices.push(i * 2, i * 2 + 2, i * 2 + 3);
            this.indices.push(i * 2, i * 2 + 3, i * 2 + 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords(coords) {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
    }

    updateBuffers(complexity) {
        //this.slices = 5 + Math.round(5 * complexity); //complexity varies 0-1, so slices varies 5-10

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

}
