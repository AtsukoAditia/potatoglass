<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">List Material Category</h4>
          </template>
          <template v-slot:body>
            <b-row class="mb-2">
              <b-col md="12">
                <router-link :to="toCategoryAdd" class="float-right">
                    <b-button variant="primary"><i class="ri-bill-fill"></i>Add Kategori</b-button>
                </router-link>
              </b-col>
            </b-row>
            <b-card-group columns>
              <b-card no-body class="iq-mb-3">
                <b-card-header header-tag="header" class="p-1 border-0 font-weight-bold text-center" style="font-size:14pt;" role="tab">
                    <b-link block href="#" v-b-toggle.collapse1 variant="default">Kategori di RAB</b-link>
                  </b-card-header>
                  <b-collapse visible id="collapse1" accordion="collapse1" role="tabpanel">
                    <b-card-body class="p-0">
                      <b-table small striped hover :items="catRAB" :fields="fCatRab"></b-table>
                    </b-card-body>
                  </b-collapse>
              </b-card>
              <b-card no-body class="iq-mb-3">
                <b-card-header header-tag="header" class="p-1 border-0 font-weight-bold text-center" style="font-size:14pt;" role="tab">
                    <b-link block href="#" v-b-toggle.collapse2 variant="default">Kategori 2</b-link>
                  </b-card-header>
                  <b-collapse visible id="collapse2" accordion="collapse2" role="tabpanel">
                    <b-card-body class="p-0">
                      <b-table small striped hover :items="catJob" :fields="fCatJob"></b-table>
                    </b-card-body>
                  </b-collapse>
              </b-card>
              <b-card no-body class="iq-mb-3">
                <b-card-header header-tag="header" class="p-1 border-0 font-weight-bold text-center" style="font-size:14pt;" role="tab">
                    <b-link block href="#" v-b-toggle.collapse3 variant="default">Kategori Bahan</b-link>
                  </b-card-header>
                  <b-collapse visible id="collapse3" accordion="collapse3" role="tabpanel">
                    <b-card-body class="p-0">
                      <b-table small striped hover :items="catBahan" :fields="fCatBahan"></b-table>
                    </b-card-body>
                  </b-collapse>
              </b-card>
              <b-card no-body class="iq-mb-3">
                <b-card-header header-tag="header" class="p-1 border-0 font-weight-bold text-center" style="font-size:14pt;" role="tab">
                    <b-link block href="#" v-b-toggle.collapse4 variant="default">Jenis Bahan</b-link>
                  </b-card-header>
                  <b-collapse id="collapse4" accordion="collapse4" role="tabpanel">
                    <b-card-body class="p-0">
                      <b-table small striped hover :items="jenBahan" :fields="fJenBahan"></b-table>
                    </b-card-body>
                  </b-collapse>
              </b-card>
            </b-card-group>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../../config/pluginInit'
