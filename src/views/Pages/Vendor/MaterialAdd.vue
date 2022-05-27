<template>
    <b-container fluid="">
      <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(addMaterialAct)">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title font-weight-bold">Kategori Material</h4>
            <span class="text-muted">Pilih kategori untuk melengkapi material yang akan anda input
              <!-- kategori material mengikuti <b>`Jenis Material yang akan Dipasarkan`</b> yang anda input pada <b>`Data Vendor`</b>, anda bisa merubahnya
              <router-link class="btn btn-link" to="/edit-data-vendor">
                <b>disini</b>
              </router-link> -->
            </span>
          </template>
          <template v-slot:body>
            <b-row align-v="center">
                <!-- <b-form-radio-group
                  v-model="selInpOption"
                  @change="optClickAct"
                  :options="selInp"
                  class="col-md-8 mb-3 text-center float-right"
                  style="font-size:13pt;"
                  value-field="id"
                  text-field="nama"
                  disabled-field="notEnabled"
                ></b-form-radio-group> -->
                <!-- <b-form-group v-if="selInpOption == 1 || selInpOption == 2 && material.katrab != '' && material.pasbidang != '' && material.bahanutama != '' && material.fungsimaterial != ''" class="col-md-12" label="Kategori Material" label-for="kmaterial"> -->
                <b-form-group class="col-md-10" id="divSelCat">
                      <multiselect v-model="material.kmaterial" label="nama_material" track-by="id" placeholder="Ketik disini untuk mencari nama material..." open-direction="bottom" :options="kmaterialSel" :searchable="true" :internal-search="false" :options-limit="10" :limit="3" :limit-text="limitText" :max-height="600" @search-change="asyncFind" @select="actSelSearch">
                      <span slot="noOptions">Maaf, pilihan tidak tersedia</span>
                      <span slot="noResult">Ups! Nama yang anda cari tidak tersedia atau belum terdaftar</span>
                      </multiselect>
                </b-form-group>
                <!-- <b-col md="2">
                  <span></span>
                  <router-link to="/material">
                    <b-button variant="info" size="lg" class="float-right mb-3">Cek Entri Material</b-button>
                  </router-link>
                </b-col> -->
                <b-col md="12">
                  <div class="text-muted">Kategori yang anda cari tidak ada? <b-button variant="link" class="font-weight-bold" v-b-modal.modalAddMaterial>Buat Baru Disini</b-button></div>
                </b-col>
            </b-row>
            <b-row v-if="material.kmaterial != ''">
                <b-col md="12">
                  <b-card style="border: 1px #e8e8e8 solid;">
                    <b-row>
                      <b-col md="12">
                        <h5>Keterangan Spesifikasi Kategori</h5>
                        <hr>
                      </b-col>
                      <b-col md="6" class="mb-2">
                        <span class="d-block font-weight-bold text-dark">Kategori di RAB</span>
                        <h4><b-badge v-for="(item, x) in id_cat_rabs" :key="x" variant="primary" class="mr-1">{{ item }}</b-badge></h4>
                      </b-col>
                      <b-col md="6" class="mb-2">
                        <span class="d-block font-weight-bold text-dark">Fungsi</span>
                        <h4><b-badge v-for="(item, x) in id_fungsis" :key="x" variant="primary" class="mr-1">{{ item }}</b-badge></h4>
                      </b-col>
                      <b-col md="6" class="mb-2">
                        <span class="d-block font-weight-bold text-dark">Bahan</span>
                        <h4><b-badge v-for="(item, x) in id_bahans" :key="x" variant="primary" class="mr-1">{{ item }}</b-badge></h4>
                      </b-col>
                      <b-col md="6" class="mb-2">
                        <span class="d-block font-weight-bold text-dark">Pemasangan</span>
                        <h4><b-badge v-for="(item, x) in id_pemasangans" :key="x" variant="primary" class="mr-1">{{ item }}</b-badge></h4>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
            </b-row>
          </template>
        </iq-card>

        <!-- <div v-if="material.kmaterial != ''"> -->
        <div>
          <b-row>
            <b-col md="6">
              <iq-card>
                <template v-slot:headerTitle>
                  <h4 class="card-title font-weight-bold">Informasi Material</h4>
                  <span class="text-muted">Lengkapi data material anda untuk di tampilkan di marketplace</span>
                </template>
                <template v-slot:body>
                  <b-row>
                    <b-col md="12">
                      <b-form-group label="* Nama Produk :" label-for="alias_name" id="divAliasName">
                        <ValidationProvider name="Nama Material" rules="required" v-slot="{ errors }">
                        <b-form-input id="alias_name" :class="(errors.length > 0 ? ' is-invalid' : '')" v-model="material.alias_name" type="text" placeholder="--"></b-form-input>
                          <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </b-form-group>
                      <b-form-group label="* Keterangan Material :" label-for="description" id="divDesc">
                        <ValidationProvider name="Deskripsi produk" rules="required" v-slot="{ errors }">
                        <ckeditor editorUrl="https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.17.1/ckeditor.js" v-model="material.description" rows="3" cols="20" id="ckfill" name="ckfill" :config="editorConfig" :class="(errors.length > 0 ? ' is-invalid' : '')"></ckeditor>
                          <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </template>
              </iq-card>
            </b-col>
            <b-col md="6">
              <iq-card>
                <template v-slot:headerTitle>
                  <h4 class="card-title font-weight-bold">Media & Atribut Material</h4>
                  <span class="text-muted">Lengkapi atribut dan gambar maupun video untuk produk anda agar pembeli lebih yakin</span>
                </template>
                <template v-slot:body>
                  <b-row>
                    <b-col md="4">
                      <b-form-group class="row mb-0" label-cols-sm="12" label="* Merk" label-for="merkmtrl" id="divMerk">
                        <ValidationProvider name="Merk Material" rules="required" v-slot="{ errors }">
                          <multiselect v-model="id_merks" deselect-label="Tidak bisa menghapus" id="merkmtrl" :custom-label="opt => merkmtrlSel.find(x => x.id == opt).name_category" placeholder="Pilih salah satu" :options="merkmtrlSel.map(x => x.id)" @select="merkSelAct" :class="(errors.length > 0 ? ' is-invalid' : '')">
                          </multiselect>
                          <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group class="row mb-0" label-cols-sm="12" label="* Kualitas Barang" label-for="gridclass" id="divKualitas">
                          <ValidationProvider name="Kualitas Barang" rules="required" v-slot="{ errors }">
                              <multiselect v-model="material.gridclass" deselect-label="Tidak bisa menghapus" id="gridclass" track-by="nama" label="nama" placeholder="Pilih salah satu" :options="gridclassSel" :allow-empty="false" :class="(errors.length > 0 ? ' is-invalid' : '')">
                              </multiselect>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                      <b-form-group class="mb-0" label="SKU :" label-for="sku">
                        <b-form-input id="sku" v-model="material.sku" type="text" placeholder="--"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col md="12">
                      <div class="text-dark">Ajukan merk baru? Klik<b-button size="sm" class="font-weight-bold" variant="link" @click="$bvModal.show('modalMerk')">disini</b-button></div>
                      <b-modal id="modalMerk" ref="modal-merk" centered hide-footer>
                        <template #modal-title>
                          Formulir mengajukan Merk baru
                        </template>
                        <b-form @submit="addNewMerk">
                          <b-form-group
                            id="input-merk-1"
                            label="Nama Merk / Brand :"
                            label-for="merk_name"
                          >
                            <b-form-input
                              id="merk_name"
                              v-model="merk.name"
                              type="text"
                              placeholder="-"
                              required
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group
                            id="input-merk-1"
                            label="Logo Merk :"
                            label-for="merk_name"
                          >
                            <b-form-file
                              v-model="merk.assets"
                              :state="Boolean(merk.assets)"
                              placeholder="Pilih file atau letakan di sini..."
                              drop-placeholder="Letakan di sini..."
                              accept=".jpg, .png, .jpeg"
                            ></b-form-file>
                          </b-form-group>
                          <span class="d-block">*) Pengajuan Merk harus disetujui Admin Proyekita.id Terlebih dahulu. Mohon ditunggu atau infokan lewat customer service</span>

                          <b-button type="submit" class="float-right" variant="primary">Ajukan</b-button>
                        </b-form>
                      </b-modal>
                    </b-col>
                    <b-col md="12">
                        <b-form-group v-if="showUplImg == true" label="* Foto Material" label-for="imageMaterial" id="divFoto">
                          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                          @vdropzone-file-added="fileAdded" @vdropzone-sending-multiple="sendingFiles" :useCustomSlot="true">
                          <div class="dropzone-custom-content">
                            <h5 class="dropzone-custom-title">Letakan atau Klik untuk pilih foto Produk</h5>
                            <div class="subtitle">Peringatan : File Foto Maks. 5 dengan Ukuran Maks. 2MB</div>
                        </div>
                          </vue-dropzone>
                      </b-form-group>
                    </b-col>
                    <b-col md="12">
                      <b-form-group label="Link Video Material :" label-for="link-yt" description="harus link youtube">
                        <b-input-group>
                        <template #prepend>
                          <b-input-group-text><i class="ri-link"></i></b-input-group-text>
                        </template>
                        <b-form-input id="link-yt" type="text" class="disvol1" placeholder="https://www.youtube.com/watch?v=GaHlJFGUoT8"></b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </template>
              </iq-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <iq-card>
                <template v-slot:headerTitle>
                  <b-badge class="float-right mt-2" v-b-modal.modalHarga style="cursor:pointer;" variant="info">Cek Harga Pasar</b-badge>
                  <h4 class="card-title font-weight-bold">Pengaturan Harga</h4>
                  <span class="text-muted">Berikan harga terbaik agar cepat laku</span>
                </template>
                <template v-slot:body>
                  <b-row>
                    <b-col md="12">
                      <b-form-group label="* Harga Saat ini" label-for="hargasekarang" id="divPrice">
                      <ValidationProvider name="Harga Material" rules="required" v-slot="{ errors }">
                        <b-input-group size="md" prepend="Rp">
                          <money v-model="material.hargasekarang" id="hargasekarang" v-bind="money" :class="'form-control' + (errors.length > 0 ? ' is-invalid' : '')"></money>
                        </b-input-group>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      </b-form-group>
                        <b-modal id="modalHarga" centered title="Harga Pasar Kategori Material" @show="getModalRating()">
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
                    </b-col>
                    <!-- <b-col md="6">
                        <b-form-group label="Stock Barang" label-for="stock">
                            <money v-model="material.stock" id="stock" v-bind="money" class="form-control"></money>
                        </b-form-group>
                    </b-col> -->
                    <br class="mb-3">
                    <b-col md="12">
                        <h5 class="mb-3" id="divDiscount">
                          <b-form-checkbox class="d-inline" v-model="checkDisc"></b-form-checkbox> Atur Diskon Untuk Grup Penjualan
                          <span v-b-tooltip.hover title="Digunakan untuk mengatur diskon penjualan berdasarkan Kuantiti pembelian"><i class="fas fa-question-circle"></i></span>
                          <div v-if="checkDisc == true" class="d-inline ml-3">
                          </div>
                          </h5>
                        <div v-if="checkDisc == true">
                          <b-row v-for="(input,k) in price" :key="k">
                            <b-col md="5">
                              <b-form-group class="mb-3" label-cols-sm="4" :label="`Target volume penjualan ${ k + 1 }:`">
                                <b-input-group size="md" prepend="Qty">
                                  <money v-model="input.min_order" v-bind="money" class="form-control disvol1"></money>
                                </b-input-group>
                              </b-form-group>
                            </b-col>
                            <b-col md="5">
                              <b-form-group class="mb-3" label-cols-sm="4" :label="`Discount target volume ${ k + 1 }`">
                                <b-input-group size="lg" append="%">
                                  <money v-model="input.discount" v-bind="money" class="form-control disvol1"></money>
                                </b-input-group>
                              </b-form-group>
                            </b-col>
                            <b-col md="1">
                              <span>
                                <b-button v-if="price.length > 2" variant="danger" @click="removePrice(k)">hapus
                                </b-button>
                              </span>
                            </b-col>
                          </b-row>
                          <b-button variant="success" @click="addPrice" class="float-right">... Tambah lagi</b-button>
                        </div>
                    </b-col>
                  </b-row>
                </template>
              </iq-card>
            </b-col>
            <b-col md="6">
              <iq-card>
                <template v-slot:headerTitle>
                  <h4 class="card-title font-weight-bold">Pengelolaan Produk</h4>
                  <span class="text-muted">Tentukan berapa banyak stok yang anda punya</span>
                </template>
                <template v-slot:body>
                  <div ref="selects">
                  <b-row v-for="(input,k) in stockGudang" :key="k" align-v="center">
                    <b-col md="6">
                      <b-form-group class="row" id="divGudang" label-cols-sm="12" label="Gudang material anda" label-for="startkirim">
                      <ValidationProvider name="Gudang" rules="required" v-slot="{ errors }">
                          <!-- <multiselect v-model="input.gudang_id" deselect-label="Tidak bisa menghapus" id="startkirim" label="nama_gudang" placeholder="Pilih Gudang barang..." :allow-empty="false" :options="startKirimSel" :class="(errors.length > 0 ? ' is-invalid' : '')">
                          </multiselect> -->
                          <b-form-select v-model="input.gudang_id" id="startkirim" :class="(errors.length > 0 ? ' is-invalid' : '')"  @input="handleChangeGudang($event)">
                            <b-form-select-option value="">Pilih Gudang anda...</b-form-select-option>
                            <b-form-select-option v-for="(sel, k) in startKirimSel" :key="k" :value="sel.gudang_id" :disabled="startKirimSelSelected.includes(sel.gudang_id)">{{ sel.nama_gudang }}</b-form-select-option>
                          </b-form-select>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                          <!-- <b-button variant="info" size="sm" class="float-right btn-boma mt-2" v-b-modal.modalAddGudang>+ Tambah Gudang Baru</b-button> -->
                    </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group class="mb-3" label="* Stok yang tersedia" label-for="stock" id="divStock">
                      <ValidationProvider name="Stok Material" rules="required" v-slot="{ errors }">
                            <money v-model="input.jumlah_material" id="stock" v-bind="money" :class="'form-control' + (errors.length > 0 ? ' is-invalid' : '')"></money>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                        </b-form-group>
                    </b-col>
                    <b-col md="2">
                      <b-form-group class="row mb-2" label-cols-sm="12" label="-" label-for="totalstock">
                        <b-button v-if="stockGudang.length > 1" variant="danger" @click="removeStockGudang(k)">hapus
                        </b-button>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  </div>
                  <b-row>
                    <b-col md="12">
                      <b-button variant="success" @click="addStockGudang" class="float-right">... Tambah lagi</b-button>
                    </b-col>
                  </b-row>
                  <!-- <b-row>
                    <b-col md="12">
                        <h5 class="mb-3" id="divStockFuture">
                          <b-form-checkbox class="d-inline" v-model="checkStock"></b-form-checkbox> Atur Stok yang akan datang
                          <span v-b-tooltip.hover title="Digunakan untuk mengatur Stok Material yang direncanakan kedepan"><i class="fas fa-question-circle"></i></span>
                        </h5>
                        <div v-if="checkStock == true">
                          <b-row v-for="(input,k) in stockComing" :key="k">
                            <b-col md="3">
                              <b-form-group class="row mb-2" label-cols-sm="12" label="Tanggal" label-for="datestock">
                                  <b-form-input id="datestock" v-model="input.date" type="date" placeholder="--"></b-form-input>
                              </b-form-group>
                            </b-col>
                            <b-col md="4">
                              <b-form-group class="row mb-2" label-cols-sm="12" label="Stok Bertambah" label-for="laterstock">
                                  <b-form-input id="laterstock" v-model="input.qty" type="number" placeholder="--"></b-form-input>
                                  <b-form-input v-model="input.gudang_id" type="hidden" :value="material.startkirim.gudang_id"></b-form-input>
                              </b-form-group>
                            </b-col>
                            <b-col md="2">
                              <b-form-group class="row mb-2" label-cols-sm="12" label="-" label-for="totalstock">
                                <b-button v-if="stockComing.length > 1" variant="danger" @click="removeStock(k)">hapus
                                </b-button>
                              </b-form-group>
                            </b-col>
                          </b-row>
                          <b-button variant="success" @click="addStock" class="float-right">... Tambah lagi</b-button>
                        </div>
                    </b-col>
                  </b-row> -->
                </template>
              </iq-card>
            </b-col>
          </b-row>

          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title font-weight-bold">Berat & Pengiriman</h4>
              <span class="text-muted">Pengaturan untuk melengkapi fitur pengiriman</span>
            </template>
            <template v-slot:body>
              <b-row>
                <!-- <b-col md="4" class="mb-3">
                  <b-form-group class="row" id="divGudang" label-cols-sm="12" label="Mulai Pengiriman Dari..." label-for="startkirim">
                      <ValidationProvider name="Gudang" rules="required" v-slot="{ errors }">
                          <multiselect v-model="material.startkirim" deselect-label="Tidak bisa menghapus" id="startkirim" label="nama_gudang" placeholder="Pilih Gudang barang..." :allow-empty="false" :options="startKirimSel" :class="(errors.length > 0 ? ' is-invalid' : '')">
                          </multiselect>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                          <b-button variant="info" size="sm" class="float-right btn-boma mt-2" v-b-modal.modalAddGudang>+ Tambah Gudang Baru</b-button>
                    </b-form-group>
                </b-col> -->
                <b-col md="4" class="mb-3">
                  <b-form-group class="row" id="divGabungan" label-cols-sm="12" label="Bisa kirim gabungan?" label-for="gabungan">
                    <ValidationProvider name="Kirim Gabungan" rules="required" v-slot="{ errors }">
                    <multiselect v-model="material.gabunganm" deselect-label="Tidak bisa menghapus" id="gabungan" track-by="nama" label="nama" placeholder="Pilih salah satu" :options="gabunganSel" :allow-empty="false" :class="(errors.length > 0 ? ' is-invalid' : '')">
                    </multiselect>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                </b-col>
                <b-col md="4" class="mb-3">
                  <b-form-group class="row" id="divFragile" label-cols-sm="12" label="Barang mudah pecah?" label-for="fragile">
                    <ValidationProvider name="Fragile" rules="required" v-slot="{ errors }">
                    <multiselect v-model="material.fragile" deselect-label="Tidak bisa menghapus" id="fragile" track-by="nama" label="nama" placeholder="Pilih salah satu" :options="fragileSel" :allow-empty="false" :class="(errors.length > 0 ? ' is-invalid' : '')">
                    </multiselect>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                  <div class="card">
                    <div class="card-body" style="border: 1px #e8e8e8 solid;border-radius: 3px;">
                      <div class="font-weight-bold text-success mb-3">
                          * Dimensi Barang
                      </div>
                      <b-form-group id="divBP" class="row mb-3" label-cols-sm="3" label="Dimensi P:" label-for="bdimensip">
                    <ValidationProvider name="Panjang" rules="required" v-slot="{ errors }">
                          <b-input-group size="md" append="CM">
                            <b-form-input id="bdimensip" v-model.number="material.bdimensip" type="number" placeholder="--" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                          </b-input-group>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      </b-form-group>
                      <b-form-group id="divBL" class="row mb-3" label-cols-sm="3" label="Dimensi L:" label-for="bdimensil">
                    <ValidationProvider name="Lebar" rules="required" v-slot="{ errors }">
                          <b-input-group size="md" append="CM">
                            <b-form-input id="bdimensil" v-model.number="material.bdimensil" type="number" placeholder="--" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                          </b-input-group>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      </b-form-group>
                      <b-form-group id="divBT" class="row mb-3" label-cols-sm="3" label="Dimensi T:" label-for="bdimensit">
                    <ValidationProvider name="Tinggi" rules="required" v-slot="{ errors }">
                          <b-input-group size="md" append="CM">
                            <b-form-input id="bdimensit" v-model.number="material.bdimensit" type="number" placeholder="--" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                          </b-input-group>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      </b-form-group>
                      <div>M3</div>
                      <b-form-group id="divBB" class="row mb-3" label-cols-sm="3" label="Berat Jenis Kg/M3:" label-for="bberatjenis">
                    <ValidationProvider name="Berat" rules="required" v-slot="{ errors }">
                          <b-input-group size="md" append="KG">
                            <b-form-input id="bberatjenis" v-model.number="material.bberatjenis" type="number" placeholder="--" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                          </b-input-group>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      </b-form-group>
                    </div>
                  </div>
                </b-col>
                <b-col md="6">
                  <div class="card">
                    <div class="card-body" style="border: 1px #e8e8e8 solid;border-radius: 3px;">
                      <div class="font-weight-bold text-success mb-3">
                           Dimensi Packaging (Sudah dalam pengemasan)

                        <b-form-checkbox
                          id="checkbox-1"
                          v-model="checkDimensi"
                          name="checkbox-1"
                        > Dimensi 5% Dari Dimensi Barang
                        </b-form-checkbox>
                      </div>
                      <b-form-group id="divPP" class="row mb-3" label-cols-sm="3" label="Dimensi P:" label-for="pdimensip">
                          <b-input-group size="md" append="CM">
                            <b-form-input id="pdimensip" v-model.number="material.pdimensip" type="number" placeholder="CM"></b-form-input>
                          </b-input-group>
                      </b-form-group>
                      <b-form-group id="divPL" class="row mb-3" label-cols-sm="3" label="Dimensi L:" label-for="pdimensil">
                          <b-input-group size="md" append="CM">
                            <b-form-input id="pdimensil" v-model.number="material.pdimensil" type="number" placeholder="CM"></b-form-input>
                          </b-input-group>
                      </b-form-group>
                      <b-form-group id="divPT" class="row mb-3" label-cols-sm="3" label="Dimensi T:" label-for="pdimensit">
                          <b-input-group size="md" append="CM">
                            <b-form-input id="pdimensit" v-model.number="material.pdimensit" type="number" placeholder="CM"></b-form-input>
                          </b-input-group>
                      </b-form-group>
                      <div>M3</div>
                      <b-form-group id="divPB" class="row mb-3" label-cols-sm="3" label="Berat Jenis Kg/M3:" label-for="pberatjenis">
                          <b-input-group size="md" append="KG">
                            <b-form-input id="pberatjenis" v-model.number="material.pberatjenis" type="number" placeholder="Kg"></b-form-input>
                          </b-input-group>
                      </b-form-group>
                    <!-- <b-form-group class="row mb-3" label-cols-sm="3" label="Status Kirim" label-for="pstatkirim">
                        <b-form-input id="pstatkirim" v-model.number="material.pstatkirim" type="text" placeholder="-"></b-form-input>
                    </b-form-group> -->
                      </div>
                    </div>
                </b-col>
              </b-row>
            </template>
          </iq-card>

          <b-row>
            <b-col lg="12">
              <div class="iq-edit-list">
                  <b-button id="divPublish" @click="statusM(1)" variant="success" type="submit" class="mb-3 float-right mr-1 btn-lg w-25 btn-boma"><i class="ri-bill-fill"></i>Publish Material</b-button>
                  <b-button id="divDraft" @click="statusM(0)" variant="warning" type="submit" class="mb-3 float-right mr-1 btn-lg w-25 btn-boma"><i class="ri-bill-fill"></i>Simpan Draft</b-button>
                  <b-button style="width:10%;" variant="secondary" class="mb-3 float-right mr-1 btn-lg btn-boma"><i class="ri-close-line"></i>Batalkan</b-button>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
      </form>
  </ValidationObserver>

    <b-modal id="modalAddMaterial" title="Formulir Pengajuan Kategori Material" size="lg" ok-title="Tambah data" cancel-title="Batal" @ok="addNewMaterial">
        <form>
          <b-container>
            <b-row>
              <b-col md="12">
                    <b-form-group
                      label-for="nama_material"
                      label="Nama Material"
                    >
                      <b-form-input id="nama_material" v-model="catMaterial.nama_material" type="text" placeholder="-"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="id_merk"
                      label="Merk"
                    >
                      <multiselect v-model="catMaterial.id_merk" id="id_merk" label="category" placeholder="Type to search" open-direction="bottom" :searchable="true" :internal-search="false" :clear-on-select="false" :options="merkSel.map(x => x.id)" :custom-label="opt => merkSel.find(x => x.id == opt).category"></multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="id_satuan"
                      label="Satuan"
                    >
                      <multiselect v-model="catMaterial.id_satuan" id="id_satuan" label="category" placeholder="Type to search" open-direction="bottom" :searchable="true" :internal-search="false" :clear-on-select="false" :options="satuanSel.map(x => x.id)" :custom-label="opt => satuanSel.find(x => x.id == opt).category"></multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                 <b-form-group
                    label-for="file"
                    label="Photo"
                  >
                    <input
                      type="file"
                      placeholder="Pilih file foto material"
                      id="file"
                      ref="file"
                      v-on:change="handleFileUpload()"
                    >
                  </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="limit_min_stock"
                      label="Minimal Stok"
                    >
                      <b-form-input id="limit_min_stock" v-model="limit_min_stock" type="number" placeholder="-"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="type_delivery"
                      label="Pengiriman"
                    >
                      <multiselect v-model="type_delivery" id="type_delivery" label="category" placeholder="Type to search" open-direction="bottom" :multiple="true" :searchable="true" :internal-search="false" :clear-on-select="false" :options="pengirimanSel.map(x => x.id)" :custom-label="opt => pengirimanSel.find(x => x.id == opt).category"></multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="id_cat_rab"
                      label="Kategori di RAB"
                    >
                      <multiselect v-model="id_cat_rab" id="id_cat_rab" label="category" placeholder="Type to search" open-direction="bottom" :multiple="true" :searchable="true" :internal-search="false" :clear-on-select="false" :options="catRABSel.map(x => x.id)" :custom-label="opt => catRABSel.find(x => x.id == opt).category">
                      </multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="id_cat_pekerjaan"
                      label="Grup Pekerjaan"
                    >
                      <multiselect v-model="id_cat_pekerjaan" id="id_cat_pekerjaan" label="category" placeholder="Type to search" open-direction="bottom" :multiple="true" :searchable="true" :internal-search="false" :clear-on-select="false" :options="catPekerjaanSel.map(x => x.id)" :custom-label="opt => catPekerjaanSel.find(x => x.id == opt).category">
                      </multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="id_fungsi"
                      label="Fungsi Material"
                    >
                      <multiselect v-model="id_fungsi" id="id_fungsi" label="category" placeholder="Type to search" open-direction="bottom" :multiple="true" :searchable="true" :internal-search="false" :clear-on-select="false" :options="fungsiSel.map(x => x.id)" :custom-label="opt => fungsiSel.find(x => x.id == opt).category">
                      </multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="id_bahan"
                      label="Bahan di RAB"
                    >
                      <multiselect v-model="id_bahan" id="id_bahan" label="category" placeholder="Type to search" open-direction="bottom" :multiple="true" :searchable="true" :internal-search="false" :clear-on-select="false" :options="bahanSel.map(x => x.id)" :custom-label="opt => bahanSel.find(x => x.id == opt).category">
                      </multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group
                      label-for="pemasanganSel"
                      label="Area Pemasangan"
                    >
                      <multiselect v-model="id_pemasangan" id="pemasanganSel" label="category" placeholder="Type to search" open-direction="bottom" :multiple="true" :searchable="true" :internal-search="false" :clear-on-select="false" :options="pemasanganSel.map(x => x.id)" :custom-label="opt => pemasanganSel.find(x => x.id == opt).category">
                      </multiselect>
                    </b-form-group>
                </b-col>
                <b-col md="12">
                    <div class="font-weight-bold text-success text-center border-bottom mb-4">
                        Dimensi Barang
                    </div>
                </b-col>
                <b-col md="4">
                    <b-form-group
                      label-for="panjang"
                      label="Panjang (Cm)"
                    >
                      <b-form-input id="panjang" v-model="catMaterial.panjang" type="number" placeholder="-"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group
                      label-for="lebar"
                      label="Lebar (Cm)"
                    >
                      <b-form-input id="lebar" v-model="catMaterial.lebar" type="number" placeholder="-"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group
                      label-for="tinggi"
                      label="Tinggi (Cm)"
                    >
                      <b-form-input id="tinggi" v-model="catMaterial.tinggi" type="number" placeholder="-"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group
                      label-for="berat"
                      label="Berat (Kg)"
                    >
                      <b-form-input id="berat" v-model="catMaterial.berat" type="number" placeholder="-"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
              <hr>
              <span class="d-block">*) Pengajuan Kategori harus disetujui Admin Proyekita.id Terlebih dahulu. Mohon ditunggu atau infokan lewat customer service</span>
          </b-container>
        </form>
    </b-modal>

  <!-- Modal Gudang -->
    <b-modal id="modalAddGudang" ref="modalAdd" title="Tambah data gudang" size="lg" ok-title="Tambah Gudang" cancel-title="Batal" @ok="addNewGudang" @show="geolocate" @hidden="resetFormGudang">
      <form>
        <b-container>
          <b-row>
            <b-col md="12">
              <b-form-group label-for="nama_gudang" label="Nama Gudang">
                <b-form-input id="nama_gudang" v-model="gudang.nama_gudang" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label-for="alamat" label="Alamat Gudang">
                <b-form-input id="alamat" v-model="gudang.alamat" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col class="mb-2" md="12">
              <b-form-group label-for="placemap" label="Tandai di Peta">
                <div>
                  <GmapAutocomplete
                  @place_changed='setPlace'
                  id="placemap"
                  class="form-control"
                  placeholder="Cari lokasi anda disini"
                />
                </div>
              </b-form-group>
            </b-col>
            <b-col md="12" class="mb-2">
              <div class="w-100 d-flex">
                <GmapMap :center="center" :zoom="18" map-style-id="roadmap" :options="mapOptions"
                style="width: 100vmax; height: 35vmin" ref="mapRefGudang" @click="handleMapClick">
                  <GmapMarker :position="marker.position" :clickable="true" :draggable="true"
                    @drag="handleMarkerDrag" @click="panToMarker" />
                </GmapMap>
              </div>
            </b-col>
            <b-col md="6">
              <b-form-group label-for="pic" label="Nama PIC">
                <b-form-input id="pic" v-model="gudang.pic" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label-for="no_telp" label="No. Telephone">
                <b-form-input id="no_telp" v-model="gudang.no_telp" type="text" placeholder="-"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
      </form>
    </b-modal>
  </b-container>
