
import { jwtDecode } from "jwt-decode";
export type JwtPayload = {
  sub: string;
  scope: string;
  iss: string;
  id: number;
  exp: number;
  iat: number;
  jti: string;
}
export const decodeToken = (
  token: string
): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};