export default {
  name: 'MaterialCategory',
  props: {
    toCategoryAdd: { type: Object, default: () => ({ name: 'material.addmaterial' }) }
  },
  mounted () {
    core.index()
  },
  data () {
    return {
      catRAB: [
        { catrab: 'Borongan' },
        { catrab: 'Jasa' },
        { catrab: 'Material Penunjang' },
        { catrab: 'Material Utama' },
        { catrab: 'Peralatan' }
      ],
      fCatRab: [
        { key: 'catrab', sortable: true, label: 'Kategori di RAB' }
      ],
      catJob: [
        { catjob: 'direksi tool kit' },
        { catjob: 'kebersihan' },
        { catjob: 'landscape' },
        { catjob: 'ME_Plumbing-mesin' },
        { catjob: 'ME-elektrikal' },
        { catjob: 'ME-elektrikal-Armatur' },
        { catjob: 'ME-elektrikal-Mesin' },
        { catjob: 'ME-Plumbing' },
        { catjob: 'ME-Plumbing-mesin' },
        { catjob: 'PJ-Jendela' },
        { catjob: 'PJ-Pintu' },
        { catjob: 'PJ-Pintu/Jendela' },
        { catjob: 'Profilan' },
        { catjob: 'Tahap Finishing' },
        { catjob: 'Tahap Finishing proses' },
        { catjob: 'Tahap Struktur' },
        { catjob: 'Tahap Struktur & Finishing' },
        { catjob: 'tema bangunan' },
        { catjob: 'umum' }
      ],
      fCatJob: [
        { key: 'catjob', sortable: true, label: 'Kategori di Pekerjaan' }
      ],
      catBahan: [
        { catbahan: 'Borongan' },
        { catbahan: 'Jasa' },
        { catbahan: 'Material Penunjang' },
        { catbahan: 'Material Utama' },
        { catbahan: 'Peralatan' }
      ],
      jenBahan: [
        { jenbahan: 'Air' },
        { jenbahan: 'Alang-alang' },
        { jenbahan: 'Alucabond' },
        { jenbahan: 'alumunium' },
        { jenbahan: 'Asbes' },
        { jenbahan: 'Aspal' },
        { jenbahan: 'atk' },
        { jenbahan: 'Baja Ringan' },
        { jenbahan: 'bambu' },
        { jenbahan: 'Bata' },
        { jenbahan: 'bataco' },
        { jenbahan: 'batu' },
        { jenbahan: 'Batu Alam' },
        { jenbahan: 'Batu Conblock' },
        { jenbahan: 'Batu Kali/Belah/Koral/Split' },
        { jenbahan: 'Batu Marmer/Granit' },
        { jenbahan: 'besi' },
        { jenbahan: 'besi/alumunium' },
        { jenbahan: 'beton' },
        { jenbahan: 'Cat' },
        { jenbahan: 'dempul' },
        { jenbahan: 'faber' },
        { jenbahan: 'Genteng' },
        { jenbahan: 'Granit Tile/Keramik' },
        { jenbahan: 'Grc' },
        { jenbahan: 'Gypsum' },
        { jenbahan: 'Gypsum + Hollow' },
        { jenbahan: 'harian' },
        { jenbahan: 'Ijuk/Bambu/Welat' },
        { jenbahan: 'Kabel' },
        { jenbahan: 'Kaca' },
        { jenbahan: 'kain' },
        { jenbahan: 'Karpet' },
        { jenbahan: 'Kayu' },
        { jenbahan: 'Kayu/Balok' },
        { jenbahan: 'Kayu/Campur' },
        { jenbahan: 'Kayu/Gording' },
        { jenbahan: 'Kayu/Kaso' },
        { jenbahan: 'Kayu/Papan' },
        { jenbahan: 'Kayu/Parket' },
        { jenbahan: 'Kayu/Reng' },
        { jenbahan: 'Kayu/Serbuk' },
        { jenbahan: 'Kayu/Sirap' },
        { jenbahan: 'Kayu/Tripleks' },
        { jenbahan: 'Kayu/Triplex' },
        { jenbahan: 'Keramik' },
        { jenbahan: 'kertas' },
        { jenbahan: 'Kimiawi' },
        { jenbahan: 'Lem' },
        { jenbahan: 'Listrik' },
        { jenbahan: 'Manual' },
        { jenbahan: 'Marmer' },
        { jenbahan: 'metal' },
        { jenbahan: 'Paku/Baut/Besi' },
        { jenbahan: 'Pasir' },
        { jenbahan: 'Pestisida' },
        { jenbahan: 'plastik' },
        { jenbahan: 'Plastik&Besi' },
        { jenbahan: 'Plastik/Besi' },
        { jenbahan: 'plastik/kayu' },
        { jenbahan: 'Polyacrbonat' },
        { jenbahan: 'puing' },
        { jenbahan: 'Pvc' },
        { jenbahan: 'ragam' },
        { jenbahan: 'Sanitair' },
        { jenbahan: 'Semen' },
        { jenbahan: 'Semen/Pasir' },
        { jenbahan: 'Semen/Pasir/Beton/Besi/Spesi' },
        { jenbahan: 'Seng' },
        { jenbahan: 'Seng/Alumunium' },
        { jenbahan: 'set' },
        { jenbahan: 'solar panel' },
        { jenbahan: 'Spesi' },
        { jenbahan: 'stainless steel' },
        { jenbahan: 'Takon' },
        { jenbahan: 'Tanah' },
        { jenbahan: 'Teraso' },
        { jenbahan: 'tumbuhan' },
        { jenbahan: 'ubin' },
        { jenbahan: 'Upvc' },
        { jenbahan: 'Vynil' },
        { jenbahan: 'Wallpaper' },
        { jenbahan: 'Wool' }
      ],
      fJenBahan: [
        { key: 'jenbahan', sortable: true, label: 'Terbuat dari bahan' }
      ]
    }
  },
  computed: {
  },
  methods: {
  }
}

</script>

<style>
/* .iq-card-body{
  flex: unset;
} */
.imgTBL {
  width: 100px;
}
</style>
