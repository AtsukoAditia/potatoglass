<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
                <div id="divButton" class="d-inline-block">
                  <b-button variant="success" class="float-right btn-boma mr-2" @click="toMaterialAdd"><i
                    class="ri-bill-fill"></i>Tambah Material</b-button>
                  <b-button class="float-right btn-boma mr-2" variant="info" v-b-modal.modalImportMaterial>Bulk Update Material
                  </b-button>
                  <b-button v-b-modal.modalStock variant="info" class="float-right btn-boma mr-2">Stock</b-button>
                  <b-button v-b-modal.modalPenawaran variant="info" class="float-right btn-boma mr-2">
                    Buat Penawaran
                  </b-button>
                </div>
                <b-modal id="modalStock" centered title="Import stock by File" ok-title="Import" cancel-title="Batal"
                  @ok="actImportStock">
                  <b-container>
                    <b-row>
                      <b-col md="12">
                        <b-form-group label-for="stockFile" label="Import File Stock Material">
                          <b-form-file placeholder="Masukan file stock" id="stockFile" @change="previewFiles">
                          </b-form-file>
                        </b-form-group>
                        <vue-excel-xlsx :data="json_data" :columns="column_data" :filename="'material_stock_import'"
                          :sheetname="'data_stock'" class="btn btn-info float-right">
                          Download Template
                        </vue-excel-xlsx>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-modal>
                <b-modal id="modalPenawaran" centered title="Form Penawaran Khusus" ok-title="Kirim" @ok="sendPenawaran" @
                  cancel-title="Batal" size="xl" @show="getMaterialPenawaran">
                  <b-container>
                    <b-row class="mb-3">
                      <b-col md='4'>
                        <div class="d-block text-dark">Penawaran Invoice Nomor :
                        </div>
                      </b-col>
                      <b-col md='8' class="mb-2">
                        <b-form-input v-model="penawaranModal.invoiceNo" type="text" placeholder="-" size="sm">
                        </b-form-input>
                      </b-col>
                      <b-col md='4'>
                        <div class="d-block text-dark">Kepada :
                        </div>
                      </b-col>
                      <b-col md='8' class="mb-2">
                        <b-form-input v-model="penawaranModal.invoiceTo" type="text" placeholder="-" size="sm">
                        </b-form-input>
                      </b-col>
                      <b-col md='4'>
                        <div class="d-block text-dark">ID Proyek :
                        </div>
                      </b-col>
                      <b-col md='8' class="mb-2">
                        <b-form-input v-model="penawaranModal.proyekID" type="text" placeholder="-" size="sm">
                        </b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <div class="table-responsive">
                          <table class="table">
                            <thead class="bg-light">
                              <tr class="font-weight-bold">
                                <td>-</td>
                                <td>Material</td>
                                <td>Harga</td>
                                <td>Diskon</td>
                                <td>Harga Akhir/Unit</td>
                                <td>Stock Ready</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(input, x) in inputPenawaran" :key="x" :id="`${input.m_id}`">
                                <td>
                                  <input type="checkbox" :class="`${input.m_id}`" :value="`${input.m_id}`" v-model="mid_check" @change="onPreviewClick($event, x, input)">
                                </td>
                                <td>{{ input.alias_name }}</td>
                                <td>Rp <span :id="`pri${input.m_id}`">{{ separatorNum(input.harga_material) }}</span></td>
                                <td><input type="number" value="0" :id="`disc${input.m_id}`"></td>
                                <td>Rp <span :id="`pafter${input.m_id}`">{{ separatorNum(input.harga_material) }}</span></td>
                                <td>{{ separatorNum(input.available_stock) }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col md='4'>
                        <div class="d-block text-dark">Biaya Pengiriman :
                        </div>
                      </b-col>
                      <b-col md='8' class="mb-2">
                        <b-form-input v-model="penawaranModal.biaya_pengiriman" type="text" placeholder="-" size="sm">
                        </b-form-input>
                      </b-col>
                      <b-col md='4'>
                        <div class="d-block text-dark">Syarat Harga :
                        </div>
                      </b-col>
                      <b-col md='8' class="mb-2">
                        <b-form-input v-model="penawaranModal.syarat_harga" type="text" placeholder="-" size="sm">
                        </b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <div class="table-responsive">
                          <table class="table table-borderless">
                            <thead>
                              <tr>
                                <td>Pembayaran Termin</td>
                                <td>Offer</td>
                                <!-- <td>Status</td>
                                <td>Penawaran</td> -->
                                <td>-</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>DP</td>
                                <td>
                                  <b-input-group>
                                    <template v-slot:append>
                                      <b-input-group-text><strong>%</strong></b-input-group-text>
                                    </template>
                                    <b-form-input v-model="penawaranModal.setDP" class="inputPercentModal bg-white"></b-form-input>
                                  </b-input-group>
                                </td>
                                <td></td>
                                <!-- <td></td>
                                <td></td> -->
                              </tr>
                              <tr v-for="(input,k) in termin" :key="k" class="trtdMid">
                                <td>
                                  Termin {{ k + 1 }}
                                </td>
                                <td>
                                  <b-input-group>
                                    <template v-slot:append>
                                      <b-input-group-text><strong>%</strong></b-input-group-text>
                                    </template>
                                    <b-form-input v-model="input.persentase_termin" class="inputPercentModal bg-white">
                                    </b-form-input>
                                  </b-input-group>
                                </td>
                                <td>
                                  <b-button v-if="termin.length > 1" variant="danger" @click="removeTermin(k)">Hapus
                                  </b-button>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2"></td>
                                <td>
                                  <b-button variant="success" @click="addTermin" class="float-right">Tambah Termin
                                  </b-button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </b-col>
                    </b-row>
                    <!-- <b-row>
                      <b-col md="12">
                        <div>Biaya Pengiriman :</div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <div>Syarat Harga :</div>
                      </b-col>
                      <b-col md="3" class="mb-2">
                        <div>Pembayaran Termin :</div>
                      </b-col>
                      <b-col md="3" class="mb-2">
                        <div>Offer</div>
                      </b-col>
                      <b-col md="3" class="mb-2">
                        <div>Status</div>
                      </b-col>
                      <b-col md="3" class="mb-2">
                        <div>Penawaran</div>
                      </b-col>
                    </b-row> -->
                  </b-container>
                </b-modal>
          </template>
          <template v-slot:body>
            <b-row class="mb-2">
              <b-col lg="4" id="divSearchMaterial" class="my-1">
                <b-form-group class="mb-0" label="Pencarian Material :" label-for="filterInput">
                  <b-input-group size="sm">
                    <b-form-input v-model="filter" type="search" id="filterInput"
                      placeholder="Ketik untuk mencari material"
                      style="border-radius:3px;"></b-form-input>
                    <!-- <b-input-group-append>
                      <b-button :disabled="!filter" size="sm" @click="filter = ''">Hapus</b-button>
                    </b-input-group-append> -->
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Main table element -->
            <div id="divListMaterial">
            <b-table show-empty stacked="md" :items="getDataList" :fields="fields" :current-page="currentPage"
              :per-page="perPage" ref="dTable" :filter="filter" @filtered="onFiltered" :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc" @row-contextmenu="handleContextMenuEvent">
              <template #table-colgroup="scope">
                <col
                  v-for="field in scope.fields"
                  :key="field.key"
                  :style="{ width: field.key === 'name_material' ? '200px' : '' }"
                >
              </template>
              <template v-slot:cell(no)="row">
                <span :v-for="row">
                  {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                </span>
              </template>

              <template v-slot:cell(image)="row">
                <a :href="assetUrl + 'material/' + userrole.user.id + '/' + cekImg(row.item.image)" target="_blank">
                  <b-img :src="assetUrl + 'material/' + userrole.user.id + '/' + cekImg(row.item.image)" class="imgTBL"
                    :alt="row.item.name_material" @error="imgError"></b-img>
                </a>
              </template>

              <template v-slot:cell(name_material)="row">
                <a :href="`https://market.proyekita.id/proyekita/${row.item.m_id}`" target="_blank" class="text-dark title-material">
                {{ row.item.alias_name }}
                </a>
                <small class="d-block">SKU :
                  <span v-if="row.item.sku !== 'undefined'">{{ row.item.sku }}</span>
                  <span v-else>-</span>
                </small>
                <small class="d-block">Etalase :
                  <span v-if="row.item.etalase_potition !== 'non etalase'">{{ row.item.etalase_potition }}</span>
                  <span v-else>-</span>
                </small>
              </template>

              <template v-slot:cell(detail)="row">
                <p>
                  <span v-b-tooltip.hover title="Panjang Dimensi Barang (Cm)"><b>P</b>
                    {{ separatorNum(row.item.bdimensip) }}</span> x
                  <span v-b-tooltip.hover title="Luas Dimensi Barang (Cm)"><b>L</b>
                    {{ separatorNum(row.item.bdimensil) }}</span> x
                  <span v-b-tooltip.hover title="Tinggi Dimensi Barang (Cm)"><b>T</b>
                    {{ separatorNum(row.item.bdimensit) }}</span>
                  <span class="d-block" v-b-tooltip.hover title="Berat Barang"><b>Berat</b>
                    {{ separatorNum(row.item.bberatjenis) }} Kg</span>
                </p>
              </template>

              <template v-slot:cell(harga_material)="row">
                <button class="btn-link btn-tbl-edit text-dark" v-b-tooltip.hover title="Ubah Harga / Diskon" @click="showModalPrice(row.item)">
                Rp {{ separatorNum(row.item.harga_material) }}
                </button>
              </template>

              <template v-slot:cell(harga_pasar)="row">
                <button class="btn-link btn-tbl-edit text-dark" v-b-modal="`modalRatingHarga${row.item.m_id}`">
                  <span class="d-block text-success" v-b-tooltip.hover.bottom="'Harga tertinggi pada kategori ini'"><i class="fas fa-caret-up"></i> Rp {{ separatorNum(row.item.harga[0].harga_tertinggi) }}</span>
                  <span class="d-block text-secondary" v-b-tooltip.hover.bottom="'Harga rata-rata pada kategori ini'"><span class="font-weight-bold">-</span> Rp {{ separatorNum(row.item.harga[0].harga_rata.slice(0, -5)) }}</span>
                  <span class="d-block text-danger" v-b-tooltip.hover.bottom="'Harga terendah pada kategori ini'"><i class="fas fa-caret-down"></i> Rp {{ separatorNum(row.item.harga[0].harga_terendah) }}</span>
                </button>
              </template>

              <template v-slot:cell(available_stock)="row">
                <button class="btn-link btn-tbl-edit text-dark" v-b-tooltip.hover title="Ubah Stok Saat ini / Nanti" v-b-modal="`modalEditStock${row.item.m_id}`">
                <span v-if="row.item.available_stock != null">{{ separatorNum(row.item.available_stock) }}</span>
                <span v-else>0</span>
                <!-- <i v-if="iconEditStock" class="va-inherit ri-edit-2-fill"></i> -->
                </button>
              </template>

              <template v-slot:cell(status_material_vendor)="row">
                <div>
                  <button v-if="row.item.status_material == '1'" v-b-tooltip.hover title="Sembunyikan Material? (Draft)" @click="statusMaterial(row.item)">
                    <b-badge variant="success"><i class="va-inherit ri-eye-fill"></i> Published</b-badge>
                  </button>
                  <button v-else v-b-tooltip.hover title="Tampilkan Material? (Draft)" @click="statusMaterial(row.item)">
                    <b-badge variant="dark"><i class="va-inherit ri-eye-off-fill"></i> Draft</b-badge>
                  </button>
                </div>
                <div>
                  <!-- <span>Gabungan : </span> -->
                  <b-badge v-if="row.item.join == '1'" variant="success">Gabungan</b-badge>
                  <b-badge v-else variant="dark">Tidak Gabungan</b-badge>
                </div>
              </template>

              <template v-slot:cell(actions)="row">
                <b-dropdown id="dropdown-act" size="sm" variant="primary" text="Atur">
                  <b-dropdown-item @click="toEditMaterial(row.item.m_id)">Ubah Material</b-dropdown-item>
                  <b-dropdown-item v-b-modal="`modalEditDeliv${row.item.m_id}`">Set Ongkir </b-dropdown-item>
                  <!-- <b-dropdown-item v-b-modal="`modalEditStock${row.item.m_id}`">Set Stock</b-dropdown-item> -->
                  <!-- <b-dropdown-item @click="showModalPrice(row.item)">Set Harga / Diskon</b-dropdown-item> -->
                  <!-- <b-dropdown-item v-b-modal="`modalEditDP${row.item.m_id}`">Set Jumlah DP</b-dropdown-item> -->
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item @click="upProduk(row.item.m_id)">Naikan Highlight</b-dropdown-item>
                  <!-- <b-dropdown-item v-if="row.item.status_material == 1" @click="statusMaterial(row.item)">Sembunyikan Item</b-dropdown-item>
                  <b-dropdown-item v-else @click="statusMaterial(row.item)">Tampilkan Item</b-dropdown-item> -->
                  <b-dropdown-item @click="delMaterial(row.item)">Hapus Produk</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item v-b-modal="`modalRatingHarga${row.item.m_id}`">Rating Harga</b-dropdown-item>
                </b-dropdown>
                <!-- <b-dropdown id="dropdown-view" size="sm" variant="primary" text="Lihat" class="m-md-1">
                </b-dropdown> -->

                <b-modal :id="`modalRatingHarga${row.item.m_id}`" centered :title="`Rating Harga, ${row.item.alias_name}`" @show="getModalRating(row.item)">
                  <b-row>
                    <b-col md="6" class="text-center text-dark">
                      <div>Terendah</div>
                      <div class="font-weight-bold">Rp {{separatorNum(rating.min)}}</div>
                    </b-col>
                    <b-col md="6" class="text-center text-dark">
                      <div>Tertinggi</div>
                      <div class="font-weight-bold">Rp {{separatorNum(rating.max)}}</div>
                    </b-col>
                    <b-col md="12" class="text-center text-dark">
                      <div>Harga Rata-Rata</div>
                      <div class="font-weight-bold">Rp {{separatorNum(rating.avg)}}</div>
                    </b-col>
                  </b-row>
                  <hr>
                  <b-tabs content-class="mt-3" fill>
                    <b-tab title="Terendah" active>
                      <b-table :fields="ratingHead" :items="ratingMin">
                        <template v-slot:cell(no)="row">
                          <span :v-for="row">
                            {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                          </span>
                        </template>
                        <template v-slot:cell(material_name)="row">
                          <router-link :to="`material/${row.item.m_id}`">
                            {{ row.item.material_name }}
                          </router-link>
                        </template>
                        <template v-slot:cell(vendor_name)="row">
                          <router-link :to="`profile/${row.item.id}`">
                            {{ row.item.vendor_name }}
                          </router-link>
                        </template>
                        <template v-slot:cell(harga)="row">
                            Rp {{ separatorNum(row.item.harga) }}
                        </template>
                      </b-table>
                    </b-tab>
                    <b-tab title="Tertinggi">
                      <b-table :fields="ratingHead" :items="ratingMax">
                        <template v-slot:cell(no)="row">
                          <span :v-for="row">
                            {{ ((currentPage - 1) * perPage) + (row.index + 1) }}
                          </span>
                        </template>
                        <template v-slot:cell(material_name)="row">
                          <router-link :to="`material/${row.item.m_id}`">
                            {{ row.item.material_name }}
                          </router-link>
                        </template>
                        <template v-slot:cell(vendor_name)="row">
                          <router-link :to="`profile/${row.item.id}`">
                            {{ row.item.vendor_name }}
                          </router-link>
                        </template>
                        <template v-slot:cell(harga)="row">
                            Rp {{ separatorNum(row.item.harga) }}
                        </template>
                      </b-table>
                    </b-tab>
                  </b-tabs>
                </b-modal>

                <b-modal :id="`modalEditDeliv${row.item.m_id}`" centered :title="`Ubah Ongkos Kirim, ${row.item.alias_name}`"
                  ok-title="Ubah Ongkos Kirim" cancel-title="Batal" @ok="updateDeliv(row.item)" @show="getDeliv(row.item.m_id)" @hidden="resetDeliv">
                  <b-form-row>
                    <b-col md="4">
                      <b-form-group label="Maksimal KM" label-for="max_km">
                        <b-input-group size="md" append="KM">
                          <b-form-input class="tarvol1" v-model="deliv.max_km" id="max_km" type="text"></b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="8">
                      <b-form-group label="Biaya /KM" label-for="price_km">
                        <b-input-group size="md" prepend="Rp" append="/KM">
                          <b-form-input class="tarvol1 disvol1" v-model="deliv.price_km" id="price_km" type="text"></b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col md="4">
                      <b-form-group label="Maksimal KG" label-for="max_kg">
                        <b-input-group size="md" append="KG">
                          <b-form-input class="tarvol1" v-model="deliv.max_kg" id="max_kg" type="text"></b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="8">
                      <b-form-group label="Biaya /KG" label-for="price_kg">
                        <b-input-group size="md" prepend="Rp" append="/KG">
                          <b-form-input class="tarvol1 disvol1" v-model="deliv.price_kg" id="price_kg" type="text"></b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-form-row>
                </b-modal>

                <!-- <b-button v-b-modal="`modalEditStock${row.item.m_id}`" size="sm"
                  v-b-tooltip.top="'Ubah stok material ini'" variant="primary" class="mr-1">
                  <div data-icon="" class="icon"></div>
                </b-button> -->
                <b-modal :id="`modalEditStock${row.item.m_id}`" centered :title="`Ubah stok ${row.item.alias_name}`"
                  ok-title="Ubah stock" cancel-title="Batal" @ok="updateStock(row.item)"
                  @show="setValStock(row.item.gudang)">
                  <b-row>
                    <b-col md="12" v-for="(inp, k) in setStokGudang" :key="k">
                      <b-form-group :label="`Stok Material Pada Gudang ${inp.nama_gudang} :`" :label-for="`currentStock${inp.gudang_id}`">
                        <b-form-input :id="`currentStock${inp.gudang_id}`" v-model="inp.jumlah_material" type="text"></b-form-input>
                      </b-form-group>
                      <input type="hidden" v-model="inp.gudang_id">
                    </b-col>
                  </b-row>
                  <b-form-group class="mb-0">
                    <b-form-checkbox class="d-inline" id="checkStock" v-model="checkStock" switch @change="toggleStock">
                    </b-form-checkbox>
                    <label for="checkStock">Stok yang akan datang</label>
                  </b-form-group>
                  <!-- <b-form-group label="Stok Material Sekarang :" label-for="currentStock">
                    <b-form-input v-model="stock.jumlah_material" id="currentStock" type="text"></b-form-input>
                  </b-form-group> -->
                    <div v-if="checkStock">
                      <b-row v-for="(input,k) in stockComing" :key="k">
                        <b-col md="5">
                          <b-form-group class="mb-3" label-cols-sm="12" :label="`Stok ${ k + 1 }:`">
                            <b-input-group size="sm" append="Qty">
                              <money v-model="input.qty" v-bind="money" class="form-control tarvol1"></money>
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                        <b-col md="5">
                          <b-form-group class="mb-3" label-cols-sm="12" :label="`Tanggal Stok ${ k + 1 }`">
                              <b-form-input v-model="input.date" id="exampleInputdate" type="date" value="2019-12-18"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="2">
                          <b-form-group class="mb-3" label-cols-sm="12" label="-">
                            <b-button v-if="stockComing.length > 1" variant="danger" @click="removeStock(k)">hapus
                            </b-button>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-button variant="success" @click="addStock" class="float-right">... Tambah lagi</b-button>
                    </div>
                </b-modal>

                <!-- <b-button @click="showModalPrice(row.item)" size="sm" v-b-tooltip.top="'Ubah harga material Ini'"
                  variant="warning" class="mr-1">
                  <div data-icon="" class="icon"></div>
                </b-button> -->
                <b-modal :ref="`modalEditPrice${row.item.m_id}`" centered :title="`Ubah harga ${row.item.alias_name}`"
                  ok-title="Ubah harga" size="lg" cancel-title="Batal" @ok="updatePrice(row.item)"
                  @show="setValPrice(row.item)" @hidden="resetModalPrice">
                  <b-row>
                    <b-col md="6">
                      <b-form-group label="Harga Material Sebelumnya :" label-for="priceBefore">
                        <b-input-group size="md" prepend="Rp">
                          <b-form-input v-model="price.hargasebelum" :disabled="true" id="priceBefore" type="text">
                          </b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="6">
                      <b-form-group label="Harga Material Sekarang :" label-for="priceAfter">
                        <b-input-group size="md" prepend="Rp">
                          <b-form-input v-model="price.hargasekarang" id="priceAfter" type="text"></b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                    <b-row>
                      <b-col md="4">
                        <b-form-group class="mb-0">
                          <b-form-checkbox class="d-inline" id="checkVP" v-model="checkDisc" switch @change="toggleVP">
                          </b-form-checkbox>
                          <label for="checkVP">Diskon Grup Penjualan</label>
                        </b-form-group>
                      </b-col>
                      <b-col md="4" v-if="checkDisc == true">
                        <b-form-group label="Lama waktu diskon & Pengiriman :" label-for="dateVP">
                          <date-range-picker
                              id="dateVP"
                              ref="picker"
                              v-model="dateRangeVP"
                              style="height: 35px;line-height: 25px;"
                            >
                            </date-range-picker>
                        </b-form-group>
                      </b-col>
                      <b-col md="4" v-if="checkDisc == true">
                        <b-form-group label="Tipe Diskon :" label-for="sel_tipe_disc">
                          <select class="form-control" id="sel_tipe_disc" v-model="vp_categorynya" style="height:35px !important;line-height:35px !important;padding: 1px 10px !important;">
                            <option selected value="percent">% (Persent)</option>
                            <option value="nominal">Rp (Rupiah)</option>
                          </select>
                        </b-form-group>
                      </b-col>
                    </b-row>

                  <div v-if="checkDisc == true">
                    <b-alert :show="true" variant=" " dismissible fade  class="text-white bg-info p-2">
                      <div class="iq-alert-text">Setiap diskon yg sudah di set di material tersebut akan ada potongan <b>2%</b> untuk admin fee/administrasi layanan.</div>
                    </b-alert>
                    <b-row v-for="(input,k) in priceVP" :key="k" class="border-bottom mb-2">
                      <b-col md="4">
                        <b-form-group class="mb-3" label-cols-sm="12" :label="`Target volume penjualan ${ k + 1 }:`">
                          <b-input-group size="md" prepend="Qty">
                            <money v-model="input.min_order" v-bind="money" class="form-control disvol1"></money>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                      <b-col md="4" v-if="vp_categorynya == 'percent'">
                        <b-form-group class="mb-3" label-cols-sm="12" :label="`Discount target volume ${ k + 1 }`">
                          <b-input-group size="lg" append="%">
                            <money v-model="input.discount" v-bind="money" class="form-control tarvol1"></money>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                      <b-col md="4" v-else>
                        <b-form-group class="mb-3" label-cols-sm="12" :label="`Nominal target volume ${ k + 1 }`">
                          <b-input-group size="lg" prepend="Rp">
                            <money v-model="input.nominal" v-bind="money" class="form-control disvol1"></money>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                      <!-- <b-col md="3">
                        <b-form-group class="mb-3" label-cols-sm="12" :label="`Stok Maksimal ${ k + 1 }`">
                          <b-input-group size="lg" append="Qty">
                            <money v-model="input.max_qty" v-bind="money" class="form-control tarvol1"></money>
                          </b-input-group>
                        </b-form-group>
                      </b-col> -->
                      <b-col md="2">
                        <b-form-group class="mb-3" label-cols-sm="12" label="-">
                          <b-button v-if="priceVP.length > 2" variant="danger" @click="removePrice(k)">hapus
                          </b-button>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-button variant="success" @click="addPrice" class="float-right">... Tambah lagi</b-button>
                  </div>
                </b-modal>
                <!-- <b-button variant="warning" v-b-tooltip.top="'Setting dp untuk material ini'" size="sm" class="mr-1" @click="modalDP">%</b-button> -->
                <!-- <b-button v-b-modal="`modalEditDP${row.item.m_id}`" size="sm"
                  v-b-tooltip.top="'Ubah DP material ini'" variant="primary" class="mr-1">
                  <div data-icon="" class="icon"></div>
                </b-button> -->
                <b-modal :id="`modalEditDP${row.item.m_id}`" centered :title="`Ubah DP Pembelian ${row.item.alias_name}`"
                  ok-title="Ubah DP Pembelian" cancel-title="Batal" @ok="setDPMaterials(row.item)">
                  <b-form-group class="mb-3" label-cols-sm="12" label="Minimum DP adalah 10%">
                    <b-input-group size="lg" append="%">
                      <money v-model="dpnya2" v-bind="money" class="form-control tarvol1"></money>
                    </b-input-group>
                  </b-form-group>
                </b-modal>

                <!-- <b-button v-b-tooltip.top="'Hapus Material Ini'" size="sm" variant="danger"
                  @click="delMaterial(row.item)" class="mr-1">
                  <div data-icon="" class="icon"></div>
                </b-button> -->
                <!-- <b-form-checkbox v-if="row.item.status_material == 1" style="display:inline;" checked="true"
                  v-b-tooltip.top="'Ubah Status Material Ini'" @change="statusMaterial(row.item)" name="check-button"
                  switch></b-form-checkbox>
                <b-form-checkbox v-else checked="false" style="display:inline;"
                  v-b-tooltip.top="'Ubah Status Material Ini'" @change="statusMaterial(row.item)" name="check-button"
                  switch></b-form-checkbox> -->
                <!-- <b-button size="sm" variant="info" class="mr-1">
                  <div data-icon="" class="icon"></div>
                </b-button> -->
              </template>
            </b-table>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="12" md="6" class="my-1">
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"
          class="my-0"></b-pagination>
      </b-col>
    </b-row>

    <b-modal ref="modalMaterialImport" centered id="modalImportMaterial" title="Update semua material dengan file Excel" size="lg" @ok="submitImport">
      <b-row>
        <b-col md="6" class="border-right text-center">
          <div>
            <label class="d-block" for="downloadMtrl">Ekspor Material</label>
            <b-button variant="warning" id="downloadMtrl" @click="getEksportMaterial">Download Disini</b-button>
          </div>
        </b-col>
        <b-col md="6">
          <b-form>
            <b-form-group
              label-for="fileImportMtrl"
              label="Import Material"
            >
              <b-form-file
                placeholder="Pilih file excel material"
                v-model="excelMaterial"
                accept=".xlsx, .xls, .csv"
                id="fileImportMtrl"
              ></b-form-file>
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>
    </b-modal>

    <!-- Modal DP -->
    <b-modal id="modal-dp" ref="modal-dp" centered title="Ubah DP" @ok="setDPGlobals">
      <b-form-group class="mb-3" label-cols-sm="12" label="Minimum DP adalah 10%">
        <b-input-group size="lg" append="%">
          <money v-model="dpnya" v-bind="money" class="form-control tarvol1"></money>
        </b-input-group>
      </b-form-group>
    </b-modal>
  </b-container>
</template>
<script>
import $ from 'jquery'
import {
  core,
  brokenImage
} from '../../../config/pluginInit'
import API from '@/services/vendor/material'
import axios from 'axios'
import {
  mapGetters,
  mapActions
} from 'vuex'
import constant from '@/config/constant'
import debounce from 'lodash.debounce'
import XLSX from 'xlsx'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'
import {
  Money
} from 'v-money'
import introJS from 'intro.js'

export default {
  name: 'MaterialList',
  props: {},
  mounted () {
    core.index()

    const runIntro = localStorage.getItem('intro_v_mtrlist')
    if (runIntro !== '1') {
      introJS().setOptions({
        steps: [{
          title: 'Kita berada di halaman Produk / Material',
          intro: 'Izinkan kami untuk memandu anda mulai dari sini...'
        },
        {
          element: document.querySelector('#divButton'),
          intro: 'Daftar tombol aksi untuk keperluan tertentu'
        },
        {
          element: document.querySelector('#divSearchMaterial'),
          intro: 'Anda bisa mencari material yang anda punya disini'
        },
        {
          element: document.querySelector('#divListMaterial'),
          intro: 'Dan ini adalah daftar produk / material yang sudah anda miliki di aplikasi Proyekita.id'
        },
        {
          title: 'Selesaii!!',
          intro: 'Silahkan jelajahi menu kami...'
        }]
      }).onbeforeexit(function () {
        localStorage.setItem('intro_v_mtrlist', '1')
      }).start()
    }
  },
  data () {
    return {
      fields: [
      //   {
      //   key: 'no',
      //   label: 'No.'
      // },
        {
          key: 'image',
          label: 'Foto'
        },
        {
          key: 'name_material',
          label: 'Nama Material'
        },
        {
          key: 'detail',
          label: 'Dimensi/Berat'
        },
        {
          key: 'harga_material',
          label: 'Harga Toko',
          sortable: true
        },
        // {
        //   key: 'harga_pasar',
        //   label: 'Harga Pasar'
        // },
        {
          key: 'available_stock',
          label: 'Stok'
        },
        {
          key: 'status_material_vendor',
          label: 'Status'
        },
        {
          key: 'actions',
          label: 'Aksi'
        }
      ],
      material_m: {
        jumlah_material: ''
      },
      price: {
        hargasebelum: '',
        hargasekarang: ''
      },
      assetUrl: constant.urlAssetsPHP,
      imgSrc: null,
      totalRows: '',
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      penawaranModal: {
        invoiceNo: '',
        invoiceTo: '',
        proyekID: '',
        syarat_harga: '',
        biaya_pengiriman: '',
        setDP: ''
      },
      selMatPre: [],
      selMatP: [],
      mid_check: [],
      inputPenawaran: [{
        // material: '',
        // id: '',
        // harga: '',
        // diskon: '',
        // harga_akhir: '',
        // stock: '',
        // penawaran: ''
        m_id: '',
        diskon: null,
        price_per_unit: '',
        price_after_discount: ''
      }],
      termin: [{
        persentase_termin: ''
      }],
      deliv: {
        max_km: '',
        price_km: '',
        max_kg: '',
        price_kg: ''
      },
      dpnya: '',
      dpnya2: '',
      materialSel: [],
      impMaterial: [{
        kmaterial: ''
      }],
      file: '',
      limit_minimum_stock: '',
      material: {
        id_merk: '',
        id_satuan: '',
        material_name: '',
        build_quality: '',
        delivery_type: '',
        id_cat_rab: '',
        id_cat_pekerjaan: '',
        id_fungsi: '',
        id_bahan: '',
        id_pemasangan: '',
        alias_name: '',
        keterangan: ''
      },
      kmaterialSel: [],
      column_data: [{
        label: 'm_id',
        field: 'm_id'
      },
      {
        label: 'alias_name',
        field: 'alias_name'
      },
      {
        label: 'available_stock',
        field: 'available_stock'
      }
      ],
      json_data: [],
      jsonStockImport: null,
      fieldTblEks: [{
        label: 'id_material',
        key: 'id_material',
        field: 'id_material'
      },
      {
        label: 'gabungan',
        key: 'gabungan',
        field: 'gabungan'
      },
      {
        label: 'alias_name',
        key: 'alias_name',
        field: 'alias_name'
      },
      {
        label: 'description',
        key: 'description',
        field: 'description'
      },
      {
        label: 'jumlah_material',
        key: 'jumlah_material',
        field: 'jumlah_material'
      },
      {
        label: 'harga_material',
        key: 'harga_material',
        field: 'harga_material'
      },
      {
        label: 'harga_before',
        key: 'harga_before',
        field: 'harga_before'
      },
      {
        label: 'harga_average',
        key: 'harga_average',
        field: 'harga_average'
      },
      {
        label: 'discount_active',
        key: 'discount_active',
        field: 'discount_active'
      },
      {
        label: 'bdimensip',
        key: 'bdimensip',
        field: 'bdimensip'
      },
      {
        label: 'bdimensil',
        key: 'bdimensil',
        field: 'bdimensil'
      },
      {
        label: 'bdimensit',
        key: 'bdimensit',
        field: 'bdimensit'
      },
      {
        label: 'pdimensip',
        key: 'pdimensip',
        field: 'pdimensip'
      },
      {
        label: 'pdimensil',
        key: 'pdimensil',
        field: 'pdimensil'
      },
      {
        label: 'pdimensit',
        key: 'pdimensit',
        field: 'pdimensit'
      },
      {
        label: 'pberatjenis',
        key: 'pberatjenis',
        field: 'pberatjenis'
      },
      {
        label: 'pstatkirim',
        key: 'pstatkirim',
        field: 'pstatkirim'
      },
      {
        label: 'bstatkirim',
        key: 'bstatkirim',
        field: 'bstatkirim'
      },
      {
        label: 'startkirim',
        key: 'startkirim',
        field: 'startkirim'
      }
      ],
      dataTblEks: [],
      userrole: this.userData(),
      priceVP: [{
        min_order: '',
        discount: '',
        vp_category: '',
        nominal: ''
        // max_qty: ''
      }],
      vp_categorynya: 'percent',
      stockComing: [{
        qty: '',
        date: ''
      }],
      money: {
        thousands: '.',
        precision: 0,
        masked: false
      },
      checkDisc: false,
      checkStock: false,
      mid_d: '',
      dateRangeVP: {
        startDate: null,
        endDate: null
      },
      dateRangeDeliv: {
        startDate: null,
        endDate: null
      },
      rating: {
        max: '',
        min: '',
        avg: '',
        position: ''
      },
      ratingHead: [
        {
          key: 'no',
          label: 'No.',
          sortable: true,
          sortDirection: 'asc'
        }, {
          key: 'material_name',
          label: 'Material'
        }, {
          key: 'harga',
          label: 'Harga Toko'
        }, {
          key: 'vendor_name',
          label: 'Toko'
        }
      ],
      ratingMin: [],
      ratingAvg: [],
      ratingMax: [],
      excelMaterial: null,
      iconEditStock: false,
      iconEditPrice: false,
      setStokGudang: []
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('D MMMM YYYY')
    }
  },
  components: {
    Money,
    DateRangePicker
  },
  computed: {},
  methods: {
    ...mapActions({
      storeMaterialList: 'vendorModule/addMaterialListVendor'
    }),
    ...mapGetters({
      materialList: 'vendorModule/materialListStateVendor',
      userData: 'authModule/getUserData'
    }),

    toMaterialAdd () {
      // if (this.getUserState().verified === false) {
      //   this.$router.push({
      //     name: 'profile.edit-data-vendor'
      //   })
      // } else {
      this.$router.push({
        name: 'material.addmaterial'
      })
      // }
    },
    toTicketPage () {
      this.$router.push({
        name: 'ticket.ticket'
      })
    },
    toEditMaterial (id) {
      this.$router.replace(`/material/edit/${id}`)
    },

    previewFiles (e) {
      const files = e.target.files
      const f = files[0]
      const reader = new FileReader()
      var datanya = []
      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, {
          type: 'array'
        })
        let sheetName = workbook.SheetNames[0]
        let worksheet = workbook.Sheets[sheetName]
        datanya.push({
          bulk: XLSX.utils.sheet_to_json(worksheet)
        })
      }
      reader.readAsArrayBuffer(f)
      this.jsonStockImport = datanya
    },

    actImportStock () {
      API.material
        .importStockPHP(this.jsonStockImport[0]).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Ubah stok berhasil.')
            this.$refs.dTable.refresh()
          }
        })
    },

    getMaterialPenawaran () {
      API.material
        .getList(0, 1000, '', '', '').then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.inputPenawaran = dt.data
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
    },
    onPreviewClick (val, idx, item) {
      const mid = item.m_id
      var price = $('#pri' + mid).text()
      var fixprice = price.replace('.', '')
      if ($('.' + mid).prop('checked')) {
        $('#pafter' + mid).html(this.separatorNum(fixprice - (fixprice / 100) * $('#disc' + mid).val()))
        $('#disc' + mid).prop('readonly', true)
        const pshArr = {
          m_id: item.m_id,
          discount: parseInt($('#disc' + mid).val()),
          price_per_unit: parseInt(fixprice),
          price_after_discount: fixprice - (fixprice / 100) * $('#disc' + mid).val()
        }
        this.selMatPre.push(pshArr)
      } else {
        for (var i in this.selMatPre) {
          if (mid === this.selMatPre[i].m_id) {
            this.selMatPre.splice(i, 1)
          }
        }
        $('#disc' + mid).prop('readonly', false)
      }
      // console.log(this.selMatPre)
    },

    getDataList (ctx) {
      let currPage = (ctx.currentPage - 1) * ctx.perPage
      if (ctx.currentPage === 1) {
        currPage = 0
      }
      let name = ctx.filter
      if (name === null) {
        name = ''
      }
      return API.material
        .getList(currPage, ctx.perPage, name, '', '').then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.storeMaterialList(dt.data)
            this.json_data = dt.data
            // console.log(dt.data)
            this.totalRows = 0
            if (dt.data != null) {
              this.totalRows = dt._meta.total
            }
            const items = this.materialList()
            return items || []
          } else if (response.data.errors.length > 0) {
            this.$refs.form.setErrors(response.data.errors)
          }
        }).finally(() => {
          this.loading = false
        })
    },

    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    addOffer () {
      this.inputPenawaran.push({
        // material: '',
        // id: '',
        // harga: '',
        // diskon: '',
        // harga_akhir: '',
        // stock: '',
        // penawaran: ''
        m_id: '',
        diskon: null,
        price_per_unit: '',
        price_after_discount: ''
      })
    },
    removeOffer (index) {
      this.inputPenawaran.splice(index, 1)
    },

    addTermin () {
      this.termin.push({
        persentase_termin: ''
      })
    },
    removeTermin (index) {
      this.termin.splice(index, 1)
    },

    updateDeliv (e) {
      const deliv = this.deliv
      var fd = new FormData()
      fd.append('m_id', e.m_id)
      fd.append('biaya_per_km', deliv.price_km)
      fd.append('max_km', deliv.max_km)
      fd.append('biaya_per_kg', deliv.price_kg)
      fd.append('max_kg', deliv.max_kg)

      API.material
        .addOngkirMaterial(fd).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Ongkir berhasil di set.')
            this.$refs.dTable.refresh()
          }
        })
    },

    resetDeliv () {
      this.deliv = {
        price_km: '',
        max_km: '',
        price_kg: '',
        max_kg: ''
      }
    },

    getDeliv (id) {
      core.custLoader(true)
      API.material
        .getOngkirMaterial(id).then(response => {
          const dt = response.data.data
          if (response.status === 200) {
            this.deliv = {
              price_km: dt.biaya_per_km,
              max_km: dt.max_km,
              price_kg: dt.biaya_per_kg,
              max_kg: dt.max_kg
            }
            core.showSnackbar('success', 'Lihat data Ongkir berhasil')
          }
        }).finally(() => {
          core.custLoader(false)
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        })
    },

    getModalRating (e) {
      API.material
        .getRatingMaterial(e.id_material).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.rating = dt.data
          }
        })
      API.material
        .getRatingMax(e.id_material).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.ratingMax = dt.data
          }
        })
      API.material
        .getRatingAvg(e.id_material).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.ratingAvg = dt.data
          }
        })
      API.material
        .getRatingMin(e.id_material).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.ratingMin = dt.data
          }
        })
    },

    statusMaterial (data) {
      const edit = confirm('Ubah status ' + data.alias_name + ' ini?')
      // const id = {
      //   m_id: data.m_id
      // }
      if (edit) {
        API.material
          .toggleStatusPHP(data.m_id).then(response => {
            if (response.status === 200) {
              core.showSnackbar('success', 'Status material berhasil di ubah.')
              this.$refs.dTable.refresh()
            }
          })
      }
    },

    delMaterial (data) {
      const del = confirm('Apakah anda yakin untuk menghapus data ' + data.alias_name + ' ini?')

      if (del) {
        API.material
          .deletePHP(data.m_id).then(response => {
            if (response.status === 200) {
              core.showSnackbar('success', 'Data material berhasil di hapus.')
              this.$refs.dTable.refresh()
            }
          })
      }
    },

    setValStock (data) {
      this.setStokGudang = []
      for (var i in data) {
        const dt = data[i]
        var dtGudang = {
          gudang_id: parseInt(dt.gudang_id),
          jumlah_material: parseInt(dt.jumlah_material),
          nama_gudang: dt.nama_gudang
        }
        this.setStokGudang.push(dtGudang)
      }
    },

    updateStock (data) {
      for (var i in this.setStokGudang) {
        const dt = this.setStokGudang[i]
        var sendData = {
          m_id: data.m_id,
          jumlah_material: parseInt(dt.jumlah_material),
          gudang_id: parseInt(dt.gudang_id)
        }

        API.material
          .updateStock(sendData).then(response => {
            if (response.status === 200) {
              core.showSnackbar('success', 'Ubah stok berhasil.')
            }
          })
      }
      this.$refs.dTable.refresh()
    },

    setValPrice (data) {
      this.price.hargasebelum = this.separatorNum(data.harga_material)
    },

    updatePrice (data) {
      if (this.price.hargasekarang !== '') {
        const dataPrice = {
          harga_material: parseFloat(this.price.hargasekarang)
        // harga_before: parseFloat(this.price.hargasebelum),
        // harga_average: parseFloat(this.price.hargasekarang),
        // target_vp: 0,
        // discount: 0
        }
        API.material
          .updatePrice(data.m_id, dataPrice).then(response => {
            if (response.status === 200) {
              core.showSnackbar('success', 'Ubah harga berhasil.')
              this.price.hargasekarang = ''
              this.$refs.dTable.refresh()
            }
          })
      }
      const endD = new Date(this.dateRangeVP.endDate)
      const startD = new Date(this.dateRangeVP.startDate)
      this.priceVP[0].vp_category = this.vp_categorynya
      const dtVP = {
        m_id: data.m_id,
        vp: this.priceVP,
        disc_start: moment(startD).format('yyyy-MM-DD'),
        disc_end: moment(endD).format('yyyy-MM-DD')
      }
      API.material
        .addPriceVP(dtVP).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Ubah vp berhasil.')
            this.$refs.dTable.refresh()
          }
        })
    },

    getEksportMaterial () {
      // API.material
      //   .getExportMaterial().then(response => {
      //     if (response.status === 200) {
      //       core.showSnackbar('success', 'Ekspor data material berhasil, silahkan download...')
      //     }
      //   })
      window.location.href = `${constant.urlAPIPHP}/MasterAct/export_data_material/${this.userrole.user.id}`
    },
    submitImport () {
      core.custLoader(true)
      const fd = new FormData()
      fd.append('file', this.excelMaterial)
      fd.append('idvendor', this.userrole.user.id)
      axios.post(`${constant.urlAPIPHP}/MasterAct/import`, fd, {
        headers: {}
      }).then(response => {
        if (response.status === 200) {
          core.showSnackbar('success', 'Import material berhasil')
          this.$refs.dTable.refresh()
        }
      }).finally(() => {
        core.custLoader(false)
      }).catch(() => {
        core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
      })
    },

    setDPGlobals () {
      const ls = this.userrole
      const fd = new FormData()
      fd.append('vendor_id', ls.user.id)
      fd.append('dp', this.dpnya)
      API.material
        .setDPGlobal(fd).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Ubah dp berhasil.')
            // console.log(response)
          }
        })
    },
    setDPMaterials (dt) {
      const ls = this.userrole
      const fd = new FormData()
      fd.append('vendor_id', ls.user.id)
      fd.append('dp', this.dpnya2)
      fd.append('m_id', dt.m_id)
      API.material
        .setDPMaterial(fd).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Ubah dp berhasil.')
            // console.log(response)
          }
        })
    },

    showModalPrice (mdt) {
      core.custLoader(true)
      API.material
        .getDiscount(mdt.m_id).then(response => {
          const dt = response.data
          if (response.status) {
            this.mid_d = mdt.m_id
            if (dt.data !== '0') {
              this.vp_categorynya = dt.data[0].vp_category
              this.priceVP = dt.data
              this.$refs.dTable.refresh()
            }

            if (dt.data.length > 0 && mdt.join === '1') {
              this.dateRangeVP = {
                startDate: mdt.disc_start,
                endDate: mdt.disc_end
              }
              this.checkDisc = true
            } else {
              this.checkDisc = false
            }
          }
        }).finally(() => {
          core.custLoader(false)

          this.$refs['modalEditPrice' + mdt.m_id].show()
        })
    },
    sendPenawaran () {
      // this.inputPenawaran.m_id = this.inputPenawaran.material.m_id
      var sendData = new FormData()
      sendData.append('invoice_number', this.penawaranModal.invoiceNo)
      sendData.append('contractor_id', this.penawaranModal.invoiceTo)
      sendData.append('project_id', this.penawaranModal.proyekID)
      sendData.append('biaya_kirim', this.penawaranModal.biaya_pengiriman)
      sendData.append('set_dp', this.penawaranModal.setDP)
      sendData.append('syarat_harga', this.penawaranModal.syarat_harga)
      sendData.append('detail', JSON.stringify(this.selMatPre))
      sendData.append('termin', JSON.stringify(this.termin))

      API.material
        .postPenawaran(sendData).then(response => {
          // const res = response.data
          // console.log(res)

          core.showSnackbar('success', 'berhasil kirim penawaran.')
        }).finally(() => {
          core.custLoader(false)
        }).catch(() => {
          core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
        })
    },

    addPrice () {
      this.priceVP.push({
        min_order: '',
        discount: '',
        nominal: '',
        vp_category: this.vp_categorynya
        // max_qty: ''
      })
    },

    addStock () {
      this.stockComing.push({
        qty: '',
        date: ''
      })
    },

    removePrice (index) {
      this.priceVP.splice(index, 1)
    },

    removeStock (index) {
      this.stockComing.splice(index, 1)
    },

    toggleVP () {
      core.custLoader(true)
      API.material
        .toggleVP(this.mid_d).then(response => {
          if (response.status) {
            core.showSnackbar('success', 'Ubah status diskon berhasil.')
            this.$refs.dTable.refresh()
          }
        }).finally(() => {
          core.custLoader(false)
        })
    },
    toggleStock () {
      // core.custLoader(true)
      // API.material
      //   .toggleVP(this.mid_d).then(response => {
      //     if (response.status) {
      //       core.showSnackbar('success', 'Ubah status diskon berhasil.')
      //       this.$refs.dTable.refresh()
      //     }
      //   }).finally(() => {
      //     core.custLoader(false)
      //   })
    },

    modalDP () {
      this.$refs['modal-dp'].show()
    },

    handleContextMenuEvent (item, index, event) {
      // stop browser context menu from appearing
      event.preventDefault()
      // log the selected item to the console
      // console.log(item)
    },

    limitText (count) {
      return `and ${count} other countries`
    },
    asyncFind: debounce(
      function (name) {
        if (name) {
          API.material
            .getMaster(name).then(response => {
              this.kmaterialSel = response.data.result.result
              // this.isDisable = true
            })
        }
      }, 1000),

    moreMaterial () {
      this.impMaterial.push({
        kmaterial: ''
      })
    },
    removeMaterial (index) {
      this.impMaterial.splice(index, 1)
    },

    setDataMaterial: function () {
      for (let i = 0; i < this.impMaterial.length; i++) {
        var data = this.impMaterial
        this.dataTblEks.push({
          id_material: data[i].kmaterial.id,
          gabungan: '{ true/false }',
          alias_name: '{ Nama material }',
          description: '{ Keterangan material }',
          jumlah_material: '{ Stok Material }',
          harga_material: '{ Harga Material }',
          harga_before: '{ Harga Sebelumnya }',
          harga_average: '{ Harga Rata-Rata }',
          discount_active: '0',
          bdimensip: '{ Ukuran Dimensi Barang : Panjang }',
          bdimensil: '{ Ukuran Dimensi Barang : Lebar }',
          bdimensit: '{ Ukuran Dimensi Barang : Tinggi }',
          pdimensip: '{ Ukuran Dimensi Packaging : Panjang }',
          pdimensil: '{ Ukuran Dimensi Packaging : Lebar }',
          pdimensit: '{ Ukuran Dimensi Packaging : Tinggi }',
          pberatjenis: '{ Berat Jenis Kg/M3 }',
          pstatkirim: '1',
          bstatkirim: '{ Dikirim Menggunakan Isi 1/2/3(1: Oleh Ekspedisi, 2: Vendor kirim ke proyek, 3: Vendor kirim ke pool) }',
          startkirim: '1'
        })
      }
      return true
    },
    upProduk (id) {
      core.custLoader(true)
      axios.post(`${constant.urlAPIPHP}/highlight_material/${id}`, {
        headers: {}
      }).then(res => {
        // const dt = res.data
        if (res.status) {
          core.showSnackbar('success', 'Produk telah di naikan ke highlight')
        }
      }).finally(() => {
        core.custLoader(false)
      }).catch(() => {
        core.showSnackbar('error', 'Maaf, terjadi kesalahan pada sistem.')
      })
    },
    onCompleteImp () {
      this.$refs['modalMaterialImport'].hide()
    },
    separatorNum (val) {
      if (typeof val === 'undefined' || val === null || val === 'null') {
        return null
      }
      val = parseFloat(val)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    imgError (e) {
      e.target.src = brokenImage
    },
    cekImg (dt) {
      if (dt != null) {
        const img = dt.split(',')
        return img[0]
      } else {
        return '-'
      }
    },
    resetModalPrice () {
      this.priceVP = {
        min_order: '',
        discount: '',
        nominal: '',
        vp_category: ''
        // max_qty: ''
      }
      this.checkDisc = false
      this.price.hargasekarang = ''
    }
  }
}

