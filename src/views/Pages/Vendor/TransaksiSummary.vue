<template>
  <b-container fluid="">
    <b-row>
      <b-col md="12" sm="12">
        <iq-card>
          <template v-slot:body>
            <tab-nav :pills="true" class="nav-fill mb-3" id="pills-tab-1">
              <tab-nav-items :active="true" id="pills-vendor-tab-fill" href="#pills-vendor-fill" ariaControls="pills-vendor-fill" role="tab" :ariaSelected="true" title="Per Vendor" />
              <tab-nav-items :active="false" id="pills-material-tab-fill" href="#pills-material-fill" ariaControls="pills-material-fill" role="tab" :ariaSelected="false" title="Per Material" />
              <tab-nav-items :active="false" id="pills-proyek-tab-fill" href="#pills-proyek-fill" ariaControls="pills-proyek-fill" role="tab" :ariaSelected="false" title="Per Proyek" />
              <tab-nav-items :active="false" id="pills-dimensi-tab-fill" href="#pills-dimensi-fill" ariaControls="pills-dimensi-fill" role="tab" :ariaSelected="false" title="Per Dimensi Material" />
              <tab-nav-items :active="false" id="pills-transport-tab-fill" href="#pills-transport-fill" ariaControls="pills-transport-fill" role="tab" :ariaSelected="false" title="Per Transport" />
            </tab-nav>
            <tab-content id="pills-tabContent-1" class="mt-0">
              <tab-content-item :active="true" id="pills-vendor-fill" aria-labelled-by="pills-vendor-tab-fill">
                <byVendor></byVendor>
              </tab-content-item>
              <tab-content-item :active="false" id="pills-material-fill" aria-labelled-by="pills-material-tab-fill">
                <byMaterial></byMaterial>
              </tab-content-item>
              <tab-content-item :active="false" id="pills-proyek-fill" aria-labelled-by="pills-proyek-tab-fill">
                <byProject></byProject>
              </tab-content-item>
              <tab-content-item :active="false" id="pills-dimensi-fill" aria-labelled-by="pills-dimensi-tab-fill">
                <byMaterialDimension></byMaterialDimension>
              </tab-content-item>
              <tab-content-item :active="false" id="pills-transport-fill" aria-labelled-by="pills-transport-tab-fill">
                <byTransport></byTransport>
              </tab-content-item>
            </tab-content>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>

import { core } from '../../../config/pluginInit'
import byMaterial from './SummTrans/byMaterial'
import byMaterialDimension from './SummTrans/byMaterialDimension'
import byProject from './SummTrans/byProject'
import byTransport from './SummTrans/byTransport'
import byVendor from './SummTrans/byVendor'

export default {
  name: 'TransaksiSummary',
  components: {
    byMaterial, byMaterialDimension, byProject, byTransport, byVendor
  },
  props: {},
  mounted () {
    core.index()
  },
  data () {
    return {
    }
  },
  computed: {},
  methods: {

  }
}

</script>

<style>
  .headWidth {
    min-width: 200px;
  }

</style>
