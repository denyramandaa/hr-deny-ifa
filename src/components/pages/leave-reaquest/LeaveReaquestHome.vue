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
                <div class="bg-transparent hover:underline cursor-pointer text-white text-sm p-1 mx-1 rounded">Export CSV</div>
                <div class="bg-transparent hover:underline cursor-pointer text-white text-sm p-1 mx-1 rounded">Export CSV (All)</div>
                <router-link :to="{name: 'add_leave_reaquest'}" tag="div" class="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer text-sm p-1 px-2 mx-1 rounded"><a>Add Leave Reaquest</a></router-link>
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
                            <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-left">Notes</th>
                            <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-left">Divition</th>
                            <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-left">Status</th>
                            <th class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center"></th>
                        </tr>
                        <tr class="hover:bg-gray-100" v-for="(item, idx) in getLeaveReaquest" :key="idx" v-if="getEmployee(item)">
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <img :src="checkingImg(getEmployee(item))" alt="" class="rounded-full">
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm leading-5 font-medium text-gray-900 capitalize">{{ getEmployee(item).name }}</div>
                                        <div class="text-sm leading-5 text-gray-500">{{ getEmployee(item).email }}</div>
                                        <div class="text-sm leading-5 text-gray-500">{{ getEmployee(item).phone }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div class="text-sm leading-5 text-gray-500 w-full block normal-case">{{ item.notes }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div class="text-sm leading-5 text-gray-900 w-full block capitalize">{{ getRoleJobPosition(getEmployee(item)) }}</div>
                                <div class="text-sm leading-5 text-gray-500 w-full block capitalize">{{ getRoleJobDivition(getEmployee(item)) }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div class="text-sm leading-5 text-center w-full block capitalize p-1 rounded text-white" :class="{ 'bg-gray-400': !item.status, 'bg-green-400': item.status == 1, 'bg-red-400': item.status == 2 }">{{ getStatusText(item.status  ) }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-center">
                                <router-link :to="{name: 'detail_leave_reaquest', params: { id: item.id }}" tag="a"><i class="fas fa-eye cursor-pointer"></i></router-link>
                            </td>
                        </tr>
                        <tr v-if="getLeaveReaquest == ''">
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                <div class="text-sm leading-5 text-gray-500 w-full block capitalize">No Data Entry</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- pagination -->
            <!-- <div class="flex p-6 border-b border-gray-200 hover:bg-gray-100 flex-wrap">

            </div> -->
        </div>
      </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data(){
        return{
            activeIdx: 0,
            filterName: '',
            menu: [{
                key: 'pending',
                name: 'Pending'
            },{
                key: 'approved',
                name: 'Approved'
            },{
                key: 'rejected',
                name: 'Rejected'
            }],
        }
    },
    computed:{
        ...mapGetters({
            employee: 'employee',
            leaveReaquest: 'leaveReaquest',
            roleJob: 'roleJob',
        }),
        getLeaveReaquest(){
            return this.filterName === '' ? this.leaveReaquest.filter(ob=>ob.status === this.activeIdx) : this.leaveReaquest.filter(ob=>ob.status === this.activeIdx && ob.name.includes(this.filterName));
        },
    },
    methods:{
        ...mapActions({
            fetchEmployees : 'fetchEmployees',
            fetchLeaveReaquest : 'fetchLeaveReaquest',
            fetchRoleJob : 'fetchRoleJob',
        }),
        getEmployee(dta){
            return this.employee.find(ob=>ob.id === dta.id_employee);
        },
        getRoleJobPosition(d){
            return this.roleJob.find(ob=>ob.id === d.role_job) ? this.roleJob.find(ob=>ob.id === d.role_job).position : ''
        },
        getRoleJobDivition(d){
            return this.roleJob.find(ob=>ob.id === d.role_job) ? this.roleJob.find(ob=>ob.id === d.role_job).divition : ''
        },
        checkingImg(item){
            return item.photo ? item.photo : '/src/assets/avatar.jpg'
        },
        getStatusText(a){
            if(!a) return 'pending'
            return a == 1 ? 'approved' : 'rejected'
        },
    },
    async created(){
        await this.fetchEmployees();
        await this.fetchLeaveReaquest();
        await this.fetchRoleJob();
    },
    beforeRouteEnter (to, from, next) {
        $cookies.get('local_login') ? next() : next({ name: 'login', query: { redirect: 'home' } })
    },
}
</script>