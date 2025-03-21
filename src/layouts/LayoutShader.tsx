import { ReactNode } from 'react';
interface LayoutShaderProps { children: ReactNode; }
export const LayoutShader = ({ children }: LayoutShaderProps) => {
  return (<div className="layout-shader-container shader">{children}</div>)
}
