import { removeToken } from "../TokenServices/TokenService"

export const CustomerLogOut = () => {
    removeToken();
};