</script>

<style>
  /* .iq-card-body{
  flex: unset;
} */
  .imgTBL {
    width: 60px;
    height: 60px;
    border: 1px #c3c2c252 solid;
    border-radius: 5px;
    object-fit: contain;
  }

  .title-material {
    font-size: 10pt;
    font-weight: bold;
  }

  .inputPercentModal {
    border-bottom-right-radius: 0px !important;
    border-top-right-radius: 0px !important;
    width: 0;
    height: 39px !important;
    border-top-left-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
  }

  .trtdMid>td {
    vertical-align: inherit !important;
  }

  .mlt-limitWidth>.multiselect {
    max-width: 250px !important;
  }

  /* #modalImportMaterial___BV_modal_header_,
  #modalImportMaterial___BV_modal_footer_ {
    display: none;
  } */

  #priceBefore,
  #priceAfter,
  .disvol1 {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border: 1px solid #e9edf4;
  }

  .tarvol1 {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border: 1px solid #e9edf4;
  }

  .calendars-container {
    -webkit-box-flex: 0;
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
  .reportrange-text {
    height: 35px !important;
    line-height: 25px !important;
  }
  .btn-tbl-edit {
    /* text-decoration: underline; */
  }
  .va-inherit  {
    vertical-align: inherit;
  }

  .btn-boma {
    border-radius: 3px !important;
  }
  .form-control {
    border-radius: 3px !important;
  }

</style>
