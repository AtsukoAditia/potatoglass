<template>
  <b-container fluid>
    <b-row>
      <b-col lg="3">
        <ProjectList
          :project-list="projectList"
          :category-list="categoryList"
          :selected-category="selectedCategory"
          :selected-project="selectedProject"/>
      </b-col>
      <b-col lg="9">
        <TaskList :task-list="taskList" :project="selectedProject" :category="selectedCategory"/>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../../config/pluginInit'
import ProjectList from '../Ticket/ProjectList'
import TaskList from '../Ticket/TaskList'
import { mapGetters } from 'vuex'
import Ticket from '../../../store/Ticket'
import API from '@/services/ticketing'
export default {
  name: 'TicketListing',
  components: { ProjectList, TaskList },
  data () {
    return {
      taskList: []
    }
  },
  beforeMount () {
    this.$store.registerModule('Ticket', Ticket)
  },
  beforeDestroy () {
    this.$store.unregisterModule('Ticket')
  },
  mounted () {
    core.index()
    this.getTicketList()
  },
  computed: {
    ...mapGetters({
      // taskList: 'Ticket/taskState',
      projectList: 'Ticket/projectState',
      categoryList: 'Ticket/categoryState',
      selectedCategory: 'Ticket/selectedCategoryState',
      selectedProject: 'Ticket/selectedProjectState'
    })
  },
  methods: {
    getTicketList () {
      API.listTicketPHP()
        .then(result => {
          if (result.status) {
            this.$store.dispatch('Ticket/addTaskAction', result.data.data)
            this.taskList = this.$store.getters['Ticket/taskState']
          }
        }).catch()
    }
  }
}
</script>
<style>
</style>
