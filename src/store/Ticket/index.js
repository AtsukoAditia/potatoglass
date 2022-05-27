import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
  categoryList: [
    {
      id: 4,
      name: 'Semua Tiket',
      color: 'success',
      isHidden: true
    }
    // ,
    // {
    //   id: 3,
    //   name: 'High',
    //   color: 'danger',
    //   isHidden: false
    // },
    // {
    //   id: 2,
    //   name: 'Medium',
    //   color: 'warning',
    //   isHidden: false
    // },
    // {
    //   id: 1,
    //   name: 'Low',
    //   color: 'info',
    //   isHidden: false
    // }
  ],
  projectList: [
    {
      id: 1,
      val: 'support',
      project_name: 'Support'
    },
    {
      id: 2,
      val: 'material',
      project_name: 'Material'
    }
  ],
  statusProject: [
    {
      id: 4,
      status_name: 'Ticket Closed'
    },
    {
      id: 3,
      status_name: 'Ticket Approved'
    },
    {
      id: 2,
      status_name: 'Ticket Rejected'
    },
    {
      id: 1,
      status_name: 'Ticket Open'
    }
  ],
  taskList: [
    // {
    //   id: 1,
    //   task_title: 'Landing page for secret Project',
    //   project_id: 1,
    //   category_id: 3,
    //   user_id: 1,
    //   status_id: 1,
    //   task_status: false
    // }
  ],
  selectedProject: {
    id: 1,
    val: 'support',
    project_name: 'Support'
  },
  selectedCategory: {
    id: 1,
    name: 'Semua Tiket',
    color: 'success',
    isHidden: true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
