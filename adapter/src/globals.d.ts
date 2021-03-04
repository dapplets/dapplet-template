declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: SVGAElement;
  export default content;
}
