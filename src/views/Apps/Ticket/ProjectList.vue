<template>
  <iq-card>
    <template v-slot:body>
      <div class="iq-todo-page">
        <!-- <b-form class="position-relative">
          <b-form-group class="mb-0" label-for="search">
            <b-form-input class="todo-search" placeholder="Search" v-model="search" />
            <b-link href="#" class="search-link"><i class="ri-search-line" /></b-link>
          </b-form-group>
        </b-form> -->
        <ul class="todo-task-list p-0 m-0">
          <li v-for="(item,index) in filteredList" :key="index" @click="selectProject(item)" :class="`${item.val === selectedProject ? 'active' : ''}`">
            <b-link href="#"><i class="ri-stack-fill mr-2"></i>{{ item.project_name }}</b-link>
            <ul :id="'todo-task'+index" class="sub-task mt-2 p-0" :class="`${item.id === selectedProject.id ? 'show' : ''}`">
              <li v-for="(category, index1) in categoryList" :key="index1" @click="selectCategory(category)" :class="`${category.name === selectedCategory.name ? 'active' : ''}`">
                <b-link :href="category.href"><i class="ri-checkbox-blank-circle-fill" :class="'text-'+category.color" /> {{ category.name }}</b-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </template>
  </iq-card>
</template>
<script>
export default {
  name: 'ProjectList',
  // props: ['projectList', 'categoryList'],
  props: [
    'selectedProject',
    'selectedCategory',
    'projectList',
    'categoryList'
  ],
  data () {
    return {
      search: '',
      project: {
        id: 0,
        project_name: ''
      }
    }
  },
  methods: {
    selectProject (project) {
      this.$store.dispatch('Ticket/selectedAction', { data: project, type: 'project' })
      this.search = ''
    },
    selectCategory (category) {
      this.$store.dispatch('Ticket/selectedAction', { data: category, type: 'category' })
      this.search = ''
    }
  },
  computed: {
    filteredList () {
      return this.projectList.filter(item => {
        return item.project_name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted () {
  }
}
</script>
