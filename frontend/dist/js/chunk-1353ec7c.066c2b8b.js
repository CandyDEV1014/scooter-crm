(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1353ec7c"],{"0d23":function(e,t,s){},"13e9":function(e,t,s){"use strict";s("6812")},"661b":function(e,t,s){},6812:function(e,t,s){},"8d46":function(e,t,s){"use strict";s("0d23")},a29b:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e._self._c;return t("div",[t("v-card",[t("v-card-text",[t("v-data-table",{attrs:{headers:e.headers,items:e.items,options:e.options,"server-items-length":e.totalRecords},on:{"update:options":[function(t){e.options=t},function(t){return e.getUserList()}]},scopedSlots:e._u([{key:"top",fn:function(){return[t("v-toolbar",{attrs:{flat:""}},[t("v-toolbar-title",[e._v("User List")]),t("v-spacer"),t("v-btn",{staticClass:"mb-2 mr-2",attrs:{color:"primary",dark:""},on:{click:function(t){return e.onAddClick()}}},[e._v(" Create ")])],1),t("v-row",{staticClass:"ma-1"},[t("v-col",{attrs:{xs:"6",sm:"4",md:"3"}},[t("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},on:{input:e.onSearchInput},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)],1)]},proxy:!0},{key:"item.createdAt",fn:function({item:t}){return[e._v(" "+e._s(t.createdAt?e.setDateFormat(t.createdAt):"Not Available")+" ")]}},{key:"item.updatedAt",fn:function({item:t}){return[e._v(" "+e._s(t.updatedAt?e.setDateFormat(t.updatedAt):"Not Available")+" ")]}},{key:"item.roleId",fn:function({item:s}){return[t("v-chip",{attrs:{color:e.getRole(s.roleId).color,dark:""}},[e._v(" "+e._s(e.getRole(s.roleId).name)+" ")])]}},{key:"item.actions",fn:function({item:s}){return[t("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:a,attrs:r}){return[t("v-icon",e._g(e._b({staticClass:"mr-2",attrs:{small:"",color:"primary"},on:{click:function(t){return e.onEditClick(s.id)}}},"v-icon",r,!1),a),[e._v(" mdi-pencil ")])]}}],null,!0)},[t("span",[e._v("Edit")])]),t("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:a,attrs:r}){return[t("v-icon",e._g(e._b({staticClass:"mr-2",attrs:{small:"",color:"success"},on:{click:function(t){return e.onResetClick(s)}}},"v-icon",r,!1),a),[e._v(" mdi-lock-off ")])]}}],null,!0)},[t("span",[e._v("Reset")])]),t("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:a,attrs:r}){return[t("v-icon",e._g(e._b({staticClass:"mr-2",attrs:{small:"",color:"red"},on:{click:function(t){return e.onDeleteClick(s)}}},"v-icon",r,!1),a),[e._v(" mdi-delete ")])]}}],null,!0)},[t("span",[e._v("Delete")])])]}}],null,!0)})],1)],1),t("v-snackbar",{attrs:{timeout:"3000",color:e.snackBar.type,top:"",right:""},model:{value:e.snackBar.enabled,callback:function(t){e.$set(e.snackBar,"enabled",t)},expression:"snackBar.enabled"}},[e._v(" "+e._s(e.snackBar.message)+" ")]),t("add-dialog",{on:{close:function(t){e.addDialog=!1},submit:e.addUser},model:{value:e.addDialog,callback:function(t){e.addDialog=t},expression:"addDialog"}}),t("edit-dialog",{attrs:{"selected-item":e.selectedEditItem},on:{close:function(t){e.editDialog=!1},submit:e.updateUser},model:{value:e.editDialog,callback:function(t){e.editDialog=t},expression:"editDialog"}}),t("reset-dialog",{on:{cancel:function(t){e.resetDialog=!1},confirm:e.resetPassword},model:{value:e.resetDialog,callback:function(t){e.resetDialog=t},expression:"resetDialog"}}),t("delete-dialog",{on:{cancel:function(t){e.deleteDialog=!1},confirm:e.deleteUser},model:{value:e.deleteDialog,callback:function(t){e.deleteDialog=t},expression:"deleteDialog"}})],1)},r=[],l=function(){var e=this,t=e._self._c;return t("v-dialog",e._g(e._b({attrs:{persistent:"",width:"450",eager:""}},"v-dialog",e.$attrs,!1),e.$listeners),[t("v-sheet",{attrs:{outlined:"",color:"accent",rounded:""}},[t("v-card",[t("v-card-title",{staticClass:"dialog-title"},[e._v(" Add User ")]),t("v-divider"),t("v-card-text",{staticStyle:{"max-height":"500px","overflow-y":"auto"}},[t("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t("v-container",{staticClass:"px-0",attrs:{fluid:""}},[t("v-row",[t("v-col",{attrs:{cols:"12"}},[t("v-text-field",{attrs:{color:"primary",label:"Name",rules:e.rules.name,required:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),t("v-col",{attrs:{cols:"12"}},[t("v-text-field",{attrs:{color:"primary",label:"Email",rules:e.rules.email,required:""},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),t("v-col",{attrs:{cols:"12"}},[t("v-select",{attrs:{color:"primary",label:"Role",placeholder:"Select a Roles",items:e.roles,"item-text":"title","item-value":"id",rules:e.rules.roleId,required:""},model:{value:e.form.roleId,callback:function(t){e.$set(e.form,"roleId",t)},expression:"form.roleId"}})],1)],1)],1)],1)],1),t("v-divider"),t("v-card-actions",{staticClass:"dialog-actions"},[t("v-spacer"),t("v-btn",{attrs:{color:"error",small:""},on:{click:e.handleClose}},[e._v(" Close ")]),t("v-btn",{attrs:{color:"primary",small:""},on:{click:e.handleSubmit}},[e._v(" Save ")])],1)],1)],1)],1)},i=[],o={name:"AddDialog",components:{},props:{},data(){return{form:{name:"",email:"",roleId:null},rules:{name:[e=>!!e||"Name is required"],email:[e=>!!e||"Email is required",e=>!e||/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e)||"E-mail must be valid"],roleId:[e=>!!e||"Role is required"]},valid:!0,roles:[{id:1,title:"Admin"},{id:2,title:"Member"},{id:3,title:"User"}]}},methods:{handleClose(){this.$emit("close"),this.$refs.form.resetValidation()},handleSubmit(){const e=this.$refs.form.validate();e&&(this.$emit("submit",this.form),this.$refs.form.resetValidation())}}},n=o,c=(s("eff0"),s("2877")),d=Object(c["a"])(n,l,i,!1,null,"5c33d8b1",null),u=d.exports,m=function(){var e=this,t=e._self._c;return t("v-dialog",e._g(e._b({attrs:{persistent:"",width:"450",eager:""}},"v-dialog",e.$attrs,!1),e.$listeners),[t("v-sheet",{attrs:{outlined:"",color:"accent",rounded:""}},[t("v-card",[t("v-card-title",{staticClass:"dialog-title"},[e._v(" Edit User ")]),t("v-divider"),t("v-card-text",{staticStyle:{"max-height":"500px","overflow-y":"auto"}},[t("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t("v-container",{staticClass:"px-0",attrs:{fluid:""}},[t("v-row",[t("v-col",{attrs:{cols:"12"}},[t("v-text-field",{attrs:{color:"primary",label:"Name",rules:e.rules.name,required:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),t("v-col",{attrs:{cols:"12"}},[t("v-text-field",{attrs:{color:"primary",label:"Email",rules:e.rules.email,required:""},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),t("v-col",{attrs:{cols:"12"}},[t("v-select",{attrs:{color:"primary",label:"Role",placeholder:"Select a Roles",items:e.roles,"item-text":"title","item-value":"id",rules:e.rules.roleId,required:""},model:{value:e.form.roleId,callback:function(t){e.$set(e.form,"roleId",t)},expression:"form.roleId"}})],1)],1)],1)],1)],1),t("v-divider"),t("v-card-actions",{staticClass:"dialog-actions"},[t("v-spacer"),t("v-btn",{attrs:{color:"error",small:""},on:{click:e.handleClose}},[e._v(" Close ")]),t("v-btn",{attrs:{color:"primary",small:""},on:{click:e.handleSubmit}},[e._v(" Save ")])],1)],1)],1)],1)},v=[],h={name:"EditDialog",components:{},props:{selectedItem:{type:Object,default:()=>{}}},watch:{selectedItem:function(e){this.form=e}},data(){return{form:this.selectedItem,rules:{name:[e=>!!e||"Name is required"],email:[e=>!!e||"Email is required",e=>!e||/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e)||"E-mail must be valid"],roleId:[e=>!!e||"Role is required"]},valid:!0,roles:[{id:1,title:"Admin"},{id:2,title:"Member"},{id:3,title:"User"}]}},methods:{handleClose(){this.$emit("close"),this.$refs.form.resetValidation()},handleSubmit(){const e=this.$refs.form.validate();e&&(this.$emit("submit",this.form),this.$refs.form.resetValidation())}}},f=h,p=(s("8d46"),Object(c["a"])(f,m,v,!1,null,"6c35e296",null)),g=p.exports,b=function(){var e=this,t=e._self._c;return t("v-dialog",e._g(e._b({attrs:{persistent:"",width:"350",eager:""}},"v-dialog",e.$attrs,!1),e.$listeners),[t("v-sheet",{attrs:{outlined:"",color:"accent",rounded:""}},[t("v-card",[t("v-card-title",{staticClass:"dialog-title"},[e._v(" Reset Password ")]),t("v-card-text",[e._v(" Do you want to reset the password? ")]),t("v-card-actions",[t("v-btn",{staticClass:"text-capitalize btn",attrs:{small:"",color:"primary"},on:{click:e.confirm}},[e._v(" Confirm ")]),t("v-btn",{staticClass:"text-capitalize btn",attrs:{small:"",color:"white"},on:{click:e.cancel}},[e._v(" Cancel ")])],1)],1)],1)],1)},k=[],_={name:"ResetDialog",components:{},props:{},data(){return{}},methods:{confirm(){this.$emit("confirm")},cancel(){this.$emit("cancel")}}},D=_,x=(s("13e9"),Object(c["a"])(D,b,k,!1,null,"158cd95c",null)),y=x.exports,C=function(){var e=this,t=e._self._c;return t("v-dialog",e._g(e._b({attrs:{persistent:"",width:"350",eager:""}},"v-dialog",e.$attrs,!1),e.$listeners),[t("v-sheet",{attrs:{outlined:"",color:"accent",rounded:""}},[t("v-card",[t("v-card-title",{staticClass:"dialog-title"},[e._v(" Delete User ")]),t("v-card-text",[e._v(" Do you want to delete this user? ")]),t("v-card-actions",[t("v-btn",{staticClass:"text-capitalize btn",attrs:{small:"",color:"error"},on:{click:e.confirm}},[e._v(" Confirm ")]),t("v-btn",{staticClass:"text-capitalize btn",attrs:{small:"",color:"white"},on:{click:e.cancel}},[e._v(" Cancel ")])],1)],1)],1)],1)},w=[],B={name:"DeleteDialog",components:{},props:{},data(){return{}},methods:{confirm(){this.$emit("confirm")},cancel(){this.$emit("cancel")}}},$=B,I=(s("c70e"),Object(c["a"])($,C,w,!1,null,"4a19000f",null)),U=I.exports,R=s("5a0c"),S=s.n(R),A=s("8cef"),E=s.n(A),q={name:"UserList",components:{AddDialog:u,EditDialog:g,ResetDialog:y,DeleteDialog:U},data(){return{options:{},search:"",headers:[{text:"ID",value:"id"},{text:"Name",value:"name"},{text:"Email",value:"email"},{text:"Created Date",value:"createdAt"},{text:"Updated Date",value:"updatedAt"},{text:"Role",value:"roleId",sortable:!1},{text:"Actions",value:"actions",sortable:!1}],items:[],totalRecords:0,snackBar:{type:"default",enabled:!1,message:""},addDialog:!1,editDialog:!1,resetDialog:!1,deleteDialog:!1,selectedEditItem:{},selectedResetItem:{},selectedDeleteItem:{}}},created(){this.getUserList()},mounted(){},methods:{getValue(e,t){return E()(e,t)},onSearchInput(){this.getUserList()},setDateFormat(e){return S()(e).format("DD/MM/YYYY")},getUserList(){this.$http.get("user",{params:{page:this.options.page,sort_by:this.options.sortBy?this.options.sortBy[0]:null,descending:this.options.sortDesc?this.options.sortDesc[0]:null,rows_per_page:this.options.itemsPerPage,search:this.search}}).then(e=>{e.data&&(this.items=e.data.result,this.totalRecords=e.data.count)}).catch(e=>{})},getRole(e){switch(e){case 1:return{id:1,name:"Admin",color:"#4caf50"};case 2:return{id:2,name:"Member",color:"#1e88e5"};case 3:return{id:3,name:"User",color:"#fb8c00"};default:return{id:3,name:"User",color:"#fb8c00"}}},onAddClick(){this.addDialog=!0},onEditClick(e){this.$http.get("user/"+e).then(e=>{console.log(e),200===e.status&&(this.selectedEditItem=e.data.result,this.editDialog=!0)}).catch(e=>{this.snackBar.type="error",this.snackBar.enabled=!0,this.snackBar.message="Cannot get user"})},onResetClick(e){this.selectedResetItem=e,this.resetDialog=!0},onDeleteClick(e){this.selectedDeleteItem=e,this.deleteDialog=!0},addUser(e){this.$http.post("user",e).then(e=>{200===e.status?(this.addDialog=!1,this.getUserList(),this.snackBar.type="success",this.snackBar.enabled=!0,this.snackBar.message="Successfully create user"):(this.snackBar.enabled=!0,this.snackBar.message=e.data.message)}).catch(e=>{this.snackBar.type="error",this.snackBar.enabled=!0,this.snackBar.message="Cannot create user"})},updateUser(e){this.$http.put("user",e).then(e=>{200===e.status&&(this.editDialog=!1,this.getUserList(),this.snackBar.type="success",this.snackBar.enabled=!0,this.snackBar.message="Successfully update user")}).catch(e=>{this.snackBar.type="error",this.snackBar.enabled=!0,this.snackBar.message="Cannot update user"})},resetPassword(){this.$http.post("user/resetPassword",{id:this.selectedResetItem.id}).then(e=>{200===e.status&&(this.resetDialog=!1,this.snackBar.type="success",this.snackBar.enabled=!0,this.snackBar.message="Successfully reset password")}).catch(e=>{this.snackBar.type="error",this.snackBar.enabled=!0,this.snackBar.message="Cannot reset password"})},deleteUser(){this.$http.delete("user/"+this.selectedDeleteItem.id).then(e=>{200===e.status&&(this.getUserList(),this.deleteDialog=!1,this.selectedDeleteItem={},this.snackBar.type="success",this.snackBar.enabled=!0,this.snackBar.message="Successfully delete user")}).catch(e=>{this.snackBar.type="error",this.snackBar.enabled=!0,this.snackBar.message="Cannot delete user"})}}},L=q,N=Object(c["a"])(L,a,r,!1,null,null,null);t["default"]=N.exports},be00:function(e,t,s){},c70e:function(e,t,s){"use strict";s("661b")},eff0:function(e,t,s){"use strict";s("be00")}}]);
//# sourceMappingURL=chunk-1353ec7c.066c2b8b.js.map