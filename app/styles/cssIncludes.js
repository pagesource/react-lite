const cssIncludes = [];

if (process.env.NODE_ENV === 'development') {
  cssIncludes.push('/public/styles/font-awesome.min.css');
}

export default cssIncludes.map((src, index) => ({
  id: `css-include-${index}`,
  src,
}));