</template>
<script>
import { core, urlAssets } from '../../../config/pluginInit'
import API from '@/services/vendor/material'
import APIgudang from '@/services/vendor/warehouse'
import APIadmin from '@/services/admin'
import debounce from 'lodash.debounce'
import { mapGetters } from 'vuex'
// import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import { Money } from 'v-money'
import CKEditor from 'ckeditor4-vue'
import VueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import introJS from 'intro.js'

export default {
  name: 'MaterialAdd',
  mounted () {
    core.index()
    this.getWarehouse()
    this.getMerk('merk')

    this.getDynamicData('katRabSel', 'rab')
    this.getDynamicData('funcMaterialSel', 'fungsi')
    this.getDynamicData('bahanUtamaSel', 'bahan')
    this.getDynamicData('pasBidangSel', 'pemasangan')

    this.getDynamicData('catRABSel', 'rab')
    this.getDynamicData('catPekerjaanSel', 'pekerjaan')
    this.getDynamicData('fungsiSel', 'fungsi')
    this.getDynamicData('bahanSel', 'bahan')
    this.getDynamicData('pemasanganSel', 'pemasangan')
    this.getDynamicData('merkSel', 'merk')
    this.getDynamicData('satuanSel', 'satuan')
    this.getDynamicData('pengirimanSel', 'pengiriman')
  },
  data () {
    return {
      material: {
        katrab: '',
        katbahan: '',
        pasbidang: '',
        bahanutama: '',
        alias_name: '',
        sku: '',
        fungsimaterial: '',
        kmaterial: '',
        id_material: '',
        description: '',
        bdimensip: '',
        bdimensil: '',
        bdimensit: '',
        bberatjenis: '',
        // bstatkirim: '',
        pdimensip: '',
        pdimensil: '',
        pdimensit: '',
        pberatjenis: '',
        // pstatkirim: '',
        startkirim: '',
        gabungan: '',
        gabunganm: '',
        fragile: '',
        merkmtrl: ''
        // stock: ''
      },
      dateRange: {
        startDate: null,
        endDate: null
      },
      opens: '',
      minDate: '',
      maxDate: '',
      singleDatePicker: '',
      timePicker: '',
      timePicker24Hour: '',
      showWeekNumbers: '',
      showDropdowns: '',
      autoApply: '',
      linkedCalendars: '',
      imgMaterial: [],
      isDisable: true,
      gudang: {
        nama_gudang: '',
        alamat: '',
        no_telp: '',
        pic: '',
        lat: '',
        lng: '',
        alamat_maps: '',
        id: ''
      },
      price: [
        {
          min_order: '',
          discount: ''
        },
        {
          min_order: '',
          discount: ''
        },
        {
          min_order: '',
          discount: ''
        }
      ],
      // stockLater: [
      //   {
      //     laterstock: '',
      //     datestock: '',
      //     totalstock: ''
      //   },
      //   {
      //     laterstock: '',
      //     datestock: '',
      //     totalstock: ''
      //   }
      // ],
      merk: {
        name: '',
        type: 2,
        assets: []
      },
      fileMerk: [],
      selInpOption: '',
      selInp: [
        { id: 2, nama: ' Input Manual' },
        { id: 1, nama: ' Cari Kategori' }
      ],
      statKirimVendorSel: [
        { id: 1, nama: 'Oleh Ekspedisi' },
        { id: 2, nama: 'Vendor kirim ke proyek' },
        { id: 3, nama: 'Vendor kirim ke pool' }
      ],
      fragileSel: [
        { id: 1, nama: 'Ya, Mudah Pecah' },
        { id: 2, nama: 'Tidak, Sangat Kuat' }
      ],
      startKirimSel: [],
      startKirimSelSelected: [],
      gabunganSel: [
        { id: 1, nama: 'Bisa Kirim Gabungan' },
        { id: 0, nama: 'Tidak, Kirim Sendiri' }
      ],
      gridclassSel: [
        { id: 1, nama: 'Mewah Sekali' },
        { id: 2, nama: 'Mewah' },
        { id: 3, nama: 'Semi Mewah' },
        { id: 4, nama: 'Standard Lux' },
        { id: 5, nama: 'Standard' },
        { id: 6, nama: 'Semi Standard' },
        { id: 7, nama: 'Standard Bawah' }
      ],
      merkmtrlSel: [],
      kmaterialSel: [],
      katRabSel: [],
      funcMaterialSel: [],
      katBahanSel: [],
      pasBidangSel: [],
      bahanUtamaSel: [],
      namaMaterialSel: [
        { id: 1, nama: 'Besi Beton' },
        { id: 2, nama: 'Cat Dusemi Mewah' }
      ],
      rpPercent: [
        { value: 1, text: '%' },
        { value: 2, text: 'Rp' }
      ],
      checkDisc: false,
      checkStock: false,
      money: {
        thousands: '.',
        precision: 0,
        masked: false
      },
      id_cat_rabs: '',
      id_fungsis: '',
      id_bahans: '',
      id_pemasangans: '',
      id_merks: '',
      type_delivery: '',
      showUplImg: true,
      assetUrl: urlAssets,
      photos: '',
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
          label: 'Harga'
        }, {
          key: 'vendor_name',
          label: 'Toko'
        }
      ],
      ratingMin: [],
      ratingAvg: [],
      ratingMax: [],
      totalRows: '',
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      stockComing: [{
        qty: '',
        date: '',
        gudang_id: ''
      }],
      stockGudang: [{
        jumlah_material: '',
        gudang_id: ''
      }],
      dsbAddMaterial: '',
      catMaterial: {
        id_merk: '',
        id_satuan: '',
        nama_material: '',
        panjang: '',
        lebar: '',
        tinggi: '',
        berat: ''
      },
      id_cat_rab: '',
      id_cat_pekerjaan: '',
      id_fungsi: '',
      id_bahan: '',
      id_pemasangan: '',
      file: '',
      limit_min_stock: '',
      catRABSel: [],
      catPekerjaanSel: [],
      fungsiSel: [],
      bahanSel: [],
      pemasanganSel: [],
      pengirimanSel: [],
      satuanSel: [],
      merkSel: [],
      checkDimensi: false,
      editorConfig: {
        toolbar: [
          ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace']
        ]
      },
      status_material: '',
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 3,
        acceptedFiles: '.jpeg,.jpg,.png',
        headers: { 'My-Awesome-Header': 'header value' },
        addRemoveLinks: true,
        paramName: function (n) {
          return 'file[]'
        },
        uploadMultiple: true
      },
      marker: {
        position: {
          lat: 10,
          lng: 10
        }
      },
      center: {
        lat: -6.200000,
        lng: 106.816666
      },
      currentPlace: null,
      mapOptions: {
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        disableDefaultUi: false
      }
    }
  },
  computed: {
    ...mapGetters({
      getUserState: 'authModule/getUserData'
    })
  },
  components: {
    ckeditor: CKEditor.component,
    VueDropzone,
    // DateRangePicker,
    Money },
  watch: {
    checkDimensi (val) {
      if (val === true) {
        this.material.pdimensip = Math.ceil(this.material.bdimensip + this.material.bdimensip * 5 / 100)
        this.material.pdimensil = Math.ceil(this.material.bdimensil + this.material.bdimensil * 5 / 100)
        this.material.pdimensit = Math.ceil(this.material.bdimensit + this.material.bdimensit * 5 / 100)
        this.material.pberatjenis = Math.ceil(this.material.bberatjenis + this.material.bberatjenis * 5 / 100)
      } else {
        this.material.pdimensip = ''
        this.material.pdimensil = ''
        this.material.pdimensit = ''
        this.material.pberatjenis = ''
      }
    }
  },
  methods: {
    statusM (stat) {
      this.status_material = stat
    },
    addMaterialAct () {
      var conf
      if (this.status_material === 0) {
        conf = confirm('Data material yang disimpan dalam status Draft...')
      } else {
        conf = confirm('Data material yang disimpan akan langsung di publish...')
      }
      if (conf) {
        core.custLoader(true)
        if (this.material.kmaterial.id != null && this.material.alias_name != null && this.material.hargasekarang != null && this.stockGudang[0].jumlah_material != null && this.material.bdimensip != null && this.material.bberatjenis != null) {
          let formData = new FormData()
          formData.append('id_material', this.material.kmaterial.id)
          formData.append('alias_name', this.material.alias_name)
          formData.append('sku', this.material.sku)
          formData.append('description', this.material.description)
          formData.append('bdimensip', this.material.bdimensip)
          formData.append('bdimensil', this.material.bdimensil)
          formData.append('bdimensit', this.material.bdimensit)
          // formData.append('gudang_id', parseInt(this.material.startkirim.gudang_id))
          formData.append('gabungan', this.material.gabunganm.id)
          formData.append('bberatjenis', this.material.bberatjenis)
          formData.append('gridclass', this.material.gridclass.id)
          formData.append('fragile', this.material.fragile.id)
          formData.append('merk', this.id_merks)
          // formData.append('harga_before', parseFloat(this.material.hargasebelum))
          formData.append('harga_material', parseFloat(this.material.hargasekarang))
          formData.append('status', this.status_material)
          // for (let i = 0; i < this.imgMaterial.length; i++) {
          //   formData.append('image[]', this.imgMaterial[i])
          // }

          for (let i = 0; i < this.imgMaterial.length; i++) {
            const imgD = this.imgMaterial[i]
            for (let a = 0; a < imgD.length; a++) {
              formData.append('image[]', imgD[a])
            }
          }
          formData.append('price', this.material.hargasekarang)

          API.material
            .addPHP(formData).then(response => {
              const dt = response.data
              if (response.status === 200) {
                core.showSnackbar('success', 'Tambah material berhasil...')
                this.addStockMaterial(dt.data.m_id)
                if (this.checkDisc === true) {
                  this.addHargaMaterial(dt.data.m_id)
                }
              }
            }).catch(() => {}).finally(() => {
              core.custLoader(false)
            })
        } else {
          alert('Data kurang lengkap...')
        }
      }
    },

    fileAdded (file) {
    },
    sendingFiles (files, xhr, formData) {
      // console.log(files)
      this.imgMaterial.push(files)
      // console.log(this.imgMaterial)
    },

    merkSelAct (e) {
      this.material.merkmtrl = e
    },

    addStockMaterial (id) {
      for (let i = 0; i < this.stockGudang.length; i++) {
        const stok = this.stockGudang[i]
        const sendStock = {
          gudang_id: parseInt(stok.gudang_id),
          m_id: id,
          jumlah_material: parseInt(stok.jumlah_material)
        }

        API.material
          .addStock(sendStock).then(response => {
            if (response.status === 200) {
              if (this.checkStock === true) {
                this.addStockFuture(id)
              }

              core.showSnackbar('success', 'set stok berhasil.')
              if (this.checkDisc === false) {
                this.$router.replace('/material')
              }
            }
          })
      }
    },

    addStockFuture (id) {
      API.material
        .addStockFuture(id, this.stockComing).then(response => {
          if (response.status === 200) {
          }
        })
    },

    getModalRating () {
      API.material
        .getRatingMaterial(this.material.kmaterial.id).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.rating = dt.data
          }
        })
      API.material
        .getRatingMax(this.material.kmaterial.id).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.ratingMax = dt.data
          }
        })
      API.material
        .getRatingAvg(this.material.kmaterial.id).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.ratingAvg = dt.data
          }
        })
      API.material
        .getRatingMin(this.material.kmaterial.id).then(response => {
          const dt = response.data
          if (response.status === 200) {
            this.ratingMin = dt.data
          }
        })
    },

    toGudang () {
      this.$router.push({
        name: 'warehouse.warehouse'
      })
    },

    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },

    addNewMaterial () {
      core.custLoader(true)
      const dataPost = new FormData()
      Object.keys(this.catMaterial).forEach(key => {
        dataPost.append(key, this.catMaterial[key])
      })
      dataPost.append('type_delivery', this.joinArr(this.type_delivery))
      dataPost.append('id_cat_rab', this.joinArr(this.id_cat_rab))
      dataPost.append('id_cat_pekerjaan', this.joinArr(this.id_cat_pekerjaan))
      dataPost.append('id_fungsi', this.joinArr(this.id_fungsi))
      dataPost.append('id_bahan', this.joinArr(this.id_bahan))
      dataPost.append('id_pemasangan', this.joinArr(this.id_pemasangan))
      dataPost.append('limit_min_stock', parseInt(this.limit_min_stock))
      dataPost.append('photo', this.file)
      APIadmin.material
        .addMaterial(dataPost).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Permohpnan Kategori Material Baru telah berhasil dikirim.')

            this.catMaterial = {
              id_merk: '',
              id_satuan: '',
              nama_material: '',
              panjang: '',
              lebar: '',
              tinggi: '',
              berat: ''
            }
            this.type_delivery = ''
            this.id_cat_rab = ''
            this.id_cat_pekerjaan = ''
            this.id_fungsi = ''
            this.id_bahan = ''
            this.id_pemasangan = ''
            this.limit_min_stock = ''
            this.file = ''
          } else {
            core.showSnackbar('error', 'Permohonan Kategori Material Baru telah gagal ditambahkan.')
          }
        }).finally(() => {
          core.custLoader(false)
        })
    },

    addHargaMaterial (id) {
      const dataPrice = {
        m_id: id,
        vp: this.price
      }

      API.material
        .addPriceVP(dataPrice).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'set harga berhasil...')
            this.$router.replace('/material')
          }
        }).catch(() => {
          core.showSnackbar('error', 'set harga gagal...')
        })
    },

    uploadImage (id) {
      core.custLoader(true)
      let formData = new FormData()
      formData.append('m_id', id)
      for (let i = 0; i < this.imgMaterial.length; i++) {
        formData.append('image', this.imgMaterial[i])
      }
      API.material
        .uploadImage(formData).then(response => {
          if (response.result === 'Success') {
            core.showSnackbar('success', 'Upload gambar material berhasil...')
          }
        }).catch(() => {
          core.showSnackbar('error', 'Upload gambar material gagal...')
        })
    },

    limitText (count) {
      return `and ${count} other countries`
    },
    asyncFind: debounce(
      function (name) {
        if (name) {
          // const getUserBahan = this.getUserState.user.bahan.bahan
          // const parseBahan = JSON.parse(getUserBahan)
          // const joinBahan = parseBahan.join(',')
          API.material
            .getMasterPHP(name).then(response => {
              this.kmaterialSel = response.data.data
              // this.isDisable = true
            })
        }
      }, 1000),

    actSelSearch (data) {
      for (let i = 0; i < data.type.length; i++) {
        const dt = data.type[i]
        if (dt.type_id === '1') {
          // const id = dt.category_id.split(',')
          // this.id_bahans = id.map(Number)
          const id = dt.name_category.split(',')
          this.id_bahans = id
        }
        if (dt.type_id === '4') {
          // const id = dt.category_id.split(',')
          // this.id_cat_rabs = id.map(Number)
          const id = dt.name_category.split(',')
          this.id_cat_rabs = id
        }
        if (dt.type_id === '6') {
          // const id = dt.category_id.split(',')
          // this.id_fungsis = id.map(Number)
          const id = dt.name_category.split(',')
          this.id_fungsis = id
        }
        if (dt.type_id === '7') {
          // const id = dt.category_id.split(',')
          // this.id_pemasangans = id.map(Number)
          const id = dt.name_category.split(',')
          this.id_pemasangans = id
        }
        if (dt.type_id === '2') {
          const id = dt.category_id
          this.id_merks = id.toString()
          // this.id_merks.name_category = dt.name_category
        }
      }
      // const selectField = [
      //   ['katrabSel', data.category_rab],
      //   ['pasbidangSel', data.pemasangan],
      //   ['bahanutamaSel', data.bahan],
      //   ['funcmaterialSel', data.fungsi]
      // ]
      // for (var i in selectField) {
      //   this[selectField[i][0]] = [{ category: selectField[i][1] }]
      // }
      this.material = {
        katrab: this.pushFunction('category', this.katrabSel),
        pasbidang: this.pushFunction('category', this.pasbidangSel),
        bahanutama: this.pushFunction('category', this.bahanutamaSel),
        fungsimaterial: this.pushFunction('category', this.funcmaterialSel),
        id_material: data.id
      }
      // this.imgMaterial = data.photo
      // console.log(this.material)
    },

    handleChangeGudang (e) {
      this.startKirimSelSelected = [...this.$refs.selects.children].map(select => {
        return select.children[0].children[0].children[1].children[0].children[0].value
      })
    },
    getWarehouse () {
      return APIgudang
        .getList(0, 100).then(response => {
          if (response.status) {
            if (response.data._meta.total < 1) {
              const conf = confirm('Anda belum menambahkan gudang penyimpanan, tambah terlebih dahulu sebelum menambah produk/material')
              if (conf) {
                this.$router.push({
                  name: 'warehouse.warehouse'
                })
              }
            } else {
              this.startKirimSel = response.data.data

              const runIntro = localStorage.getItem('intro_v_mtrladd')
              if (runIntro !== '1') {
                introJS().setOptions({
                  steps: [{
                    title: 'Kita berada di halaman Tambah Produk / Material',
                    intro: 'Izinkan kami untuk memandu anda mulai dari sini...'
                  },
                  {
                    element: document.querySelector('#divSelCat'),
                    intro: 'Isi kategori material yang akan anda tambahkan di toko, kategori sangat diperlukan untuk pencarian'
                  },
                  {
                    element: document.querySelector('#divAliasName'),
                    intro: 'Buat nama material anda agar dapat di temukan di marketplace'
                  },
                  {
                    element: document.querySelector('#divDesc'),
                    intro: 'Isi keterangan material/produk yang akan anda daftarkan dengan sebaik dan sejelas mungkin'
                  },
                  {
                    element: document.querySelector('#divMerk'),
                    intro: 'Pilih merk pada material/produk anda'
                  },
                  {
                    element: document.querySelector('#divKualitas'),
                    intro: 'Perkirakan kualitas material/produk anda agar lebih terspesifikasi'
                  },
                  {
                    element: document.querySelector('#divFoto'),
                    intro: 'Tambahkan foto material/produk agar pembeli lebih jelas melihat barang'
                  },
                  {
                    element: document.querySelector('#divPrice'),
                    intro: 'Tentukan harga material/produk yang akan anda jual di marketplace'
                  },
                  {
                    element: document.querySelector('#divDiscount'),
                    intro: 'Anda juga bisa mengatur diskon penjualan dengan sistem kuantiti'
                  },
                  {
                    element: document.querySelector('#divStock'),
                    intro: 'Tentukan stok material/produk anda yang tersedia saat ini'
                  },
                  {
                    element: document.querySelector('#divStockFuture'),
                    intro: 'Anda juga bisa mengatur stok yang akan datang kedepannya'
                  },
                  {
                    element: document.querySelector('#divGudang'),
                    intro: 'Pilih gudang penyimpanan barang anda untuk material/produk yang akan anda tambahkan'
                  },
                  {
                    element: document.querySelector('#divGabungan'),
                    intro: 'Sistem ini digunakan untuk pembelian bersama dan dapat lebih menarik minat beli'
                  },
                  {
                    element: document.querySelector('#divFragile'),
                    intro: 'Apakah material/produk yang akan anda jual bersifat mudah pecah? Mohon pilih dengan hati hati'
                  },
                  {
                    element: document.querySelector('#divBP'),
                    intro: 'Sesuaikan `Dimensi Panjang` pada material/produk anda'
                  },
                  {
                    element: document.querySelector('#divBL'),
                    intro: 'Sesuaikan `Dimensi Lebar` pada material/produk anda'
                  },
                  {
                    element: document.querySelector('#divBT'),
                    intro: 'Sesuaikan `Dimensi Tinggi` pada material/produk anda'
                  },
                  {
                    element: document.querySelector('#divBB'),
                    intro: 'Sesuaikan `Berat` pada material/produk anda'
                  },
                  {
                    element: document.querySelector('#divPP'),
                    intro: 'Sesuaikan `Dimensi Packaging Panjang` pada material/produk anda'
                  },
                  {
                    element: document.querySelector('#divPL'),
                    intro: 'Sesuaikan `Dimensi Packaging Lebar` pada material/produk anda'
                  },
                  {
                    element: document.querySelector('#divPT'),
                    intro: 'Sesuaikan `Dimensi Packaging Tinggi` pada material/produk anda'
                  },
                  {
                    element: document.querySelector('#divPB'),
                    intro: 'Sesuaikan `Dimensi Packaging Berat` pada material/produk anda'
                  },
                  {
                    element: document.querySelector('#divDraft'),
                    intro: 'Jika dirasa sudah semua informasi di isi, anda bisa menyimpan data dengan status `Draft` terlebih dahulu'
                  },
                  {
                    element: document.querySelector('#divPublish'),
                    intro: 'Simpan dan tampilkan langsung produk anda di marketplace'
                  },
                  {
                    title: 'Selesaii!!',
                    intro: 'Anda sudah siap untuk menambah barang, silahkan mencoba!'
                  }]
                }).onbeforeexit(function () {
                  localStorage.setItem('intro_v_mtrladd', '1')
                }).start()
              }
            }
          } else if (response.data.errors.length > 0) {
            this.$refs.dTable.setErrors(response.data.errors)
          }
        }).catch(() => {}).finally(() => {
          this.loading = false
        })
    },

    getMerk (merk) {
      return API.material
        .getMerkMaster(0, 1000, 'merk').then(response => {
          const dt = response.data
          if (response.status) {
            this.merkmtrlSel = dt.data
          } else if (response.data.errors.length > 0) {
            this.$refs.dTable.setErrors(response.data.errors)
          }
        }).catch(() => {}).finally(() => {
          this.loading = false
        })
    },

    pushFunction (k, v) {
      const ad = []
      ad.push({ [k]: v })
      return ad
    },

    optClickAct (arg) {
      arg === 2 ? this.isDisable = false : this.isDisable = true

      this.material = {
        kmaterial: '',
        katrab: '',
        pasbidang: '',
        bahanutama: '',
        fungsimaterial: ''
      }
    },

    getDynamicData (fieldName, colName) {
      API.material
        .getCategorybyType(colName).then(response => {
          if (response.status === 200) {
            this[fieldName] = response.data.result
          }
        }).finally(() => { this.loading = false })
    },

    addPrice () {
      this.price.push({
        min_order: '',
        discount: ''
      })
    },

    removePrice (index) {
      this.price.splice(index, 1)
    },

    addStock () {
      this.stockComing.push({
        qty: '',
        date: '',
        gudang_id: parseInt(this.material.startkirim.gudang_id)
      })
    },

    addStockGudang () {
      this.stockGudang.push({
        jumlah_material: '',
        gudang_id: ''
      })
    },

    removeStockGudang (index) {
      this.stockGudang.splice(index, 1)
    },

    removeStock (index) {
      this.stockComing.splice(index, 1)
    },

    updateValues () {
    },
    checkOpen () {
    },

    previewImage: function (event) {
      this.imgMaterial = []
      var selectedFiles = event.target.files
      if (selectedFiles.length > 4) {
        document.getElementById('inputImgMaterial').value = null
        alert('Maksimal gambar material adalah 4')
      } else {
        for (let i = 0; i < selectedFiles.length; i++) {
          this.imgMaterial.push(selectedFiles[i])

          let reader = new FileReader()
          reader.onload = (e) => {
            this.$refs.image[i].src = reader.result
          }

          reader.readAsDataURL(this.imgMaterial[i])
        }
      }
    },

    formatBytes (bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes'

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },

    getDateStartEnd (date) {
      var today = new Date(date)
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = today.getFullYear()

      today = dd + '/' + mm + '/' + yyyy
      return today
    },
    nameKeydown (e) {
      if (/^\W$/.test(e.key)) {
        e.preventDefault()
      }
    },
    separatorNum (val) {
      if (typeof val === 'undefined' || val === null || val === 'null') {
        return null
      }
      val = parseFloat(val)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    toggleCheckbox () {
      if (!this.checkbox) {
        this.showUplImg = true
      } else {
        this.showUplImg = false
      }
      this.checkbox = !this.checkbox
    },
    joinArr (arr) {
      return arr.join(',')
    },
    sameWithGood (a) {
      if (a === true) {
        this.material.pdimensip = Math.ceil(this.material.bdimensip + this.material.bdimensip * 5 / 100)
        this.material.pdimensil = Math.ceil(this.material.bdimensil + this.material.bdimensil * 5 / 100)
        this.material.pdimensit = Math.ceil(this.material.bdimensit + this.material.bdimensit * 5 / 100)
        this.material.pberatjenis = Math.ceil(this.material.bberatjenis + this.material.bberatjenis * 5 / 100)
      } else {
        this.material.pdimensip = ''
        this.material.pdimensil = ''
        this.material.pdimensit = ''
        this.material.pberatjenis = ''
      }
    },
    addNewGudang () {
      core.custLoader(true)
      const dtGudang = {
        nama_gudang: this.gudang.nama_gudang,
        alamat: this.gudang.alamat,
        no_telp: this.gudang.no_telp,
        pic: this.gudang.pic,
        lat: this.gudang.lat,
        lng: this.gudang.lng,
        alamat_maps: this.gudang.alamat_maps,
        id: this.gudang.id
      }
      APIgudang
        .addWare(dtGudang).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Data gudang telah di tambahkan.')
            this.gudang = {
              nama_gudang: '',
              alamat: '',
              no_telp: '',
              pic: '',
              lat: '',
              lng: '',
              alamat_maps: ''
            }
            // this.$refs.dTable.refresh()
          } else {
            core.showSnackbar('error', 'Data gudang telah gagal ditambahkan.')
          }
        }).catch(() => {
          core.showSnackbar('error', 'Terjadi kesalahan pada sistem.')
        }).finally(() => {
          core.custLoader(false)
        })
    },
    handleMapClick (e) {
      this.marker.position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      this.gudang.lat = e.latLng.lat()
      this.gudang.lng = e.latLng.lng()
    },
    handleMarkerDrag (e) {
      this.marker.position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      this.gudang.lat = e.latLng.lat()
      this.gudang.lng = e.latLng.lng()
    },

    panToMarker () {
      this.$refs.mapRefGudang.panTo(this.marker.position)
    },

    geolocate () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.center.lat = position.coords.latitude
        this.center.lng = position.coords.longitude
        this.gudang.lat = position.coords.latitude
        this.gudang.lng = position.coords.longitude
        this.panToMarker()
      })
    },

    setPlace (place) {
      var currplace = place
      this.gudang.alamat_maps = place.vicinity
      const marker = {
        lat: currplace.geometry.location.lat(),
        lng: currplace.geometry.location.lng()
      }
      this.center = marker
      this.marker.position = {
        lat: marker.lat,
        lng: marker.lng
      }
      this.gudang.lat = marker.lat
      this.gudang.lng = marker.lng
      this.panToMarker()
    },

    resetFormGudang () {
      this.gudang = {
        nama_gudang: '',
        alamat: '',
        no_telp: '',
        pic: '',
        lat: '',
        lng: '',
        alamat_maps: '',
        id: ''
      }
    },

    addNewMerk (event) {
      event.preventDefault()
      core.custLoader(true)
      let fd = new FormData()
      fd.append('name', this.merk.name)
      fd.append('type', this.merk.type)
      fd.append('assets', this.merk.assets)

      APIadmin.cat
        .addCategoryPHP(fd).then(response => {
          if (response.status === 200) {
            core.showSnackbar('success', 'Data Merk baru telah di ajukan.')
            this.getMerk()
            this.merk = {
              name: '',
              type: 2,
              assets: []
            }
            this.$refs['modal-merk'].hide()
          } else {
            core.showSnackbar('error', 'Data Merk baru telah gagal diajukan.')
          }
        }).catch((error) => {
          if (error.response.status === 403) {
            core.showSnackbar('error', 'Maaf file yang anda kirim tidak sesuai.')
          } else {
            core.showSnackbar('error', 'Terjadi kesalahan pada sistem.')
          }
        }).finally(() => {
          core.custLoader(false)
        })
    }
  }
}

