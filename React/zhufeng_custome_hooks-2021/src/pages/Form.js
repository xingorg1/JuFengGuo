import React,{useCallback} from 'react';
import useForm from '../hooks/useForm';
export default function Form(){
    let [formData,setFormValue,resetFormValues] = useForm({username:'',email:''});
    let usernameChange = useCallback(
      (event)=>setFormValue('username',event.target.value),[setFormValue]);
    let emailChange = useCallback(
      (event)=>setFormValue('email',event.target.value),[setFormValue]);
    return (
       <form>
           <div className="form-group">
             <label>用户名</label>
             <input className="form-control" placeholder="用户名" 
             value={formData.username} 
             onChange={usernameChange}></input>
           </div>
           <div className="form-group">
             <label>邮箱</label>
             <input className="form-control" placeholder="邮箱" 
             value={formData.email} 
             onChange={emailChange}></input>
           </div>
           <button type="button" className="btn btn-primary" onClick={()=>console.log(formData)}>提交</button>
           <button type="button" className="btn btn-primary" onClick={()=>resetFormValues()}>重置</button>
       </form>
    )   
}