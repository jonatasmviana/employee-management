// import { HttpService } from '@services-gpa/_base'
// import { RemoteConfigService } from '../../remote-config/remote-config.service'
// import { getBaseUrlBypass, getRawUrlBypass } from './url-bypass.utils'

// const ORIGIN_HEADER = { 'x-origin': 'APP' }
// export class BaseService {
//   constructor(baseUrl, baseConfig = {}) {
//     this.httpService = new HttpService()
//     this.baseUrl = baseUrl
//     this.baseConfig = baseConfig
//     this.NAL_HEADER = { Accept: 'application/vnd.nal.v1.2021+json' }
//     this.OMS_HEADER = { Accept: 'application/vnd.oms.v1.2022+json' }
//   }

//   getNalHeader() {
//     return this.NAL_HEADER
//   }

//   getOMSHeader() {
//     return this.OMS_HEADER
//   }

//   static getOriginHeader() {
//     return ORIGIN_HEADER
//   }

//   mountUrl(url, useRawUrl) {
//     const BYPASS_FLAG = RemoteConfigService.getBoolean('bypass_flag')
//     const bypassRegex = RemoteConfigService.getJson('bypass_endpoints')

//     if (useRawUrl) {
//       const raw = (BYPASS_FLAG)
//         ? getRawUrlBypass(url, bypassRegex)
//         : url

//       return raw
//     }

//     const baseURL = (BYPASS_FLAG)
//       ? `${getBaseUrlBypass(url, this.baseUrl, bypassRegex)}`
//       : this.baseUrl

//     return `${baseURL}${url ? `/${url}` : ''}`
//   }

//   get(url, queryObject, settings = this.baseConfig) {
//     return this.httpService
//       .get(this.mountUrl(url, settings.useRawUrl), queryObject, settings)
//       .then((result) => result.data)
//   }

//   delete(url, id, settings = this.baseConfig) {
//     let usableUrl = url
//     if (!settings.useRawUrl) {
//       const urlId = id ? `/${id}` : ''
//       usableUrl = `${this.mountUrl(url)}${urlId}`
//     }

//     return this.httpService.delete(usableUrl, settings)
//       .then((result) => result.data)
//   }

//   patch(url, body, settings = this.baseConfig) {
//     return this.httpService
//       .patch(this.mountUrl(url, settings.useRawUrl), body, settings)
//       .then((result) => result.data)
//   }

//   post(url, body, settings = this.baseConfig) {
//     return this.httpService
//       .post(this.mountUrl(url, settings.useRawUrl), body, settings)
//       .then((result) => result.data)
//   }

//   put(url, body, settings = this.baseConfig) {
//     return this.httpService
//       .put(this.mountUrl(url, settings.useRawUrl), body, settings)
//       .then((result) => result.data)
//   }

//   noAuthenticationGet(url, queryObject, settings = this.baseConfig) {
//     return this.httpService
//       .noAuthenticationGet(
//         this.mountUrl(url, settings.useRawUrl),
//         queryObject,
//         settings,
//       )
//       .then((result) => result.data)
//   }

//   noAuthenticationPost(url, body, settings = this.baseConfig) {
//     return this.httpService
//       .noAuthenticationPost(
//         this.mountUrl(url, settings.useRawUrl),
//         body,
//         settings,
//       )
//       .then((result) => result.data)
//   }

//   noAuthenticationDelete(url, settings = this.baseConfig) {
//     return this.httpService
//       .noAuthenticationDelete(this.mountUrl(url, settings.useRawUrl), settings)
//       .then((result) => result.data)
//   }
// }
