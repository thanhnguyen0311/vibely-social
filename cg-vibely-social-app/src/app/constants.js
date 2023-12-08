import { getAccessToken } from "~/service/accountService"

export const BROKER_URL = 'ws://localhost:8080/ws'

export const VIBELY_API = "http://localhost:8080/api"

export const PROVINCES_API = "https://provinces.open-api.vn/api/?depth=2"

export const CLIENT_ID = "532640652631-tadeecfp8o33mipvo37n8fdp76vcq0i3.apps.googleusercontent.com"

export const GOOGLE_USER_INFO_API = "https://www.googleapis.com/oauth2/v2/userinfo"

export const HEADERS = {
    'Authorization': 'Bearer ' + getAccessToken(),
    'Content-Type': 'application/json'
  };
