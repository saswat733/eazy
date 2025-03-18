import { useDispatch } from "react-redux";
import { authApi } from "../services/authApi";
import { companyApi } from "../services/companyApi";
import { accountApi } from "../services/accountApi";
import { bankingApi } from "../services/bankingApi";
import { rolesApi } from "../services/rolesApi";
import { salesApi } from "../services/salesApi";
import { expenseApi } from "../services/expenseApi";
import { generalApi } from "../services/generalApi";
import { fixedAssetsApi } from "../services/fixedAssetsApi";
import { reportsApi } from "../services/reportsApi";
import { menuApi } from "../services/menuApi";
import { plansApi } from "../services/planApi";

const useResetApi = () => {
  const dispatch = useDispatch();

  const handleResetApi = async () => {
    dispatch(authApi.util.resetApiState());
    dispatch(companyApi.util.resetApiState());
    dispatch(accountApi.util.resetApiState());
    dispatch(bankingApi.util.resetApiState());
    dispatch(rolesApi.util.resetApiState());
    dispatch(salesApi.util.resetApiState());
    dispatch(expenseApi.util.resetApiState());
    dispatch(generalApi.util.resetApiState());
    dispatch(fixedAssetsApi.util.resetApiState());
    dispatch(reportsApi.util.resetApiState());
    dispatch(menuApi.util.resetApiState());
    dispatch(plansApi.util.resetApiState());
  };
  return { handleResetApi };
};
export default useResetApi;
