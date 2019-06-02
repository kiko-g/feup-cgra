attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;
varying float verticalOffset;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler1; //height map
uniform sampler2D uSampler2; //altimetry

void main()
{
    vTextureCoord = aTextureCoord;
    
    vec3 offset = vec3(0.0, 0.0, texture2D(uSampler1, vTextureCoord)*0.2);
    verticalOffset = offset.b;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
	vTextureCoord = aTextureCoord + vec2(1.0, 1.0);
}


// (line 17 col 70) -->    0.15
// altering this number will tweak the height of each texel
// keep in mind this will then affect the display of the objects in the scene
// and also the texture of altimetry (2.2 line 13 col 73 @ terrain.frag)