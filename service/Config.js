import { GoogleSignin } from "@react-native-google-signin/google-signin";
export const ConfigGoogle = ()=>{
    GoogleSignin.configure({
        iosClientId:
          "208601992373-juaqbql1borlr67elv7t50hjqvd91dn9.apps.googleusercontent.com",
        webClientId:
          "208601992373-0ktmtbfpjgg819kjssb6nbijvv5sc3ev.apps.googleusercontent.com",
      });
}