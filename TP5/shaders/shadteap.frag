#ifdef GL_ES
precision highp float;
#endif

varying vec4 vertpos;

void main()
{
	if(vertpos.y<0.5) gl_FragColor =  vec4(0.6, 0.6, 0.9, 1.0);
    if(vertpos.y>=0.5) gl_FragColor = vec4(1, 1, 0.4, 1);
}