#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform float timeFactor;
uniform float normScale;
uniform float speedScale;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

void main()
{
	vec4 color = texture2D(uSampler2, vTextureCoord);
	
	gl_FragColor = color;
}