</script>

<style>
/* .iq-card-body{
  flex: unset;
} */
.bg-form-custom {
    /* background: #f5f5f5; */
    padding: 10px 20px;
    border-radius: 15px;
    border: 1px #d7dbda solid;
}
.custom-control-label::before {
    width: 1.5rem;
    height: 1.5rem;
}
.custom-control-label::after {
    top: 0.20rem;
    left: -1.52rem;
    width: 1.5rem;
    height: 1.5rem;
}
.custom-control-input {
    width: 1.5rem;
    height: 1.80rem;
}
.custom-control-inline {
  margin-right: 3rem;
}
.custom-radio {
  float: right;
}
.reportrange-text {
  padding: 0px 10px !important;
}
.custom-file-label {
  overflow: hidden;
}
.previewMaterial {
  object-fit: cover;
  height: 50px;
}
#hargasebelum, #hargasekarang, .disvol1 {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  border: 1px solid #e9edf4;
}
.tarvol1 {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  border: 1px solid #e9edf4;
}
#description {
  line-height: 25px !important;
  resize: vertical !important;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 21px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #5fccf5;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
      height: 14px;
    width: 14px;
    left: 4px;
    bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #126ede;
}

input:focus + .slider {
  box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.labelTextSlide {
    vertical-align: top;
    font-size: 10pt;
    font-weight: 800;

}
.lbl-left {
    color: #5fccf5;
    margin-right: 15px;
}
.lbl-right {
    color: #126ede;
    margin-left: 15px;
}
.iq-card-header {
  padding-top: 10px !important;
}
.form-control {
  border-radius: 3px !important;
}
.custom-control-label::before {
  width: 1rem !important;
  height: 1rem !important;
}
.btn-boma {
  border-radius: 3px !important;
}
.iq-header-title {
  width: 100%;
}
.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: var(--iq-primary);
  font-weight: bold;
}

.subtitle {
  color: #314b5f;
}
  .pac-container {
    z-index: 10000;
  }
</style>
