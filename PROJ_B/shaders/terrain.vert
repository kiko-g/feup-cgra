attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler1; //height map
uniform sampler2D uSampler2; //altimetry

void main()
{
    vTextureCoord = aTextureCoord + vec2(1.0, 1.0)/100.0, vec2(1.0, 1.0);
    //(line 17 col 70) -->    0.1     --> alter this number to change attenuation of the terrain's height
    vec3 offset = vec3(0.0, texture2D(uSampler1, vTextureCoord)*0.1);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
	vTextureCoord = aTextureCoord + vec2(1.0, 1.0);
}