import axios from './index'
import constant from '@/config/constant'

export default {

  // VENDOR
  vendor: {
    addVendor (vendorData) {
      return axios.post(`/master-vendor`, vendorData)
    },
    addVendorPHP (vendorData) {
      return axios.post(`${constant.urlAPIPHP}/Account/addvendor/vendor`, vendorData)
    },
    editVendor (id, vendorData) {
      return axios.put(`/master-vendor/${id}`, vendorData)
    },
    editVendorPHP (vendorData) {
      return axios.post(`${constant.urlAPIPHP}/Account/update/vendor`, vendorData)
    },
    getDetailVendor (id) {
      return axios.get(`/master-vendor/${id}`)
    },
    deleteVendor (id) {
      return axios.delete(`/master-vendor/${id}`)
    },
    getAllVendor (skip, limit, name, sortby, sortdesc, status) {
      // return axios.get(`/master-vendor?skip=${skip}&limit=${limit}`)
      var addons = ''
      if (name !== '') {
        addons += `&filter_name_vendor=${name}`
      }
      if (sortby !== '') {
        addons += `&order_by=${sortby}`
      }
      if (sortdesc !== '') {
        addons += `&order_des=${sortdesc}`
      }
      if (status !== '') {
        addons += `&filter_status_vendor=${status}`
      }
      return axios.get(`${constant.urlAPIPHP}/Master/Vendor/list?skip=${skip}&limit=${limit}${addons}`)
    },
    getVendorVerif (skip, limit, name) {
      var addons = ''
      if (name !== '') {
        addons += `&filter_name_vendor=${name}`
      }
      // if (sortby !== '') {
      //   addons += `&order_by=${sortby}`
      // }
      // if (sortdesc !== '') {
      //   addons += `&order_des=${sortdesc}`
      // }
      return axios.get(`${constant.urlAPIPHP}/Master/Vendor/list?skip=${skip}&limit=${limit}&filter_status_vendor=0${addons}`)
    },
    getVerifAcc (id, status, sendData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Vendor/verified/${id}/${status}`, sendData)
    },
    registerVendor (userData) {
      // return axios.post(`${constant.urlAPIPHP}/account/register/vendor`, userData)
      return axios({
        method: 'post',
        url: `${constant.urlAPIPHP}/Account/register/vendor`,
        data: userData,
        headers: {}
      })
    }
  },

  // CONTRACTOR
  contractor: {
    addContractor (contractorData) {
      return axios.post(`/master-contractor`, contractorData)
    },
    editContractor (id, contractorData) {
      return axios.put(`/master-contractor/${id}`, contractorData)
    },
    getDetailContractor (id) {
      return axios.get(`/master-contractor/${id}`)
    },
    deleteContractor (id) {
      return axios.delete(`/master-contractor/${id}`)
    },
    getAllContractor (skip, limit) {
      return axios.get(`/master-contractor?skip=${skip}&limit=${limit}`)
    },
    getContractorVerif (skip, limit) {
      return axios.get(`${constant.urlAPIPHP}/Master/Contractor/list?skip=${skip}&limit=${limit}&verified=0`)
    },
    getVerifAccCont (id) {
      return axios.get(`${constant.urlAPIPHP}/Master/Contractor/verified/${id}`)
    }
  },

  // TYPE
  type: {
    addType (typeData) {
      return axios.post(`/master-type`, typeData)
    },
    editType (id, typeData) {
      return axios.put(`/master-type/${id}`, typeData)
    },
    deleteType (id) {
      return axios.delete(`/master-type/${id}`)
    },
    getDetailType (id) {
      return axios.get(`/master-type/${id}`)
    },
    getAllType (skip, limit) {
      return axios.get(`/master-type?skip=${skip}&limit=${limit}`)
    },
    getAllTypePHP () {
      return axios.get(`/master-type`)
    }
  },

  // User
  user: {
    addUser (userData) {
      return axios.post(`/user`, userData)
    },
    getAllUser () {
      return axios.get(`/user`)
    },
    deleteUser (id) {
      return axios.delete(`/user/${id}`)
    },
    logUser (skip, limit) {
      return axios.get(`/user-log?skip=${skip}&limit=${limit}`)
    },
    logUserPHP (id, date, skip, limit, role) {
      var addons = ''
      if (id !== '' || !id) {
        addons += `&user_id=${id}`
      }
      if (date !== '' || !date) {
        addons += `&created_at=${date}`
      }
      if (role !== '' || !role) {
        addons += `&role=${role}`
      }
      return axios.get(`${constant.urlAPIPHP}/Log/list?skip=${skip}&limit=${limit}${addons}`)
    }
  },

  // ROLE
  role: {
    addRole (roleData) {
      return axios.post(`/user-role`, roleData)
    },
    editRole (id, roleData) {
      return axios.put(`/user-role/${id}`, roleData)
    },
    deleteRole (id) {
      return axios.delete(`/user-role/${id}`)
    },
    getDetailRole (id) {
      return axios.get(`/user-role/${id}`)
    },
    getAllRole () {
      return axios.get(`/user-role`)
    }
  },

  // CATEGORY
  cat: {
    addCategory (categoryData) {
      return axios.post(`/master-category`, categoryData)
    },
    editCategory (id, categoryData) {
      return axios.put(`/master-category/${id}`, categoryData)
    },
    verifyMerk (id) {
      return axios.put(`${constant.urlAPIPHP}/Master/Category/verifycategory/${id}`)
    },
    deleteCategory (id) {
      return axios.delete(`/master-category/${id}`)
    },
    getDetailCategory (id) {
      return axios.get(`/master-category/${id}`)
    },
    getAllCategory () {
      return axios.get(`/master-category`)
    },
    getCategorybyType (typeName) {
      return axios.get(`/category/${typeName}`)
    },
    getCategorybyTypePHP (skip, limit, typeName) {
      return axios.get(`${constant.urlAPIPHP}/Master/Category/list?skip=${skip}&limit=${limit}&type=${typeName}`)
    },
    addCategoryPHP (categoryData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Category/list`, categoryData)
    },
    getMerkVerified (skip, limit, name) {
      return axios.get(`${constant.urlAPIPHP}/Master/Category/list?type=${name}&limit=${limit}&skip=${skip}&status=0`)
    }
  },

  // Wilayah
  wilayah: {
    getProv (skip, limit, name) {
      var addons = ''
      if (name !== '' || !name) {
        addons += `&filter_wilayah_name=${name}`
      }
      return axios.get(`${constant.urlAPIPHP}/Master/Wilayah/list/provinsi?skip=${skip}&limit=${limit}${addons}`)
    },
    getKab (skip, limit, name) {
      var addons = ''
      if (name !== '' || !name) {
        addons += `&filter_wilayah_name=${name}`
      }
      return axios.get(`${constant.urlAPIPHP}/Master/Wilayah/list/kabupaten?skip=${skip}&limit=${limit}${addons}`)
    },
    getKec (skip, limit, name) {
      var addons = ''
      if (name !== '' || !name) {
        addons += `&filter_wilayah_name=${name}`
      }
      return axios.get(`${constant.urlAPIPHP}/Master/Wilayah/list/kecamatan?skip=${skip}&limit=${limit}${addons}`)
    },
    getKel (skip, limit, name) {
      var addons = ''
      if (name !== '' || !name) {
        addons += `&filter_wilayah_name=${name}`
      }
      return axios.get(`${constant.urlAPIPHP}/Master/Wilayah/list/kelurahan?skip=${skip}&limit=${limit}${addons}`)
    },
    addProv (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Wilayah/add/provinsi`, sendData)
    },
    addKab (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Wilayah/add/kabupaten`, sendData)
    },
    addKec (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Wilayah/add/kecamatan`, sendData)
    },
    addKel (sendData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Wilayah/add/kelurahan`, sendData)
    },
    delProv (id) {
      return axios.get(`${constant.urlAPIPHP}/Master/Wilayah/delete/provinsi/${id}`)
    },
    delKab (id) {
      return axios.get(`${constant.urlAPIPHP}/Master/Wilayah/delete/kabupaten/${id}`)
    },
    delKec (id) {
      return axios.get(`${constant.urlAPIPHP}/Master/Wilayah/delete/kecamatan/${id}`)
    },
    delKel (id) {
      return axios.get(`${constant.urlAPIPHP}/Master/Wilayah/delete/kelurahan/${id}`)
    }
  },

  // MATERIAL
  material: {
    addMaterial (materialData) {
      return axios({
        method: 'post',
        url: `${constant.urlAPIPHP}/Master/Material/list`,
        data: materialData,
        headers: {
          'content-type': `multipart/form-data; boundary=${materialData._boundary}`
        }
      })
    },
    addMaterialPHP (materialData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Material/list`, materialData)
    },
    editMaterial (id, materialData) {
      return axios.put(`/master-material/${id}`, materialData)
    },
    editMaterialPHP (id, materialData) {
      return axios({
        method: 'post',
        url: `${constant.urlAPIPHP}/Master/Material/update/${id}`,
        data: materialData,
        headers: {
          'content-type': `multipart/form-data; boundary=${materialData._boundary}`
        }
      })
    },
    deleteMaterial (id) {
      return axios.delete(`/master-material/${id}`)
    },
    deleteMaterialPHP (id) {
      return axios.delete(`${constant.urlAPIPHP}/Master/Material/delete/${id}`)
    },
    getDetailMaterial (id) {
      return axios.get(`/master-material/${id}`)
    },
    getAllMaterial (skip, limit) {
      return axios.get(`/master-material?skip=${skip}&limit=${limit}`)
    },
    getAllMaterialPHP (skip, limit) {
      return axios.get(`${constant.urlAPIPHP}/Material/list?skip=${skip}&limit=${limit}`)
    },
    getMaster (name) {
      return axios.get(`/master-material?filter_name=${name}`)
    },
    getTemplateList () {
      return axios.get(`/rap/template`)
    },
    importMaterial (sendData) {
      return axios.post(`import/material`, sendData)
    },
    verifyCategory (id) {
      return axios.put(`${constant.urlAPIPHP}/Master/Material/verifycategory/${id}`)
    }
  },

  document: {
    getDocument (skip, limit) {
      return axios.get(`${constant.urlAPIPHP}/Master/Documents/list?skip=${skip}&limit=${limit}`)
    },
    addDocument (docData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Documents/add`, docData)
    },
    editDocument (id, docData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Documents/update/${id}`, docData)
    },
    delDocument (id, docData) {
      return axios.delete(`${constant.urlAPIPHP}/Master/Documents/delete/${id}`, docData)
    }
  },

  report: {
    materialVendor (id, skip, limit) {
      return axios.get(`/vendor/material/list?filter_material_id=${id}&skip=${skip}&limit=${limit}`)
    }
  },

  address: {
    getAddress (type, id) {
      return axios.get(`${constant.urlAPIPHP}/Address/address?${type}=${id}`)
    }
  },

  table: {
    getTable (skip, limit, name) {
      return axios.get(`${constant.urlAPIPHP}/Master/Table/list?name=${name}&skip=${skip}&limit=${limit}`)
    },
    addTable (tblData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Table/add`, tblData)
    },
    getColumn (id) {
      return axios.get(`${constant.urlAPIPHP}/Master/Table/listcolumn?table=${id}`)
    },
    getRow (id) {
      return axios.get(`${constant.urlAPIPHP}/Master/Table/listrow?table=${id}`)
    },
    addColumn (colData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Table/addcolumn`, colData)
    },
    addRow (rowData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Table/addrow`, rowData)
    },
    changeOrderCol (colData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Table/changeordercol`, colData)
    },
    changeOrderRow (colData) {
      return axios.post(`${constant.urlAPIPHP}/Master/Table/changeorderrow`, colData)
    }
  },

  menu: {
    getMenu (skip, limit) {
      return axios.get(`${constant.urlAPIPHP}/Master/Menu/listgroup?skip=${skip}&limit=${limit}`)
    },
    getListMenu (id, skip, limit) {
      return axios.get(`${constant.urlAPIPHP}/Master/Menu/listmenu?menu=${id}&skip=${skip}&limit=${limit}`)
    }
  },

  transaction: {
    getTransaction (skip, limit, name) {
      var addons = ''
      if (name !== '') {
        addons += `&filter_vendor_name=${name}`
        // addons += `&filter_vendor_name=${name}&filter_customer_name=${name}`
      }
      return axios.get(`master/transaction?skip=${skip}&limit=${limit}${addons}`)
    }
  },

  dashboard: {
    getChart () {
      return axios.get(`${constant.urlAPIPHP}/Master/dashboard`)
    }
  }
}
