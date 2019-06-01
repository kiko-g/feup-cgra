#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler0; //terrain

void main()
{
	vec4 color = texture2D(uSampler0, vTextureCoord);
	gl_FragColor = color;
}