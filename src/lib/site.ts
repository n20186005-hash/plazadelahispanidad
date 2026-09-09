/**
 * 单景点 SEO 实体绑定配置变量表
 * 全站统一从这里读取景点实体数据，确保 NAP、Schema、Meta 完全一致。
 */
export const SITE = {
  // {{DOMAIN_NAME}}
  domain: 'plazadelahispanidad.com',
  baseUrl: 'https://plazadelahispanidad.com',

  // {{ATTRACTION_FULL_NAME}} / {{ATTRACTION_SHORT_NAME}}
  fullName: 'Plaza de la Hispanidad or Spain',
  spanishFullName: 'Plaza de España o de la Hispanidad',
  shortName: 'Plaza de la Hispanidad',

  // {{CITY_NAME}} / {{STATE_PROVINCE}} / {{COUNTRY_NAME}} / {{COUNTRY_CODE_2LETTER}}
  city: 'Santo Domingo',
  region: 'Distrito Nacional',
  country: 'Dominican Republic',
  countryCode: 'DO',

  // {{POSTAL_CODE}} / {{LATITUDE}} / {{LONGITUDE}}
  postalCode: '10212',
  latitude: 18.4770613,
  longitude: -69.8832443,

  // NAP（名称、地址、电话与 Google 地图资料完全一致）
  streetAddress: 'C. La Atarazana 2',
  plusCode: 'F4G8+RP',
  phone: '+1 809-687-4750',
  phoneIntl: '+18096874750',

  // {{MAPS_SHARE_URL}} / {{MAPS_EMBED_SRC}}
  mapsShareUrl: 'https://maps.app.goo.gl/2ZEU8XMUE9WRKLa17',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6725.727594480951!2d-69.8832443!3d18.477061299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf8815898b66b1%3A0x78f335a39bb404d9!2sPlaza%20de%20la%20Hispanidad%20or%20Spain!5e1!3m2!1szh-CN!2s!4v1788946304074!5m2!1szh-CN!2s',

  // {{NEARBY_LANDMARK_1}} / {{NEARBY_LANDMARK_2}}
  nearbyLandmark1: 'Alcázar de Colón',
  nearbyLandmark2: 'Las Atarazanas Reales',

  // {{GOVT_TOURISM_URL}}
  govTourismUrl: 'https://www.mitur.gob.do/',
  govTourismPortalUrl: 'https://www.godominicanrepublic.com/',
  govCityUrl: 'https://adn.gob.do/',

  // 主视觉 / OG 图片（public 目录下的实体照片）
  heroImage: '/gallery/plaza-de-la-hispanidad-or-spain (1).jpg',

  // GA4
  gaId: 'G-HXM22WWPKP',
};

/** OG / Schema 使用的绝对图片地址 */
export const SITE_HERO_IMAGE_URL = `${SITE.baseUrl}${encodeURI(SITE.heroImage)}`;

/** 规范主页地址 */
export const SITE_URL = SITE.baseUrl;
