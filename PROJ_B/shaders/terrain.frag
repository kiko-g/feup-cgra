#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler0; //terrain
uniform sampler2D uSampler2; //altimetry

void main()
{
	vec4 color = texture2D(uSampler0, vTextureCoord);
    //vec4 color2 = texture2D(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
	gl_FragColor = color;
}