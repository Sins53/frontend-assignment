declare module "*.png" {
  const value: string;
  export default value;
}

interface RouteProperties {
  path?: string;
  element: React.ReactNode;
  children?: RouteProperties[];
}
