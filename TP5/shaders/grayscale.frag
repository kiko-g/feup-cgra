#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main()
{
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 colorGScale = color;

	colorGScale.r = color.r*0.299 + color.g*0.587 + color.b*0.114;
	colorGScale.g = color.r*0.299 + color.g*0.587 + color.b*0.114;
	colorGScale.b = color.r*0.299 + color.g*0.587 + color.b*0.114;

	gl_FragColor = colorGScale;
}

//Para tal converta todos os componentes RGB da cor para L = 0.299R + 0.587G + 0.114B.
