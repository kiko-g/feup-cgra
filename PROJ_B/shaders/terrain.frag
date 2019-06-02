#ifdef GL_ES
precision highp float;
#endif

varying float verticalOffset;
varying vec2 vTextureCoord;
uniform sampler2D uSampler0; //terrain
uniform sampler2D uSampler1; //heightmap
uniform sampler2D uSampler2; //altimetry

void main()
{
	vec4 color = texture2D(uSampler0, vTextureCoord);
    vec4 color2 = texture2D(uSampler2, vec2(0.0, 1.0 - verticalOffset * 5.0));
	gl_FragColor = color * 0.5 + color2 * 0.5;
}

//the heightmap.jpg texture was altered in the center as asked.
//the original image is 128 x 128 pixels and we decided to alter
//a square in the center of around 45 x 45 pixels (128/3 * 128/3)