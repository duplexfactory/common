import {AxiosHeaders, AxiosStatic} from "axios";
import dayjs from "dayjs";

declare module "axios" {
    interface AxiosRequestConfig<D = any> {
        token?: boolean
    }
}

// process.env.VUE_APP_CREDENTIAL_KEY
export const configAxiosAutoRefreshTokenInterceptor = (
    axios: AxiosStatic,
    credentialKey: string,
    refreshTokenFunction: () => Promise<{
        accessExpiresIn: number,
        accessToken: string,
    }>) => {
    axios.interceptors.request.use(async function (config) {

        if (!config.token) {
            return config;
        }

        const credential = localStorage.getCredentialData(credentialKey);
        if (!credential) {
            return config;
        }

        if (!config.headers) {
            config.headers = new AxiosHeaders();
        }

        const {
            accessExpiresAt,
            accessToken,
            refreshExpiresAt,
            refreshToken,
            userId
        } = credential;
        config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
        if (accessExpiresAt <= dayjs().add(15, "minutes").valueOf()) {
            if (refreshToken &&
                refreshExpiresAt >= Date.now()) {
                // Refresh access token.
                const data: {
                    accessExpiresIn: number,
                    accessToken: string,
                } = await refreshTokenFunction();
                localStorage.setCredentialData(credentialKey, {
                    accessExpiresAt: dayjs().add(data.accessExpiresIn, "seconds").valueOf(),
                    accessToken: data.accessToken,
                    refreshExpiresAt,
                    refreshToken,
                    userId
                });
                config.headers.Authorization = data.accessToken ? `Bearer ${data.accessToken}` : "";
            } else {
                // Cannot refresh.
            }
        }
        return config;
    });
}