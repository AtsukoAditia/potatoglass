import axios from './../index'
import constant from '@/config/constant'

export default {

  // VENDOR MATERIAL
  material: {
    add (material) {
      return axios.post(`/vendor/material`, material)
    },
    addPHP (material) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/Material/add`, material)
    },
    edit (id, material) {
      return axios.put(`/vendor/material/${id}`, material)
    },
    editPHP (id, material) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/Material/update/${id}`, material)
    },
    delete (id) {
      return axios.delete(`/vendor/material/${id}`)
    },
    deletePHP (id) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Material/delete/${id}`)
    },
    get (skip, limit) {
      return axios.get(`/vendor/material?skip=${skip}&limit=${limit}`)
    },
    getList (skip, limit, name, mid, etalase) {
      var addons = ''
      if (name !== '') {
        addons += `&name_material_vendor=${name}`
      }
      if (mid !== '' || mid !== undefined) {
        addons += `&material_id_vendor=${mid}`
      }
      if (etalase !== '' || etalase !== undefined) {
        addons += `&filter_etalase=${etalase}`
      }
      // return axios.get(`/vendor/material?skip=${skip}&limit=${limit}&filter_name_material=${name}&filter_not_deleted=99`)
      return axios.get(`${constant.urlAPIPHP}/Vendor/Material/list?skip=${skip}&limit=${limit}${addons}`)
    },
    getListPHP (skip, limit) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Material/list?skip=${skip}&limit=${limit}`)
    },
    getRatingMaterial (id) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Material/ratting/${id}`)
    },
    getRatingMax (id) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Material/ratting_list/max/${id}`)
    },
    getRatingAvg (id) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Material/ratting_list/avg/${id}`)
    },
    getRatingMin (id) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Material/ratting_list/min/${id}`)
    },
    getMaster (name) {
      return axios.get(`/master-material?filter_name=${name}`)
    },
    getMasterMatPHP () {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Material/master`)
    },
    getMasterPHP (name) {
      var filterName = ''
      if (name !== '') {
        filterName += `material_name=${name}`
      }
      // if (cat !== '') {
      //   filterName += `&category_id=${cat}`
      // }
      return axios.get(`${constant.urlAPIPHP}/get_material?${filterName}`)
    },
    getMaterialDaerah (skip, limit, idmat, idprov, idkab) {
      return axios.get(`${constant.urlAPIPHP}/get_material_daerah?skip=${skip}&limit=${limit}&idmat=${idmat}&idprov=${idprov}&idkab=${idkab}`)
    },
    getDetail (mid) {
      return axios.get(`/vendor/material?filter_mid=${mid}`)
    },
    getCategorybyType (typeName) {
      return axios.get(`/category/${typeName}`)
    },

    addPrice (sendData) {
      return axios.post(`/vendor/material/price`, sendData)
    },
    addPriceVP (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/Material/discount`, sendData)
    },
    getDiscount (mid) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Material/discount/${mid}`)
    },
    toggleVP (mid) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Material/toggle_discount/${mid}`)
    },
    getAllPrice () {
      return axios.get(`/vendor/material/price`)
    },
    getPriceByID (id) {
      return axios.get(`/vendor/material/price/${id}`)
    },
    deletePrice (id) {
      return axios.delete(`/vendor/material/price/${id}`)
    },
    updatePrice (mid, sendData) {
      return axios.put(`/vendor/material/price/${mid}`, sendData)
    },
    uploadImage (sendData) {
      return axios({
        method: 'post',
        url: `/vendor/material/image`,
        data: sendData,
        headers: {
          'content-type': `multipart/form-data; boundary=${sendData._boundary}`
        }
      })
    },

    importStock (sendData) {
      return axios.put(`vendor/material/bulk`, sendData)
    },
    importMaterial (sendData) {
      return axios.post(`${constant.urlAPIPHP}/MasterAct/import`, sendData)
      // return axios.post(`import/material`, sendData)
    },
    importStockPHP (sendData) {
      return axios.put(`${constant.urlAPIPHP}/import_stock`, sendData)
    },
    addStock (sendData) {
      return axios.put(`vendor/material`, sendData)
    },
    addStockFuture (id, sendData) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/Material/stock_future/${id}`, sendData)
    },
    updateStock (sendData) {
      return axios.put(`vendor/material`, sendData)
    },

    toggleStatus (id) {
      return axios.put(`vendor/material/status`, id)
    },
    toggleStatusPHP (id) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Material/status/${id}`)
    },
    getDPGlobal (id) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Material/dp_global/${id}`)
    },
    setDPGlobal (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/Material/set_dp_global`, sendData)
    },
    setDPMaterial (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/Material/set_dp_material`, sendData)
    },
    getCompetitor (id, zona, kab, prov) {
      return axios.get(`${constant.urlAPIPHP}/get_competitor?id_vendor=${id}&filter_zona=${zona}&filter_kab=${kab}&filter_prov=${prov}`)
    },
    addOngkirMaterial (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/Material/set_material_info`, sendData)
    },
    getOngkirMaterial (id) {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Material/get_material_info/${id}`)
    },
    postPenawaran (sendData) {
      return axios.post(`${constant.urlAPIPHP}/in_penawaran`, sendData)
    },
    setVoucher (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Discounts/voucher`, sendData)
    },
    getVoucher (skip, limit, name) {
      return axios.get(`${constant.urlAPIPHP}/Discounts/list?limit=${limit}&skip=${skip}&filter_code=${name}`)
    },
    statusVoucher (id) {
      return axios.get(`${constant.urlAPIPHP}/Discounts/toggle/${id}`)
    },
    getExportMaterial () {
      // return axios.get(`${constant.urlAPIPHP}/media/attachment/excel/MasterMaterial.xlsx`)
      return axios.get(`${constant.urlAPIPHP}/MasterAct/export_data_material`)
    },
    getMerkMaster (skip, limit, name) {
      return axios.get(`${constant.urlAPIPHP}/Master/Category/list?type=${name}&limit=${limit}&skip=${skip}&status=1`)
    },
    getEtalase () {
      return axios.get(`${constant.urlAPIPHP}/Vendor/Etalase/list`)
    },
    addEtalase (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/Etalase/set`, sendData)
    },
    addMtrlEtalase (id, sendData) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/Etalase/relation/${id}`, sendData)
    },
    reorderEtalase (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Vendor/Etalase/set`, sendData)
    }
  }
}
