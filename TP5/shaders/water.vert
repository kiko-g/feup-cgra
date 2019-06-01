attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform float normScale;
uniform float speedScale;

varying vec2 vTextureCoord;
uniform sampler2D uSampler3; //watermap


void main()
{
	vTextureCoord = mod(aTextureCoord + vec2(timeFactor, timeFactor)*speedScale/100.0, vec2(1.0, 1.0));
    vec3 offset = vec3(0.0, 0.0, texture2D(uSampler3, vTextureCoord).b*normScale/100.0); //20.0 --> alter this number to change attenuation
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}