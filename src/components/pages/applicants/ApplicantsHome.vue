<template>
    <div class="main-content flex-1 bg-gray-700 pt-16 md:mt-2 pb-24 md:pb-5">
      <div class="max-w-5xl mx-auto"> 
        <div class="flex justify-between">
            <ul class="flex justify-start">
                <li class="-mb-px mr-1 cursor-pointer" v-for="(item, idx) in menu" :key="idx" :class="{ 'tab-active' : activeIdx === idx }" @click="activeIdx=idx; filterName=''">
                    <a class="bg-gray-300 inline-block py-4 px-4 text-gray-500 rounded-t hover:text-blue-600 font-semibold">{{ item.name }}</a>
                </li>
            </ul>
            <div class="flex justify-end items-center">
                <div class="bg-transparent hover:underline cursor-pointer text-white text-sm p-1 mx-1 rounded" @click="exportCsv()">Export CSV</div>
                <div class="bg-transparent hover:underline cursor-pointer text-white text-sm p-1 mx-1 rounded" @click="exportAllCSV()">Export CSV (All)</div>
                <router-link :to="{name: 'add_applicants'}" tag="div" class="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer text-sm p-1 px-2 mx-1 rounded"><a>Add Applicants</a></router-link>
            </div>

        </div>
        <div class="w-full bg-white overflow-y-auto max-h-75">
            <div class="flex flex-1 justify-center md:justify-start text-white p-4 sticky top-0 bg-white z-10">
                <span class="relative w-full border-b border-b-2 bg-gray-200">
                    <input type="search" placeholder="Search by name" class="w-full text-lg transition border border-transparent focus:outline-none rounded py-4 px-2 pl-10 appearance-none leading-normal text-gray-600 bg-transparent" v-model="filterName">
                    <div class="absolute search-icon" style="top: 50%; left: .8rem; transform:translateY(-50%)">
                        <svg class="pointer-events-none text-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style="fill: #3182ce">
                            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                        </svg>
                    </div>
                </span>
            </div>
            <div class="relative">
                <table class="min-w-full">
                  <tbody class="bg-white">
                    <tr>
                      <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-left">Name</th>
                      <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">Last Company/School</th>
                      <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">Last Education</th>
                      <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">Applying to</th>
                      <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center"></th>
                    </tr>
                    <tr class="hover:bg-gray-100" v-for="(item, idx) in getApplicant" :key="idx">
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-left">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-10 w-10">
                            <img :src="checkingImg(item)" alt="" class="rounded-full">
                          </div>
                          <div class="ml-4">
                            <div class="text-sm leading-5 font-medium text-gray-900 capitalize">{{ item.name }}</div>
                            <div class="text-sm leading-5 text-gray-500">{{ item.email }}</div>
                            <div class="text-sm leading-5 text-gray-500">{{ item.phone }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                        <div class="text-sm leading-5 text-gray-900 w-full block capitalize">{{ item.last_work }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                        <div class="text-sm leading-5 text-gray-900 w-full block capitalize">{{ item.last_education }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                        <div class="text-sm leading-5 text-gray-900 w-full block capitalize">{{ getRoleJobPosition(item) }}</div>
                        <div class="text-sm leading-5 text-gray-500 w-full block capitalize">{{ getRoleJobDivition(item) }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-center">
                        <router-link :to="{name: 'detail_applicants', params: { id: item.id }}" tag="a"><i class="fas fa-eye cursor-pointer"></i></router-link>
                      </td>
                    </tr>
                    <tr v-if="getApplicant == ''">
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                        <div class="text-sm leading-5 text-gray-500 w-full block capitalize">No Data Entry</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
            
        </div>
      </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      applicantList: 'applicant/applicantList',
      roleJob: 'employee/roleJob',
    }),
    getApplicant(){
      return this.filterName === '' ? this.applicantList.filter(ob=>ob.status_applicant === this.activeIdx) : this.applicantList.filter(ob=>ob.status_applicant === this.activeIdx && ob.name.toLowerCase().includes(this.filterName.toLowerCase()));
    },
  },
  data(){
    return{
      activeIdx: 0,
      filterName: '',
      menu: [{
          key: 'unprocessed',
          name: 'Unprocessed'
      },{
          key: 'psycho-test',
          name: 'Scheduled to Psyo Test'
      },{
          key: 'interview',
          name: 'Scheduled to Interview'
      }],
    }
  },
  methods: {
    ...mapActions({
      fetchApplicant : 'applicant/fetchApplicant',
      fetchRoleJob : 'employee/fetchRoleJob',
    }),
    getRoleJobPosition(d){
      return this.roleJob.find(ob=>ob.id === d.apply_to) ? this.roleJob.find(ob=>ob.id === d.apply_to).position : ''
    },
    getRoleJobDivition(d){
      return this.roleJob.find(ob=>ob.id === d.apply_to) ? this.roleJob.find(ob=>ob.id === d.apply_to).divition : ''
    },
    checkingImg(item){
      return item.photo ? item.photo : '/src/assets/avatar.jpg'
    },
    getApplicantStatus(a){
      if(!a) return 'unprocessed'
      return a == 1 ? 'psyo test' : 'interview'
    },
    exportCsv(){
        let fix = []
        for(let i=0;i<this.getApplicant.length;i++){
            let temp = {
                no: i,
                name: this.getApplicant[i].name,
                apply_to: this.getRoleJobPosition(this.getApplicant[i])+' - '+this.getRoleJobDivition(this.getApplicant[i]),
                email: this.getApplicant[i].email,
                phone: this.getApplicant[i].phone,
                gender: this.getApplicant[i].gender,
                birth_date: this.getApplicant[i].birth_date,
                birth_place: this.getApplicant[i].birth_place,
                last_work: this.getApplicant[i].last_work,
                last_education: this.getApplicant[i].last_education,
                address: this.getApplicant[i].address,
                status_applicant: this.getApplicantStatus(this.getApplicant[i].status_applicant)
            }
            fix.push(temp);
        }
        this.exportingProcess(fix);
    },
    exportAllCSV(){
        let fix = []
        for(let i=0;i<this.applicantList.length;i++){
            let temp = {
                no: i,
                name: this.applicantList[i].name,
                apply_to: this.getRoleJobPosition(this.applicantList[i])+' - '+this.getRoleJobDivition(this.applicantList[i]),
                email: this.applicantList[i].email,
                phone: this.applicantList[i].phone,
                gender: this.applicantList[i].gender,
                birth_date: this.applicantList[i].birth_date,
                birth_place: this.applicantList[i].birth_place,
                last_work: this.applicantList[i].last_work,
                last_education: this.applicantList[i].last_education,
                address: this.applicantList[i].address,
                status_applicant: this.getApplicantStatus(this.applicantList[i].status_applicant)
            }
            fix.push(temp);
        }
        this.exportingProcess(fix);
    },
    exportingProcess(items){
        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(items[0])
        let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        csv.unshift(header.join(','))
        csv = csv.join('\r\n')
        let blob = new Blob(['\ufeff' + csv], { 
        type: 'text/csv;charset=utf-8;'
        }); 
        let dwldLink = document.createElement("a"); 
        let url = URL.createObjectURL(blob); 
        navigator.userAgent.indexOf('Chrome') == -1; 
        dwldLink.setAttribute("href", url); 
        dwldLink.setAttribute("download", "alltable.csv"); 
        dwldLink.style.visibility = "hidden"; 
        document.body.appendChild(dwldLink); 
        dwldLink.click(); 
        document.body.removeChild(dwldLink); 
    }
  },
  async created(){
    await this.fetchApplicant();
    await this.fetchRoleJob();
  },
  beforeRouteEnter (to, from, next) {
    $cookies.get('local_login') ? next() : next({ name: 'login', query: { redirect: 'home' } })
  },
}
</script>