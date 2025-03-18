import React from "react";
import { Provider } from "react-redux";
// import AppRouter from "navigation/AppRouter";
import store from "features/store";
import { Routes, Route } from "react-router-dom";
import AppLayout from "layouts/admin/AppLayout";
import Dashboard from "views/admin/default";
import BankaccountSetup from "views/banking/BankaccoutSetup";
import BankOverview from "views/banking/BankOverview";
import NotFound from "views/OtherPage/NotFound";
import CreditNote from "views/sales/CreditNote";
import ProfileOverview from "views/admin/profile";
import ProfileDetails from "views/admin/profile/edit/UserProfiles";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<AppLayout/>}>
            <Route index path="/" element={<Dashboard/>}/>
            <Route index path="/banking/bank-account-setup" element={<BankaccountSetup/>}/>
            <Route index path="/banking/overview" element={<BankOverview/>}/>
            <Route index path="/sales/credit-note" element={<CreditNote/>}/>

            <Route index path="/profile" element={<ProfileOverview/>}/>

            <Route index path="/profile/edit" element={<ProfileDetails/>}/>
        </Route>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Provider>
  );
};

export default App;
