import { toast } from "react-toastify";
type Toast = (type:string,text:string) => object
export const useToast:(type:string,text:string) => {
     return{
        toast.${type}("${text}", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }


};
