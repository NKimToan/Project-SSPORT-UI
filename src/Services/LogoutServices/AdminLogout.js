import { removeToken } from "../TokenServices/TokenService"

export const AdminLogOut = () => {
    removeToken();
};