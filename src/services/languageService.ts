import { getLocalization } from "./api/apiService";

var localizationMap: { [key: string]: string | Record<string, string[]> };

export async function setLocalizationMap(lang: string) {
    localizationMap = await getLocalization(lang);
}

export default function getLocalizationString(name: string) {
    return localizationMap[name];
}
